"use client";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Legend, Line, LineChart, XAxis } from "recharts";

export default function BudgetBurndownChart() {
    const chartConfig = {
        planned: {
            label: "Planned",
            color: "var(--chart-1)",
        },
        actual: {
            label: "Actual",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    const chartData = [
        { week: "Week 1", planned: 40000, actual: 40000 },
        { week: "Week 2", planned: 35000, actual: 33500 },
        { week: "Week 3", planned: 30000, actual: 29000 },
        { week: "Week 4", planned: 25000, actual: 22000 },
        { week: "Week 5", planned: 20000, actual: 18000 },
        { week: "Week 6", planned: 15000, actual: 12500 },
        { week: "Week 7", planned: 10000, actual: 8000 },
        { week: "Week 8", planned: 5000, actual: 0 },
        { week: "Week 9", planned: 0, actual: 0 },
    ]

    return (
        <div className="p-5">
            <p className="mb-8 text-sm text-slate-600 font-bold border-t-1 pt-5">Budget Burndown</p>
            <ChartContainer className="h-80 w-full" config={chartConfig}>
                <LineChart accessibilityLayer data={chartData} margin={{ left: 20, top: 20, right: 20, bottom: 10 }}>
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

                    <Line
                        name="Planned Budget"
                        dataKey="planned"
                        type="monotone"
                        stroke="var(--color-planned)"
                        strokeWidth={2}
                        dot={{
                            fill: "var(--color-chart1)"
                        }}
                    />
                    <Line
                        name="Actual Budget"
                        dataKey="actual"
                        type="monotone"
                        stroke="var(--color-actual)"
                        strokeWidth={2}
                        dot={{
                            fill: "var(--color-chart2)"
                        }}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    )
}