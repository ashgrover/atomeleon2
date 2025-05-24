import { CodeCommit } from "@/app/types";

export default function Commits({ commits }: { commits: CodeCommit[] }) {
    return (
        <div className="ml-8 p-3 border-1 rounded-sm bg-neutral-50">
            <p className="mb-3 font-bold text-xs">Commits</p>
            <ul className="flex flex-col gap-3 list-disc">
                {commits.map(commit => (
                    <li key={commit.id} className="flex gap-x-2">
                        <p>{commit.timestamp}</p> |
                        <p>{commit.author}</p> |
                        <a href={commit.url} className="text-blue-600 underline" target="_blank">{commit.commitId}</a> |
                        <p>{commit.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}