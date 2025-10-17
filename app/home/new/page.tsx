"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ORG_TYPES, OrgType } from "@/app/types"

export default function CreateOrganizationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [orgType, setOrgType] = useState<OrgType>(ORG_TYPES[0]);
    const [orgName, setOrgName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call or Supabase request
        await new Promise((r) => setTimeout(r, 1000))

        // Replace this with actual createOrg API logic
        console.log({
            name: orgName,
            type: orgType,
        })

        setLoading(false);
        router.push("/home") // redirect after creation
    }

    const onCancel = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/home");
    }

    return (
        <div className="w-full flex justify-center bg-slate-50">
            <div className="m-8 w-full h-fit max-w-3xl space-y-6 border-1 rounded-2xl bg-white p-8">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Create Organization
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Add your organization to get started.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Acme Software"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={orgType} onValueChange={(value) => setOrgType(value as OrgType)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select organization type" />
                            </SelectTrigger>
                            <SelectContent>
                                {ORG_TYPES.map(value => (
                                    <SelectItem key={value} value={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-between">
                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className={cn(loading && "opacity-70 cursor-not-allowed")}
                            disabled={loading || !orgName || !orgType}>
                            {loading ? "Creating..." : "Create Organization"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}
