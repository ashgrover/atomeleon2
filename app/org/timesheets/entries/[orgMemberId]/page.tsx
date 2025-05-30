import TimeEntries from "@/app/org/components/TimeEntries";
import { MockTimesheets } from "@/app/org/mockdata";



export default async function EntriesPage({ }) {
     const timesheet = MockTimesheets[0];
    return (
        <div>
            <TimeEntries timesheet={timesheet} />
        </div>
    )
}