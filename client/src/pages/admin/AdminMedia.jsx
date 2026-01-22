import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Upload, Trash2, Copy, Check, Image as ImageIcon } from 'lucide-react'
import { adminApi } from '../../services/api'

export default function AdminMedia() {
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState(null)
  const fileInputRef = useRef(null)
  const queryClient = useQueryClient()

  const { data: media, isLoading } = useQuery({
    queryKey: ['admin-media'],
    queryFn: () => adminApi.getMedia().then((res) => res.data),
  })

  const uploadMutation = useMutation({
    mutationFn: adminApi.uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-media'])
      setUploading(false)
    },
    onError: () => {
      setUploading(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-media'])
    },
  })

  const handleUpload = async (e) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    uploadMutation.mutate(formData)
    e.target.value = ''
  }

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот файл?')) {
      deleteMutation.mutate(id)
    }
  }

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Медиафайлы</h1>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn-primary"
        >
          <Upload size={20} className="mr-2" />
          {uploading ? 'Загрузка...' : 'Загрузить'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : media?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden"
            >
              <img
                src={item.url}
                alt={item.filename}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button
                  onClick={() => copyUrl(item.url)}
                  className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100"
                  title="Копировать URL"
                >
                  {copied === item.url ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50"
                  title="Удалить"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Медиафайлы не загружены</p>
          <p className="text-sm text-gray-400 mt-1">
            Нажмите "Загрузить" чтобы добавить изображения
          </p>
        </div>
      )}
    </div>
  )
}
