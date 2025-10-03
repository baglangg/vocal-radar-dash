import { KPICard } from '@/components/dashboard/KPICard';
import { CallsChart } from '@/components/dashboard/CallsChart';
import { ScoreChart } from '@/components/dashboard/ScoreChart';
import { CallsTable } from '@/components/calls/CallsTable';
import { mockKPIs, mockChartData, mockCalls } from '@/lib/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Обзор показателей call-центра за сегодня
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, idx) => (
          <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
            <KPICard {...kpi} />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CallsChart data={mockChartData.callsPerDay} />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <ScoreChart data={mockChartData.avgScorePerOperator} />
        </div>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Последние звонки</h2>
          <p className="text-sm text-muted-foreground">Актуальные данные в режиме реального времени</p>
        </div>
        <CallsTable calls={mockCalls} />
      </div>
    </div>
  );
}
