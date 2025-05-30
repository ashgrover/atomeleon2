"use client";

import TimeEntries from "@/app/org/components/TimeEntries";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EntriesInterceptedPage({ }) {
    const router = useRouter();

    const onCloseDialog = () => {
        router.back();
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={onCloseDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Title</DialogTitle>
                    <DialogDescription>
                        Description
                    </DialogDescription>
                </DialogHeader>
                <TimeEntries />
            </DialogContent>
        </Dialog>
    )
}