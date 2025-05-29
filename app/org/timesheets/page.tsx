"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import TaskStatusBadge from "../components/TaskStatusBadge";

export default function Timesheets({ }) {

    return (
        <div className="m-5 w-full">
            <h1 className="text-2xl font-bold">Timesheets</h1>
            <div className="mt-10 border-1 rounded-sm shadow-md shadow-slate-200">
                <Table>
                    <TableHeader className="bg-slate-50 text-xs border-b-1">
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Name</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Period</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Hours Logged</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Hourly Rate</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Cost</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600">Status</TableHead>
                            <TableHead className="w-3xs font-bold text-slate-600"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* {mockTasksData.map(task => (
                            
                        ))} */}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function TimesheetRow() {
    return (
        <TableRow className="cursor-pointer">
            <TableCell>

            </TableCell>
            <TableCell className="">$5500.00</TableCell>
            <TableCell>
                <TaskStatusBadge status={1} />
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
        </TableRow>
    )
}