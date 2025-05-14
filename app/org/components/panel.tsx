"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

export default function Panel() {
    // Menu items.
    const items = [
        {
            title: "Home",
            url: "#",
            icon: Home,
        },
        {
            title: "Contractors",
            url: "#",
            icon: Inbox,
        },
        {
            title: "Timesheets",
            url: "#",
            icon: Calendar,
        },
        {
            title: "Projects",
            url: "#",
            icon: Search,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
    ]

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
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarTrigger />
        </SidebarProvider>
    )
}