'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader } from "@/components/ui/sidebar";
import { LayoutDashboard, Car, ShoppingCart, Settings, Users, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";

const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Carros", url: "/carros", icon: Car },
    { title: "Vendas", url: "/vendas", icon: ShoppingCart },
    { title: "Empregados", url: "/empregados", icon: UserCog },
    { title: "Clientes", url: "/clientes", icon: Users },
    { title: "Configurações", url: "/configuracoes", icon: Settings }
]

export function AppSideBar() {
    const router = useRouter()

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-border">
                <h1 className="font-bold text-2xl">Car Seller</h1>
                <p className="text-muted-foreground">Gerenciando vendas</p>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton onClick={() => router.push(item.url)}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}