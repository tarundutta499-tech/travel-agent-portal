'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Bell, Search, Sun, Moon, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { mockCurrentUser } from '@/lib/mock-data';

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roleColors: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-700',
    manager: 'bg-blue-100 text-blue-700',
    agent: 'bg-green-100 text-green-700',
  };

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center gap-3 px-5 h-14"
      style={{
        left: 'var(--sidebar-width, 240px)',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Search */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <div
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg"
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
          }}
        >
          <Search size={15} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search packages, deals, hotels..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-inter)' }}
          />
          <kbd
            className="text-xs px-1.5 py-0.5 rounded"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)',
              fontSize: '11px',
            }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="btn-ghost"
          style={{ padding: '8px' }}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn-ghost relative"
            style={{ padding: '8px' }}
          >
            <Bell size={17} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: '#E5484D' }}
            />
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 top-full mt-2 w-80 rounded-xl overflow-hidden z-50"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow-hover)',
              }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Notifications
                </p>
              </div>
              {[
                { text: 'Manali Adventure package pending your review', time: '2h ago', dot: '#F5A623' },
                { text: 'New Year deal has reached 287 redemptions', time: '5h ago', dot: '#00A676' },
                { text: 'Rahul Mehta submitted a new package for approval', time: '1d ago', dot: '#0F4C81' },
              ].map((n, i) => (
                <div
                  key={i}
                  className="px-4 py-3 flex gap-3 items-start cursor-pointer"
                  style={{ borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: n.dot }}
                  />
                  <div>
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{n.text}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
            style={{ transition: 'background 0.15s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <img
              src={mockCurrentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockCurrentUser.name}`}
              alt={mockCurrentUser.name}
              className="w-7 h-7 rounded-full"
            />
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium leading-none" style={{ color: 'var(--text-primary)' }}>
                {mockCurrentUser.name.split(' ')[0]}
              </p>
              <p className="text-xs mt-0.5 capitalize" style={{ color: 'var(--text-muted)' }}>
                {mockCurrentUser.role}
              </p>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-50"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow-hover)',
              }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{mockCurrentUser.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{mockCurrentUser.email}</p>
                <span
                  className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium capitalize ${roleColors[mockCurrentUser.role]}`}
                >
                  {mockCurrentUser.role}
                </span>
              </div>
              {[
                { label: 'Profile', icon: User },
                { label: 'Settings', icon: Settings },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left"
                  style={{ color: 'var(--text-secondary)', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
              <div className="border-t" style={{ borderColor: 'var(--border-color)' }}>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm"
                  style={{ color: '#E5484D', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(229,72,77,0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
