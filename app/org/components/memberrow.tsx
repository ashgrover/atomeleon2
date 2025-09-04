"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ProjectMember } from "@/app/types";
import { mockCodeCommits, mockOrgMembers } from "../mockdata";
import Commits from "./Commits";
import Tasks from "./Tasks";
import { Badge } from "@/components/ui/badge";

export default function MemberRow({ projectId, member }: { projectId: string, member: ProjectMember }) {
    const [state, setState] = useState({ isExpanded: false })

    const onExpand = () => {
        setState(state => ({ ...state, isExpanded: !state.isExpanded }));
    }

    const projectMember = mockOrgMembers.filter(c => c.id === member.orgMemberId)[0];

    return (
        <>
            <TableRow className="cursor-pointer" onClick={onExpand}>
                <TableCell className="font-semibold text-gray-600">
                    <ChevronRight size={16} className={`transition-transform ${state.isExpanded ? "rotate-90" : "rotate-0"}`} />
                </TableCell>
                <TableCell className="font-semibold text-blue-600 underline">
                    <a href="" target="_blank">
                        {projectMember.name}
                    </a>
                </TableCell>
                <TableCell className="font-medium">{member.tasksAssigned}</TableCell>
                <TableCell className="font-medium">{member.tasksCompleted}</TableCell>
                <TableCell className="font-medium">{member.hoursLogged}h</TableCell>
                <TableCell className="font-medium">${projectMember.hourlyRate}/hr</TableCell>
                <TableCell className="font-medium">${member.hoursLogged * projectMember.hourlyRate}</TableCell>
                <TableCell className="font-medium">5</TableCell>
            </TableRow>

            {!state.isExpanded ? null :
                <>
                    <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={8}>
                            <p className="mb-3 ml-8 font-bold text-xs">Assigned Tasks</p>
                            <Tasks className="ml-8 bg-neutral-50" projectId={projectId} orgMemberId={member.orgMemberId} />
                            <div className="my-5" />
                            
                            <Commits title="Member Commits" commits={mockCodeCommits} className="max-h-80 overflow-auto " />
                        </TableCell>
                    </TableRow>
                </>
            }
        </>
    )
}