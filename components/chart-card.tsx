interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function ChartCard({
  title,
  description,
  children,
}: ChartCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="w-full overflow-x-auto">
        {children}
      </div>
    </div>
  )
}
