"use client";
import { Task, TaskStatus } from "@/app/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import TaskCommits from "./taskcommits";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export default function TaskRow({ task }: { task: Task }) {
    const [state, setState] = useState({ isExpanded: false })

    const taskTitle = task.title.length > 100 ? task.title.substring(0, 100) + "..." : task.title;
    const onExpand = () => {
        setState(state => ({ ...state, isExpanded: !state.isExpanded }));
    }

    return (
        <>
            <TableRow className={`cursor-pointer ${state.isExpanded ? "border-0" : ""}`} onClick={onExpand}>
                <TableCell className="font-semibold text-gray-600">
                    <ChevronRight size={16} className={`transition-transform ${state.isExpanded ? "rotate-90" : "rotate-0"}`} />
                </TableCell>
                <TableCell className="font-semibold text-gray-600">{task.publicId}</TableCell>
                <TableCell className="text-blue-600 font-medium underline min-w-50">
                    <Tooltip delayDuration={500}>
                        <TooltipTrigger>
                            <div className="text-wrap text-left">
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
                    <span className="text-red-600 font-medium">35</span> / <span>45</span>
                </TableCell>
                <TableCell className="">$5500.00</TableCell>
                <TableCell>{task.status === TaskStatus.Open ? "Open" : "Closed"}</TableCell>
                <TableCell>{task.assignees?.join(", ")}</TableCell>
                <TableCell>{task.createdDate}</TableCell>
                <TableCell>{task.updatedDate}</TableCell>
            </TableRow>

            {!state.isExpanded ? null :
                <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6}>
                        <TaskCommits task={task} />
                    </TableCell>
                </TableRow>
            }
        </>
    )
}