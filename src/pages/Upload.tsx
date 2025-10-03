import { useState } from 'react';
import { Upload as UploadIcon, FileAudio, X, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface QueuedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'done' | 'failed';
  progress: number;
}

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [queue, setQueue] = useState<QueuedFile[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: QueuedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
    }));

    setQueue(prev => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setQueue(prev => prev.map(f => 
        f.id === id ? { ...f, progress } : f
      ));

      if (progress >= 100) {
        clearInterval(interval);
        setQueue(prev => prev.map(f => 
          f.id === id ? { ...f, status: 'processing' } : f
        ));
        
        // Simulate processing
        setTimeout(() => {
          setQueue(prev => prev.map(f => 
            f.id === id ? { ...f, status: 'done', progress: 100 } : f
          ));
        }, 2000);
      }
    }, 300);
  };

  const removeFile = (id: string) => {
    setQueue(prev => prev.filter(f => f.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Загрузка аудио</h1>
        <p className="text-muted-foreground mt-1">
          Добавьте аудиозаписи для обработки и анализа
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Выбор файлов</CardTitle>
          <CardDescription>
            Поддерживаемые форматы: MP3, WAV, MP4. Максимальный размер: 200 MB
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={cn(
              'border-2 border-dashed rounded-lg p-12 text-center transition-colors',
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              Перетащите файлы сюда
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              или
            </p>
            <Button asChild>
              <label className="cursor-pointer">
                Выбрать файлы
                <input
                  type="file"
                  multiple
                  accept=".mp3,.wav,.mp4"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="operator">Оператор</Label>
              <Select>
                <SelectTrigger id="operator">
                  <SelectValue placeholder="Выберите оператора" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="op1">Айгерим Нурпеис</SelectItem>
                  <SelectItem value="op2">Ерлан Касымов</SelectItem>
                  <SelectItem value="op3">Динара Омарова</SelectItem>
                  <SelectItem value="op4">Нурлан Садыков</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile">Профиль обработки</Label>
              <Select defaultValue="full">
                <SelectTrigger id="profile">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Полный (транскрипт + аудит)</SelectItem>
                  <SelectItem value="quick">Быстрый (только транскрипт)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="external-id">Внешний ID</Label>
              <Input id="external-id" placeholder="KC-2024-XXX" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Теги</Label>
              <Input id="tags" placeholder="Через запятую" />
            </div>
          </div>
        </CardContent>
      </Card>

      {queue.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Очередь загрузки</CardTitle>
            <CardDescription>
              {queue.filter(f => f.status === 'done').length} из {queue.length} файлов обработано
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queue.map(file => (
                <div key={file.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileAudio className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {formatSize(file.size)}
                      </Badge>
                    </div>
                    
                    {file.status !== 'done' && (
                      <Progress value={file.progress} className="h-1" />
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-1">
                      {file.status === 'uploading' && 'Загрузка...'}
                      {file.status === 'processing' && 'Обработка...'}
                      {file.status === 'done' && 'Готово'}
                      {file.status === 'failed' && 'Ошибка'}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {file.status === 'uploading' && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                    {file.status === 'processing' && <Loader2 className="h-5 w-5 animate-spin text-warning" />}
                    {file.status === 'done' && <Check className="h-5 w-5 text-success" />}
                    {file.status === 'failed' && (
                      <Button size="icon" variant="ghost" onClick={() => removeFile(file.id)}>
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
