import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createSupabaseBrowserClient } from "./supabase/client";
import { Repository } from "@/app/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getWeekDates(timestampMs: number): Date[] {
    const origDate = new Date(timestampMs);
    const day = origDate.getDay();

    const dayDiffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(origDate);
    monday.setDate(origDate.getDate() + dayDiffToMonday);

    const weekRange: Date[] = [];

    for (let i = 0; i < 7; i++) {
        const dt = new Date(monday);
        dt.setDate(monday.getDate() + i);
        weekRange.push(dt);
    }

    return weekRange;
}


export async function getGithubRepos(orgId: string) {
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