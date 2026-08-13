import { useState } from 'react'
import { X, Gift, CheckCircle2, Lock } from 'lucide-react'

const TABS = [
  { id: 'available', label: 'Disponibles', icon: Gift },
  { id: 'redeemed', label: 'Canjeados', icon: CheckCircle2 },
  { id: 'locked', label: 'Bloqueados', icon: Lock },
]

export default function Sidebar({ isOpen, onClose, coupons, onRedeem, canRedeemToday, newlyUnlockedId, CouponCard }) {
  const [activeTab, setActiveTab] = useState('available')

  const available = coupons.filter((c) => !c.locked && !c.redeemed)
  const redeemed = coupons.filter((c) => c.redeemed)
  const locked = coupons.filter((c) => c.locked && !c.redeemed)

  const tabCounts = {
    available: available.length,
    redeemed: redeemed.length,
    locked: locked.length,
  }

  const currentCoupons = activeTab === 'available' ? available : activeTab === 'redeemed' ? redeemed : locked

  return (
    <>
      <div
        className={[
          'fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-stone-50 shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Mis Cupones"
      >
        <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-4 sm:px-5">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">Mis Cupones</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 transition-colors hover:bg-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex border-b border-stone-200 bg-white" aria-label="Secciones de cupones">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex flex-1 flex-col items-center gap-1 px-2 py-3 text-xs font-semibold transition-colors sm:text-sm',
                  isActive
                    ? 'border-b-2 border-red-400 text-red-500'
                    : 'text-gray-500 hover:text-gray-700',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                <span>{tab.label}</span>
                <span className={[
                  'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                  isActive ? 'bg-red-100 text-red-500' : 'bg-stone-100 text-gray-500',
                ].join(' ')}>
                  {tabCounts[tab.id]}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4">
          {currentCoupons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-stone-200">
                {activeTab === 'available' ? (
                  <Gift className="h-7 w-7 text-stone-400" aria-hidden="true" />
                ) : activeTab === 'redeemed' ? (
                  <CheckCircle2 className="h-7 w-7 text-stone-400" aria-hidden="true" />
                ) : (
                  <Lock className="h-7 w-7 text-stone-400" aria-hidden="true" />
                )}
              </div>
              <p className="text-sm text-gray-500">
                {activeTab === 'available'
                  ? 'Responde correctamente el reto del día para desbloquear cupones.'
                  : activeTab === 'redeemed'
                    ? 'Aún no has canjeado ningún cupón.'
                    : '¡Todos los cupones han sido descubiertos!'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {currentCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  onRedeem={activeTab === 'available' ? onRedeem : () => {}}
                  isNewlyUnlocked={coupon.id === newlyUnlockedId}
                  canRedeemToday={canRedeemToday}
                />
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
