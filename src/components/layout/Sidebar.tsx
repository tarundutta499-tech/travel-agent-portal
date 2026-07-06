'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Tag,
  Hotel,
  BarChart3,
  CheckSquare,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plane,
  MapPin,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Packages', href: '/dashboard/packages', icon: Package },
  { label: 'Deals & Offers', href: '/dashboard/deals', icon: Tag },
  { label: 'Approvals', href: '/dashboard/approvals', icon: CheckSquare, badge: 1 },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Hotels', href: '/dashboard/hotels', icon: Hotel },
  { label: 'Destinations', href: '/dashboard/destinations', icon: MapPin },
  { label: 'Activity Log', href: '/dashboard/activity', icon: Activity },
  { label: 'Team', href: '/dashboard/team', icon: Users },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="sidebar"
      style={{ width: collapsed ? '64px' : '240px' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--sidebar-border)]">
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0F4C81, #00A676)' }}
        >
          <Plane size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-poppins font-700 text-sm leading-none" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)', fontWeight: 700 }}>
              TravelOps
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Portal
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('sidebar-link', isActive && 'active')}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className="flex-shrink-0 text-xs font-600 px-1.5 py-0.5 rounded-full text-white"
                        style={{ background: '#F5A623', fontWeight: 600, fontSize: '11px' }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-3 border-t border-[var(--sidebar-border)]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn-ghost w-full justify-center"
          style={{ padding: '8px' }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
