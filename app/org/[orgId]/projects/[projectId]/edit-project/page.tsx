
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInstallationId, saveRepo } from "@/lib/database";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
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

export default function EditProjectPage({ params }: { params: Promise<{ orgId: string }> }) {
    const { orgId } = use(params);
    const [formState, setFormState] = useState<FormState>({ projName: "", projDesc: "", budget: 0 });
    const [repoState, setRepoState] = useState<RepoState>({ repos: [], selectedRepo: null });

    useEffect(() => {

        // getRepos();
    }, []);


    const openGithub = () => {
        const url = "https://github.com/apps/someorgapp/installations/new";
        openWindow(url);
    }

    const onSelectRepository = (repo: Repo) => {
        setRepoState(state => ({ ...state, selectedRepo: repo }));
        saveRepo(repo);
    }

    const onUpdate = async () => {
        try {
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
            window.location.reload();

        } catch (err: unknown) {
            console.log(err instanceof Error ? err.message : err);
        }
    }

    return (
        <div className="w-3xl mx-10 mt-5">
            <h1 className="text-2xl font-semibold">Edit Project</h1>

            <div className="flex flex-col gap-10 mt-10">
                <div className="grid gap-3">
                    <Label htmlFor="title-label">Name</Label>
                    <Input type="text" id="title-label" aria-labelledby="title-label"
                        onChange={(e) => setFormState(state => ({ ...state, projName: e.target.value }))} />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="desc-label">Description</Label>
                    <Textarea id="desc-label" aria-labelledby="desc-label"
                        onChange={(e) => setFormState(state => ({ ...state, projDesc: e.target.value }))} />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="budget-label">Budget</Label>
                    <Input type="number" id="title-label" aria-labelledby="budget-label"
                        onChange={(e) => setFormState(state => ({ ...state, budget: Number(e.target.value) }))} />
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
            </div>
            <Button className="mt-10 w-50" onClick={onUpdate}>Update</Button>
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