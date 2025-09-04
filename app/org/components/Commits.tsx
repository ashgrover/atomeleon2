import { CodeCommit } from "@/app/types";
import { mockCodeCommits } from "../mockdata";
import { Badge } from "@/components/ui/badge";

export default function Commits({ title = "Commit Activity", commits, className }: { title?: string, commits: CodeCommit[], className?: string }) {
    return (
        <div>
            <p className="mb-3 ml-8 font-bold text-xs">{title} <Badge className="bg-gray-200 text-black">{mockCodeCommits.length}</Badge></p>
            <div className={`ml-8 shadow-md shadow-slate-200 border-1 rounded-sm bg-neutral-50 ${className}`}>
                <ul className="flex flex-col gap-3 list-disc p-3 ">
                    {commits.map(commit => (
                        <li key={commit.id} className="flex gap-x-2">
                            <p className="font-medium">{commit.timestamp}</p> |
                            <p>{commit.author}</p> |
                            <a href={commit.url} className="text-blue-600 underline" target="_blank">{commit.publicId}</a> |
                            <p>{commit.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}