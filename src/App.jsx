import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Heart,
  Sparkles,
  Gift,
  UtensilsCrossed,
  Gamepad2,
  CheckCircle2,
  X,
  Star,
  Music,
  BookOpen,
  Sunrise,
  ShoppingBag,
  IceCream,
  Soup,
  Moon,
  Tv,
  Film,
  Plane,
  Compass,
  Building2,
  Droplets,
  EyeOff,
  CalendarX,
  Users,
  Smile,
  Lock,
  Flame,
  ChevronUp,
  ChevronDown,
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
    question: 'El día de esa famosa fiesta donde me dijiste que te llamaba la atención, ¿cómo reaccioné?',
    options: [
      'Me puse súper nervioso y no sabía qué hacer',
      'Te invité a salir ahí mismo con muchísima seguridad',
      'Me hice el difícil y te dije que lo pensaría',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 3,
    question: '¿Dónde quedamos para nuestra primera salida oficial solos?',
    options: [
      'En el área de comida de Galerías',
      'En el estacionamiento de tu hospital',
      'En el hotel Vive Place cerca de Galerías',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 4,
    question: 'Nuestra primera comida juntos fue en un lugar bien fancy... ¿qué pedimos?',
    options: [
      'Unos Subway',
      'Unos tacos de birria',
      'Pizza de peperoni',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 5,
    question: 'Al día siguiente de nuestra primera cita, ¿dónde desayunamos?',
    options: [
      'En el buffet del hotel',
      'En Jugos y Chocos Tony',
      'Fuimos por unas gorditas al centro',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 6,
    question: 'Cuando empezamos a salir, andábamos de espías escondiéndonos de nuestros amigos. ¿Por qué?',
    options: [
      'Porque no sabíamos cómo iban a reaccionar',
      'Porque nos gustaba la adrenalina del peligro',
      'Porque nuestros turnos no cuadraban para verlos a todos',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 7,
    question: '¿Qué es lo tuyo que me hizo pensar "esta morra nació para ser enfermera"?',
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
    question: 'En el Zoológico de Guadalajara me pasó una tragedia financiera y no me di cuenta hasta que regresamos. ¿Qué se me perdió?',
    options: [
      'Perdí todo el efectivo que llevábamos para los recuerditos',
      'Perdí mi tarjeta de Banorte',
      'Dejé olvidada la cartera en el área de comida',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 10,
    question: 'En ese mismo viaje al zoológico nos brincamos una atracción porque no queríamos hacer fila. ¿Cuál?',
    options: [
      'El acuario de los tiburones',
      'El teleférico que cruza todo el parque',
      'El recorrido en jeep del Safari',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 11,
    question: 'Como no hicimos fila, fuimos a ver pingüinos, monos capuchinos y otros bichos dormilones. ¿Cuáles?',
    options: [
      'Los leones',
      'Los tigres blancos',
      'Los osos pardos',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 12,
    question: 'En Tolantongo comimos casi todo el tiempo en el restaurante por una razón bien específica. ¿Cuál?',
    options: [
      'La comida de los puestos se veía dudosa',
      'Era el único lugar que aceptaba pago con tarjeta y nos quedamos sin efectivo',
      'Era el único lugar con aire acondicionado en toda la zona',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 13,
    question: 'Cuando te llevé a CDMX, lo que más quería era que conocieras...',
    options: [
      'El estadio de mi equipo favorito y los museos de arte',
      'A unos tíos que no veía desde hace años',
      'Mi ciudad natal y los lugares emblemáticos como la Torre Latino',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 14,
    question: 'En CDMX te llevé a comer algo que no encontramos en Aguas. ¿Qué fue?',
    options: [
      'El caldo de gallina y comer en Casa de Toño',
      'Las verdaderas tortas de chilaquil de esquina',
      'Unos tacos al pastor con piña de verdad',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 15,
    question: 'Casi no estamos en casa por el trabajo, pero cuando tenemos tiempo juntos, ¿cómo nos vestimos para estar relajados?',
    options: [
      'Andar en pijama todo el día',
      'Estar sin ropa',
      'Usar ropa deportiva súper holgada',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 16,
    question: 'Cuando jugamos juntos en modo cooperativo, ¿cuáles son nuestros juegos?',
    options: [
      'Fortnite, Overcooked y LEGO Marvel',
      'Dead by Daylight, Halo y Gears of War',
      'Mario Kart, Smash Bros y Minecraft',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 17,
    question: 'Si apagamos las consolas y sacamos juegos de mesa, ¿cuál es nuestro combo infalible?',
    options: [
      'Monopoly, Jenga y Scrabble',
      'Ajedrez, Lotería y Basta',
      'Dominó, UNO y Conecta 4',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 18,
    question: 'A veces me pongo a jugar solito cosas como Spider-Man, Resident Evil o Assassins Creed. ¿Tú qué haces mientras?',
    options: [
      'Te pones a jugar con tu tablet o a ver una serie que te gusta',
      'Te quedas dormida a los 10 minutos en el sillón',
      'Me das instrucciones de cómo pasar los niveles',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 19,
    question: '¿Por qué empezamos a ver Malcolm el de enmedio juntos?',
    options: [
      'Porque siempre la pasaban en la tele a la hora de cenar',
      'Porque tú me la recomendaste, ya que yo nunca la pude ver completa de pequeño',
      'Porque yo te rogué que la viéramos desde el capítulo uno',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 20,
    question: 'Había otra serie de comedia que tú me recomendaste y ahora es de mis favoritas. ¿Cuál?',
    options: [
      'The Office',
      'Friends',
      'The Big Bang Theory',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 21,
    question: 'En general, ¿cómo describirías nuestra dinámica de pareja?',
    options: [
      'Trabajamos mucho, pero nuestro mayor placer es llegar a casa a relajarnos juntos',
      'Nos la pasamos planeando fiestas y salidas con amigos cada fin de semana',
      'Somos súper fitness y nos la pasamos en el gimnasio o haciendo deporte',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 22,
    question: 'El día que te pedí matrimonio fue en el concierto de qué artista?',
    options: [
      'Bad Bunny',
      'Feid',
      'Karol G',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 23,
    question: '¿A qué ciudad viajamos para ese concierto?',
    options: [
      'Monterrey',
      'Ciudad de México',
      'Guadalajara',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 24,
    question: 'Yo estaba bien nervioso cuando te pedí matrimonio, pero se me ocurrió algo rápido para grabar el momento. ¿Qué hice?',
    options: [
      'Llevé un tripié escondido en la chamarra',
      'Le pedí a una persona que estaba ahí que grabara el momento',
      'Pagué un paquete VIP que incluía fotógrafo',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 25,
    question: 'Al día siguiente de comprometernos fuimos a desayunar a un lugar bien rico. ¿A dónde?',
    options: [
      'A La Casa de Toño',
      'A Los Chilaquiles',
      'Al buffet del hotel',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 26,
    question: 'Cuando pedimos Rappi porque no queremos cocinar, ¿de dónde pedimos usualmente?',
    options: [
      "McDonald's, KFC o Burger King",
      'Tacos Oficina, Sushi Roll o Terraza Italiana',
      'Puras ensaladas y jugos verdes',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 27,
    question: 'En la planeación de la boda me puse bien nerd y armé una app para llevar el control. ¿Cómo la bauticé?',
    options: [
      'Boda Mi Amochito y Aldo',
      'Pagos Bodorrio',
      'Wedding Tracker Pro',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 28,
    question: '¿Qué otra cosa nos encanta hacer juntos aparte de viajar y comer?',
    options: [
      'Irnos de antro todos los viernes',
      'Jugar videojuegos e ir al cine',
      'Entrenar pesas todos los días',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 29,
    question: 'Desde esa fiesta donde tú diste el primer paso, ¿qué fue lo que más me atrapó de ti?',
    options: [
      'Que me ganabas en el UNO',
      'Tu corazón enorme y tu forma de ser tan noble y amable',
      'Que te gustaba exactamente la misma música que a mí',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 30,
    question: 'Al final de todo esto, ¿cuál es la mejor parte de abrir esta Bóveda?',
    options: [
      'Tener la razón en todas las preguntas',
      'Recordar que seguimos siendo el mejor equipo',
      'Que yo te prepare de cenar hoy',
    ],
    correctAnswerIndex: 1,
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

function getYesterdayKey() {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function isYesterday(dateKey) {
  return dateKey === getYesterdayKey()
}

function isToday(dateKey) {
  return dateKey === getTodayKey()
}

function safeParseJSON(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
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
    id: 'masaje-express',
    title: 'Masaje Express',
    description: '15 minutos de masaje donde tú elijas.',
    icon: Sparkles,
    redeemed: false,
    locked: true,
  },
  {
    id: 'cena-velas',
    title: 'Cena a la Luz de Velas',
    description: 'Yo preparo la cena y el ambiente especial.',
    icon: UtensilsCrossed,
    redeemed: false,
    locked: true,
  },
  {
    id: 'dia-mimos',
    title: 'Día de Mimoss',
    description: 'Un día entero de abrazos, besos y atención.',
    icon: Heart,
    redeemed: false,
    locked: true,
  },
  {
    id: 'cita-sorpresa',
    title: 'Cita Sorpresa',
    description: 'Yo planeo una salida sorpresa para nosotros.',
    icon: Sparkles,
    redeemed: false,
    locked: true,
  },
  {
    id: 'noche-estrellas',
    title: 'Noche de Estrellas',
    description: 'Película juntos con palomitas y cobijas.',
    icon: Star,
    redeemed: false,
    locked: true,
  },
  {
    id: 'baile-sala',
    title: 'Baile en la Sala',
    description: 'Bailamos nuestras canciones favoritas en casa.',
    icon: Music,
    redeemed: false,
    locked: true,
  },
  {
    id: 'poema-carta',
    title: 'Poema o Carta',
    description: 'Te escribo algo bonito a mano.',
    icon: BookOpen,
    redeemed: false,
    locked: true,
  },
  {
    id: 'despertar-juntos',
    title: 'Despertar Juntos',
    description: 'Desayuno en la cama un día que elijas.',
    icon: Sunrise,
    redeemed: false,
    locked: true,
  },
  {
    id: 'antojo-expres',
    title: 'Antojo Exprés',
    description: 'Vale por tacos, gorditas o lo que se te antoje.',
    icon: UtensilsCrossed,
    redeemed: false,
    locked: true,
  },
  {
    id: 'rappi-libre',
    title: 'Rappi Libre',
    description: 'Pido lo que quieras por Rappi sin reclamos.',
    icon: ShoppingBag,
    redeemed: false,
    locked: true,
  },
  {
    id: 'postre-sorpresa',
    title: 'Postre Sorpresa',
    description: 'Vamos por un postre a algún lugar especial.',
    icon: IceCream,
    redeemed: false,
    locked: true,
  },
  {
    id: 'subway-lujo',
    title: 'Subway de Lujo',
    description: 'Nuestra cena fancy favorita, unos Subway.',
    icon: UtensilsCrossed,
    redeemed: false,
    locked: true,
  },
  {
    id: 'desayuno-favorito',
    title: 'Desayuno Favorito',
    description: 'Yo preparo tu desayuno favorito en casa.',
    icon: Sunrise,
    redeemed: false,
    locked: true,
  },
  {
    id: 'comida-reconfortante',
    title: 'Comida Reconfortante',
    description: 'Preparo tu platillo favorito para consentirte.',
    icon: Soup,
    redeemed: false,
    locked: true,
  },
  {
    id: 'cena-post-turno',
    title: 'Cena Post-Turno',
    description: 'Cena lista cuando llegues del hospital.',
    icon: Moon,
    redeemed: false,
    locked: true,
  },
  {
    id: 'player-1',
    title: 'Player 1',
    description: 'Tú eliges el próximo juego cooperativo.',
    icon: Gamepad2,
    redeemed: false,
    locked: true,
  },
  {
    id: 'juegos-mesa',
    title: 'Noche de Juegos de Mesa',
    description: 'Dominó, UNO y Conecta 4 hasta tarde.',
    icon: Gamepad2,
    redeemed: false,
    locked: true,
  },
  {
    id: 'maraton-malcolm',
    title: 'Maratón Malcolm',
    description: 'Capítulos de Malcolm el de enmedio juntos.',
    icon: Tv,
    redeemed: false,
    locked: true,
  },
  {
    id: 'maraton-bbt',
    title: 'Maratón Big Bang',
    description: 'Capítulos de The Big Bang Theory juntos.',
    icon: Tv,
    redeemed: false,
    locked: true,
  },
  {
    id: 'cine-casa',
    title: 'Cine en Casa',
    description: 'Película a tu elección con snacks incluidos.',
    icon: Film,
    redeemed: false,
    locked: true,
  },
  {
    id: 'tarde-videojuegos',
    title: 'Tarde de Videojuegos',
    description: 'Jugamos lo que tú quieras juntos.',
    icon: Gamepad2,
    redeemed: false,
    locked: true,
  },
  {
    id: 'viaje-sorpresa',
    title: 'Viaje Sorpresa',
    description: 'Un viajecito corto a donde tú elijas.',
    icon: Plane,
    redeemed: false,
    locked: true,
  },
  {
    id: 'dia-aventura',
    title: 'Día de Aventura',
    description: 'Un día visitando un lugar nuevo que no conozcamos.',
    icon: Compass,
    redeemed: false,
    locked: true,
  },
  {
    id: 'zoologico-round-2',
    title: 'Zoológico Round 2',
    description: 'Otra visita al zoológico, esta vez sin perder tarjetas.',
    icon: Smile,
    redeemed: false,
    locked: true,
  },
  {
    id: 'cdmx-tour',
    title: 'CDMX Tour',
    description: 'Un día recorriendo lugares emblemáticos.',
    icon: Building2,
    redeemed: false,
    locked: true,
  },
  {
    id: 'tolantongo-relax',
    title: 'Tolantongo Relax',
    description: 'Otro día de aguas termales y relajación.',
    icon: Droplets,
    redeemed: false,
    locked: true,
  },
  {
    id: 'modo-espia',
    title: 'Modo Espía',
    description: 'Un plan secreto solo para nosotros.',
    icon: EyeOff,
    redeemed: false,
    locked: true,
  },
  {
    id: 'dia-sin-compromisos',
    title: 'Día sin Compromisos',
    description: 'Un día completo a tu manera, sin planes.',
    icon: CalendarX,
    redeemed: false,
    locked: true,
  },
  {
    id: 'mejor-equipo',
    title: 'Mejor Equipo',
    description: 'Recordamos por qué seguimos siendo el mejor equipo.',
    icon: Users,
    redeemed: false,
    locked: true,
  },
  {
    id: 'anillo-promesa',
    title: 'Anillo de Promesa',
    description: 'Un gesto que refuerce nuestro compromiso.',
    icon: Heart,
    redeemed: false,
    locked: true,
  },
]

function generateConfettiParticles() {
  const shapes = ['❤️', '💕', '✨', '💖', '🌸', '•', '·']
  return Array.from({ length: 18 }, (_, index) => ({
    id: index,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    left: `${Math.random() * 100}%`,
    size: `${0.75 + Math.random() * 1}rem`,
    delay: `${Math.random() * 0.8}s`,
    duration: `${2.2 + Math.random() * 1.2}s`,
    color: ['#fb7185', '#f43f5e', '#f97316', '#f472b6'][Math.floor(Math.random() * 4)],
  }))
}

function ConfettiBurst() {
  const particles = useMemo(() => generateConfettiParticles(), [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="animate-float-down absolute top-0 select-none"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            color: p.color,
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  )
}

function RomanticConfetti({ show }) {
  if (!show) return null
  return <ConfettiBurst />
}

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value)
  const prevValueRef = useRef(value)

  useEffect(() => {
    const prevValue = prevValueRef.current
    if (prevValue === value) return

    const startTime = performance.now()
    const duration = 500
    const startValue = prevValue
    const delta = value - startValue

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - (1 - progress) ** 3
      const current = Math.round(startValue + delta * ease)
      setDisplay(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
    prevValueRef.current = value
  }, [value])

  return <span>{display}</span>
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 4000)
    return () => window.clearTimeout(timeout)
  }, [onClose])

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-in-up fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl bg-gray-800 px-4 py-3 text-sm font-medium text-white shadow-lg"
    >
      {message}
    </div>
  )
}

function Header({ readyCount, streak, bestStreak }) {
  return (
    <header className="mb-6 sm:mb-8">
      <h1 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">
        La Bóveda de Mi Amochito
      </h1>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
            <Flame
              className={[
                'h-6 w-6 text-orange-500',
                streak > 0 ? 'animate-pulse-soft' : '',
              ].join(' ')}
              aria-hidden="true"
            />
            <Heart className="absolute right-1 top-1 h-3 w-3 fill-red-500 text-red-500" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <span className="block text-xs text-gray-500">Racha</span>
            <span className="font-bold text-gray-800">
              <AnimatedNumber value={streak} /> días
            </span>
            <span className="block text-[10px] text-gray-400">
              Mejor: <AnimatedNumber value={bestStreak} /> días
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
            <Gift className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <span className="block text-xs text-gray-500">Listos para usar</span>
            <span className="font-bold text-gray-800">
              <AnimatedNumber value={readyCount} />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

function DailyChallenge({ trivia, status, selectedOptionId, wrongOptionId, onAnswer, showConfetti }) {
  return (
    <section className="relative mb-8 sm:mb-10" aria-labelledby="reto-titulo">
      <RomanticConfetti show={showConfetti} />
      <div className="rounded-3xl bg-gradient-to-br from-rose-200 to-red-300 p-1 shadow-sm transition-shadow duration-300 hover:shadow-md">
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
                      disabled={selectedOptionId !== null}
                      onClick={() => onAnswer(option)}
                      className={[
                        'w-full rounded-xl border px-4 py-3.5 text-left font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2',
                        isWrong
                          ? 'animate-shake border-red-300 bg-red-50 text-red-600'
                          : isSelected
                            ? 'border-rose-300 bg-rose-50 text-gray-800'
                            : 'border-stone-200 bg-stone-50 text-gray-700 hover:border-rose-300 hover:bg-rose-50 hover:shadow-sm',
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

function CouponCard({ coupon, onRedeem, isNewlyUnlocked }) {
  const Icon = coupon.icon

  return (
    <article
      className={[
        'flex flex-col rounded-3xl bg-white p-5 shadow-sm transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]',
        coupon.redeemed ? 'opacity-70 grayscale' : '',
        coupon.locked ? 'opacity-80' : '',
        isNewlyUnlocked ? 'animate-pop-glow' : '',
      ].join(' ')}
    >
      <div
        className={[
          'mb-4 flex h-12 w-12 items-center justify-center rounded-2xl',
          coupon.locked ? 'bg-stone-200 text-stone-400' : 'bg-rose-100 text-red-400',
        ].join(' ')}
      >
        {coupon.locked ? (
          <Lock className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Icon className="h-6 w-6" aria-hidden="true" />
        )}
      </div>

      <h3 className="mb-1 text-lg font-bold text-gray-800">
        {coupon.locked ? 'Cupón secreto' : coupon.title}
      </h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600">
        {coupon.locked
          ? 'Responde correctamente el reto del día para descubrirlo.'
          : coupon.description}
      </p>

      <button
        type="button"
        disabled={coupon.redeemed || coupon.locked}
        onClick={() => onRedeem(coupon.id)}
        className={[
          'mt-auto w-full rounded-xl py-3 font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2',
          coupon.redeemed
            ? 'cursor-not-allowed bg-stone-200 text-stone-500'
            : coupon.locked
              ? 'cursor-not-allowed bg-stone-200 text-stone-400'
              : 'bg-red-400 text-white shadow-sm hover:bg-red-500 hover:shadow-md hover:shadow-red-200 active:scale-95',
        ].join(' ')}
      >
        {coupon.redeemed ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Canjeado
          </span>
        ) : coupon.locked ? (
          <span className="flex items-center justify-center gap-2">
            <Lock className="h-4 w-4" aria-hidden="true" />
            Bloqueado
          </span>
        ) : (
          'Canjear'
        )}
      </button>
    </article>
  )
}

function CouponSection({ title, icon: Icon, coupons, onRedeem, emptyMessage, newlyUnlockedId }) {
  return (
    <section className="mb-8" aria-labelledby={title.replace(/\s+/g, '-').toLowerCase()}>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-red-400" aria-hidden="true" />
        <h2 id={title.replace(/\s+/g, '-').toLowerCase()} className="text-lg font-bold text-gray-800">
          {title}
        </h2>
        <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
          {coupons.length}
        </span>
      </div>

      {coupons.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-center text-sm text-gray-500 shadow-sm animate-fade-in-up">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onRedeem={onRedeem}
              isNewlyUnlocked={coupon.id === newlyUnlockedId}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function LockedCouponsSection({ coupons }) {
  const [isOpen, setIsOpen] = useState(false)

  if (coupons.length === 0) return null

  return (
    <section className="mb-8" aria-labelledby="cupones-bloqueados-titulo">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-all duration-200 hover:bg-stone-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls="cupones-bloqueados-lista"
      >
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-stone-400" aria-hidden="true" />
          <h2 id="cupones-bloqueados-titulo" className="text-base font-bold text-gray-700">
            Cupones por descubrir
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
            {coupons.length}
          </span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
        </div>
      </button>

      {isOpen ? (
        <div id="cupones-bloqueados-lista" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-in-up">
          {coupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} onRedeem={() => {}} />
          ))}
        </div>
      ) : null}
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
  const [streak, setStreak] = useState(() => {
    if (typeof window === 'undefined') return 0
    return parseInt(window.localStorage.getItem('streakCount') || '0', 10)
  })
  const [lastCorrectDate, setLastCorrectDate] = useState(() => {
    if (typeof window === 'undefined') return ''
    return window.localStorage.getItem('lastCorrectDate') || ''
  })
  const [bestStreak, setBestStreak] = useState(() => {
    if (typeof window === 'undefined') return 0
    return parseInt(window.localStorage.getItem('bestStreak') || '0', 10)
  })
  const [coupons, setCoupons] = useState(() => {
    if (typeof window === 'undefined') return INITIAL_COUPONS
    const unlocked = safeParseJSON(window.localStorage.getItem('unlockedCouponIds'), [])
    const redeemed = safeParseJSON(window.localStorage.getItem('redeemedCouponIds'), [])
    return INITIAL_COUPONS.map((c) => ({
      ...c,
      locked: !unlocked.includes(c.id),
      redeemed: redeemed.includes(c.id),
    }))
  })
  const [modalCouponId, setModalCouponId] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [newlyUnlockedId, setNewlyUnlockedId] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  const readyCount = coupons.filter((c) => !c.locked && !c.redeemed).length
  const modalCoupon = coupons.find((c) => c.id === modalCouponId) || null

  const saveCoupons = (nextCoupons) => {
    const unlocked = nextCoupons.filter((c) => !c.locked).map((c) => c.id)
    const redeemed = nextCoupons.filter((c) => c.redeemed).map((c) => c.id)
    window.localStorage.setItem('unlockedCouponIds', JSON.stringify(unlocked))
    window.localStorage.setItem('redeemedCouponIds', JSON.stringify(redeemed))
  }

  const unlockRandomCoupon = () => {
    const locked = coupons.filter((c) => c.locked && !c.redeemed)
    if (locked.length === 0) return
    const randomIndex = Math.floor(Math.random() * locked.length)
    const couponToUnlock = locked[randomIndex]
    const nextCoupons = coupons.map((c) =>
      c.id === couponToUnlock.id ? { ...c, locked: false } : c
    )
    setCoupons(nextCoupons)
    saveCoupons(nextCoupons)
    setNewlyUnlockedId(couponToUnlock.id)
    window.setTimeout(() => setNewlyUnlockedId(null), 1500)
  }

  const updateStreak = () => {
    const nextStreak = isToday(lastCorrectDate)
      ? streak
      : isYesterday(lastCorrectDate)
        ? streak + 1
        : 1
    const nextBestStreak = Math.max(nextStreak, bestStreak)
    setStreak(nextStreak)
    setBestStreak(nextBestStreak)
    setLastCorrectDate(todayKey)
    window.localStorage.setItem('streakCount', String(nextStreak))
    window.localStorage.setItem('bestStreak', String(nextBestStreak))
    window.localStorage.setItem('lastCorrectDate', todayKey)
  }

  const resetStreak = () => {
    setStreak(0)
    window.localStorage.setItem('streakCount', '0')
  }

  const handleAnswer = (option) => {
    setSelectedOptionId(option.id)

    if (option.isCorrect) {
      setWrongOptionId(null)
      window.setTimeout(() => {
        setTriviaStatus('success')
        window.localStorage.setItem('triviaStatus', 'success')
        window.localStorage.setItem('triviaDate', todayKey)
        setShowConfetti(true)
        updateStreak()
        unlockRandomCoupon()
        window.setTimeout(() => setShowConfetti(false), 4000)
      }, 400)
    } else {
      setWrongOptionId(option.id)
      resetStreak()
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
        const errorText = await response.text()
        console.error('Error enviando notificación:', errorText)
        setToastMessage('No se pudo enviar la notificación, pero tu cupón fue canjeado 💕')
      }
    } catch (error) {
      console.error('Error de red al enviar notificación:', error)
      setToastMessage('No se pudo enviar la notificación, pero tu cupón fue canjeado 💕')
    }
  }

  const confirmRedeem = () => {
    const coupon = coupons.find((c) => c.id === modalCouponId)
    const nextCoupons = coupons.map((c) =>
      c.id === modalCouponId ? { ...c, redeemed: true } : c
    )
    setCoupons(nextCoupons)
    saveCoupons(nextCoupons)
    setModalCouponId(null)

    if (coupon) {
      sendRedemptionNotification(coupon)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-md sm:max-w-lg">
        <Header readyCount={readyCount} streak={streak} bestStreak={bestStreak} />

        <main>
          <DailyChallenge
            trivia={dailyTrivia}
            status={triviaStatus}
            selectedOptionId={selectedOptionId}
            wrongOptionId={wrongOptionId}
            onAnswer={handleAnswer}
            showConfetti={showConfetti}
          />

          <CouponSection
            title="Mis Cupones Desbloqueados"
            icon={Gift}
            coupons={coupons.filter((c) => !c.locked && !c.redeemed)}
            onRedeem={openRedeem}
            emptyMessage="Responde correctamente el reto del día para desbloquear un cupón."
            newlyUnlockedId={newlyUnlockedId}
          />

          <CouponSection
            title="Mis Cupones Canjeados"
            icon={CheckCircle2}
            coupons={coupons.filter((c) => c.redeemed)}
            emptyMessage="Aún no has canjeado ningún cupón."
          />

          <LockedCouponsSection
            coupons={coupons.filter((c) => c.locked && !c.redeemed)}
          />
        </main>

        <footer className="mt-10 text-center text-xs text-gray-400">
          Hecho con amor para Mi Amochito 💕
        </footer>
      </div>

      {modalCouponId ? (
        <RedeemModal
          coupon={modalCoupon}
          onClose={closeModal}
          onConfirm={confirmRedeem}
        />
      ) : null}

      {toastMessage ? (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      ) : null}
    </div>
  )
}

export default App
