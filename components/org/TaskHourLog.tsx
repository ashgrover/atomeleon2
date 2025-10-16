import { mockCodeCommits } from "../../app/org/mockdata";
import { Badge } from "@/components/ui/badge";

export default function TaskHourLog({ className }: { className?: string }) {
    return (
        <div className="mt-5">
            <p className="mb-3 ml-8 font-bold text-xs">Hour Log</p>
            <div className={`ml-8 shadow-md shadow-slate-200 border-1 rounded-sm bg-neutral-50 ${className}`}>
                <ul className="flex flex-col gap-3 list-disc p-3 ">
                    <li className="flex gap-x-2">
                        <p className="font-medium">May 10, 2025</p> |
                        <p>author</p> |
                        <p>5h 30m</p>
                    </li>
                    <li className="flex gap-x-2">
                        <p className="font-medium">May 10, 2025</p> |
                        <p>author</p> |
                        <p>3h 30m</p>
                    </li>
                    <li className="flex gap-x-2">
                        <p className="font-medium">May 10, 2025</p> |
                        <p>author</p> |
                        <p>6h 20m</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}