"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Calendar, ChevronRight, ChevronsUpDown, Hexagon, Home, Inbox, Plus, Settings, SquareChartGantt } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Project = {
    id: string,
    title: string,
    url: string
}
type State = {
    projects: Array<Project>
}

export default function Panel({ orgId }: { orgId: string }) {
    // Menu items.

    const [state, setState] = useState<State>({ projects: [] });

    useEffect(() => {
        const projects = [
            {
                id: "1",
                title: "Project 1",
                url: "#"
            },
            {
                id: "2",
                title: "Project 2",
                url: "#"
            },
            {
                id: "3",
                title: "Project 3",
                url: "#"
            },
        ];

        setState(state => ({ ...state, projects: projects }));
    }, []);


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
                                                <Link href="/org/${orgId}/add-project"><Plus /></Link>
                                            </SidebarMenuAction>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Add Project
                                        </TooltipContent>
                                    </Tooltip>
                                </SidebarMenuItem>

                                {state.projects.map(project => (
                                    <SidebarMenuItem key={project.id}>
                                        <Collapsible className="group/collapsible" >
                                            <SidebarMenuButton asChild className="cursor-pointer">
                                                <CollapsibleTrigger>
                                                    <SquareChartGantt />
                                                    <span className="font-semibold">{project.title}</span>
                                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
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
                                    </SidebarMenuItem>
                                ))}
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