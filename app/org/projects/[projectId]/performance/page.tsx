

export default async function Performance({ params }: { params: Promise<{ projectId: string }> }) {

    const { projectId } = await params;


    return (
        <div>
            Performance - {projectId}
        </div>
    )
}