"use client";

import { mockCodeCommits, mockTasksData } from "@/app/org/mockdata";
import { Table, TableBody, TableHead, TableHeader, TableCell, TableRow } from "@/components/ui/table";
import { Task } from "@/app/types";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Commits from "./Commits";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import TaskStatusBadge from "./TaskStatusBadge";

export default function Tasks({ projectId, contractorId, className }: { projectId: string, contractorId?: string, className?: string }) {
    return (
        <div className={`border-1 rounded-sm ${className}`}>
            <Table>
                <TableHeader className="bg-slate-50 text-xs border-b-1">
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockTasksData.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function TaskRow({ task }: { task: Task }) {
    const [state, setState] = useState({ isExpanded: false })

    const taskTitle = task.title.length > 100 ? task.title.substring(0, 100) + "..." : task.title;
    const onExpand = () => {
        setState(state => ({ ...state, isExpanded: !state.isExpanded }));
    }

    const isActMoreThanEst = task.estimatedHours && task.actualHours > task.estimatedHours;

    return (
        <>
            <TableRow className="cursor-pointer" onClick={onExpand}>
                <TableCell className="font-semibold text-gray-600">
                    <ChevronRight size={16} className={`transition-transform ${state.isExpanded ? "rotate-90" : "rotate-0"}`} />
                </TableCell>
                <TableCell className="font-semibold text-blue-600 underline">
                    <a href={task.url} target="_blank">
                        {task.publicId}
                    </a>
                </TableCell>
                <TableCell className="text-blue-600 font-medium">
                    <Tooltip delayDuration={500}>
                        <TooltipTrigger>
                            <div className="text-wrap underline text-left">
                                <a href={task.url} target="_blank">
                                    {taskTitle}
                                </a>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="text-wrap max-w-md">
                            <p>{task.title}</p>
                        </TooltipContent>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <span className={`${isActMoreThanEst ? "text-red-600" : ""} font-medium`}>{task.actualHours} / {task.estimatedHours}</span>
                </TableCell>
                <TableCell className="">$5500.00</TableCell>
                <TableCell>
                    <TaskStatusBadge status={task.status} />
                </TableCell>
                <TableCell>{task.assignees?.join(", ")}</TableCell>
                <TableCell>{task.createdDate}</TableCell>
            </TableRow>

            {!state.isExpanded ? null :
                <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={8} className="pt-2 pb-5">
                        <p className="mb-3 ml-8 font-bold text-xs">Commit Activity</p>
                        <Commits commits={mockCodeCommits} />
                    </TableCell>
                </TableRow>
            }
        </>
    )
}