"use client";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, XAxis } from "recharts";



export function GraphHoursLoggedVsTasksCompleted() {
    const chartConfig = {
        hoursLogged: {
            label: "Hours Logged",
            color: "var(--chart-1)",
        },
        tasksCompleted: {
            label: "Tasks Completed",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    const chartData = [
        { week: "Week 1", hoursLogged: 75, tasksCompleted: 30 },
        { week: "Week 2", hoursLogged: 110, tasksCompleted: 34 },
        { week: "Week 3", hoursLogged: 85, tasksCompleted: 28 },
        { week: "Week 4", hoursLogged: 130, tasksCompleted: 40 },
        { week: "Week 5", hoursLogged: 160, tasksCompleted: 35 },
        { week: "Week 6", hoursLogged: 90, tasksCompleted: 20 },
    ]

    return (
        <div className="my-10 border-1 p-5 rounded-lg shadow-lg shadow-slate-200 max-w-[900] mx-auto">
            <p className="mb-8 text-sm text-slate-600 font-bold">Hours Logged vs. Tasks Completed</p>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData} margin={{ left: 20, top: 20, right: 20, bottom: 10 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="week"
                        tickLine={false}
                        tickMargin={5}
                        axisLine={false}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Legend />
                    <Bar name="Hours Logged" dataKey="hoursLogged" barSize={50} fill="var(--color-hoursLogged)" radius={4} label={{ position: "top", fill: "#000" }} />
                    <Bar name="Tasks Completed" dataKey="tasksCompleted" barSize={50} fill="var(--color-tasksCompleted)" radius={4} label={{ position: "top", fill: "#000" }} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}

export function GraphEstimatedHoursVsActualHours() {

    const chartConfig = {
        estimatedHours: {
            label: "Actual Hours",
            color: "var(--chart-2)",
        },
        hoursLogged: {
            label: "Estimated Hours",
            color: "var(--chart-4)",
        },
    } satisfies ChartConfig

    const chartData = [
        { week: "Week 1", estimatedHours: 80, hoursLogged: 75 },
        { week: "Week 2", estimatedHours: 100, hoursLogged: 80 },
        { week: "Week 3", estimatedHours: 90, hoursLogged: 85 },
        { week: "Week 4", estimatedHours: 95, hoursLogged: 130 },
        { week: "Week 5", estimatedHours: 120, hoursLogged: 100 },
        { week: "Week 6", estimatedHours: 70, hoursLogged: 90 },
    ]

    return (
        <div className="my-10 border-1 p-5 rounded-lg shadow-lg shadow-slate-200 max-w-[900] mx-auto">
            <p className="mb-8 text-sm text-slate-600 font-bold">Estimated Hours vs. Actual Hours</p>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData} margin={{ left: 20, top: 20, right: 20, bottom: 10 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="week"
                        tickLine={false}
                        tickMargin={5}
                        axisLine={false}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Legend />
                    <Bar name="Estimated Hours" dataKey="estimatedHours" barSize={50} fill="var(--color-estimatedHours)" radius={4} label={{ position: "top", fill: "#000" }} />
                    <Bar name="Actual Hours" dataKey="hoursLogged" barSize={50} fill="var(--color-hoursLogged)" radius={4} label={{ position: "top", fill: "#000" }} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}

export function GraphEstimatedCostVsActualCost() {

    const chartConfig = {
        estimatedCost: {
            label: "Estimated Cost",
            color: "var(--chart-3)",
        },
        actualCost: {
            label: "Actual Cost",
            color: "var(--chart-5)",
        },
    } satisfies ChartConfig

    const chartData = [
        { week: "Week 1", estimatedCost: 6000, actualCost: 4000 },
        { week: "Week 2", estimatedCost: 12000, actualCost: 8000 },
        { week: "Week 3", estimatedCost: 8000, actualCost: 4000 },
        { week: "Week 4", estimatedCost: 10000, actualCost: 9000 },
        { week: "Week 5", estimatedCost: 12000, actualCost: 15000 },
        { week: "Week 6", estimatedCost: 9000, actualCost: 7000 },
    ]

    return (
        <div className="my-10 border-1 p-5 rounded-lg shadow-lg shadow-slate-200 max-w-[900] mx-auto">
            <p className="mb-8 text-sm text-slate-600 font-bold">Estimated Cost vs. Actual Cost</p>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData} margin={{ left: 20, top: 20, right: 20, bottom: 10 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="week"
                        tickLine={false}
                        tickMargin={5}
                        axisLine={false}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Legend />
                    <Bar name="Estimated Cost" dataKey="estimatedCost" barSize={50} fill="var(--color-estimatedCost)" radius={4} label={{ position: "top", fill: "#000" }} />
                    <Bar name="Actual Cost" dataKey="actualCost" barSize={50} fill="var(--color-actualCost)" radius={4} label={{ position: "top", fill: "#000" }} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}

export function GraphCommitsAndPRs() {

    const chartConfig = {
        commits: {
            label: "Commits",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    const chartData = [
        { week: "Week 1", commits: 25 },
        { week: "Week 2", commits: 30 },
        { week: "Week 3", commits: 35 },
        { week: "Week 4", commits: 15 },
        { week: "Week 5", commits: 30 },
        { week: "Week 6", commits: 38 },
    ]

    return (
        <div className="my-10 border-1 p-5 rounded-lg shadow-lg shadow-slate-200 max-w-[900] mx-auto">
            <p className="mb-8 text-sm text-slate-600 font-bold">Commits per Week</p>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData} margin={{ left: 20, top: 20, right: 20, bottom: 10 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="week"
                        tickLine={false}
                        tickMargin={5}
                        axisLine={false}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Legend />
                    <Bar name="Commits per week" dataKey="commits" barSize={50} fill="var(--color-commits)" radius={4} label={{ position: "top", fill: "#000" }} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}