// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "supabase-edge-runtime";
import { createClient } from "supabase-js@2";
import { customAlphabet } from "nanoid";

export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { org_public_id, proj_name, proj_desc, budget } = await req.json();
        if (!org_public_id || !proj_name || !proj_desc || !budget) throw new Error("Fields are empty!");

        const alphanumericAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const nanoid = customAlphabet(alphanumericAlphabet, 12);
        const public_id = nanoid();

        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? "",
            {
                global: {
                    headers: { Authorization: req.headers.get("Authorization")! }
                }
            }
        );

        const { data, error } = await supabase.rpc("create_project", {
            org_public_id,
            public_id,
            proj_name,
            proj_desc,
            budget
        });

        console.log("Data", data);

        if (error) throw error;

        return Response.json({ success: true, project_id: data }, {
            headers: { ...corsHeaders }, status: 200
        });

    }
    catch (err) {
        console.error(err);
        return new Response(String(err instanceof Error && (err?.message ?? err)), { status: 500 });
    }
});
