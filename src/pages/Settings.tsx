import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="text-muted-foreground mt-1">
          Конфигурация системы и интеграций
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Правила аудита</CardTitle>
          <CardDescription>
            Настройка весов компонентов оценки качества
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="script-weight">Вес скрипта (%)</Label>
              <Input id="script-weight" type="number" defaultValue="40" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic-weight">Вес темы (%)</Label>
              <Input id="topic-weight" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lexicon-penalty">Штраф за лексику</Label>
              <Input id="lexicon-penalty" type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resolution-bonus">Бонус за решение</Label>
              <Input id="resolution-bonus" type="number" defaultValue="10" />
            </div>
          </div>
          <Button>Сохранить правила</Button>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Интеграции</CardTitle>
          <CardDescription>
            Подключение к внешним системам
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="space-y-1">
              <p className="font-medium">Телефония API</p>
              <p className="text-sm text-muted-foreground">Автоматическая загрузка записей</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="space-y-1">
              <p className="font-medium">Webhook уведомления</p>
              <p className="text-sm text-muted-foreground">Отправка событий во внешние системы</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="space-y-1">
              <p className="font-medium">Slack интеграция</p>
              <p className="text-sm text-muted-foreground">Уведомления о критичных звонках</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Политика хранения</CardTitle>
          <CardDescription>
            Управление данными и резервным копированием
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="retention">Срок хранения записей (дней)</Label>
            <Input id="retention" type="number" defaultValue="90" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="backup">Частота резервного копирования</Label>
            <Input id="backup" defaultValue="Ежедневно в 02:00" disabled />
          </div>
          <Button variant="outline">Настроить резервное копирование</Button>
        </CardContent>
      </Card>
    </div>
  );
}
