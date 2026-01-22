import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { adminApi } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/admin/Modal'

export default function AdminExperts() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const queryClient = useQueryClient()

  const { data: experts, isLoading } = useQuery({
    queryKey: ['admin-experts'],
    queryFn: () => adminApi.getExperts().then((res) => res.data),
  })

  const createMutation = useMutation({
    mutationFn: adminApi.createExpert,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-experts'])
      closeModal()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminApi.updateExpert(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-experts'])
      closeModal()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteExpert,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-experts'])
    },
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const columns = [
    {
      key: 'photo',
      label: '',
      render: (item) => (
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          {item.photo ? (
            <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              {item.name?.charAt(0)}
            </div>
          )}
        </div>
      ),
    },
    { key: 'name', label: 'Имя' },
    { key: 'position', label: 'Должность' },
  ]

  const openModal = (item = null) => {
    setEditingItem(item)
    if (item) {
      reset(item)
    } else {
      reset({ name: '', position: '', bio: '', photo: '' })
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
    if (window.confirm('Вы уверены, что хотите удалить этого эксперта?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Эксперты</h1>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus size={20} className="mr-2" />
          Добавить эксперта
        </button>
      </div>

      <DataTable
        columns={columns}
        data={experts || []}
        loading={isLoading}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingItem ? 'Редактировать эксперта' : 'Новый эксперт'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Имя *</label>
            <input
              type="text"
              className={`input ${errors.name ? 'border-red-500' : ''}`}
              {...register('name', { required: 'Обязательное поле' })}
            />
          </div>

          <div>
            <label className="label">Должность</label>
            <input type="text" className="input" {...register('position')} />
          </div>

          <div>
            <label className="label">Биография</label>
            <textarea className="input min-h-[100px]" {...register('bio')} />
          </div>

          <div>
            <label className="label">URL фото</label>
            <input type="text" className="input" {...register('photo')} />
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
