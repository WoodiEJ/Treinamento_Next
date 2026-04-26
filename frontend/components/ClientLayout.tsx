"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSideBar } from "./AppSideBar"

export function ClientLayout({children}: {children: React.ReactNode}) {
    const pathname = usePathname()
    const hide = ["/login", "/cadastro"].includes(pathname)

    return (
        <SidebarProvider>
            <div className="flex w-full">
                {!hide && <AppSideBar/>}
                <main className="w-full">
                    {!hide && <SidebarTrigger/>}
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}