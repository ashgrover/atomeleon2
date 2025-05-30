"use client";

import { Timesheet } from "@/app/types";

export default function TimeEntries({ timesheet }: { timesheet: Timesheet }) {

    return (
        <div className="mt-5">
            Time Entries  {timesheet.id}
        </div>
    )
}