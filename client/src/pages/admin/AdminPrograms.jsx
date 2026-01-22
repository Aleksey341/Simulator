import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { adminApi } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'

export default function AdminPrograms() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const queryClient = useQueryClient()

  const { data: programs, isLoading } = useQuery({
    queryKey: ['admin-programs'],
    queryFn: () => adminApi.getPrograms().then((res) => res.data),
  })

  const createMutation = useMutation({
    mutationFn: adminApi.createProgram,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-programs'])
      closeModal()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminApi.updateProgram(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-programs'])
      closeModal()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-programs'])
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const columns = [
    { key: 'title', label: 'Название' },
    { key: 'category', label: 'Категория' },
    { key: 'duration', label: 'Длительность' },
    {
      key: 'isActive',
      label: 'Статус',
      render: (item) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {item.isActive ? 'Активна' : 'Неактивна'}
        </span>
      ),
    },
  ]

  const openModal = (item = null) => {
    setEditingItem(item)
    if (item) {
      reset(item)
    } else {
      reset({
        title: '',
        description: '',
        category: '',
        duration: '',
        format: '',
        price: '',
        image: '',
        isActive: true,
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
    if (window.confirm('Вы уверены, что хотите удалить эту программу?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Программы</h1>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus size={20} className="mr-2" />
          Добавить программу
        </button>
      </div>

      <DataTable
        columns={columns}
        data={programs || []}
        loading={isLoading}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingItem ? 'Редактировать программу' : 'Новая программа'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Название *</label>
            <input
              type="text"
              className={`input ${errors.title ? 'border-red-500' : ''}`}
              {...register('title', { required: 'Обязательное поле' })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="label">Описание</label>
            <textarea
              className="input min-h-[100px]"
              {...register('description')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Категория</label>
              <input type="text" className="input" {...register('category')} />
            </div>
            <div>
              <label className="label">Длительность</label>
              <input type="text" className="input" {...register('duration')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Формат</label>
              <input type="text" className="input" {...register('format')} />
            </div>
            <div>
              <label className="label">Стоимость</label>
              <input type="text" className="input" {...register('price')} />
            </div>
          </div>

          <div>
            <label className="label">URL изображения</label>
            <input type="text" className="input" {...register('image')} />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              {...register('isActive')}
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Программа активна
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
              {createMutation.isPending || updateMutation.isPending
                ? 'Сохранение...'
                : 'Сохранить'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
