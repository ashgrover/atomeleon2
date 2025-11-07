
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveRepo } from "@/lib/database";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { use, useEffect, useState } from "react";

type Repo = {
    id: number,
    name: string,
    fullName: string
}
type FormState = {
    projName: string,
    projDesc: string,
    budget: number,
}
type RepoState = {
    repos: Repo[],
    selectedRepo: Repo | null,
};

export default function ProjectSettingsPage({ params }: { params: Promise<{ orgId: string, projectId: string }> }) {
    const { orgId, projectId } = use(params);

    return (
        <div className="bg-slate-50 p-5 w-full flex justify-center">
            <div className="flex flex-col gap-5 mt-5 sm:min-w-3xl h-fit">
                <h1 className="text-2xl font-semibold">Project Settings</h1>
                <ProjectDetails orgId={orgId} projectId={projectId} />
                <IntegrationSettings orgId={orgId} projectId={projectId} />
            </div>
        </div>
    )
}


function ProjectDetails({ orgId, projectId }: { orgId: string, projectId: string }) {
    const [isLoading, setIsLoadingState] = useState(false);
    const [formState, setFormState] = useState<FormState>({ projName: "", projDesc: "", budget: 0 });

    useEffect(() => {
        async function getProjectDetails() {
            try {
                const supabase = createSupabaseBrowserClient();
                console.log(projectId)
                const { data, error } = await supabase
                    .from("project_details_view")
                    .select("*")
                    .eq("proj_public_id", projectId)
                console.log(data);
                // TODO: Put it into Project object.

                if (error) throw error;
            } catch (err) {
                console.error(err);
            }
        }

        getProjectDetails();
    }, [projectId]);


    const onUpdate = async () => {
        try {
            const supabase = createSupabaseBrowserClient();

            const result = await supabase.functions.invoke("update-project", {
                body: {
                    proj_public_id: projectId,
                    proj_name: formState.projName,
                    proj_desc: formState.projDesc,
                    budget: formState.budget
                }
            });

            if (result.error) throw result.error;
            window.location.reload();

        } catch (err: unknown) {
            console.log(err instanceof Error ? err.message : err);
        }
    }

    return (
        <form className="border-1 rounded-2xl bg-white 
                    [&>div]:border-b-1 [&>div]:border-gray-200 [&>div]:px-8 [&>div]:py-6">
            <div>
                <p className="font-bold">Project Details</p>
                <p className="text-sm text-gray-500">Update project information</p>
            </div>

            <div className="grid grid-cols-2">
                <Label htmlFor="title-label">Name</Label>
                <Input type="text" id="title-label" aria-labelledby="title-label"
                    onChange={(e) => setFormState(state => ({ ...state, projName: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2">
                <Label htmlFor="desc-label">Description</Label>
                <Textarea id="desc-label" aria-labelledby="desc-label"
                    onChange={(e) => setFormState(state => ({ ...state, projDesc: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2">
                <Label htmlFor="budget-label">Budget</Label>
                <Input type="number" id="title-label" aria-labelledby="budget-label"
                    onChange={(e) => setFormState(state => ({ ...state, budget: Number(e.target.value) }))} />
            </div>

            <Button className="w-35 m-5 flex ml-auto"
                type="submit"
                disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Updating..." : "Update"}
            </Button>
        </form>
    )
}

function IntegrationSettings({ orgId, projectId }: { orgId: string, projectId: string }) {
    const [repoState, setRepoState] = useState<RepoState>({ repos: [], selectedRepo: null });

    useEffect(() => {
        // get repos
    }, [])

    const openGithub = () => {
        const url = "https://github.com/apps/someorgapp/installations/new";
        openWindow(url);
    }

    const onSelectRepository = (repo: Repo) => {
        setRepoState(state => ({ ...state, selectedRepo: repo }));
        saveRepo(repo);
    }

    return (
        <div className="border-1 rounded-2xl bg-white
                     [&>div]:border-b-1 [&>div]:border-gray-200 [&>div]:px-8 [&>div]:py-6">
            <div>
                <p className="font-bold">Data Providers</p>
                <p className="text-sm text-gray-500">Add or remove data providers</p>
            </div>
            <div className="grid gap-5">
                <Label>Connect Issue Tracking Tool</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button variant="secondary">Jira</Button>
                    <Button variant="secondary">Azure Boards</Button>
                </div>
            </div>
            <div className="grid gap-5">
                <Label>Connect Repository</Label>
                <div className={`${repoState.repos.length ? "" : "hidden"}`}>
                    <p className="text-sm text-gray-500 font-medium my-2">Available Repositories</p>
                    <div className="border-1 rounded-lg p-3 flex flex-col divide-y">
                        {repoState.repos.map(repo => (
                            <div key={repo.id}
                                className="text-sm font-medium py-1 cursor-pointer"
                                onClick={() => onSelectRepository(repo)}>{repo.fullName}</div>
                        ))}

                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button variant="secondary" onClick={openGithub}>GitHub (repo & issues)</Button>
                    <Button variant="secondary">Bitbucket</Button>
                    <Button variant="secondary">Azure Repos</Button>
                </div>
            </div>
            <Button className="m-5 w-35 flex ml-auto">Update</Button>
        </div>
    )
}

function openWindow(url: string) {
    const width = 800;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    window.open(
        url,
        "targetWindow",
        `toolbar=no, 
        width=${width},
        height=${height}, 
        left=${left}, 
        top=${top}, 
        location=no, 
        status=no,
        menubar=no,
        scrollbars=yes,
        resizable=yes)`
    );
}