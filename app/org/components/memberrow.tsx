"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Member, TaskStatus } from "@/app/types";
import { mockCodeCommits, mockContractors, mockTasksData } from "../mockdata";
import Commits from "./Commits";
import Tasks from "./Tasks";
import TaskStatusBadge from "./TaskStatusBadge";

export default function MemberRow({ projectId, member }: { projectId: string, member: Member }) {
    const [state, setState] = useState({ isExpanded: false })

    const onExpand = () => {
        setState(state => ({ ...state, isExpanded: !state.isExpanded }));
    }

    const contractor = mockContractors.filter(c => c.id === member.contractorId)[0];

    return (
        <>
            <TableRow className="cursor-pointer" onClick={onExpand}>
                <TableCell className="font-semibold text-gray-600">
                    <ChevronRight size={16} className={`transition-transform ${state.isExpanded ? "rotate-90" : "rotate-0"}`} />
                </TableCell>
                <TableCell className="font-semibold text-blue-600 underline">
                    <a href="" target="_blank">
                        {contractor.name}
                    </a>
                </TableCell>
                <TableCell className="font-medium">{member.tasksAssigned}</TableCell>
                <TableCell className="font-medium">{member.tasksCompleted}</TableCell>
                <TableCell className="font-medium">{member.hoursLogged}h</TableCell>
                <TableCell className="font-medium">${contractor.hourlyRate}/hr</TableCell>
                <TableCell className="font-medium">${member.hoursLogged * contractor.hourlyRate}</TableCell>
            </TableRow>

            {!state.isExpanded ? null :
                <>
                    <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={7} className="pt-2 pb-5">
                            <Tasks className="ml-8" projectId={projectId} contractorId={member.contractorId} />
                            {/* <UserAssignedTasks member={member} /> */}
                            <div className="my-5" />
                            <Commits commits={mockCodeCommits} />
                        </TableCell>
                    </TableRow>
                </>
            }
        </>
    )
}

// function UserAssignedTasks({ member }: { member: Member }) {
//     return (
//         <div className="ml-8 p-3 border-1 rounded-sm bg-neutral-50">
//             <p className="mb-3 font-bold text-xs">Tasks</p>
//             <div className=" grid grid-cols-4 gap-y-3 items-center text-sm">
//                 <p className="font-bold text-slate-500">Task#</p>
//                 <p className="font-bold text-slate-500">Title</p>
//                 <p className="font-bold text-slate-500">Status</p>
//                 <p className="font-bold text-slate-500">Cost</p>
//                 <p className="font-bold text-slate-500">Created Date</p>
//                 <div className="col-span-5 border-b-1" />

//                 <a href="" target="_blank" className="text-blue-600 underline">TK-1</a>
//                 <p>Task 1</p>
//                 <p><TaskStatusBadge status={TaskStatus.Open} /></p>
//                 <p>$5,000</p>
//                 <p>May 20, 2025</p>
//                 <div className="col-span-5 border-b-1" />

//                 <a href="" target="_blank" className="text-blue-600 underline">TK-1</a>
//                 <p>Task 1 Task 1</p>
//                 <p><TaskStatusBadge status={TaskStatus.Open} /></p>
//                 <p>$5,000</p>
//                 <p>May 20, 2025</p>
//                 <div className="col-span-5 border-b-1" />

//                 <a href="" target="_blank" className="text-blue-600 underline">TK-1</a>
//                 <p>Task 1</p>
//                 <p><TaskStatusBadge status={TaskStatus.Open} /></p>
//                 <p>$5,000</p>
//                 <p>May 20, 2025</p>
//             </div>
//         </div>
//     )
// }