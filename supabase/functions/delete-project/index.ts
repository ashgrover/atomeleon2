// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "supabase-edge-runtime";
import { createClient } from "supabase-js@2";

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { org_id, proj_id } = await req.json();
        if (!org_id || !proj_id) throw new Error("Fields are empty!");

        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? "",
            {
                global: {
                    headers: { Authorization: req.headers.get("Authorization")! }
                }
            }
        );

        const result = await supabase.rpc("delete_project", { org_id, proj_id });

        console.log("Data", result.data);

        if (result.error) throw result.error;

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders }, status: 200
        });

    }
    catch (err: unknown) {
        console.error(err);
        return new Response(String(err instanceof Error && (err?.message ?? err)), { status: 500 });
    }
});
