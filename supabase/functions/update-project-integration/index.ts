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
        const { old_org_integration_id, new_org_integration_id, proj_public_id,
            resource_id, resource_name, resource_url } = await req.json();

        if (!old_org_integration_id || !new_org_integration_id || !proj_public_id ||
            !resource_id || !resource_name || !resource_url) {
            throw Error("Invalid fields!");
        }

        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? "",
            {
                global: {
                    headers: { Authorization: req.headers.get("Authorization")! }
                }
            }
        );

        const { error } = await supabase.rpc("update_project_integration", {
            old_org_integration_id,
            new_org_integration_id,
            proj_public_id,
            resource_id,
            resource_name,
            resource_url
        });

        if (error) throw error;

        return new Response(JSON.stringify({ success: true }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
        )

    } catch (err) {
        console.error(err);
        return new Response(String(err instanceof Error ? err?.message : err), { status: 500 });
    }
});
