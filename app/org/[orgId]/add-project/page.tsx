"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Check, Loader2 } from "lucide-react";
import { FormEvent, use, useEffect, useState } from "react";

type Repository = {
    id: number,
    nodeId: string,
    owner: string,
    fullName: string,
    repoUrl: string,
    orgIntegrationId: string
}
type FormState = {
    projName: string,
    projDesc: string,
    budget: number,
}
type RepoState = {
    repos: Repository[],
    selectedRepo: Repository | null,
};

export default function AddProjectPage({ params }: { params: Promise<{ orgId: string }> }) {
    const { orgId } = use(params);
    const [formState, setFormState] = useState<FormState>({ projName: "", projDesc: "", budget: 0 });
    const [dataProviderViewState, setDataProviderViewState] = useState({ show: false, projectId: "" });
    const [isLoading, setIsLoading] = useState(false);

    const onAddProject = async (e: FormEvent) => {
        e.preventDefault();
        if (!formState.projName || !formState.projDesc || !formState.budget) return;

        try {
            setIsLoading(true);
            const supabase = createSupabaseBrowserClient();

            const { data, error } = await supabase.functions.invoke("create-project", {
                body: {
                    org_public_id: orgId,
                    proj_name: formState.projName,
                    proj_desc: formState.projDesc,
                    budget: formState.budget
                }
            });

            if (error) throw error;
            const { project_id } = data;
            console.log(project_id, "==", data)

            setDataProviderViewState({ show: true, projectId: project_id });

        } catch (err: unknown) {
            console.log(err instanceof Error ? err.message : err);
        }

        setIsLoading(false);
    }

    if (dataProviderViewState.show && dataProviderViewState.projectId) {
        return <ConnectIntegrations orgId={orgId} projectId={dataProviderViewState.projectId} />
    }

    return (
        <div className="bg-slate-50 flex w-full justify-center">
            <div className="m-8 border-1 rounded-2xl bg-white sm:min-w-3xl h-fit">
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
                        <Input type="number" max={9999999999.99} step={0.01} id="title-label" required aria-labelledby="budget-label"
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

function ConnectIntegrations({ orgId, projectId }: { orgId: string, projectId: string }) {
    const [repoState, setRepoState] = useState<RepoState>({ repos: [], selectedRepo: null });

    useEffect(() => {
        window.onmessage = async (e: MessageEvent) => {
            if (e.origin !== "http://localhost:3000") throw Error("Invalid request");
            try {
                const { installation_id, user_code } = e.data;
                const isVerified = await verifyGithubInstallation(orgId, installation_id, user_code);
                if (isVerified) {
                    const repos = await getGithubRepos(orgId);
                    setRepoState(state => ({ ...state, repos: repos }));
                }
            } catch (err) {
                console.log(err instanceof Error ? err.message : err);
            }
        };

        async function getRepos() {
            const repos = await getGithubRepos(orgId);
            setRepoState(state => ({ ...state, repos: repos }));
        }

        getRepos();
    }, [orgId]);

    const openGithubWindow = () => {
        const githubAppUrl = "https://github.com/apps/someorgapp/installations/new";
        openWindow(githubAppUrl);
    }

    const onSelectRepository = async (repo: Repository) => {
        setRepoState(state => ({ ...state, selectedRepo: repo }));
    }

    const onSkip = () => {
        window.location.reload();
    }

    const onDone = async () => {
        if (!repoState.selectedRepo || !projectId) return;

        await addProjectIntegration(repoState.selectedRepo, projectId);
        window.location.reload();
    }


    return (
        <div className="bg-slate-50 w-full flex justify-center">
            <div className=" m-8 border-1 rounded-2xl bg-white sm:min-w-2xl max-w-4xl h-fit 
            [&>*]:border-b-1 [&>*]:border-gray-200 [&>*]:px-8 [&>*]:py-6">
                <div>
                    <h2 className="text-2xl font-semibold">Connect Data Providers</h2>
                    <p className="text-gray-500 text-sm">Integrate with issue tracking tools and code repositories</p>
                </div>
                <div className="grid gap-8">
                    <Label className="font-semibold">Connect Issue Tracking Tool</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Button variant="secondary">Jira</Button>
                        <Button variant="secondary">Azure Boards</Button>
                    </div>
                </div>
                <div className="grid gap-8">
                    <Label className="font-semibold">Connect Repository</Label>
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
                        <Button variant="secondary" onClick={openGithubWindow}>GitHub (Repo & Issues)</Button>
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

async function verifyGithubInstallation(orgId: string, installationId: string, userCode: string): Promise<boolean> {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.functions.invoke("verify-github", {
        body: { org_public_id: orgId, installation_id: installationId, user_code: userCode }
    });

    if (result.error) throw result.error;
    if (!result.response?.ok) throw Error("Something went wrong! Please try again later.");

    return true;
}

async function getGithubRepos(orgId: string) {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.functions.invoke("fetch-github-repos", {
        body: { org_public_id: orgId }
    });
    if (error) throw error;
    const { installation_repos }: { installation_repos: [] } = data;

    const repos: Repository[] = [];
    installation_repos.forEach((installation: { repos: [], org_integration_id: string }) => {
        installation.repos.forEach((repo: {
            id: number,
            node_id: string,
            owner: string,
            full_name: string,
            repo_url: string
        }) => {
            repos.push({
                id: repo.id,
                nodeId: repo.node_id,
                owner: repo.owner,
                fullName: repo.full_name,
                repoUrl: repo.repo_url,
                orgIntegrationId: installation.org_integration_id
            });
        });
    });

    return repos;
}

async function addProjectIntegration(repo: Repository, projectId: string) {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.functions.invoke("add-project-integration", {
        body: {
            org_integration_id: repo.orgIntegrationId,
            project_id: projectId,
            resource_id: String(repo.id),
            resouce_name: repo.fullName,
            resource_url: repo.repoUrl
        }
    });

    if (error) throw error;
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


