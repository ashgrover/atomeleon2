import Tasks from "@/app/org/components/Tasks";

export default async function ProjectTasksPage({ params }: { params: Promise<{ projectId: string, orgMemberId?: string }> }) {

    const { projectId, orgMemberId } = await params;
    const projectName = "Project";

    return (
        <div className="p-5 w-full">
            <h1 className="text-base font-bold text-gray-500">{projectName}-{projectId}</h1>
            <h2 className="text-2xl font-bold">Tasks</h2>
            <div className="mt-8">
                <Tasks projectId={projectId} orgMemberId={orgMemberId} />
            </div>
        </div>
    )
}
