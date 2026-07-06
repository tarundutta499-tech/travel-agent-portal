'use client';

import { motion } from 'framer-motion';
import { Package, Tag, CheckSquare, Edit2 } from 'lucide-react';
import { mockActivityLog } from '@/lib/mock-data';
import { formatDate, formatRelativeTime } from '@/lib/utils';

const entityIcons: Record<string, React.ElementType> = { package: Package, deal: Tag, approval: CheckSquare };

export default function ActivityPage() {
  const grouped = mockActivityLog.reduce<Record<string, typeof mockActivityLog>>((acc, log) => {
    const date = formatDate(log.timestamp);
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {});

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Activity Log</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Full audit trail of all actions taken in the portal.</p>
      </motion.div>

      <div className="card p-6 max-w-3xl">
        {Object.entries(grouped).map(([date, logs]) => (
          <div key={date} className="mb-8 last:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1" style={{ background: 'var(--border-color)' }} />
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>{date}</span>
              <div className="h-px flex-1" style={{ background: 'var(--border-color)' }} />
            </div>
            <div className="space-y-4">
              {logs.map((log, i) => {
                const Icon = entityIcons[log.entity] || Edit2;
                return (
                  <motion.div key={log.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(15,76,129,0.1)' }}><Icon size={14} style={{ color: '#0F4C81' }} /></div>
                      {i < logs.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: 'var(--border-color)' }} />}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${log.userName}`} alt={log.userName} className="w-5 h-5 rounded-full" />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{log.userName}</span>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{log.action}</span>
                      </div>
                      <p className="text-sm mt-0.5" style={{ color: '#0F4C81' }}>{log.entityName}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{formatRelativeTime(log.timestamp)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
