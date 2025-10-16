import { TimesheetStatus } from "@/app/types";

export default function TimesheetStatusBadge({ status }: { status: TimesheetStatus }) {

    let statusText = "N/A";
    let bgColor = "bg-gray-500";
    switch (status) {
        case TimesheetStatus.Draft:
            statusText = "Draft";
            break;
        case TimesheetStatus.Approved:
            statusText = "Approved";
            bgColor = "bg-green-500";
            break;
        case TimesheetStatus.AwaitingReview:
            statusText = "Awaiting Review";
            bgColor = "bg-yellow-600";
            break;
        case TimesheetStatus.ChangesRequested:
            statusText = "Changes Requested";
            bgColor = "bg-yellow-600";
            break;
        case TimesheetStatus.Withdrawn:
            statusText = "Withdrawn";
            bgColor = "bg-gray-500";
            break;
        case TimesheetStatus.Cancelled:
            statusText = "Cancelled";
            bgColor = "bg-gray-500";
            break;
    }

    return (
        <span className={`py-1 px-2 rounded-sm ${bgColor} text-white font-medium`}>{statusText}</span>
    )
}