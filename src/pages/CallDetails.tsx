import { useParams } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { mockCallDetails } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function CallDetails() {
  const { id } = useParams();
  const call = mockCallDetails;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Детали звонка</h1>
        <p className="text-muted-foreground mt-1">
          Подробный анализ записи разговора
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Audio Player */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Аудио запись</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-24 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Визуализация формы волны</p>
              </div>

              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={call.duration}
                  step={1}
                  onValueChange={(value) => setCurrentTime(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(call.duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button size="icon" variant="ghost">
                  <SkipBack className="h-5 w-5" />
                </Button>
                
                <Button 
                  size="icon" 
                  className="h-12 w-12"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                
                <Button size="icon" variant="ghost">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider defaultValue={[80]} max={100} className="flex-1" />
              </div>
            </CardContent>
          </Card>

          {/* Transcript */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Транскрипт разговора</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {call.transcript.map((utterance) => (
                  <div
                    key={utterance.id}
                    className={cn(
                      'p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors',
                      utterance.speaker === 'operator' ? 'bg-primary/5' : 'bg-card'
                    )}
                    onClick={() => setCurrentTime(utterance.start)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-20 text-xs text-muted-foreground">
                        {formatTime(utterance.start)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={utterance.speaker === 'operator' ? 'default' : 'secondary'}>
                            {utterance.speaker === 'operator' ? 'Оператор' : 'Клиент'}
                          </Badge>
                          {utterance.confidence < 0.8 && (
                            <Badge variant="outline" className="text-xs">
                              Низкая уверенность
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed">{utterance.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Audit Score */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Результат аудита</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
                  <span className="text-3xl font-bold text-success">
                    {call.auditSummary.finalScore}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Итоговый балл</p>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Соответствие скрипту</span>
                    <span className="font-medium">{call.auditSummary.scriptCompliance}%</span>
                  </div>
                  <Progress value={call.auditSummary.scriptCompliance} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Соответствие теме</span>
                    <span className="font-medium">{call.auditSummary.topicMatch}%</span>
                  </div>
                  <Progress value={call.auditSummary.topicMatch} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Штраф за лексику</span>
                    <span className="font-medium">{call.auditSummary.lexiconPenalty}%</span>
                  </div>
                  <Progress value={call.auditSummary.lexiconPenalty} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Бонус за решение</span>
                    <span className="font-medium">+{call.auditSummary.resolutionBonus}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                Повторный аудит
              </Button>
            </CardContent>
          </Card>

          {/* Issues & Strengths */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Анализ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {call.auditSummary.issues.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Проблемы</h4>
                  <div className="space-y-2">
                    {call.auditSummary.issues.map((issue, idx) => (
                      <div key={idx} className="text-sm p-2 rounded bg-destructive/10 text-destructive">
                        {issue.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {call.auditSummary.strengths.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Сильные стороны</h4>
                  <div className="space-y-2">
                    {call.auditSummary.strengths.map((strength, idx) => (
                      <div key={idx} className="text-sm p-2 rounded bg-success/10 text-success">
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Клиент</span>
                <span className="font-medium">{call.metadata.clientPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Оператор</span>
                <span className="font-medium">{call.metadata.operatorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Длительность</span>
                <span className="font-medium">{formatTime(call.metadata.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID</span>
                <span className="font-medium">{call.metadata.externalId}</span>
              </div>
              <div className="pt-2 border-t">
                <span className="text-muted-foreground block mb-2">Теги</span>
                <div className="flex flex-wrap gap-1">
                  {call.metadata.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
