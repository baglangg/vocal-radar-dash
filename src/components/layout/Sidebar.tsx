import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Phone, 
  Upload, 
  Users, 
  FileCheck,
  Settings,
  Ticket,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Звонки', href: '/calls', icon: Phone },
  { name: 'Загрузка', href: '/upload', icon: Upload },
  { name: 'Клиенты', href: '/clients', icon: Users },
  { name: 'Аудит', href: '/audits', icon: FileCheck },
  { name: 'Группы', href: '/groups', icon: Layers },
  { name: 'Тикеты', href: '/tickets', icon: Ticket },
  { name: 'Настройки', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Phone className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold">AI Call Center</span>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">АН</span>
          </div>
          <div className="flex-1 text-sm">
            <p className="font-medium">Админ</p>
            <p className="text-xs text-muted-foreground">admin@kcell.kz</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
