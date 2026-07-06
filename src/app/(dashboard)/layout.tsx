import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export const metadata: Metadata = {
  title: { template: '%s | TravelOps', default: 'Dashboard' },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '240px', transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
        <Topbar />
        <main className="flex-1 pt-14 overflow-auto">
          <div className="p-6 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
