import { useNavigate } from 'react-router-dom';
import { Play, FileText, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Call } from '@/types';
import { cn } from '@/lib/utils';

interface CallsTableProps {
  calls: Call[];
}

export function CallsTable({ calls }: CallsTableProps) {
  const navigate = useNavigate();

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  const getScoreVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Время</TableHead>
            <TableHead>Клиент</TableHead>
            <TableHead>Оператор</TableHead>
            <TableHead>Длительность</TableHead>
            <TableHead>Балл</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Теги</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow 
              key={call.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(`/calls/${call.id}`)}
            >
              <TableCell className="font-medium">
                {formatTime(call.callTime)}
              </TableCell>
              <TableCell>{call.phone}</TableCell>
              <TableCell>{call.operator}</TableCell>
              <TableCell>{formatDuration(call.duration)}</TableCell>
              <TableCell>
                <Badge 
                  variant={getScoreVariant(call.score)}
                  className={cn(
                    'font-semibold',
                    call.score >= 80 && 'bg-success text-success-foreground',
                    call.score >= 60 && call.score < 80 && 'bg-warning text-warning-foreground'
                  )}
                >
                  {call.score.toFixed(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {call.status === 'processed' && 'Обработан'}
                  {call.status === 'processing' && 'Обработка...'}
                  {call.status === 'queued' && 'В очереди'}
                  {call.status === 'failed' && 'Ошибка'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {call.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {call.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{call.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/calls/${call.id}`);
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
