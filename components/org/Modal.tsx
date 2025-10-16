"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function Modal({ className, title, onClose, children }: { className?: string, title?: string, onClose?: () => void, children: React.ReactNode }) {
    const router = useRouter();

    const onCloseDialog = () => {
        if (onClose) {
            onClose();
            return;
        }
        router.back();
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={onCloseDialog}>
            <DialogContent className={className} onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}