// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "supabase-edge-runtime";
import { createClient } from "supabase-js@2";
import { App } from "octokit";
import { corsHeaders, enableCors } from "../../util.ts";

type GithubIntegration = {
    org_public_id: string,
    external_installation_id: string,
    data_provder: string
}

type Repository = {
    id: number,
    node_id: string,
    owner: string,
    full_name: string,
    repo_url: string,
}

Deno.serve(async (req) => {
    enableCors(req);

    try {
        const { org_public_id }: { org_public_id: string | null } = await req.json();
        if (!org_public_id) return Response.json({ success: false }, { status: 400 });

        // get all installation ids of github for the org
        const integrations = await getGithubIntegrations(req, org_public_id);
        console.log("Integrations", integrations);
        const installationRepos = await getAllGithubRepositories(integrations);

        console.log(installationRepos);

        return new Response(JSON.stringify({ success: true, installation_repos: installationRepos }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
        )
    }
    catch (err) {
        console.error(err);
        return new Response(String(err instanceof Error ? err?.message : err), { status: 500 });
    }
});

async function getGithubIntegrations(req: Request, orgPublicId: string) {
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
        .from("org_integrations_view")
        .select("*")
        .eq("org_public_id", orgPublicId)
        .eq("data_provider", "github");

    if (error) throw error;

    return data;
}

async function getAllGithubRepositories(integrations: GithubIntegration[]) {

    const octokitApp = new App({
        appId: Deno.env.get("GITHUB_APP_ID")!,
        privateKey: Deno.env.get("GITHUB_PRIVATE_KEY")!.replace(/\\n/g, "\n").trim(),
    });

    const installationRepos = [];

    for (let i = 0; i < integrations.length; i++) {
        try {
            const installationId = integrations[i].external_installation_id;
            const octokit = await octokitApp.getInstallationOctokit(parseInt(installationId));
            const { data } = await octokit.request("GET /installation/repositories", {
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            });

            if (!data || data.total_count === 0) return null;

            const repos: Repository[] = data.repositories.map(repo => ({
                id: repo.id,
                node_id: repo.node_id,
                owner: repo.owner.login,
                full_name: repo.full_name,
                repo_url: repo.html_url,
            }));

            installationRepos.push({ installation_id: installationId, repos });
        } catch (err) {
            console.log(err);
        }
    }

    return installationRepos;
}
