"use client"
import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ChevronRightIcon, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { OrgType } from "../types";
import Link from "next/link";


type UserOrgs = {
    id: string,
    public_id: string,
    org_name: string,
    org_type: OrgType
}

export default function HomePage() {
    const [userOrgs, setUserOrgs] = useState<UserOrgs[]>([]);
    const router = useRouter();

    useEffect(() => {
        getOrganizations();
    }, [])

    const getOrganizations = async () => {
        // get orgs from the db.
        try {
            const supabase = createSupabaseBrowserClient();
            const { data, error } = await supabase.from("user_orgs_view").select("*");
            if (error) throw error;

            setUserOrgs(data);
        } catch (err) {
            console.log(err);
        }

    }

    const onCreateOrganization = () => {
        router.push("/home/new");
    }

    return (
        <div className="mx-8 mt-10 w-full">
            <div className="flex justify-between">
                <h2 className="text-2xl font-medium">Organizations</h2>
                <Button onClick={onCreateOrganization}><Plus /> Create Organization</Button>
            </div>
            <div className="mt-5 border-b-1" />

            <div className="flex mt-5 gap-5">
                {userOrgs.map(org => (
                    <Link key={org.id} href={`/org/${org.public_id}`}>
                        <Item key={org.id} variant="outline" className="cursor-pointer bg-neutral-50 hover:bg-neutral-100 select-none min-w-3xs min-h-20">
                            <ItemContent>
                                <ItemTitle className="font-semibold">{org.org_name}</ItemTitle>
                                <ItemDescription>{org.org_type.charAt(0).toUpperCase() + org.org_type.slice(1)}</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <ChevronRightIcon className="size-4" />
                            </ItemActions>
                        </Item>
                    </Link>
                ))}
            </div>
        </div>
    )
}