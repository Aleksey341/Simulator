import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { contactApi } from '../services/api'

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const mutation = useMutation({
    mutationFn: contactApi.submit,
    onSuccess: () => {
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    },
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Контакты
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Свяжитесь с нами, чтобы получить консультацию по программам
            обучения или задать интересующий вас вопрос.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Контактная информация
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Адрес</h3>
                  <p className="text-gray-600">
                    119571, г. Москва, пр. Вернадского, д. 82
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Телефон</h3>
                  <a
                    href="tel:+74955551234"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    +7 (495) 555-12-34
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a
                    href="mailto:info@simulator.ru"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    info@simulator.ru
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Режим работы</h3>
                  <p className="text-gray-600">
                    Пн-Пт: 9:00 - 18:00<br />
                    Сб-Вс: выходной
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 aspect-video bg-gray-200 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.3896!2d37.5095!3d55.6769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQwJzM3LjIiTiAzN8KwMzAnMzQuMiJF!5e0!3m2!1sru!2sru!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Оставить заявку
            </h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Заявка отправлена!
                </h3>
                <p className="mt-2 text-gray-600">
                  Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="label">Ваше имя *</label>
                  <input
                    type="text"
                    className={`input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Введите ваше имя"
                    {...register('name', { required: 'Обязательное поле' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    className={`input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="example@mail.ru"
                    {...register('email', {
                      required: 'Обязательное поле',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Некорректный email',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Телефон</label>
                  <input
                    type="tel"
                    className="input"
                    placeholder="+7 (___) ___-__-__"
                    {...register('phone')}
                  />
                </div>

                <div>
                  <label className="label">Интересующая программа</label>
                  <select className="input" {...register('program')}>
                    <option value="">Выберите программу</option>
                    <option value="government">Государственное управление</option>
                    <option value="municipal">Муниципальное управление</option>
                    <option value="regional">Региональное развитие</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="label">Сообщение *</label>
                  <textarea
                    className={`input min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Расскажите о ваших целях и задачах..."
                    {...register('message', { required: 'Обязательное поле' })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="btn-primary w-full"
                >
                  {mutation.isPending ? (
                    'Отправка...'
                  ) : (
                    <>
                      Отправить заявку
                      <Send size={20} className="ml-2" />
                    </>
                  )}
                </button>

                {mutation.isError && (
                  <p className="text-center text-red-500">
                    Произошла ошибка. Попробуйте позже.
                  </p>
                )}

                <p className="text-sm text-gray-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="/privacy" className="text-primary hover:underline">
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
