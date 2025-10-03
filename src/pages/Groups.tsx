import { useState } from 'react';
import { Plus, Filter, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Group {
  id: string;
  name: string;
  description: string;
  rules: {
    operator?: string;
    topic?: string;
    scoreMin?: number;
    scoreMax?: number;
    dateFrom?: string;
    dateTo?: string;
  };
  callsCount: number;
  avgScore: number;
}

const mockGroups: Group[] = [
  {
    id: 'g1',
    name: 'Низкие оценки',
    description: 'Звонки с оценкой ниже 60',
    rules: { scoreMax: 60 },
    callsCount: 23,
    avgScore: 45.2
  },
  {
    id: 'g2',
    name: 'Роуминг-жалобы',
    description: 'Все звонки по теме роуминг с негативным тоном',
    rules: { topic: 'роуминг' },
    callsCount: 15,
    avgScore: 62.5
  },
  {
    id: 'g3',
    name: 'Топ операторы',
    description: 'Звонки операторов с высшими оценками',
    rules: { scoreMin: 85 },
    callsCount: 42,
    avgScore: 91.3
  }
];

export default function Groups() {
  const [groups] = useState<Group[]>(mockGroups);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Группы звонков</h1>
          <p className="text-muted-foreground mt-1">
            Создавайте динамические группы для анализа
          </p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)}>
          <Plus className="h-4 w-4 mr-2" />
          Создать группу
        </Button>
      </div>

      {isCreating && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Новая группа</CardTitle>
            <CardDescription>
              Настройте правила для автоматической выборки звонков
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Название группы</Label>
              <Input placeholder="Например: Конфликтные звонки" />
            </div>

            <div className="space-y-2">
              <Label>Описание</Label>
              <Input placeholder="Краткое описание группы" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Оператор</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Все операторы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все операторы</SelectItem>
                    <SelectItem value="op1">Айгерим Нурпеис</SelectItem>
                    <SelectItem value="op2">Ерлан Касымов</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Тема</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Все темы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все темы</SelectItem>
                    <SelectItem value="roaming">Роуминг</SelectItem>
                    <SelectItem value="tariff">Тариф</SelectItem>
                    <SelectItem value="support">Техподдержка</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Минимальный балл</Label>
                <Input type="number" placeholder="0" min="0" max="100" />
              </div>

              <div className="space-y-2">
                <Label>Максимальный балл</Label>
                <Input type="number" placeholder="100" min="0" max="100" />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Отмена
              </Button>
              <Button>Создать группу</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id} className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Users className="h-8 w-8 text-primary" />
                <Badge variant="outline">{group.callsCount} звонков</Badge>
              </div>
              <CardTitle className="mt-4">{group.name}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Средний балл</div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="font-semibold">{group.avgScore}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Filter className="h-4 w-4 mr-2" />
                Открыть группу
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
