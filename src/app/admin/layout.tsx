
'use client';

// This layout is intentionally minimal.
// It renders the children directly, which for the /admin route is the login page.
// All other admin pages have been removed as per the user's request.
export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
