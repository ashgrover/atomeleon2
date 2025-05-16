"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Calendar, ChevronRight, File, Home, Inbox, Plus, Settings, SquareChartGantt } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import Link from "next/link";

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
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenuButton asChild>
                        <a href="#">
                            <span className="text-base font-semibold">Atomeleon</span>
                        </a>
                    </SidebarMenuButton>
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
                                        <SidebarMenuButton asChild className="cursor-pointer">
                                            <CollapsibleTrigger>
                                                <SquareChartGantt />
                                                <span>Projects</span>
                                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                            </CollapsibleTrigger>
                                        </SidebarMenuButton>

                                        <SidebarMenuAction className="cursor-pointer" asChild>
                                            <Link href="/org/addproject"><Plus /></Link>
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
            <SidebarTrigger className="cursor-pointer" />
        </SidebarProvider>
    )
}