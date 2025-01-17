import { FC, ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./ui/sidebar";
import {
  ChartNoAxesCombined,
  DollarSign,
  Home,
  SquareChartGantt,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

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

const menuItems = [
  {
    title: "Project Management",
    subMenu: projectManagementItems,
  },
  {
    title: "Website Management",
    subMenu: websiteManagementItems,
  },
];

const AppSidebar = () => {
  const router = useRouter();

  const isMenuActive = (url: string) => {
    return router.asPath === url;
  };

  return (
    <Sidebar>
      <SidebarHeader className="text-center font-bold">
        SeorangAbi.
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

        {menuItems.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.subMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isMenuActive(item.url)}
                    >
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
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          onClick={() => {
            signOut({
              callbackUrl: "/",
            });
          }}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <Head>
        <title>Studio SeorangAbi</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </Head>

      <AppSidebar />

      <main className="p-6 w-full mx-auto max-w-screen-2xl relative">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
