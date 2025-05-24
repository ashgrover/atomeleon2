"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Member } from "@/app/types";
import { mockCodeCommits, mockContractors, mockTasksData } from "../mockdata";

export default function MemberRow({ member }: { member: Member }) {
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
                        <TableCell colSpan={9} className="pt-2 pb-5">
                            <UserAssignedTasks member={member} />
                            <div className="my-5" />
                            <UserCommits member={member} />
                        </TableCell>
                    </TableRow>
                </>
            }
        </>
    )
}

function UserAssignedTasks({ member }: { member: Member }) {
    return (
        <div className="ml-8 p-3 border-1 rounded-sm bg-blue-50">
            <p className="mb-3 font-bold text-xs">Tasks</p>
            <div className=" grid grid-cols-4 gap-y-3 items-center text-sm">
                <div className="col-span-4 border-b-1" />

                <a href="" target="_blank" className="text-blue-600 underline">TK-1</a>
                <p>Task 1</p>
                <p>$5,000</p>
                <p>50%</p>
                <div className="col-span-4 border-b-1" />

                <a href="" target="_blank" className="text-blue-600 underline">TK-1</a>
                <p>Task 1 Task 1</p>
                <p>$5,000</p>
                <p>50%</p>
                <div className="col-span-4 border-b-1" />

                <a href="" target="_blank" className="text-blue-600 underline">TK-1</a>
                <p>Task 1</p>
                <p>$5,000</p>
                <p>50%</p>

            </div>
        </div>
    )
}

function UserCommits({ member }: { member: Member }) {
    return (
        <div className="ml-8 p-3 border-1 rounded-sm bg-blue-50">
            <p className="mb-3 font-bold text-xs">Commits</p>
            <ul className="flex flex-col gap-3 list-disc">
                {mockCodeCommits.map(commit => (
                    <li key={commit.id} className="flex gap-x-2">
                        <p>{commit.timestamp}</p> |
                        <p>{commit.author}</p> |
                        <a href={commit.url} className="text-blue-600 underline" target="_blank">{commit.commitId}</a> |
                        <p>{commit.message}</p>
                    </li>
                ))}
            </ul>

        </div>
    )
}