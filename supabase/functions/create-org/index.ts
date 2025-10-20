// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { customAlphabet } from "jsr:@sitnik/nanoid";
// import { v7 as uuidv7 } from "npm:uuid@13.0.0";

import { createClient } from "npm:@supabase/supabase-js@2";

export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ?? "",
            {
                global: {
                    headers: { Authorization: req.headers.get("Authorization")! },
                },
            },
        );

        // const p_id = uuidv7();
        const alphanumericAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const nanoid = customAlphabet(alphanumericAlphabet, 12);
        const org_public_id = nanoid();
        const { org_name, org_type } = await req.json();

        const result = await supabase.rpc("create_org", {
            org_public_id,
            org_name: org_name,
            org_type: org_type,
        });

        if (result.error) {
            throw result.error;
        }

        const { data, error } = await supabase.from("organizations").select("*");

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify({ data }), {
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
            status: 200,
        });
    } catch (err) {
        console.error(err);
        return new Response(String(err?.message ?? err), { status: 500 });
    }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-org' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

curl -L -X POST 'http://127.0.0.1:54321/functions/v1/create-org' \
  --header 'Authorization: Bearer sb_publishable_kZAYyQ3qSebcW7kgWPQ28w_Ms4CkqIg' \
  --header 'apikey: sb_publishable_kZAYyQ3qSebcW7kgWPQ28w_Ms4CkqIg' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Functions"}'

*/
