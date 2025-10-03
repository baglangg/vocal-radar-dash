import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

const complianceData = [
  { name: 'Приветствие', value: 92, target: 95 },
  { name: 'Идентификация', value: 88, target: 90 },
  { name: 'Выявление проблемы', value: 85, target: 85 },
  { name: 'Решение', value: 78, target: 80 },
  { name: 'Прощание', value: 95, target: 95 },
];

const topicsData = [
  { topic: 'Роуминг', count: 45, avgScore: 72.5, trend: 'up' },
  { topic: 'Тарифы', count: 38, avgScore: 78.3, trend: 'up' },
  { topic: 'Техподдержка', count: 52, avgScore: 85.2, trend: 'down' },
  { topic: 'Жалобы', count: 15, avgScore: 45.8, trend: 'down' },
];

export default function Audits() {
  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Аналитика аудита</h1>
        <p className="text-muted-foreground mt-1">
          Детальный анализ качества обслуживания
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Средний балл</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              78.5
              <TrendingUp className="h-5 w-5 text-success" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+2.3% за неделю</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Соответствие скрипту</CardDescription>
            <CardTitle className="text-3xl">87%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-success flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Цель: 85%
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Нарушения лексики</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              12
              <TrendingDown className="h-5 w-5 text-success" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">-15% за неделю</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Процент решения</CardDescription>
            <CardTitle className="text-3xl">82%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-warning flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Ниже цели: 85%
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compliance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compliance">Соответствие скрипту</TabsTrigger>
          <TabsTrigger value="topics">Анализ по темам</TabsTrigger>
          <TabsTrigger value="lexicon">Лексические нарушения</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Выполнение этапов скрипта</CardTitle>
              <CardDescription>
                Сравнение фактических показателей с целевыми значениями
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--primary))" name="Фактический" />
                  <Bar dataKey="target" fill="hsl(var(--muted))" name="Целевой" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Производительность по темам</CardTitle>
              <CardDescription>
                Количество звонков и средний балл по каждой теме
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicsData.map((topic) => (
                  <div key={topic.topic} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        {topic.topic}
                        {topic.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {topic.count} звонков
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{topic.avgScore}</div>
                      <div className="text-sm text-muted-foreground">Средний балл</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lexicon" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Топ нарушений</CardTitle>
              <CardDescription>
                Наиболее часто встречающиеся запрещенные слова
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Слово 1', 'Слово 2', 'Слово 3'].map((word, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Badge variant="destructive">Высокий</Badge>
                      <span className="font-mono">[цензура]</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {5 - i} раз за неделю
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Посмотреть все нарушения
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
