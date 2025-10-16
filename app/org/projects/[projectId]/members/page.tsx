import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockMembers } from "@/app/org/mockdata";
import MemberRow from "@/components/org/MemberRow";
import AddProjectMembers from "@/components/org/AddProjectMembers";

export default async function MembersPage({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const projectName = "Project";

    return (
        <div className="p-5 w-full">
            <h1 className="text-base font-bold text-gray-500">{projectName}-{projectId}</h1>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Members</h2>
                <AddProjectMembers />
            </div>

            <div className="mt-8 border-1 rounded-sm shadow-md shadow-slate-200">
                <Table>
                    <TableHeader className="bg-slate-50 text-xs">
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Name</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Tasks Assigned</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Tasks Completed</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Hours Logged</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Hourly Rate</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Cost</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Commits This Week</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockMembers.map(member => (
                            <MemberRow key={member.id} projectId={projectId} member={member} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}