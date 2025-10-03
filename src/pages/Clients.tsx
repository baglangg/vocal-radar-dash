import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, TrendingUp, AlertCircle } from 'lucide-react';
import { mockClientProfile } from '@/lib/mockData';

export default function Clients() {
  const client = mockClientProfile;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Профиль клиента</h1>
        <p className="text-muted-foreground mt-1">
          История взаимодействий и аналитика
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{client.phone}</p>
                <Badge variant={client.status === 'vip' ? 'default' : 'secondary'}>
                  {client.status === 'vip' && 'VIP клиент'}
                  {client.status === 'regular' && 'Обычный'}
                  {client.status === 'problematic' && 'Проблемный'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <p className="text-2xl font-bold">{client.callsCount}</p>
                <p className="text-xs text-muted-foreground">Звонков</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{client.avgScore}</p>
                <p className="text-xs text-muted-foreground">Ср. балл</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{client.unresolvedTickets}</p>
                <p className="text-xs text-muted-foreground">Тикетов</p>
              </div>
            </div>

            <Button className="w-full">Создать тикет</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle>История звонков</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {client.calls.map((call) => (
                <div key={call.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={call.score >= 80 ? 'default' : 'destructive'}>
                        {call.score}
                      </Badge>
                      <span className="text-sm font-medium">{call.operator}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(call.callTime).toLocaleString('ru-RU')} • {Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {call.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Открыть
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Частые темы обращений</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {client.commonTopics.map((topic, idx) => (
              <Badge key={idx} variant="outline" className="text-sm py-2 px-4">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
