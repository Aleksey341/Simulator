import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2, Mail, Phone, Calendar, Eye } from 'lucide-react'
import { adminApi } from '../../services/api'
import Modal from '../../components/admin/Modal'

export default function AdminContacts() {
  const [selectedContact, setSelectedContact] = useState(null)
  const queryClient = useQueryClient()

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: () => adminApi.getContacts().then((res) => res.data),
  })

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-contacts'])
    },
  })

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      deleteMutation.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Заявки</h1>

      {contacts?.length > 0 ? (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Mail size={16} className="mr-1" />
                      {contact.email}
                    </span>
                    {contact.phone && (
                      <span className="flex items-center">
                        <Phone size={16} className="mr-1" />
                        {contact.phone}
                      </span>
                    )}
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(contact.createdAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {contact.program && (
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                        {contact.program}
                      </span>
                    </div>
                  )}
                  <p className="mt-3 text-gray-700 line-clamp-2">{contact.message}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Просмотреть"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Удалить"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <p className="text-gray-500">Заявок пока нет</p>
        </div>
      )}

      <Modal
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        title="Детали заявки"
      >
        {selectedContact && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Имя</label>
              <p className="font-medium">{selectedContact.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="text-primary hover:underline"
                >
                  {selectedContact.email}
                </a>
              </p>
            </div>
            {selectedContact.phone && (
              <div>
                <label className="text-sm text-gray-500">Телефон</label>
                <p className="font-medium">
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="text-primary hover:underline"
                  >
                    {selectedContact.phone}
                  </a>
                </p>
              </div>
            )}
            {selectedContact.program && (
              <div>
                <label className="text-sm text-gray-500">Программа</label>
                <p className="font-medium">{selectedContact.program}</p>
              </div>
            )}
            <div>
              <label className="text-sm text-gray-500">Дата</label>
              <p className="font-medium">
                {new Date(selectedContact.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Сообщение</label>
              <p className="mt-1 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                {selectedContact.message}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
