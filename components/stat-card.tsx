interface StatCardProps {
  title: string
  value: number | string
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'amber' | 'red'
}

export function StatCard({ title, value, icon, color = 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">
            {title}
          </p>
          <p className="text-3xl font-semibold text-foreground">{value}</p>
        </div>
        {icon && (
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        )}
      </div>
    </div>
  )
}
