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
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

// Admin layout is currently not in use as all pages except login have been removed.
// It is kept for future use.
const menuItems:any[] = [
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/admin');
  };

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
            {/* Menu items removed */}
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
                  Admin
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
