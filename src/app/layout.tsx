import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle,
  LayoutDashboard,
  Newspaper,
  ShieldAlert,
  User,
} from 'lucide-react';
import './globals.css';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'MarketSafe Lite',
  description: 'An AI-powered app to protect against financial scams.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar
            variant="inset"
            collapsible="icon"
            className="group-data-[variant=inset]:bg-transparent"
          >
            <SidebarHeader>
              <div className="flex h-8 items-center gap-2">
                <Logo className="size-6 text-primary" />
                <span className="text-lg font-semibold text-sidebar-foreground">
                  MarketSafe
                </span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Report Scam">
                    <Link href="/report">
                      <ShieldAlert />
                      <span>Report Scam</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Summarize News">
                    <Link href="/summarize">
                      <Newspaper />
                      <span>Summarize News</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Verify Legitimacy">
                    <Link href="/verify">
                      <CheckCircle />
                      <span>Verify Legitimacy</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Education">
                    <Link href="/education">
                      <BookOpen />
                      <span>Education</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Profile">
                    <Link href="/profile">
                      <User />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:h-16 md:px-6">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Dashboard</h1>
              </div>
            </header>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
