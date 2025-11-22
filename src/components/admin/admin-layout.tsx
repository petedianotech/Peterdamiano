'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LogOut,
  LayoutDashboard,
  BookText,
  Mail,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ 
    children,
    pageTitle
}: { 
    children: React.ReactNode;
    pageTitle: string;
}) {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/admin');
  };
  
  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
    { href: '/admin/blog', label: 'Blog', icon: <BookText /> },
    { href: '/admin/contact', label: 'Messages', icon: <Mail /> },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Admin Panel</span>
            </div>
          </SidebarHeader>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  onClick={() => router.push(item.href)} 
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
               <h1 className="text-xl font-semibold">
                  {pageTitle}
                </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-right">
                <p className="font-semibold">{user?.displayName}</p>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="icon"
                className="hidden md:flex"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </Sidebar>
    </SidebarProvider>
  );
}
