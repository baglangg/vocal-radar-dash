import { useState } from 'react';
import { UserPlus, Search, MoreVertical, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'operator';
  organization: string;
  callsCount?: number;
  avgScore?: number;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Айгерим Нурпеис',
    email: 'aigerim.n@kazakhtelecom.kz',
    role: 'operator',
    organization: 'kcell',
    callsCount: 156,
    avgScore: 85.2,
    status: 'active'
  },
  {
    id: 'u2',
    name: 'Ерлан Касымов',
    email: 'erlan.k@kazakhtelecom.kz',
    role: 'operator',
    organization: 'kcell',
    callsCount: 142,
    avgScore: 72.8,
    status: 'active'
  },
  {
    id: 'u3',
    name: 'Динара Омарова',
    email: 'dinara.o@kazakhtelecom.kz',
    role: 'supervisor',
    organization: 'kazakhtelecom',
    status: 'active'
  },
  {
    id: 'u4',
    name: 'Нурлан Садыков',
    email: 'nurlan.s@activ.kz',
    role: 'operator',
    organization: 'activ',
    callsCount: 98,
    avgScore: 88.7,
    status: 'active'
  },
  {
    id: 'u5',
    name: 'Асель Бектасова',
    email: 'asel.b@kazakhtelecom.kz',
    role: 'admin',
    organization: 'kazakhtelecom',
    status: 'active'
  }
];

export default function Users() {
  const [users] = useState<User[]>(mockUsers);

  const getRoleBadge = (role: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      admin: { variant: 'default', label: 'Администратор' },
      supervisor: { variant: 'secondary', label: 'Супервизор' },
      operator: { variant: 'outline', label: 'Оператор' }
    };
    const config = variants[role];
    
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Пользователи</h1>
          <p className="text-muted-foreground mt-1">
            Управление учетными записями и правами доступа
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Пригласить пользователя
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Всего пользователей</CardDescription>
            <CardTitle className="text-3xl">{users.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Операторов</CardDescription>
            <CardTitle className="text-3xl">
              {users.filter(u => u.role === 'operator').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Активных сегодня</CardDescription>
            <CardTitle className="text-3xl">
              {users.filter(u => u.status === 'active').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <CardTitle>Все пользователи</CardTitle>
            <div className="relative md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Поиск по имени или email..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Пользователь</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Организация</TableHead>
                <TableHead>Звонков</TableHead>
                <TableHead>Ср. балл</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell className="capitalize">{user.organization}</TableCell>
                  <TableCell>{user.callsCount || '—'}</TableCell>
                  <TableCell>
                    {user.avgScore ? (
                      <span className="font-semibold">{user.avgScore}</span>
                    ) : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status === 'active' ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Изменить роль
                        </DropdownMenuItem>
                        <DropdownMenuItem>Редактировать</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Деактивировать
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
