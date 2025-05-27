import { CodeCommit } from "@/app/types";

export default function Commits({ commits, className }: { commits: CodeCommit[], className?: string }) {
    return (
        <div className={`ml-8 shadow-md shadow-slate-200 border-1 rounded-sm bg-neutral-50 ${className}`}>
            <ul className="flex flex-col gap-3 list-disc p-3 ">
                {commits.map(commit => (
                    <li key={commit.id} className="flex gap-x-2">
                        <p className="font-medium">{commit.timestamp}</p> |
                        <p>{commit.author}</p> |
                        <a href={commit.url} className="text-blue-600 underline" target="_blank">{commit.commitId}</a> |
                        <p>{commit.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}