import HomePanel from "@/components/home/HomePanel";
import supabase from "@/lib/supabase";
import { redirect } from "next/navigation";


export default async function HomeLayout({ children }: { children: React.ReactNode }) {

    const { data, error } = await supabase.auth.getClaims(); // this is not working for some reason
    if (error || !data?.claims) {
        console.log("Error", error, data?.claims)
        // redirect("/login");
        return null;
    }



    return (
        <div>
            <HomePanel />
            {children}
        </div>
    );
}


