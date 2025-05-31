"use client";

import { Timesheet } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getWeekDates } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TimeEntries({ timesheet }: { timesheet: Timesheet }) {
    const period = `${new Date(timesheet.periodStart).toDateString()} — ${new Date(timesheet.periodEnd).toDateString()}`;
    return (
        <div className="mt-8">
            <div className="flex items-center justify-between">
                <div>
                    <span className="bg-gray-200 p-2 rounded-2xl mr-2 font-medium">JD</span>
                    <span className="font-bold text-lg">John Doe {timesheet.id}</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary"><ArrowLeft /></Button>
                    <Button variant="secondary"><ArrowRight /></Button>
                </div>
            </div>
            <p className="mt-1 ml-11 text-sm text-slate-600 font-bold">{period}</p>

            <div className="mt-10 border-1 rounded-sm shadow-md shadow-slate-200 relative overflow-auto max-h-[calc(100vh-350px)]">
                <Table>
                    <TableHeader className="text-xs border-b-1 sticky top-0 bg-white">
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                            <TableHead className="w-3xs font-semibold text-sm">Task</TableHead>
                            <WeekTableHeader timestamp={timesheet.periodStart} />
                            <TableHead className="w-3xs font-semibold text-sm bg-gray-100">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {new Array(10).fill(0).map((i, index) => (<TimeEntriesRow key={index} timesheet={timesheet} />))}
                        <TotalRow timesheet={timesheet} />
                    </TableBody>
                </Table>
            </div>
            <div className="mt-8 mb-10 flex gap-5 justify-between">
                <Button variant="default" className="w-40 bg-sky-500 font-semibold">Approve</Button>
                <div className="flex gap-5">
                    <Button variant="secondary" className="w-40">Request Changes</Button>
                    <Button className="w-40 bg-red-400">Cancel Timesheet</Button>
                </div>
            </div>
        </div>
    )
}


function WeekTableHeader({ timestamp }: { timestamp: number }) {
    const weekDates: Date[] = getWeekDates(timestamp);

    const headers = [];
    for (let i = 0; i <= 4; i++) {
        const dt = weekDates[i];
        const dayMonDate = dt.toDateString().split(" ");
        const day = dayMonDate[0];
        const month = dayMonDate[1];
        const date = dayMonDate[2];

        headers.push(
            <TableHead key={dt.getTime()} className="w-3xs p-3">
                <div className="flex flex-col">
                    <div className="text-sm font-semibold">{day}</div>
                    <div className="text-slate-500">{month} {date}</div>
                </div>
            </TableHead>
        );
    }

    for (let i = 5; i <= 6; i++) {
        const dt = weekDates[i];
        const dayMonDate = dt.toDateString().split(" ");
        const day = dayMonDate[0];
        const month = dayMonDate[1];
        const date = dayMonDate[2];

        headers.push(
            <TableHead key={dt.getTime()} className="w-3xs p-3 bg-gray-50">
                <div className="flex flex-col">
                    <div className="text-sm font-semibold">{day}</div>
                    <div className="text-slate-500">{month} {date}</div>
                </div>
            </TableHead>
        );
    }

    return headers;
}


function TimeEntriesRow({ timesheet }: { timesheet: Timesheet }) {
    return (
        <TableRow>
            <TableCell></TableCell>
            <TableCell className="truncate max-w-50 text-blue-600 underline font-medium">
                <Link href="/" target="_blank">TK-1</Link>
            </TableCell>
            <TableCell className="truncate max-w-50 text-blue-600 underline font-medium">
                <Link href="/" target="_blank">
                    Some task some task some task some Tasks some task some task
                </Link>
            </TableCell>
            <TableCell>5h 20m</TableCell>
            <TableCell>2h 10m</TableCell>
            <TableCell>1h 20m</TableCell>
            <TableCell>6h 40m</TableCell>
            <TableCell>5h 30m</TableCell>
            <TableCell className="bg-gray-50">2h 20m</TableCell>
            <TableCell className="bg-gray-50">1h 20m</TableCell>
            <TableCell className="bg-gray-100 font-bold">5h</TableCell>
        </TableRow>
    )
}

function TotalRow({ timesheet }: { timesheet: Timesheet }) {
    return (
        <TableRow className="bg-gray-100 sticky bottom-0">
            <TableCell colSpan={3} className="font-bold">
                <span className="ml-16">Total Hours</span>
            </TableCell>
            <TableCell className="font-bold">5h 20m</TableCell>
            <TableCell className="font-bold">2h 10m</TableCell>
            <TableCell className="font-bold">1h 20m</TableCell>
            <TableCell className="font-bold">6h 40m</TableCell>
            <TableCell className="font-bold">5h 30m</TableCell>
            <TableCell className="font-bold">5h 30m</TableCell>
            <TableCell className="font-bold">5h 30m</TableCell>
            <TableCell className="font-bold">40h</TableCell>
        </TableRow>
    )
}