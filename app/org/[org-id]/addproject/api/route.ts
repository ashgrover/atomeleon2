import octokitApp from "@/lib/octokitapp";


export async function POST(request: Request) {
    const { installationId }: { installationId: string | null } = await request.json();

    if (!installationId) return Response.json({ success: false }, { status: 400 });

    try {
        const octokit = await octokitApp.getInstallationOctokit(parseInt(installationId));
        
        const result = await octokit.request('GET /installation/repositories', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        if (!result?.data || result.data.total_count === 0) {
            return Response.json({ success: false }, { status: 400 })
        }
        
        const repos = result.data.repositories.map(repo => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            owner:repo.owner.login
        }));

        console.log(repos);

        return Response.json({ success: true, data: repos }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return Response.json({ success: false }, { status: 400 })
    }
}