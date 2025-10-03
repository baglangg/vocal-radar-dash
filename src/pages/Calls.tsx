import { useState } from 'react';
import { Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CallsTable } from '@/components/calls/CallsTable';
import { mockCalls } from '@/lib/mockData';

export default function Calls() {
  const [calls] = useState(mockCalls);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Звонки</h1>
          <p className="text-muted-foreground mt-1">
            Полный список и управление звонками
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      <CallsTable calls={calls} />
    </div>
  );
}
