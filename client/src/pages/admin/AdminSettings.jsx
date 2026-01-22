import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Save, CheckCircle } from 'lucide-react'
import { adminApi } from '../../services/api'

export default function AdminSettings() {
  const queryClient = useQueryClient()

  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => adminApi.getSettings().then((res) => res.data),
  })

  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (settings) {
      reset(settings)
    }
  }, [settings, reset])

  const updateMutation = useMutation({
    mutationFn: adminApi.updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-settings'])
    },
  })

  const onSubmit = (data) => {
    updateMutation.mutate(data)
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
        <div className="bg-white rounded-xl p-6 space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Настройки сайта</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Контактная информация
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Email</label>
                <input type="email" className="input" {...register('email')} />
              </div>
              <div>
                <label className="label">Телефон</label>
                <input type="tel" className="input" {...register('phone')} />
              </div>
              <div className="md:col-span-2">
                <label className="label">Адрес</label>
                <input type="text" className="input" {...register('address')} />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Социальные сети
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">VK</label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://vk.com/..."
                  {...register('vk')}
                />
              </div>
              <div>
                <label className="label">Telegram</label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://t.me/..."
                  {...register('telegram')}
                />
              </div>
              <div>
                <label className="label">YouTube</label>
                <input
                  type="url"
                  className="input"
                  placeholder="https://youtube.com/..."
                  {...register('youtube')}
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              SEO настройки
            </h2>
            <div className="space-y-4">
              <div>
                <label className="label">Заголовок сайта</label>
                <input type="text" className="input" {...register('siteTitle')} />
              </div>
              <div>
                <label className="label">Описание сайта</label>
                <textarea
                  className="input min-h-[100px]"
                  {...register('siteDescription')}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="border-t pt-6 flex items-center justify-between">
            {updateMutation.isSuccess && (
              <div className="flex items-center text-green-600">
                <CheckCircle size={20} className="mr-2" />
                Настройки сохранены
              </div>
            )}
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="btn-primary ml-auto"
            >
              <Save size={20} className="mr-2" />
              {updateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
