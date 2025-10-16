"use client";

import { CircleCheck, CircleDollarSign, Clock } from "lucide-react";

export default function Metrics({ }) {
    return (
        <div className="mt-8 flex flex-wrap gap-8 justify-center">
            <TasksOpenAndCompleted />
            <TotalEstimatedAndActualHours />
            <TotalEstimatedAndActualCost />
        </div>
    );
}

function TasksOpenAndCompleted() {
    return (
        <div className="p-6 border-1 rounded-xl min-w-70 flex items-center gap-8 shadow-lg shadow-slate-200">
            <div>
                <CircleCheck size={40} className="text-slate-500" />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-semibold">Tasks Open</p>
                <p className="font-bold text-3xl">35</p>

                <div className="mt-6" />

                <p className="text-sm text-slate-500 font-semibold">Tasks Completed</p>
                <p className="font-bold text-3xl">55</p>
            </div>
        </div>
    );
}

function TotalEstimatedAndActualHours() {
    return (
        <div className="p-6 border-1 rounded-xl min-w-70 flex items-center gap-8 shadow-lg shadow-slate-200">
            <div>
                <Clock size={40} className="text-slate-500" />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-semibold">Total Estimated Hours</p>
                <p className="font-bold text-3xl">80h</p>

                <div className="mt-6" />

                <p className="text-sm text-slate-500 font-semibold">Total Actual Hours</p>
                <p className="font-bold text-3xl">150h</p>
            </div>
        </div>
    );
}

function TotalEstimatedAndActualCost() {
    return (
        <div className="p-6 border-1 rounded-xl min-w-70 flex items-center gap-8 shadow-lg shadow-slate-200">
            <div>
                <CircleDollarSign size={40} className="text-slate-500" />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-semibold">Total Estimated Cost</p>
                <p className="font-bold text-3xl">$25,000</p>

                <div className="mt-6" />

                <p className="text-sm text-slate-500 font-semibold">Total Actual Cost</p>
                <p className="font-bold text-3xl">$45,000</p>
            </div>
        </div>
    );
}