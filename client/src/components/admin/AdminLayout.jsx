import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  Newspaper,
  Users,
  MessageSquare,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Программы', href: '/admin/programs', icon: BookOpen },
  { name: 'Проекты', href: '/admin/projects', icon: FolderKanban },
  { name: 'Новости', href: '/admin/news', icon: Newspaper },
  { name: 'Эксперты', href: '/admin/experts', icon: Users },
  { name: 'Заявки', href: '/admin/contacts', icon: MessageSquare },
  { name: 'Медиафайлы', href: '/admin/media', icon: Image },
  { name: 'Настройки', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-primary transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
            <Link to="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">РС</span>
              </div>
              <span className="text-white font-semibold">Админ-панель</span>
            </Link>
            <button
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/admin'}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={20} className="mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="ml-3">
                <div className="text-white font-medium">{user?.name || 'Admin'}</div>
                <div className="text-gray-400 text-sm">{user?.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              Выйти
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <Link
                to="/"
                className="ml-4 flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <ChevronLeft size={20} className="mr-1" />
                На сайт
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
