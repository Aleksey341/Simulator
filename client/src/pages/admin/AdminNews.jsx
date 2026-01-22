import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { adminApi } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'

export default function AdminNews() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const queryClient = useQueryClient()

  const { data: news, isLoading } = useQuery({
    queryKey: ['admin-news'],
    queryFn: () => adminApi.getNews().then((res) => res.data),
  })

  const createMutation = useMutation({
    mutationFn: adminApi.createNews,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-news'])
      closeModal()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminApi.updateNews(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-news'])
      closeModal()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-news'])
    },
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const columns = [
    { key: 'title', label: 'Заголовок' },
    {
      key: 'publishedAt',
      label: 'Дата',
      render: (item) => new Date(item.publishedAt).toLocaleDateString('ru-RU'),
    },
    {
      key: 'isPublished',
      label: 'Статус',
      render: (item) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {item.isPublished ? 'Опубликовано' : 'Черновик'}
        </span>
      ),
    },
  ]

  const openModal = (item = null) => {
    setEditingItem(item)
    if (item) {
      reset({
        ...item,
        publishedAt: item.publishedAt ? item.publishedAt.split('T')[0] : '',
      })
    } else {
      reset({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        publishedAt: new Date().toISOString().split('T')[0],
        isPublished: true,
      })
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingItem(null)
    reset()
  }

  const onSubmit = (data) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Новости</h1>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus size={20} className="mr-2" />
          Добавить новость
        </button>
      </div>

      <DataTable
        columns={columns}
        data={news || []}
        loading={isLoading}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingItem ? 'Редактировать новость' : 'Новая новость'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Заголовок *</label>
            <input
              type="text"
              className={`input ${errors.title ? 'border-red-500' : ''}`}
              {...register('title', { required: 'Обязательное поле' })}
            />
          </div>

          <div>
            <label className="label">Краткое описание</label>
            <textarea className="input min-h-[80px]" {...register('excerpt')} />
          </div>

          <div>
            <label className="label">Содержание</label>
            <textarea className="input min-h-[150px]" {...register('content')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Дата публикации</label>
              <input type="date" className="input" {...register('publishedAt')} />
            </div>
            <div>
              <label className="label">URL изображения</label>
              <input type="text" className="input" {...register('image')} />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              {...register('isPublished')}
            />
            <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
              Опубликовать
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={closeModal} className="btn-outline">
              Отмена
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="btn-primary"
            >
              {createMutation.isPending || updateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
