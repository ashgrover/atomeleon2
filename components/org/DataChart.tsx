"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import React from "react";
import { Label, Pie, PieChart } from "recharts";

const chartData = [
    { browser: "budget", visitors: 20000, fill: "var(--color-budget)" },
    { browser: "spent", visitors: 5000, fill: "var(--color-spent)" },
]

const chartConfig = {
    budget: {
        label: "Budget",
        color: "var(--chart-2)",
    },
    spent: {
        label: "Spent",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig;

export default function DataChart() {

    const centerText = (5000 / 20000) * 100 + "%";

    return (
        <div>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[350px] max-h-[350px]">
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie animationDuration={0}
                        data={chartData}
                        dataKey="visitors"
                        nameKey="browser"
                        innerRadius={90}
                        strokeWidth={5}>
                        <Label content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle">
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold">
                                            {centerText.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground">
                                            Consumed
                                        </tspan>
                                    </text>
                                )
                            }
                        }} />
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    )
}