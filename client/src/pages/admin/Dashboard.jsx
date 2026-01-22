import { useQuery } from '@tanstack/react-query'
import { BookOpen, FolderKanban, Newspaper, MessageSquare, TrendingUp, Users } from 'lucide-react'
import { adminApi } from '../../services/api'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center">
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
)

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getStats().then((res) => res.data),
  })

  const { data: contacts } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: () => adminApi.getContacts().then((res) => res.data),
  })

  const recentContacts = contacts?.slice(0, 5) || []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={BookOpen}
          label="Программы"
          value={isLoading ? '...' : stats?.programs || 0}
          color="bg-blue-500"
        />
        <StatCard
          icon={FolderKanban}
          label="Проекты"
          value={isLoading ? '...' : stats?.projects || 0}
          color="bg-green-500"
        />
        <StatCard
          icon={Newspaper}
          label="Новости"
          value={isLoading ? '...' : stats?.news || 0}
          color="bg-purple-500"
        />
        <StatCard
          icon={MessageSquare}
          label="Заявки"
          value={isLoading ? '...' : stats?.contacts || 0}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Последние заявки
          </h2>
          {recentContacts.length > 0 ? (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                      {contact.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(contact.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Заявок пока нет</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Обзор
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Users size={20} className="text-primary mr-3" />
                <span className="text-gray-700">Эксперты</span>
              </div>
              <span className="font-semibold">
                {isLoading ? '...' : stats?.experts || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp size={20} className="text-green-500 mr-3" />
                <span className="text-gray-700">Активных программ</span>
              </div>
              <span className="font-semibold">
                {isLoading ? '...' : stats?.activePrograms || stats?.programs || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
