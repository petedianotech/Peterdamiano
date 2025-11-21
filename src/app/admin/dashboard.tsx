'use client';
import {
  Book,
  Home,
  MessageSquare,
  Package2,
  PanelLeft,
  Search,
  Map,
} from 'lucide-react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function AdminLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Verifying Admin Access...</p>
      </div>
    </div>
  );
}

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (isUserLoading) {
      return; 
    }

    if (!user) {
      router.push('/login');
      return;
    }

    const checkAdminStatus = async () => {
      // The user is loaded and authenticated at this point.
      // Firestore might still be initializing, so we check for it.
      if (!firestore) {
        // Keep showing the loading skeleton while Firestore initializes.
        setIsVerifying(true);
        return;
      }
      
      try {
        const adminDocRef = doc(firestore, 'roles_admin', user.uid);
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          // User has an admin role document, so they are an admin.
          setIsAdmin(true);
        } else {
          // User does not have an admin role document.
          // Let's check if they should be the first admin.
          const adminRolesCollection = collection(firestore, 'roles_admin');
          const adminQuerySnapshot = await getDocs(adminRolesCollection);
          
          if (adminQuerySnapshot.empty) {
            // The 'roles_admin' collection is empty. This is the first user.
            // Automatically grant them 'owner' role.
            await setDoc(adminDocRef, {
              registeredAt: new Date().toISOString(),
              username: user.displayName || user.email, 
              //'role' has been removed from the schema, username added as a placeholder
            });
            setIsAdmin(true);
          } else {
             // Collection is not empty, and the user is not in it. Deny access.
            console.error("Access Denied: User is not an administrator.");
            router.push('/login?error=auth');
          }
        }
      } catch (error) {
        console.error("Error verifying admin status:", error);
        // On any error, deny access for safety.
        router.push('/login?error=auth');
      } finally {
        // Verification process is complete.
        setIsVerifying(false);
      }
    };

    checkAdminStatus();
    
  }, [user, isUserLoading, router, firestore]);

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  if (isUserLoading || isVerifying) {
    return <AdminLoadingSkeleton />;
  }

  // After verification, if the user is still not an admin, they would have been redirected.
  // This final check ensures we don't render the dashboard for a non-admin.
  if (!isAdmin) {
     return <AdminLoadingSkeleton />;
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">My Portfolio</span>
          </Link>
          <Link
            href="/admin"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Dashboard</span>
          </Link>
          <Link
            href="/admin/timeline"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <Map className="h-5 w-5" />
            <span className="sr-only">Timeline</span>
          </Link>
          <Link
            href="/admin/blog"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <Book className="h-5 w-5" />
            <span className="sr-only">Blog</span>
          </Link>
          <Link
            href="/admin/messages"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">My Portfolio</span>
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/timeline"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Map className="h-5 w-5" />
                  Timeline
                </Link>
                <Link
                  href="/admin/blog"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Book className="h-5 w-5" />
                  Blog
                </Link>
                <Link
                  href="/admin/messages"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <MessageSquare className="h-5 w-5" />
                  Messages
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src={user?.photoURL || ''}
                    alt={user?.displayName || 'User'}
                  />
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) ||
                      user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.displayName || user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}

    