'use client';

// This is the root layout for the /admin section.
// It directly renders its children.
// The (protected) route group will handle the authenticated layout.
export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
