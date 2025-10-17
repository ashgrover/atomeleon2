"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"


export default function HomePage() {
    const router = useRouter();

    const getOrganizations = () => {
        // get orgs from the db.
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

            <div className="flex">

            </div>
        </div>
    )
}