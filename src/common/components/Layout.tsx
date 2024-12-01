import { FC, ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  //   SidebarTrigger,
} from "./ui/sidebar";
import {
  ChartNoAxesCombined,
  DollarSign,
  Home,
  SquareChartGantt,
  Users,
} from "lucide-react";
import Link from "next/link";

const projectManagementItems = [
  {
    title: "Statistics",
    url: "/admin/project-management",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Projects",
    url: "/admin/project-management/projects",
    icon: SquareChartGantt,
  },
  {
    title: "Teams",
    url: "/admin/project-management/teams",
    icon: Users,
  },
  {
    title: "Payroll",
    url: "/admin/project-management/payroll",
    icon: DollarSign,
  },
];

const websiteManagementItems = [
  {
    title: "Statistics",
    url: "/admin/website-management",
    icon: ChartNoAxesCombined,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="text-center font-bold">
        Seorangabi.
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Project Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projectManagementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Website Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {websiteManagementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-6 w-full mx-auto max-w-screen-xl">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
