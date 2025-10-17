import HomePanel from "@/components/home/HomePanel";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function HomeLayout({ children }: { children: React.ReactNode }) {

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims) {
        redirect("/login");
    }

    return (
        <div className="flex">
            <HomePanel />
            {children}
        </div>
    );
}


