import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="p-6 bg-card border-border hover:border-accent/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-serif text-foreground">{value}</p>
          {trend && (
            <p
              className={`text-sm ${
                trend.positive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {trend.positive ? '+' : ''}
              {trend.value}
            </p>
          )}
        </div>
        <div className="text-muted-foreground opacity-50">
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </Card>
  )
}
