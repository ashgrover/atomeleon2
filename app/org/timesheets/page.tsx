"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Timesheet } from "@/app/types";
import { Button } from "@/components/ui/button";
import { MockTimesheets } from "../mockdata";
import { Ellipsis, X } from "lucide-react";
import TimesheetStatusBadge from "../components/TimesheetStatusBadge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DatePicker from "../components/DatePicker";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Timesheets({ }) {

    return (
        <div className="m-5 w-full">
            <h1 className="text-2xl font-bold mb-10">Timesheets</h1>
            <div className="mb-5 flex items-center">
                <span className="text-sm font-semibold mr-2">Period</span><DatePicker />
                <span className="text-sm font-semibold ml-2 mr-2">—</span><DatePicker />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="sm" variant="outline" className="ml-2"><X /></Button>
                    </TooltipTrigger>
                    <TooltipContent>Clear</TooltipContent>
                </Tooltip>
            </div>

            <div className="border-1 rounded-sm shadow-md shadow-slate-200">
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
                            <TableHead className="w-3xs font-bold text-slate-600">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {MockTimesheets.map(timesheet => (
                            <TimesheetRow key={timesheet.id} timesheet={timesheet} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function TimesheetRow({ timesheet }: { timesheet: Timesheet }) {
    const router = useRouter();

    return (
        <TableRow className="cursor-pointer" onClick={() => router.push(`/org/timesheets/entries/${timesheet.orgMemberId}`)}>
            <TableCell></TableCell>
            <TableCell>
                <span className="bg-gray-200 p-2 rounded-2xl mr-2">JD</span>
                <Link href="" className="text-blue-600 font-semibold underline">John Doe</Link>
            </TableCell>
            <TableCell>Jan 20, 2025 — Jan 29, 2025</TableCell>
            <TableCell>25h</TableCell>
            <TableCell>$50/hr</TableCell>
            <TableCell>$25,000</TableCell>
            <TableCell><TimesheetStatusBadge status={timesheet.status} /></TableCell>
            <TableCell className="flex items-center gap-2">
                <Button size="sm" className="bg-sky-500 font-semibold">Approve</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline"><Ellipsis /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-2">
                        <DropdownMenuItem>Request Changes</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Cancel Timesheet</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}



