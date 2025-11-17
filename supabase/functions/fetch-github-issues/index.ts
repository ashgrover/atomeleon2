// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "supabase-edge-runtime";
import { createClient } from "supabase-js@2";
import { App } from "octokit";
import { customAlphabet } from "nanoid";
import { v7 as uuidv7 } from "npm:uuid@13.0.0";
import { corsHeaders, enableCors } from "../../util.ts";

type TaskResponse = {
    id: string,
    public_id: string,
    public_key: string,
    title: string,
    status: string,
    task_url: string,
    estimated_hours: number,
    actual_hours: number,
    assignees: string[],
    created_at: string,
    updated_at: string,
    cost: string,
    commit_count: number,
    pull_request_count: number
}

type GithubIssueResponse = {
    id: number,
    number: number,
    title: string,
    state: string,
    html_url: string,
    user: {
        login: string,
    },
    assignees: {
        login: string
    }[],
    created_at: string,
    updated_at: string
}


Deno.serve(async (req) => {
    enableCors(req);

    try {
        const { proj_public_id, fetch_new_issues }:
            { proj_public_id: string, fetch_new_issues: boolean } = await req.json();

        if (!proj_public_id || !fetch_new_issues) return Response.json({ success: false }, { status: 400 });


        if (!fetch_new_issues) {
            // TODO: get tasks from the database
            // and return
            const tasks = await fetchTasksFromDB(proj_public_id);
        } else {
            // TODO
            // - get issues from github
            // - if there are new issues, insert them into DB
            // - fetch new tasks and return
            const tasks = await fetchTasksFromGithub(req, proj_public_id);
            // await insertTasksIntoDB(req, tasks, proj_public_id);
        }

        return new Response(JSON.stringify({ success: true }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
        )
    }
    catch (err) {
        console.error(err);
        return new Response(String(err instanceof Error ? err?.message : err), { status: 500 });
    }
})

async function fetchTasksFromDB(projPublicId: string) {
    const tasks: TaskResponse[] = [];

    return tasks;
}

async function fetchTasksFromGithub(req: Request, projPublicId: string) {
    const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? "",
        {
            global: {
                headers: { Authorization: req.headers.get("Authorization")! }
            }
        }
    );

    const { data, error } = await supabase
        .from("project_github_repo_view")
        .select("*")
        .eq("proj_public_id", projPublicId);

    if (error) throw error;

    const { external_resource_name, external_resource_owner, external_installation_id } = data[0];
    if (!external_resource_name || !external_resource_owner || !external_installation_id) {
        throw Error("Invalid resource fields");
    }

    const octokitApp = new App({
        appId: Deno.env.get("GITHUB_APP_ID") ?? "",
        privateKey: Deno.env.get("GITHUB_PRIVATE_KEY")?.replace(/\\n/g, "\n").trim() ?? "",
    });

    const octokit = await octokitApp.getInstallationOctokit(external_installation_id);
    const result = await octokit.request(`GET /repos/${external_resource_owner}/${external_resource_name}/issues`, {
        owner: external_resource_owner,
        repo: external_resource_name,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    if (!result.data.length) return [];

    return result.data as GithubIssueResponse[];

}

async function insertTasksIntoDB(req: Request, tasks: GithubIssueResponse[], projPublicId: string) {
    if (!tasks.length) return;

    const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? "",
        {
            global: {
                headers: { Authorization: req.headers.get("Authorization")! }
            }
        }
    );

    const alphanumericAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const nanoid = customAlphabet(alphanumericAlphabet, 12);

    console.log(tasks)
    const { data, error } = await supabase.rpc("batch_upsert_tasks", {
        proj_public_id: projPublicId,
        tasks_json: tasks.map(task => {
            const task_id = uuidv7();
            const publicId = nanoid();
            return {
                id: task_id,
                public_id: publicId,
                external_id: String(task.id),
                external_key: String(task.number),
                external_url: task.html_url,
                title: task.title,
                status: task.state,
                assignees: task.assignees,
                created_at: task.created_at,
                updated_at: task.updated_at
            }
        })
    })

    if (error) throw error;
}

