
export default async function ProjectTasksPage({ params }: { params: Promise<{ projectId: string }> }) {

    const { projectId } = await params;

    return (
        <div>
            Tasks page - {projectId}
        </div>
    )
}