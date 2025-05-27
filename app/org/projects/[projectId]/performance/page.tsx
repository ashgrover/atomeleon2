import { CircleCheck, CircleDollarSign, Clock } from "lucide-react";


export default async function Performance({ params }: { params: Promise<{ projectId: string }> }) {

    const { projectId } = await params;
    const projectName = "Project";


    return (
        <div className="p-5 w-full">
            <h1 className="text-base font-bold text-gray-500">{projectName}-{projectId}</h1>
            <h2 className="text-2xl font-bold">Performance</h2>

            <div className="mt-8">
                <div className="flex flex-wrap gap-8 justify-center">
                    <div className="p-6 border-1 border-gray-300 rounded-xl min-w-70 flex items-center gap-8">
                        <div>
                            <CircleCheck size={40} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-semibold">Tasks Open</p>
                            <p className="font-bold text-3xl">35</p>

                            <div className="mt-6" />

                            <p className="text-sm text-slate-500 font-semibold">Tasks Completed</p>
                            <p className="font-bold text-3xl">55</p>
                        </div>
                    </div>

                    <div className="p-6 border-1 border-gray-300 rounded-xl min-w-70 flex items-center gap-8">
                        <div>
                            <Clock size={40} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-semibold">Total Estimated Hours</p>
                            <p className="font-bold text-3xl">80h</p>

                            <div className="mt-6" />

                            <p className="text-sm text-slate-500 font-semibold">Total Actual Hours</p>
                            <p className="font-bold text-3xl">150h</p>
                        </div>
                    </div>

                    <div className="p-6 border-1 border-gray-300 rounded-xl min-w-70 flex items-center gap-8">
                        <div>
                            <CircleDollarSign size={40} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-semibold">Total Estimated Cost</p>
                            <p className="font-bold text-3xl">$25,000</p>

                            <div className="mt-6" />

                            <p className="text-sm text-slate-500 font-semibold">Total Actual Cost</p>
                            <p className="font-bold text-3xl">$45,000</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}