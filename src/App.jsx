import { useState } from 'react'
import {
  Heart,
  Sparkles,
  Gift,
  Footprints,
  UtensilsCrossed,
  Gamepad2,
  CheckCircle2,
  X,
} from 'lucide-react'

const QUESTIONS = [
  {
    id: 1,
    question: 'Seamos honestos, después de meses de conocernos por amigos en común... ¿Quién dio el primer paso para que estuviéramos juntos?',
    options: [
      'Yo armé un plan maestro para conquistarte',
      'Tú en una fiesta, porque yo no me daba cuenta de nada',
      'Un amigo en común nos encerró para que habláramos',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 2,
    question: 'El día de esa famosa fiesta donde me dijiste que te llamaba la atención, ¿cuál fue mi reacción interna?',
    options: [
      'Me puse súper nervioso y no sabía qué hacer',
      'Te invité a salir ahí mismo con muchísima seguridad',
      'Me hice el difícil y te dije que lo pensaría',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 3,
    question: '¿En dónde fue el punto de encuentro exacto de nuestra primera salida oficial solos?',
    options: [
      'En el área de comida de Galerías',
      'En el estacionamiento de tu hospital',
      'En el hotel Vive Place cerca de Galerías',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 4,
    question: 'Para nuestra primera comida juntos ese día, fuimos a un lugar muy elegante y sofisticado... ¿Qué comimos?',
    options: [
      'Unos Subway',
      'Unos tacos de birria',
      'Pizza de peperoni',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 5,
    question: 'A la mañana siguiente de esa primera cita, ¿en dónde fuimos a desayunar?',
    options: [
      'En el buffet del hotel',
      'En Jugos y Chocos Tony',
      'Fuimos por unas gorditas al centro',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 6,
    question: 'Al principio de salir, jugábamos a los espías y nos escondíamos de nuestros amigos en común. ¿Por qué lo hacíamos?',
    options: [
      'Porque no sabíamos cómo iban a reaccionar',
      'Porque nos gustaba la adrenalina del peligro',
      'Porque nuestros turnos no cuadraban para verlos a todos',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 7,
    question: '¿Qué cualidad tuya me hizo darme cuenta de que habías nacido para ser enfermera?',
    options: [
      'Tu súper poder para no dormir en 24 horas',
      'Tu forma de hablar tan cálida y lo atenta que eres con todos',
      'Lo rápido que te memorizas los medicamentos',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 8,
    question: 'En nuestro primer viaje juntos a Tequila, Jalisco, había un columpio padrísimo con piso de cristal. ¿Por qué no me quise subir contigo?',
    options: [
      'Porque me dan pavor las alturas',
      'Porque había demasiada fila y nos íbamos a atrasar',
      'Porque me mareaba mucho el movimiento',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 9,
    question: 'En nuestra visita al Zoológico de Guadalajara ocurrió una pequeña tragedia financiera que no noté hasta que regresamos. ¿Qué pasó?',
    options: [
      'Perdí todo el efectivo que llevábamos para los recuerditos',
      'Perdí mi tarjeta de Banorte',
      'Dejé olvidada la cartera en el área de comida',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 10,
    question: 'En ese mismo viaje al zoológico, decidimos saltarnos una atracción principal para no perder tiempo formados. ¿Cuál fue?',
    options: [
      'El acuario de los tiburones',
      'El teleférico que cruza todo el parque',
      'El recorrido en jeep del Safari',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 11,
    question: 'A cambio de no formarnos en esa atracción, preferimos ir a ver pingüinos, monos capuchinos y a unos animales que estaban muy a gusto medio dormidos. ¿Cuáles eran?',
    options: [
      'Los leones',
      'Los tigres blancos',
      'Los osos pardos',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 12,
    question: 'Nuestro viaje a las Grutas de Tolantongo estuvo increíble, pero terminamos comiendo casi todo el tiempo en el restaurante por una razón muy específica. ¿Cuál?',
    options: [
      'La comida de los puestos se veía dudosa',
      'Era el único lugar que aceptaba pago con tarjeta y nos quedamos sin efectivo',
      'Era el único lugar con aire acondicionado en toda la zona',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 13,
    question: 'Cuando te llevé a la Ciudad de México, mi objetivo principal era que conocieras:',
    options: [
      'El estadio de mi equipo favorito y los museos de arte',
      'A unos tíos que no veía desde hace años',
      'Mi ciudad natal y los lugares emblemáticos como la Torre Latino',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 14,
    question: 'En ese viaje a CDMX te llevé a probar algo delicioso que lamentablemente no encontramos aquí en Aguascalientes. ¿Qué era?',
    options: [
      'El caldo de gallina y comer en Casa de Toño',
      'Las verdaderas tortas de chilaquil de esquina',
      'Unos tacos al pastor con piña de verdad',
    ],
    correctAnswerIndex: 0,
  },
]

function getDailyQuestionIndex() {
  const today = new Date()
  const start = new Date(today.getFullYear(), 0, 0)
  const diff = today - start
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  return dayOfYear % QUESTIONS.length
}

function getTodayKey() {
  const today = new Date()
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
}

function getDailyTrivia() {
  const question = QUESTIONS[getDailyQuestionIndex()]
  return {
    question: question.question,
    options: question.options.map((label, index) => ({
      id: String.fromCharCode(97 + index),
      label,
      isCorrect: index === question.correctAnswerIndex,
    })),
  }
}

const INITIAL_COUPONS = [
  {
    id: 'kit-post-turno',
    title: 'Kit Post-Turno',
    description: 'Cena lista y masaje de pies después del hospital.',
    icon: Footprints,
    redeemed: false,
  },
  {
    id: 'antojo-expres',
    title: 'Antojo Exprés',
    description: 'Vale por unos tacos de birria o gorditas sin importar el día.',
    icon: UtensilsCrossed,
    redeemed: false,
  },
  {
    id: 'player-1',
    title: 'Player 1',
    description: 'Tú eliges el próximo juego cooperativo.',
    icon: Gamepad2,
    redeemed: false,
  },
]

function Header({ readyCount }) {
  return (
    <header className="mb-6 flex items-start justify-between sm:mb-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-400">
          App privada de pareja
        </p>
        <h1 className="mt-1 text-3xl font-bold text-gray-800 sm:text-4xl">
          La Bóveda de Vicky
        </h1>
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
        <Gift className="h-5 w-5 text-red-400" aria-hidden="true" />
        <div className="text-right leading-tight">
          <span className="block text-xs text-gray-500">Listos para usar</span>
          <span className="font-bold text-gray-800">{readyCount}</span>
        </div>
      </div>
    </header>
  )
}

function DailyChallenge({ trivia, status, selectedOptionId, wrongOptionId, onAnswer }) {
  return (
    <section className="mb-8 sm:mb-10" aria-labelledby="reto-titulo">
      <div className="rounded-3xl bg-gradient-to-br from-rose-200 to-red-300 p-1 shadow-sm">
        <div className="rounded-[1.35rem] bg-white p-5 sm:p-7">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-red-400" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wider text-rose-400">
              Reto del día
            </span>
          </div>

          {status === 'active' ? (
            <div className="animate-fade-in-up">
              <h2
                id="reto-titulo"
                className="mb-5 text-xl font-bold leading-snug text-gray-800 sm:text-2xl"
              >
                {trivia.question}
              </h2>

              <div className="flex flex-col gap-3">
                {trivia.options.map((option) => {
                  const isSelected = selectedOptionId === option.id
                  const isWrong = wrongOptionId === option.id

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onAnswer(option)}
                      className={[
                        'w-full rounded-xl border px-4 py-3.5 text-left font-medium transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2',
                        isWrong
                          ? 'border-red-300 bg-red-50 text-red-600'
                          : isSelected
                            ? 'border-rose-300 bg-rose-50 text-gray-800'
                            : 'border-stone-200 bg-stone-50 text-gray-700 hover:border-rose-300 hover:bg-rose-50',
                        'active:scale-[0.98]',
                      ].join(' ')}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>

              {wrongOptionId ? (
                <p className="mt-4 text-center text-sm font-medium text-red-500">
                  Esa no es, inténtalo otra vez 💕
                </p>
              ) : null}
            </div>
          ) : (
            <div className="animate-fade-in-up py-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                <CheckCircle2 className="h-9 w-9 text-red-400" aria-hidden="true" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-800">¡Correcto!</h2>
              <p className="mb-5 text-gray-600">
                Has desbloqueado el premio del día. Ya puedes canjearlo cuando
                quieras.
              </p>
              <div className="rounded-2xl bg-rose-50 p-4">
                <p className="font-semibold text-gray-800">Premio desbloqueado</p>
                <p className="text-sm text-gray-600">Un detallito especial para relajarte después del turno</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CouponCard({ coupon, onRedeem }) {
  const Icon = coupon.icon

  return (
    <article
      className={[
        'flex flex-col rounded-3xl bg-white p-5 shadow-sm transition-all duration-300',
        'hover:shadow-md hover:-translate-y-0.5',
        coupon.redeemed ? 'opacity-70 grayscale' : '',
      ].join(' ')}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-red-400">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="mb-1 text-lg font-bold text-gray-800">{coupon.title}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">
        {coupon.description}
      </p>

      <button
        type="button"
        disabled={coupon.redeemed}
        onClick={() => onRedeem(coupon.id)}
        className={[
          'mt-auto w-full rounded-xl py-3 font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2',
          coupon.redeemed
            ? 'cursor-not-allowed bg-stone-200 text-stone-500'
            : 'bg-red-400 text-white shadow-sm hover:bg-red-500 active:scale-95',
        ].join(' ')}
      >
        {coupon.redeemed ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Canjeado
          </span>
        ) : (
          'Canjear'
        )}
      </button>
    </article>
  )
}

function CouponGrid({ coupons, onRedeem }) {
  return (
    <section aria-labelledby="cupones-titulo">
      <div className="mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-400" aria-hidden="true" />
        <h2 id="cupones-titulo" className="text-lg font-bold text-gray-800">
          Mis Cupones Desbloqueados
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} onRedeem={onRedeem} />
        ))}
      </div>
    </section>
  )
}

function RedeemModal({ coupon, onClose, onConfirm }) {
  if (!coupon) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        className="animate-scale-in w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-red-400">
            <Gift className="h-5 w-5" aria-hidden="true" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-stone-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <h3
          id="modal-titulo"
          className="mb-2 text-xl font-bold text-gray-800"
        >
          ¿Segura que quieres usar este cupón ahora?
        </h3>
        <p className="mb-6 text-gray-600">
          Vas a canjear: <span className="font-semibold text-gray-800">{coupon.title}</span>
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-stone-200 bg-white py-3 font-semibold text-gray-700 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-400 py-3 font-semibold text-white shadow-sm transition-all hover:bg-red-500 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
          >
            Sí, canjear
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const dailyTrivia = getDailyTrivia()
  const todayKey = getTodayKey()

  const [triviaStatus, setTriviaStatus] = useState(() => {
    if (typeof window === 'undefined') return 'active'
    const saved = window.localStorage.getItem('triviaStatus')
    const savedDate = window.localStorage.getItem('triviaDate')
    return saved === 'success' && savedDate === todayKey ? 'success' : 'active'
  })
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [wrongOptionId, setWrongOptionId] = useState(null)
  const [coupons, setCoupons] = useState(INITIAL_COUPONS)
  const [modalCouponId, setModalCouponId] = useState(null)

  const readyCount = coupons.filter((c) => !c.redeemed).length
  const modalCoupon = coupons.find((c) => c.id === modalCouponId) || null

  const handleAnswer = (option) => {
    setSelectedOptionId(option.id)

    if (option.isCorrect) {
      setWrongOptionId(null)
      window.setTimeout(() => {
        setTriviaStatus('success')
        window.localStorage.setItem('triviaStatus', 'success')
        window.localStorage.setItem('triviaDate', todayKey)
      }, 400)
    } else {
      setWrongOptionId(option.id)
    }
  }

  const openRedeem = (id) => setModalCouponId(id)
  const closeModal = () => setModalCouponId(null)
  const sendRedemptionNotification = async (coupon) => {
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_NOTIFY_API_KEY,
        },
        body: JSON.stringify({ cupon: coupon.title }),
      })

      if (!response.ok) {
        // No bloqueamos el canje si la notificación falla, pero lo registramos.
        console.error('Error enviando notificación:', await response.text())
      }
    } catch (error) {
      console.error('Error de red al enviar notificación:', error)
    }
  }

  const confirmRedeem = () => {
    const coupon = coupons.find((c) => c.id === modalCouponId)
    setCoupons((prev) =>
      prev.map((c) => (c.id === modalCouponId ? { ...c, redeemed: true } : c))
    )
    setModalCouponId(null)

    if (coupon) {
      sendRedemptionNotification(coupon)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-md sm:max-w-lg">
        <Header readyCount={readyCount} />

        <main>
          <DailyChallenge
            trivia={dailyTrivia}
            status={triviaStatus}
            selectedOptionId={selectedOptionId}
            wrongOptionId={wrongOptionId}
            onAnswer={handleAnswer}
          />

          <CouponGrid coupons={coupons} onRedeem={openRedeem} />
        </main>

        <footer className="mt-10 text-center text-xs text-gray-400">
          Hecho con amor para Vicky 💕
        </footer>
      </div>

      {modalCouponId ? (
        <RedeemModal
          coupon={modalCoupon}
          onClose={closeModal}
          onConfirm={confirmRedeem}
        />
      ) : null}
    </div>
  )
}

export default App
