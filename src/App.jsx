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

const TRIVIA = {
  question: '¿Cuál es la skin que siempre elijo en Fortnite?',
  options: [
    { id: 'a', label: 'Peely', isCorrect: true },
    { id: 'b', label: 'Renegade Raider', isCorrect: false },
    { id: 'c', label: 'Midas', isCorrect: false },
  ],
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

function DailyChallenge({ status, selectedOptionId, wrongOptionId, onAnswer }) {
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
                {TRIVIA.question}
              </h2>

              <div className="flex flex-col gap-3">
                {TRIVIA.options.map((option) => {
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
  const [triviaStatus, setTriviaStatus] = useState('active')
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
      window.setTimeout(() => setTriviaStatus('success'), 400)
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
