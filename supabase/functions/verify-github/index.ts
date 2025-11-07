// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "supabase-edge-runtime";
import { createClient } from "supabase-js@2";
import { corsHeaders, enableCors } from "../../util.ts";


Deno.serve(async (req) => {
    enableCors(req);

    try {
        const { org_public_id, installation_id, user_code } = await req.json();
        if (!org_public_id || !installation_id || !user_code) throw Error("Invalid fields!");

        const userAccessToken = await getUserAccessToken(user_code);
        const isInstallationIdVerified = await checkUserInstallation(installation_id, userAccessToken);

        if (isInstallationIdVerified) {
            await storeGithubAppInstallationIdInDB(req, installation_id, org_public_id);
        }

        return new Response(JSON.stringify({ success: true }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
        )

    } catch (err) {
        console.error(err);
        return new Response(String(err instanceof Error ? err?.message : err), { status: 500 });
    }
});

async function getUserAccessToken(userCode: string) {
    if (!userCode) throw Error("Invalid user code!");

    const clientId = Deno.env.get("GITHUB_APP_CLIENT_ID");
    const clientSecret = Deno.env.get("GITHUB_APP_CLIENT_SECRET");
    const githubAcessTokenUrl = "https://github.com/login/oauth/access_token";

    const response = await fetch(githubAcessTokenUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: userCode
        })
    });

    if (!response.ok) throw Error("Something went wrong! Please try again");

    const data = await response.json();
    const userAccessToken = data.access_token;
    console.log("DATA", data, "status", response.status, response.ok)
    return userAccessToken;
}


async function checkUserInstallation(installationId: string, userAccessToken: string) {
    const installationsAPIUrl = "https://api.github.com/user/installations"
    const response = await fetch(installationsAPIUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${userAccessToken}`,
            "X-GitHub-Api-Version": "2022-11-28"
        }
    });

    const result = await response.json();
    if (result?.total_count <= 0) return false;

    const hasInstallation = result.installations.some((installation: { id: number; }) => String(installation.id) === installationId);
    return hasInstallation;
}

async function storeGithubAppInstallationIdInDB(req: Request, installationId: string, orgPublicId: string) {
    const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? "",
        {
            global: {
                headers: { Authorization: req.headers.get("Authorization")! }
            }
        }
    );

    const { error } = await supabase.rpc("create_github_integration", {
        installation_id: installationId,
        org_public_id: orgPublicId
    });

    if (error) throw error;
}