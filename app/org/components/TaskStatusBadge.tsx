import { TaskStatus } from "@/app/types";


export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
    return (
        <span className="bg-green-200 p-1.5 rounded-sm text-xs font-medium">
            {status === TaskStatus.Open ? "Open" : "Closed"}
        </span>
    )
}