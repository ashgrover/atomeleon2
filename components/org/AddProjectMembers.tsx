"use client";

import { Button } from "@/components/ui/button";
import { Check, Plus, Search } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/org/Modal";
import { Input } from "@/components/ui/input";

export default function AddProjectMembers({ }) {
    const [state, setState] = useState({ isDialogOpen: false })

    const toggleModal = (e) => {
        e?.stopPropagation();
        setState(state => ({ ...state, isDialogOpen: !state.isDialogOpen }));
    }

    return (
        <div>
            <Button className="w-[145px] font-semibold" onClick={toggleModal}><Plus strokeWidth={3} /> Add Members</Button>
            {!state.isDialogOpen ? null :
                <Modal title="Add Members" className="sm:max-w-2xl" onClose={() => toggleModal(null)}>
                    <div>
                        <Input type="text" placeholder="Search for members..."
                            startIcon={<Search className="text-gray-400" size={18} />} />

                        <div className="mt-8 px-5 flex flex-col gap-2 overflow-auto max-h-[calc(100vh-350px)]">
                            {new Array(5).fill(0).map((i, index) => (
                                <div key={index} className="border-t-1 border-gray-200">
                                    <div className="hover:bg-slate-100 mt-2 py-3 px-2 rounded-md cursor-pointer flex items-center justify-between">
                                        <div>
                                            <span className="bg-gray-200 p-2 rounded-2xl mr-2 font-medium">JD</span>
                                            <span className="font-semibold text-sm">John Doe</span>
                                        </div>
                                        <span><Check size={20} /></span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 mb-10 flex gap-3 justify-end">
                            <Button variant="secondary" className="w-35" onClick={toggleModal}>Cancel</Button>
                            <Button className="w-35 bg-sky-500 font-semibold">Add Members</Button>
                        </div>

                    </div>
                </Modal>
            }

        </div>
    )
}