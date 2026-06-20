import type { ReactNode } from 'react'

interface DashboardCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
}

export function DashboardCard({ title, value, subtitle, icon }: DashboardCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-slate-500">{title}</p>
        {icon && (
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center [&>svg]:w-4.5 [&>svg]:h-4.5">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  )
}