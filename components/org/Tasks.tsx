"use client";

import { mockCodeCommits, mockTasksData } from "@/app/org/[orgId]/mockdata";
import { Table, TableBody, TableHead, TableHeader, TableCell, TableRow } from "@/components/ui/table";
import { Task } from "@/app/types";
import { ChevronRight, GitPullRequest } from "lucide-react";
import { useState } from "react";
import Commits from "./Commits";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import TaskStatusBadge from "./TaskStatusBadge";
import PullRequests from "./PullRequests";
import TaskHourLog from "./TaskHourLog";
import octokitApp from "@/lib/octokitapp";

export default function Tasks({ projectId, orgMemberId, className, limit = 10 }: { projectId: string, orgMemberId?: string, className?: string, limit?: number }) {

    return (
        <div className={`border-1 rounded-sm shadow-md shadow-slate-200 ${className}`}>
            <Table>
                <TableHeader className="bg-slate-50 text-xs border-b-1">
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600"></TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600">Task#</TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600">Title</TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600">Status</TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600">Est. Hours</TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600">Logged Hours</TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600">Assignees</TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600">Created Date</TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600">Cost</TableHead>
                        <TableHead className="w-3xs font-bold text-slate-600">Commits</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockTasksData.map((task, index) => index + 1 <= limit ? (
                        <TaskRow key={task.id} task={task} hasPR={index % 2 === 0} />
                    ) : null)}
                </TableBody>
            </Table>
        </div>
    )
}

function TaskRow({ task, hasPR = false }: { task: Task, hasPR?: boolean }) {
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
                <TableCell className="px-0">{hasPR ? <div className="bg-slate-300 w-fit p-1 rounded-sm"><GitPullRequest size={16} /></div> : null}</TableCell>
                <TableCell className="font-semibold text-blue-600 underline">
                    <a href={task.url} target="_blank">
                        {task.publicKey}
                    </a>
                </TableCell>

                <TableCell className="text-blue-600 font-medium">
                    <Tooltip delayDuration={300}>
                        <TooltipTrigger>
                            <div className="text-wrap underline text-left truncate max-w-xs">
                                <a href={task.url} target="_blank" className="truncate">
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
                    <TaskStatusBadge status={task.status} />
                </TableCell>
                <TableCell><p>{task.estimatedHours}</p></TableCell>
                <TableCell>
                    <span className={`${isActMoreThanEst ? "text-red-600" : ""} font-medium`}>{task.actualHours}</span>
                </TableCell>

                <TableCell>{task.assignees?.join(", ")}</TableCell>
                <TableCell>{task.createdDate}</TableCell>
                <TableCell className="">$5500.00</TableCell>
                <TableCell className="">2</TableCell>
            </TableRow>

            {!state.isExpanded ? null :
                <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={11} className="pt-2 pb-5">
                        {hasPR ? <PullRequests /> : null}
                        <Commits title="Task Commits" commits={mockCodeCommits} />
                        <TaskHourLog />
                    </TableCell>
                </TableRow>
            }
        </>
    )
}