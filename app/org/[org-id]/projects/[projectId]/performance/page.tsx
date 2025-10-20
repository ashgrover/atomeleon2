import { GraphCommitsAndPRs, GraphEstimatedCostVsActualCost, GraphHoursLoggedVsTasksCompleted, GraphEstimatedHoursVsActualHours } from "@/components/org/Graphs";
import Metrics from "@/components/org/Metrics";


export default async function Performance({ params }: { params: Promise<{ projectId: string }> }) {

    const { projectId } = await params;
    const projectName = "Project";


    return (
        <div className="p-5 w-full">
            <h1 className="text-base font-bold text-gray-500">{projectName}-{projectId}</h1>
            <h2 className="text-2xl font-bold">Performance</h2>

            <Metrics />
            <GraphHoursLoggedVsTasksCompleted />
            <GraphEstimatedHoursVsActualHours />
            <GraphEstimatedCostVsActualCost />
            <GraphCommitsAndPRs />
        </div>
    )
}