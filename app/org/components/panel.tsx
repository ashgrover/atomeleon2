"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Calendar, ChevronDown, File, Home, Inbox, Plus, Settings, SquareChartGantt } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

type Project = {
    title: string,
    url: string
}
type State = {
    projects: Array<Project>
}

export default function Panel() {
    // Menu items.

    const [state, setState] = useState<State>({ projects: [] });

    useEffect(() => {
        const projects = [
            {
                title: "Project 1",
                url: "#"
            },
            {
                title: "Project 2",
                url: "#"
            },
            {
                title: "Project 3",
                url: "#"
            },
        ];

        setState(state => ({ ...state, projects: projects }));
    }, []);

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <p className="font-medium ml-2.5">Atomeleon</p>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="#">
                                            <Home />
                                            <span>Home</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="#">
                                            <Calendar />
                                            <span>Timesheets</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="#">
                                            <Inbox />
                                            <span>Contractors</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="#">
                                            <File />
                                            <span>Documents</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <Collapsible defaultOpen className="group/collapsible">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <CollapsibleTrigger>
                                                <SquareChartGantt />
                                                <span>Projects</span>
                                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                            </CollapsibleTrigger>
                                        </SidebarMenuButton>
                                        <SidebarMenuAction>
                                            <Plus className="cursor-pointer" />
                                        </SidebarMenuAction>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {state.projects.map(project => (
                                                    <SidebarMenuSubItem key={project.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <a href="#">
                                                                <SquareChartGantt />
                                                                <span>{project.title}</span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>

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

                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarTrigger />
        </SidebarProvider>
    )
}