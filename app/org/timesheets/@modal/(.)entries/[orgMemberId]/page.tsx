
import Modal from "@/app/org/components/Modal";
import TimeEntries from "@/app/org/components/TimeEntries";
import { MockTimesheets } from "@/app/org/mockdata";

export default async function EntriesModalPage({ params }: { params: Promise<{ timesheetId: string }> }) {

    const timesheet = MockTimesheets[0];

    return (
        <Modal className="sm:max-w-6xl" title="Time Entries">
            <TimeEntries timesheet={timesheet} />
        </Modal>
    )
}