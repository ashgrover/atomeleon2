import TimeEntries from "@/components/org/TimeEntries";
import { MockTimesheets } from "@/app/org/mockdata";



export default async function EntriesPage({ }) {
    const timesheet = MockTimesheets[0];
    return (
        <div className="m-5 w-full">
            <h1 className="text-2xl font-bold mb-10">Time Entries</h1>
            <TimeEntries timesheet={timesheet} />
        </div>
    )
}