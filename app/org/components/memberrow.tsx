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
                            <div className="my-5" />
                            <Commits commits={mockCodeCommits} />
                        </TableCell>
                    </TableRow>
                </>
            }
        </>
    )
}