'use client';
import Link from 'next/link';
import {
  LayoutDashboard,
  Settings,
  FileText,
  MessageSquare,
  BarChart,
  Folder,
  LogOut,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth, useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/posts', icon: FileText, label: 'Blog Posts' },
  { href: '/admin/projects', icon: Folder, label: 'Projects' },
  { href: '/admin/analytics', icon: BarChart, label: 'Analytics' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages', badge: 8 },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  return (
    <aside className="hidden w-64 flex-col border-r bg-card sm:flex">
      <div className="flex h-20 items-center border-b px-6">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
          <span>Admin Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="px-6 mb-6">
            <div className='flex items-center gap-3'>
                <Avatar className='h-10 w-10'>
                    <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'Admin'} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sm">{user?.displayName}</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
            </div>
        </div>
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === item.href && 'bg-accent/10 text-accent font-semibold'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.badge && (
                <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className='mt-auto p-4 border-t'>
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
      </div>
    </aside>
  );
}
