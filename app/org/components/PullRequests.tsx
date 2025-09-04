import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";

export default function PullRequests({}) {
    return (
        <div className="mb-5">
            <p className="mb-3 ml-8 font-bold text-xs">Pull Requests <Badge className="bg-gray-200 text-black">1</Badge></p>
            <div className=" ml-8 shadow-md shadow-slate-200 border-1 rounded-sm bg-neutral-50 p-3">
                <div className="flex gap-3">
                    <p>May 20, 2025</p> |
                    <p>author</p> |
                    <div className="flex gap-1">
                        <Badge className="bg-gray-300 text-black">feature-task1</Badge>
                        <MoveRight />
                        <Badge className="bg-gray-300 text-black">main</Badge>
                    </div>
                    <a href="/" target="_blank" className="text-blue-600 underline">[devtools] Use useEffectEvent instead of ignoring exhaustive deps</a>
                </div>
            </div>
        </div>
    );
}