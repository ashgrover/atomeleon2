"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, ChevronsUpDown, Hexagon, Home, Inbox, MoreHorizontal, Plus, Settings, SquareChartGantt } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type ProjectStatus = "active" | "completed" | "archived";

type Project = {
    id: string,
    publicId: string,
    proj_name: string,
    proj_desc: string,
    status: ProjectStatus,
    budget: number,
    start_date: Date,
    end_date: Date,
    created_at: Date,
    updated_at: Date,
    repo_url: string,
    org_id: string,
    org_public_id: string,
    org_integration_id: string,
}

export default function Panel({ orgId, projects }: { orgId: string, projects: Project[] }) {
    // Menu items.

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        <div className="bg-gray-100 border-1 flex justify-between px-5 py-6 cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span className="p-1 border-1 border-gray-400 rounded-lg"><Hexagon fill="#000" /></span><span className="font-semibold">Company Inc</span>
                                            </div>
                                            <ChevronsUpDown color="#000000" />
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="ml-2 w-55">
                                    <Link href="/home">
                                        <DropdownMenuItem>
                                            <span className="font-medium">Change Organization</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="#">
                                            <Home />
                                            <span className="font-medium">Home</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/org/${orgId}/timesheets">
                                            <Calendar />
                                            <span className="font-medium">Timesheets</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="#">
                                            <Inbox />
                                            <span className="font-medium">Contractors</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                {/* <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="#">
                                            <File />
                                            <span className="font-medium">Documents</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem> */}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {/* <Button size="sm" variant="default" className="font-bold min-w-50 mx-auto">
                                    <Link href="/org/${orgId}addproject">Add Project</Link>
                                </Button> */}
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <span className="font-bold text-slate-600">Projects</span>
                                    </SidebarMenuButton>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <SidebarMenuAction className="cursor-pointer" asChild>
                                                <Link href={`/org/${orgId}/add-project`}><Plus /></Link>
                                            </SidebarMenuAction>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Add Project
                                        </TooltipContent>
                                    </Tooltip>
                                </SidebarMenuItem>

                                <ProjectSideBarMenuItems orgId={orgId} projects={projects} />

                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="#">
                                    <Settings />
                                    <span>Settings</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarTrigger className="ml-0.5 cursor-pointer" />
                        </SidebarMenuItem>
                    </SidebarMenu>

                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    )
}



function ProjectSideBarMenuItems({ orgId, projects, }: { orgId: string, projects: Project[] }) {
    const [state, setState] = useState({ projects: [...projects], showDeleteProjectDialog: false });

    const deleteProjectFromList = (projectId: string) => {
        setState(state => ({
            ...state,
            projects: state.projects.filter(proj => proj.id !== projectId)
        }));
    }

    return (
        state.projects.map(project => (
            <ProjectSideBarMenuItem key={project.id} orgId={orgId} project={project} deleteProjectFromList={deleteProjectFromList} />
        )))
}

function ProjectSideBarMenuItem({ orgId, project, deleteProjectFromList }: {
    orgId: string,
    project: Project,
    deleteProjectFromList: (projectId: string) => void
}) {
    const [state, setState] = useState({ showDeleteProjectDialog: false });

    const onToggleDeleteProjectDialog = () => {
        setState(state => ({ ...state, showDeleteProjectDialog: !state.showDeleteProjectDialog }));
    }


    const onDelete = async (project: Project) => {
        try {
            const supabase = createSupabaseBrowserClient();

            const result = await supabase.functions.invoke("delete-project", {
                body: {
                    org_id: project.org_id,
                    proj_id: project.id
                }
            });

            if (result.error) throw result.error;

            deleteProjectFromList?.(project.id);

        } catch (err: unknown) {
            console.log(err instanceof Error ? err.message : err);
        }
        onToggleDeleteProjectDialog?.();
    }
    return (
        <div key={project.id}>
            <SidebarMenuItem className="group/item">
                <Collapsible className="group/collapsible" >
                    <SidebarMenuButton asChild className="cursor-pointer">
                        <CollapsibleTrigger>
                            <SquareChartGantt />
                            <span className="font-semibold">{project.proj_name}</span>
                            {/* <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" /> */}
                        </CollapsibleTrigger>
                    </SidebarMenuButton>

                    <CollapsibleContent>
                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild className="text-slate-600 font-medium">
                                    <Link href={`/org/${orgId}/projects/${project.id}/budget`}>Budget</Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild className="text-slate-600 font-medium">
                                    <Link href={`/org/${orgId}/projects/${project.id}/members`}>Members</Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild className="text-slate-600 font-medium">
                                    <Link href={`/org/${orgId}/projects/${project.id}/tasks`}>Tasks</Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild className="text-slate-600 font-medium">
                                    <Link href={`/org/${orgId}/projects/${project.id}/performance`}>Performance</Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        <SidebarMenuAction>
                            <MoreHorizontal />
                        </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive"
                            onClick={onToggleDeleteProjectDialog}>Delete Project</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </SidebarMenuItem>

            {state.showDeleteProjectDialog &&
                <Dialog open={true}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete Project</DialogTitle>
                        </DialogHeader>
                        <div className="font-medium">
                            Are you sure you want to delete the project? You cannot undo this action.
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={onToggleDeleteProjectDialog}>Cancel</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={() => onDelete(project)}>Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>}
        </div>
    )
}