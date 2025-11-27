import { LayoutDashboard, Zap, BarChart3 } from "lucide-react";
import logoMarisol from "@/assets/logo_marisol.svg";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Resumen General", url: "/", icon: LayoutDashboard },
  { title: "Consumo por Equipos", url: "/equipos", icon: Zap },
  { title: "Comparativas Mensuales", url: "/comparativas", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        {/* Header/Logo */}
        <div className="flex items-center gap-2 px-4 py-6 border-b border-sidebar-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg">
            <img src={logoMarisol} alt="SyncMotic Logo" className="h-10 w-10 object-contain" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                SyncMotic
              </span>
              <span className="text-xs text-muted-foreground">Marisol Zariquiey</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer info */}
        {!isCollapsed && (
          <div className="mt-auto px-4 py-6 border-t border-sidebar-border">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Dashboard de monitoreo energético para optimización y sostenibilidad
              </p>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-muted-foreground">Sistema activo</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
