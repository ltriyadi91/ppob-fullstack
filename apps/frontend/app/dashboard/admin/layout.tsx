import { Sidebar } from '@/components/DashboardSidebar/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sidebar>{children}</Sidebar>;
}
