import DataChart from "@/app/org/components/datachart";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";


export default async function BudgetPage({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const projectName = "Project";

    return (
        <div className="m-5 w-full">
            <h1 className="text-base font-bold text-gray-500">{projectName}-{projectId}</h1>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Budget</h2>
                <Button className="w-[100px] font-bold">Modify</Button>
            </div>

            <div className="flex flex-wrap gap-x-16 mt-5 rounded-lg border-1 justify-center">
                <div className="m-5 mt-10">
                    <h3 className="mt-8 pb-2 font-bold border-b-1">Summary</h3>
                    <div className="justify-items-center">
                        <div className="mt-6 border-gray-100 grid grid-cols-2 gap-x-30 gap-y-6 items-center">
                            <p className="text-base font-bold text-gray-500">Budget</p>
                            <p className="text-lg font-bold">$20,000</p>

                            <p className="text-base font-bold text-gray-500">Spent</p>
                            <p className="text-lg font-bold">$5,000</p>

                            <p className="text-base font-bold text-gray-500">Remaining</p>
                            <p className="text-lg font-bold">$15,000</p>
                        </div>
                    </div>
                </div>
                <div>
                    <DataChart />
                </div>
            </div>

            <div>

            </div>

            <div className="mt-8 flex flex-wrap md:flex-nowrap gap-y-5 gap-x-12 font-semibold">
                <div className="p-5 rounded-lg border-1 w-full">
                    <p className="font-bold mb-5">Contractor Spend</p>
                    <div className="grid grid-cols-3 gap-y-5 gap-x-5 items-center min-w-md text-sm">
                        <p className="font-bold text-slate-500">Contractor</p>
                        <p className="font-bold text-slate-500">Spent</p>
                        <p className="font-bold text-slate-500">% Budget</p>
                        <div className="col-span-3 border-b-1" />

                        <a href="" target="_blank" className="text-blue-600 underline">John Doe</a>
                        <p>$5000</p>
                        <p>50%</p>
                        <div className="col-span-3 border-b-1" />

                        <a href="" target="_blank" className="text-blue-600 underline">John Doe</a>
                        <p>$5000</p>
                        <p>50%</p>
                        <div className="col-span-3 border-b-1" />

                        <a href="" target="_blank" className="text-blue-600 underline">John Doe</a>
                        <p>$5000</p>
                        <p>50%</p>
                    </div>
                </div>

                <div className="p-5 rounded-lg border-1 w-full">
                    <p className="font-bold mb-5">Task Spend</p>
                    <div className=" grid grid-cols-4 gap-y-5 gap-x-5 min-w-md items-center text-sm">
                        <p className="font-bold text-slate-500">Task#</p>
                        <p className="font-bold text-slate-500">Title</p>
                        <p className="font-bold text-slate-500">Spent</p>
                        <p className="font-bold text-slate-500">% Budget</p>
                        <div className="col-span-4 border-b-1" />

                        <a href="" target="_blank" className="text-blue-600 underline">TK-1</a>
                        <p>Task 1</p>
                        <p>$5,000</p>
                        <p>50%</p>
                        <div className="col-span-4 border-b-1" />

                        <a href="" target="_blank" className="text-blue-600 underline">TK-1</a>
                        <p>Task 1 Task 1</p>
                        <p>$5,000</p>
                        <p>50%</p>
                        <div className="col-span-4 border-b-1" />

                        <a href="" target="_blank" className="text-blue-600 underline">TK-1</a>
                        <p>Task 1</p>
                        <p>$5,000</p>
                        <p>50%</p>

                    </div>
                </div>
            </div>
        </div>
    )
}