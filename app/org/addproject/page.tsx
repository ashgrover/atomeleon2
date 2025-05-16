import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Github, Gitlab } from "lucide-react";


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
                    <Label>Connect Repository</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Button variant="secondary">GitHub</Button>
                        <Button variant="secondary">GitLab</Button>
                        <Button variant="secondary">Bitbucket</Button>
                        <Button variant="secondary">Azure DevOps</Button>
                    </div>
                </div>
            </div>
            <Button className="mt-10 w-50">Add Project</Button>


        </div>
    )
}