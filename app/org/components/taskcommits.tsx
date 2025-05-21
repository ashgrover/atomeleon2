import { Task } from "@/app/types";
import { mockCodeCommits } from "../mockdata";


export default function TaskCommits({ task }: { task: Task }) {
    return (
        <div className="ml-8 p-2 rounded-sm bg-amber-100">
            <ul className="flex flex-col gap-3 list-disc">
                {mockCodeCommits.map(commit => (
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