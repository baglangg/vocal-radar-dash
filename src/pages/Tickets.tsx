import { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Ticket {
  id: string;
  title: string;
  callId: string;
  clientPhone: string;
  operator: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  closedAt?: string;
}

const mockTickets: Ticket[] = [
  {
    id: 't1',
    title: 'Конфликт с клиентом — нецензурная лексика',
    callId: 'c4',
    clientPhone: '+7 701 234 5678',
    operator: 'Айгерим Нурпеис',
    status: 'open',
    priority: 'high',
    createdAt: '2024-10-03T10:45:00Z'
  },
  {
    id: 't2',
    title: 'Нарушение скрипта — пропущено приветствие',
    callId: 'c2',
    clientPhone: '+7 777 555 1234',
    operator: 'Ерлан Касымов',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-10-03T09:45:00Z'
  },
  {
    id: 't3',
    title: 'Проблема не решена — требуется эскалация',
    callId: 'c1',
    clientPhone: '+7 701 234 5678',
    operator: 'Айгерим Нурпеис',
    status: 'closed',
    priority: 'low',
    createdAt: '2024-10-02T14:20:00Z',
    closedAt: '2024-10-03T09:15:00Z'
  }
];

export default function Tickets() {
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTickets = tickets.filter(t => 
    statusFilter === 'all' || t.status === statusFilter
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      open: { variant: 'destructive', icon: AlertCircle },
      in_progress: { variant: 'default', icon: Clock },
      closed: { variant: 'outline', icon: CheckCircle }
    };
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status === 'open' ? 'Открыт' : status === 'in_progress' ? 'В работе' : 'Закрыт'}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge className={colors[priority as keyof typeof colors]}>
        {priority === 'high' ? 'Высокий' : priority === 'medium' ? 'Средний' : 'Низкий'}
      </Badge>
    );
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Тикеты</h1>
        <p className="text-muted-foreground mt-1">
          Управление проблемами и нарушениями
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Открытые тикеты</CardDescription>
            <CardTitle className="text-3xl">
              {tickets.filter(t => t.status === 'open').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>В работе</CardDescription>
            <CardTitle className="text-3xl">
              {tickets.filter(t => t.status === 'in_progress').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Закрыто сегодня</CardDescription>
            <CardTitle className="text-3xl">
              {tickets.filter(t => t.status === 'closed').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <CardTitle>Все тикеты</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Поиск..." className="pl-8" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="open">Открыт</SelectItem>
                  <SelectItem value="in_progress">В работе</SelectItem>
                  <SelectItem value="closed">Закрыт</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Оператор</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Создан</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    {ticket.title}
                  </TableCell>
                  <TableCell>{ticket.clientPhone}</TableCell>
                  <TableCell>{ticket.operator}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(ticket.createdAt).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
