import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export default function AddProjectPage() {
    return (
        <div className="w-3xl mx-10 mt-5">
            <h1 className="text-2xl font-semibold">New Project</h1>

            <div className="flex flex-col gap-10 mt-10">
                <div className="grid gap-3">
                    <Label htmlFor="title-label">Title</Label>
                    <Input type="text" id="title-label" aria-labelledby="title-label" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="desc-label">Description</Label>
                    <Textarea id="desc-label" aria-labelledby="desc-label" />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="budget-label">Budget</Label>
                    <Input type="number" id="title-label" aria-labelledby="budget-label" />
                </div>

                <div className="grid gap-3">
                    <Label>Connect Issue Tracking Tool</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Button variant="secondary">Jira</Button>
                        <Button variant="secondary">Azure Boards</Button>
                    </div>
                </div>
                <div className="grid gap-3">
                    <Label>Connect Repository</Label>
                    <div className="">
                        <p className="text-sm text-gray-500 font-medium my-2">Available Repositories</p>
                        <div className="border-1 rounded-lg p-3 flex flex-col divide-y">
                            <div className="text-sm font-medium py-1 cursor-pointer">atomeleon/atomeleon</div>
                            <div className="text-sm font-medium py-1 cursor-pointer">atomeleon/atomeleon</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Button variant="secondary">GitHub (repo & issues)</Button>
                        <Button variant="secondary">Bitbucket</Button>
                        <Button variant="secondary">Azure Repos</Button>
                    </div>
                </div>
            </div>
            <Button className="mt-10 w-50">Add Project</Button>
        </div>
    )
}