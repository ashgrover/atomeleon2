"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getInstallationId, saveRepo } from "@/lib/database";
import { useEffect, useState } from "react";

type Repo = {
    id: number,
    name: string,
    full_name: string
}
type StateType = {
    repos: Repo[],
    selectedRepo: Repo | null,
};

export default function AddProjectPage() {
    console.log("AddProjectPage")
    const [state, setState] = useState<StateType>({ repos: [], selectedRepo: null });

    const openGithub = () => {
        const url = "https://github.com/apps/someorgapp/installations/new";
        openWindow(url);
    }

    const onSelectRepository = (repo: Repo) => {
        setState(state => ({ ...state, selectedRepo: repo }));
        saveRepo(repo);
    }

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
                setState(state => ({ ...state, repos: result.data }))
            }
            console.log("GetRepos", result);
        }

        getRepos();
    }, []);

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
                    <div className={`${state.repos.length ? "" : "hidden"}`}>
                        <p className="text-sm text-gray-500 font-medium my-2">Available Repositories</p>
                        <div className="border-1 rounded-lg p-3 flex flex-col divide-y">
                            {state.repos.map(repo => (
                                <div key={repo.id}
                                    className="text-sm font-medium py-1 cursor-pointer"
                                    onClick={() => onSelectRepository(repo)}>{repo.full_name}</div>
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
            <Button className="mt-10 w-50">Add Project</Button>
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


