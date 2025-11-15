// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "supabase-edge-runtime";
import { createClient } from "supabase-js@2";
import { App } from "octokit";
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


Deno.serve(async (req) => {
    enableCors(req);

    try {
        const { proj_public_id, fetch_new_issues }:
            { proj_public_id: string, fetch_new_issues: boolean } = await req.json();

        if (!proj_public_id || !fetch_new_issues) return Response.json({ success: false }, { status: 400 });

        if (!fetch_new_issues) {
            // TODO: get tasks from the database
            // and return
            const { data, error } = await fetchTasksFromDB(proj_public_id);
            if (error) throw error;

        }

        // TODO
        // - get issues from github
        // - if there are new issues, insert them into DB
        // - fetch new tasks and return


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

    const { external_resource_name:rep, external_installation_id } = data[0];
   



}

async function insertTasksIntoDB() {

}

