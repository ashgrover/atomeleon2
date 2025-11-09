
"use client";

import { Project, Repository } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveRepo } from "@/lib/database";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getGithubRepos } from "@/lib/utils";
import camelcaseKeys from "camelcase-keys";
import { Check, Loader2 } from "lucide-react";
import { FormEvent, use, useEffect, useState } from "react";


type FormState = {
    projName: string,
    projDesc: string,
    budget: number,
}
type RepoState = {
    repos: Repository[],
    selectedRepo: Repository | null,
    currentRepo: Repository | null
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
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isLoading, setIsLoadingState] = useState(false);
    const [formState, setFormState] = useState<FormState>({ projName: "", projDesc: "", budget: 0 });

    useEffect(() => {
        async function getProjectDetails() {
            try {
                setIsDataLoading(true);
                const supabase = createSupabaseBrowserClient();
                const { data, error } = await supabase
                    .from("project_details_view")
                    .select("*")
                    .eq("proj_public_id", projectId);

                if (!data?.length) return;

                const project: Project = camelcaseKeys(data[0] as object, { deep: true }) as Project;
                setFormState(state => ({ ...state, ...project }));
                setIsDataLoading(false);

                if (error) throw error;
            } catch (err) {
                console.error(err);
            }
        }

        getProjectDetails();
    }, [projectId]);


    const onUpdate = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoadingState(true);
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
            setIsLoadingState(false);
            window.location.reload();

        } catch (err: unknown) {
            console.log(err instanceof Error ? err.message : err);
        }
    }

    return (
        <form className="border-1 rounded-2xl bg-white 
                    [&>div]:border-b-1 [&>div]:border-gray-200 [&>div]:px-8 [&>div]:py-6 relative">
            {isDataLoading &&
                <div className="absolute bg-gray-100 opacity-90 w-full h-full z-1 flex justify-center">
                    <div className="flex gap-2 items-center">
                        <Loader2 className="animate-spin" />
                        <p className="font-medium text-xl">Loading...</p>
                    </div>
                </div>
            }
            <div>
                <p className="font-bold">Project Details</p>
                <p className="text-sm text-gray-500">Update project information</p>
            </div>

            <div className="grid grid-cols-2">
                <Label htmlFor="name-label">Name</Label>
                <Input type="text" id="name-label" aria-labelledby="name-label"
                    value={formState.projName}
                    onChange={(e) => setFormState(state => ({ ...state, projName: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2">
                <Label htmlFor="desc-label">Description</Label>
                <Textarea id="desc-label" aria-labelledby="desc-label"
                    value={formState.projDesc}
                    onChange={(e) => setFormState(state => ({ ...state, projDesc: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2">
                <Label htmlFor="budget-label">Budget</Label>
                <Input type="number" id="budget-label" aria-labelledby="budget-label"
                    value={formState.budget}
                    onChange={(e) => setFormState(state => ({ ...state, budget: Number(e.target.value) }))} />
            </div>

            <Button className="w-35 m-5 flex ml-auto"
                type="submit"
                disabled={isLoading}
                onClick={onUpdate}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Updating..." : "Update"}
            </Button>
        </form>
    )
}

function IntegrationSettings({ orgId, projectId }: { orgId: string, projectId: string }) {
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isLoading, setIsLoadingState] = useState(false);
    const [repoState, setRepoState] = useState<RepoState>({ repos: [], selectedRepo: null, currentRepo: null, });

    useEffect(() => {
        async function getIntegrations() {
            try {
                setIsDataLoading(true);
                const repos: Repository[] = await getGithubRepos(orgId);
                const supabase = createSupabaseBrowserClient();
                const { data, error } = await supabase
                    .from("project_integrations_view")
                    .select("*")
                    .eq("proj_public_id", projectId);

                if (error) throw error;
                if (!data?.length) return;

                const projectIntegrationResponse = data[0] as { external_resource_name: string };
                const repo = repos.find(x => x.fullName === projectIntegrationResponse.external_resource_name);
                setRepoState(state => ({ ...state, repos, selectedRepo: repo || null, currentRepo: repo || null }));
                setIsDataLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        getIntegrations();
    }, [orgId, projectId]);

    const openGithub = () => {
        const url = "https://github.com/apps/someorgapp/installations/new";
        openWindow(url);
    }

    const onSelectRepository = (repo: Repository) => {
        setRepoState(state => ({ ...state, selectedRepo: repo }));
    }

    const onUpdate = async () => {

        try {
            setIsLoadingState(true);
            // TODO: Save repo


            setIsLoadingState(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="border-1 rounded-2xl bg-white
                     [&>div]:border-b-1 [&>div]:border-gray-200 [&>div]:px-8 [&>div]:py-6 relative">
            {isDataLoading &&
                <div className="absolute bg-gray-100 opacity-90 w-full h-full z-1 flex justify-center">
                    <div className="flex gap-2 items-center">
                        <Loader2 className="animate-spin" />
                        <p className="font-medium text-xl">Loading...</p>
                    </div>
                </div>
            }
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
                                className="text-sm font-medium py-1 cursor-pointer flex items-center gap-1"
                                onClick={() => onSelectRepository(repo)}>
                                {repoState.selectedRepo === repo && <Check size={18} className="mt-0.5" />}
                                {repo.fullName}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <Button variant="secondary" onClick={openGithub}>GitHub (repo & issues)</Button>
                    <Button variant="secondary">Bitbucket</Button>
                    <Button variant="secondary">Azure Repos</Button>
                </div>
            </div>
            <Button className="m-5 w-35 flex ml-auto"
                onClick={onUpdate}
                disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Updating..." : "Update"}
            </Button>
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