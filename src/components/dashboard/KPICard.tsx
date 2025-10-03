import { TrendingUp, TrendingDown, Phone, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { KPICard as KPICardType } from '@/types';

const iconMap = {
  TrendingUp,
  Phone,
  AlertCircle,
  Clock,
};

export function KPICard({ title, value, change, trend, icon }: KPICardType) {
  const Icon = iconMap[icon as keyof typeof iconMap] || Phone;
  
  return (
    <Card className="shadow-card hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            
            {change !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span className={cn(
                  'text-sm font-medium',
                  trend === 'up' ? 'text-success' : 'text-destructive'
                )}>
                  {Math.abs(change)}%
                </span>
                <span className="text-xs text-muted-foreground">vs прошлая неделя</span>
              </div>
            )}
          </div>
          
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
