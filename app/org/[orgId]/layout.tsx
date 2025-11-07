import Panel from "@/components/org/Panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function OrgLayout({ children, params }: { children: React.ReactNode, params: Promise<{ orgId: string }> }) {
    const { orgId } = await params;

    let projects = [];
    try {
        const supabase = await createSupabaseServerClient();
        const { data, error: authError } = await supabase.auth.getClaims();
        console.log("Has User", !!data?.claims)
        if (authError) throw authError;

        const { data: result, error } = await supabase
            .from("user_projects_view")
            .select("*")
            .eq("org_publid_id", orgId);

        projects = result;

        if (error) throw error;
    } catch (err) {
        console.log(err);
    }


    return (
        <div className="flex justify-start">
            <Panel orgId={orgId} projects={projects} />
            {children}
        </div>
    );
}