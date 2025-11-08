import { Project } from "@/app/types";
import Panel from "@/components/org/Panel";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import camelcaseKeys from 'camelcase-keys';

export default async function OrgLayout({ children, params }: { children: React.ReactNode, params: Promise<{ orgId: string }> }) {
    const { orgId } = await params;

    let projects: Project[] = [];
    try {
        const supabase = await createSupabaseServerClient();
        const { data, error: authError } = await supabase.auth.getClaims();
        console.log("Has User", !!data?.claims)
        if (authError) throw authError;

        const { data: result, error } = await supabase
            .from("user_projects_view")
            .select("*")
            .eq("org_publid_id", orgId);

        projects = camelcaseKeys(result as object[], { deep: true }) as Project[];
        
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