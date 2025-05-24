import TaskRow from "@/app/org/components/taskrow";
import { mockTasksData } from "@/app/org/mockdata";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function ProjectTasksPage({ params }: { params: Promise<{ projectId: string }> }) {

    const { projectId } = await params;
    const projectName = "Project";

    return (
        <div className="m-5">
            <h1 className="text-base font-bold text-gray-500">{projectName}-{projectId}</h1>
            <h2 className="text-2xl font-bold">Tasks</h2>
            <div className="mt-8 mr-20 border-1 rounded-sm">
                <Table>
                    <TableHeader className="bg-slate-50 text-xs">
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Task#</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Title</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">
                                <p>Hours (Act / Est)</p>
                            </TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Cost</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Status</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Assignees</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Created Date</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Updated Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockTasksData.map(task => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
