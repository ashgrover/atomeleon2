"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInstallationId, saveRepo } from "@/lib/database";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { FormEvent, use, useEffect, useState } from "react";

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

export default function AddProjectPage({ params }: { params: Promise<{ orgId: string }> }) {
    const { orgId } = use(params);
    const [formState, setFormState] = useState<FormState>({ projName: "", projDesc: "", budget: 0 });
    const [showIntegrationsState, setShowIntegrationsState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onAddProject = async (e: FormEvent) => {
        e.preventDefault();
        if (!formState.projName || !formState.projDesc || !formState.budget) return;

        try {
            setIsLoading(true);
            const supabase = createSupabaseBrowserClient();

            const result = await supabase.functions.invoke("create-project", {
                body: {
                    org_public_id: orgId,
                    proj_name: formState.projName,
                    proj_desc: formState.projDesc,
                    budget: formState.budget
                }
            });

            if (result.error) throw result.error;

            setShowIntegrationsState(true);

        } catch (err: unknown) {
            console.log(err instanceof Error ? err.message : err);
        }

        setIsLoading(false);
    }
    if (showIntegrationsState) {
        return <ConnectIntegrations orgId={orgId} />
    }

    return (
        <div className="bg-slate-50 flex w-full justify-center">
            <div className="m-8 border-1 rounded-2xl bg-white sm:min-w-3xl max-w-3xl h-fit">
                <form onSubmit={onAddProject} className="[&>*]:border-b-1 [&>*]:border-gray-200 [&>*]:px-8 [&>*]:py-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Add Project</h1>
                        <p className="text-gray-500 text-sm">You can connect data providers in the next step after you have created the project.</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <Label htmlFor="title-label">Name</Label>
                        <Input required type="text" id="title-label" aria-labelledby="title-label"
                            onChange={(e) => setFormState(state => ({ ...state, projName: e.target.value }))} />
                    </div>

                    <div className="grid grid-cols-2 items-start">
                        <Label htmlFor="desc-label">Description</Label>
                        <Textarea id="desc-label" required aria-labelledby="desc-label"
                            onChange={(e) => setFormState(state => ({ ...state, projDesc: e.target.value }))} />
                    </div>

                    <div className="grid gap-3 grid-cols-2">
                        <Label htmlFor="budget-label">Budget</Label>
                        <Input type="number" id="title-label" required aria-labelledby="budget-label"
                            onChange={(e) => setFormState(state => ({ ...state, budget: Number(e.target.value) }))} />
                    </div>
                    <div className="flex justify-end gap-5">
                        <Button className="w-20" variant="outline" onClick={onAddProject}>Cancel</Button>
                        <Button className="w-35"
                            type="submit"
                            disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? "Adding..." : "Add Project"}
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

function ConnectIntegrations({ orgId }: { orgId: string }) {
    const [repoState, setRepoState] = useState<RepoState>({ repos: [], selectedRepo: null });

    useEffect(() => {
        async function getRepos() {
            const installationId = getInstallationId();
            if (!installationId) return;

            const response = await fetch("/org/addproject/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    installationId
                })
            });

            const result = await response.json();
            if (result.success) {
                setRepoState(state => ({ ...state, repos: result.data }))
            }
            console.log("GetRepos", result);
        }

        getRepos();
    }, []);

    const openGithub = () => {
        const url = "https://github.com/apps/someorgapp/installations/new";
        openWindow(url);
    }

    const onSelectRepository = (repo: Repo) => {
        setRepoState(state => ({ ...state, selectedRepo: repo }));
        saveRepo(repo);
    }

    const onSkip = () => {
        window.location.reload();
    }

    const onDone = () => {
        window.location.reload();
    }


    return (
        <div className="bg-slate-50 w-full flex justify-center">
            <div className=" m-8 border-1 rounded-2xl bg-white sm:min-w-2xl max-w-3xl h-fit 
            [&>*]:border-b-1 [&>*]:border-gray-200 [&>*]:px-8 [&>*]:py-6">
                <div>
                    <h2 className="text-2xl font-semibold">Connect Data Providers</h2>
                    <p className="text-gray-500 text-sm">Integrate with issue tracking tools and code repositories</p>
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
                <div className="flex justify-end gap-5">
                    <Button className="w-30" variant="outline" onClick={onSkip}>Skip</Button>
                    <Button className="w-35" type="submit" onClick={onDone}>Done</Button>
                </div>
            </div>
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


