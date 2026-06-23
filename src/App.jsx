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
      'Pizza de pepperoni',
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

const SPECIAL_DATES = [
  // Personaliza aquí tus fechas especiales en formato MM-DD
  { date: '02-14', message: '¡Feliz San Valentín, mi amor! 💘 Hoy la Bóveda brilla más fuerte.', themeColor: '#e11d48' },
  { date: '05-08', message: '¡Feliz aniversario de nuestra boda civil, Amochito! 💍 Gracias por decir que sí.', themeColor: '#ec4899' },
  { date: '05-10', message: '¡Feliz Día de la Madre, mi amor! Eres una mamá increíble y una esposa aún mejor. 💐', themeColor: '#8b5cf6' },
  { date: '05-14', message: '¡Feliz cumpleaños, mi amor! 🎂 Celebro tu vida hoy y siempre.', themeColor: '#db2777' },
  { date: '07-19', message: '¡Feliz aniversario de nuestra boda por la iglesia, mi amor! 💒 Otro año bendecido a tu lado.', themeColor: '#f59e0b' },
  { date: '12-25', message: '¡Feliz Navidad, Amochito! 🎄 Gracias por ser mi mejor regalo.', themeColor: '#16a34a' },
]

const SECRET_NOTE = {
  title: 'Nota secreta 💌',
  message: 'A veces no te lo digo tanto como quisiera, pero eres la persona más importante de mi vida. Gracias por cada día a tu lado. Te amo infinito. 💕',
}

const SPECIAL_COUPON = {
  id: 'sorpresa-amor',
  title: 'Sorpresa de Amor',
  description: 'Una cena, un detalle o un plan sorpresa elegido especialmente para ti. Solo por ser tú.',
  icon: Heart,
}

const HEART_TAP_MESSAGE = 'Cada latido de este corazón es por ti. Te amo. 💓'

function getSpecialDateInfo() {
  const today = new Date()
  const key = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  return SPECIAL_DATES.find((d) => d.date === key)
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

function WelcomeScreen({ onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-4 text-center sm:p-6">
      <div className="welcome-landscape animate-fade-in-up w-full max-w-xs py-6 sm:max-w-sm sm:py-8 md:max-w-md md:py-10 lg:flex lg:max-w-3xl lg:items-center lg:gap-10 lg:text-left">
        <div className="mb-6 flex justify-center lg:mb-0 lg:shrink-0">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg shadow-rose-200 sm:h-28 sm:w-28">
            <Heart
              className="h-12 w-12 fill-red-500 text-red-500 animate-pulse-soft sm:h-14 sm:w-14"
              aria-hidden="true"
            />
            <Sparkles
              className="absolute -right-1 -top-1 h-7 w-7 text-amber-400 animate-sparkle sm:-right-2 sm:-top-2 sm:h-8 sm:w-8"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl md:mb-4 md:text-4xl">
            Bienvenida a tu Bóveda
          </h1>

          <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg md:mb-8">
            Cada día tienes una pregunta sobre nuestra historia. Si respondes
            bien, desbloqueas un cupón sorpresa que puedes canjear cuando
            quieras.
          </p>

          <div className="mb-6 space-y-3 text-left sm:mb-8 sm:space-y-4">
            <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-sm sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-red-400 sm:h-10 sm:w-10">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 sm:text-base">Un reto al día</p>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Responde la trivia para poner a prueba cuánto recuerdas de nosotros.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-sm sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-red-400 sm:h-10 sm:w-10">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 sm:text-base">Cupones sorpresa</p>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Cada acierto desbloquea un cupón romántico para canjear.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-sm sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-red-400 sm:h-10 sm:w-10">
                <Flame className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 sm:text-base">Mantén la racha</p>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Acertar varios días seguidos aumenta tu racha de amor.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="min-h-[3rem] w-full rounded-2xl bg-red-400 py-3 text-base font-bold text-white shadow-lg shadow-red-200 transition-all duration-200 hover:bg-red-500 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-300 sm:py-4 sm:text-lg"
          >
            Abrir mi bóveda 💕
          </button>
        </div>
      </div>
    </div>
  )
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
  }, [message, onClose])

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-in-up fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl bg-gray-800 px-4 py-3 text-sm font-medium text-white shadow-lg"
    >
      {message}
    </div>
  )
}

function LongPressTitle({ children, onLongPress, duration = 1200 }) {
  const timerRef = useRef(null)
  const [pressing, setPressing] = useState(false)

  const start = () => {
    setPressing(true)
    timerRef.current = window.setTimeout(() => {
      onLongPress()
      setPressing(false)
    }, duration)
  }

  const cancel = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setPressing(false)
  }

  return (
    <h1
      className={[
        'mb-3 text-2xl font-bold leading-tight text-gray-800 sm:text-3xl md:mb-4 md:text-4xl',
        'cursor-pointer select-none transition-transform duration-200',
        pressing ? 'scale-95 text-red-500' : '',
      ].join(' ')}
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
      onMouseDown={start}
      onMouseUp={cancel}
      onMouseLeave={cancel}
      onTouchStart={start}
      onTouchEnd={cancel}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </h1>
  )
}

function Header({ readyCount, streak, bestStreak, onHeartTap, onTitleLongPress }) {
  return (
    <header className="mb-5 sm:mb-7 md:mb-8">
      <LongPressTitle onLongPress={onTitleLongPress}>
        La Bóveda de Mi Amochito
      </LongPressTitle>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <div className="flex flex-1 min-w-[8rem] flex-col rounded-2xl bg-gradient-to-br from-rose-200 to-red-300 p-1 shadow-sm transition-shadow duration-300 hover:shadow-md sm:flex-none sm:min-w-0">
          <div className="flex flex-1 items-center gap-2 rounded-[0.85rem] bg-white px-3 py-2">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
              <Flame
                className={[
                  'h-6 w-6 text-orange-500',
                  streak > 0 ? 'animate-pulse-soft' : '',
                ].join(' ')}
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={onHeartTap}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5 shadow-sm transition-transform active:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 sm:h-6 sm:w-6"
                aria-label="Corazón secreto"
              >
                <Heart className="h-3 w-3 fill-red-500 text-red-500 sm:h-4 sm:w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-xs text-gray-500">Racha</span>
              <span className="font-bold text-gray-800">
                <AnimatedNumber value={streak} /> días
              </span>
              <span className="block text-[10px] text-gray-400">
                Mejor: <AnimatedNumber value={bestStreak} /> días
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 min-w-[8rem] flex-col rounded-2xl bg-gradient-to-br from-rose-200 to-red-300 p-1 shadow-sm transition-shadow duration-300 hover:shadow-md sm:flex-none sm:min-w-0">
          <div className="flex flex-1 items-center gap-2 rounded-[0.85rem] bg-white px-3 py-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
              <Gift className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-xs text-gray-500">Listos para usar</span>
              <span className="font-bold text-gray-800">
                <AnimatedNumber value={readyCount} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function DailyChallenge({ trivia, status, selectedOptionId, wrongOptionId, onAnswer, showConfetti }) {
  return (
    <section className="relative mb-6 sm:mb-8 md:mb-10" aria-labelledby="reto-titulo">
      <RomanticConfetti show={showConfetti} />
      <div className="rounded-3xl bg-gradient-to-br from-rose-200 to-red-300 p-1 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="rounded-[1.35rem] bg-white p-4 sm:p-6 md:p-7">
          <div className="mb-3 flex items-center gap-2 md:mb-4">
            <Sparkles className="h-5 w-5 text-red-400" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wider text-rose-400">
              Reto del día
            </span>
          </div>

          {status === 'active' ? (
            <div className="animate-fade-in-up">
              <h2
                id="reto-titulo"
                className="mb-4 text-lg font-bold leading-snug text-gray-800 sm:text-xl md:mb-5 md:text-2xl"
              >
                {trivia.question}
              </h2>

              <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2 md:gap-3">
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
                        'min-h-[3rem] w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base sm:py-3.5',
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
            <div className="animate-fade-in-up py-2 text-center sm:py-4">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 sm:mb-4 sm:h-16 sm:w-16">
                <CheckCircle2 className="h-8 w-8 text-red-400 sm:h-9 sm:w-9" aria-hidden="true" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-800 sm:text-2xl">¡Correcto!</h2>
              <p className="mb-4 text-sm text-gray-600 sm:text-base sm:mb-5">
                Has desbloqueado el premio del día. Ya puedes canjearlo cuando
                quieras.
              </p>
              <div className="rounded-2xl bg-rose-50 p-3 sm:p-4">
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
  const hasGradientBorder = !coupon.locked && !coupon.redeemed

  return (
    <article
      className={[
        'flex flex-col rounded-2xl sm:rounded-3xl shadow-sm transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]',
        coupon.redeemed ? 'opacity-70 grayscale' : '',
        coupon.locked ? 'opacity-80' : '',
        isNewlyUnlocked ? 'animate-pop-glow' : '',
        hasGradientBorder
          ? 'bg-gradient-to-br from-rose-200 to-red-300 p-1'
          : 'bg-white p-4 sm:p-5',
      ].join(' ')}
    >
      <div
        className={[
          'flex flex-col flex-1',
          hasGradientBorder ? 'rounded-[0.85rem] sm:rounded-[1.35rem] bg-white p-3 sm:p-4' : '',
        ].join(' ')}
      >
        <div
          className={[
            'mb-3 flex h-11 w-11 items-center justify-center rounded-xl sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl',
            coupon.locked ? 'bg-stone-200 text-stone-400' : 'bg-rose-100 text-red-400',
          ].join(' ')}
        >
          {coupon.locked ? (
            <Lock className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          ) : (
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          )}
        </div>

        <h3 className="mb-1 text-base font-bold text-gray-800 sm:text-lg">
          {coupon.locked ? 'Cupón secreto' : coupon.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 sm:mb-5">
          {coupon.locked
            ? 'Responde correctamente el reto del día para descubrirlo.'
            : coupon.description}
        </p>

        <button
          type="button"
          disabled={coupon.redeemed || coupon.locked}
          onClick={() => onRedeem(coupon.id)}
          className={[
            'mt-auto min-h-[2.75rem] sm:min-h-[3rem] w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 sm:py-3 sm:text-base',
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
      </div>
    </article>
  )
}

function CouponSection({ title, icon: Icon, coupons, onRedeem, emptyMessage, newlyUnlockedId }) {
  const sectionId = title.replace(/\s+/g, '-').toLowerCase()
  return (
    <section className="mb-6 sm:mb-8" aria-labelledby={sectionId}>
      <div className="mb-3 flex items-center gap-2 sm:mb-4">
        <Icon className="h-5 w-5 text-red-400" aria-hidden="true" />
        <h2 id={sectionId} className="text-base font-bold text-gray-800 sm:text-lg">
          {title}
        </h2>
        <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
          {coupons.length}
        </span>
      </div>

      {coupons.length === 0 ? (
        <div className="rounded-2xl bg-white p-5 text-center text-sm text-gray-500 shadow-sm animate-fade-in-up sm:p-6">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
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
    <section className="mb-6 sm:mb-8" aria-labelledby="cupones-bloqueados-titulo">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex min-h-[3rem] w-full items-center justify-between rounded-2xl bg-white p-3 shadow-sm transition-all duration-200 hover:bg-stone-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 sm:p-4"
        aria-expanded={isOpen}
        aria-controls="cupones-bloqueados-lista"
      >
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-stone-400" aria-hidden="true" />
          <h2 id="cupones-bloqueados-titulo" className="text-sm font-bold text-gray-700 sm:text-base">
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
        <div id="cupones-bloqueados-lista" className="mt-3 grid grid-cols-2 gap-3 animate-fade-in-up sm:mt-4 sm:gap-4 lg:grid-cols-3">
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
        className="animate-scale-in max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-3xl bg-white p-5 shadow-xl sm:p-6"
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
          className="mb-2 text-lg font-bold text-gray-800 sm:text-xl"
        >
          ¿Segura que quieres usar este cupón ahora?
        </h3>
        <p className="mb-6 text-sm text-gray-600 sm:text-base">
          Vas a canjear: <span className="font-semibold text-gray-800">{coupon.title}</span>
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[2.75rem] flex-1 rounded-xl border border-stone-200 bg-white py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 sm:py-3 sm:text-base"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-[2.75rem] flex-1 rounded-xl bg-red-400 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-500 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 sm:py-3 sm:text-base"
          >
            Sí, canjear
          </button>
        </div>
      </div>
    </div>
  )
}

function EasterEggModal({ title, message, icon: Icon, onClose, showConfetti }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="easter-egg-titulo"
        className="animate-scale-in relative max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-3xl bg-white p-5 shadow-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {showConfetti ? <RomanticConfetti show={true} /> : null}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-red-400">
            {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : <Heart className="h-5 w-5" aria-hidden="true" />}
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
          id="easter-egg-titulo"
          className="mb-2 text-lg font-bold text-gray-800 sm:text-xl"
        >
          {title}
        </h3>
        <p className="mb-6 whitespace-pre-line text-sm leading-relaxed text-gray-600 sm:text-base">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="min-h-[2.75rem] w-full rounded-xl bg-red-400 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-500 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 sm:py-3 sm:text-base"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

function SecretFooter({ onDoubleTap }) {
  const [lastTap, setLastTap] = useState(0)

  const handleClick = () => {
    const now = Date.now()
    if (now - lastTap < 300) {
      onDoubleTap()
      setLastTap(0)
    } else {
      setLastTap(now)
    }
  }

  return (
    <footer
      className="mt-8 cursor-pointer select-none pb-[env(safe-area-inset-bottom)] text-center text-xs text-gray-400 sm:mt-10"
      onClick={handleClick}
      onDoubleClick={onDoubleTap}
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
      aria-label="Doble toque para una nota secreta"
    >
      Hecho con amor para Mi Amochito 💕
      <span className="block text-[10px] opacity-60">(doble toque sorpresa)</span>
    </footer>
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
    const unlockedIds = Array.isArray(unlocked) ? unlocked : []
    const redeemedIds = Array.isArray(redeemed) ? redeemed : []
    return INITIAL_COUPONS.map((c) => ({
      ...c,
      locked: !unlockedIds.includes(c.id),
      redeemed: redeemedIds.includes(c.id),
    }))
  })
  const [modalCouponId, setModalCouponId] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [newlyUnlockedId, setNewlyUnlockedId] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [showWelcome, setShowWelcome] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('welcomeSeen') !== 'true'
  })
  const [easterEggModal, setEasterEggModal] = useState(null)
  const [specialCoupon, setSpecialCoupon] = useState(() => {
    if (typeof window === 'undefined') return { unlocked: false, redeemed: false }
    return safeParseJSON(window.localStorage.getItem('specialCoupon'), { unlocked: false, redeemed: false })
  })

  const heartTapCountRef = useRef(0)
  const heartTapTimeoutRef = useRef(null)
  const specialDate = getSpecialDateInfo()

  useEffect(() => {
    return () => {
      if (heartTapTimeoutRef.current) {
        window.clearTimeout(heartTapTimeoutRef.current)
      }
    }
  }, [])

  const readyCount = coupons.filter((c) => !c.locked && !c.redeemed).length + (specialCoupon.unlocked && !specialCoupon.redeemed ? 1 : 0)
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

  const dismissWelcome = () => {
    setShowWelcome(false)
    window.localStorage.setItem('welcomeSeen', 'true')
  }

  const handleHeartTap = () => {
    heartTapCountRef.current += 1
    if (heartTapCountRef.current >= 5) {
      setEasterEggModal({ type: 'heart' })
      setShowConfetti(true)
      window.setTimeout(() => setShowConfetti(false), 2500)
      heartTapCountRef.current = 0
      if (heartTapTimeoutRef.current) {
        window.clearTimeout(heartTapTimeoutRef.current)
        heartTapTimeoutRef.current = null
      }
      return
    }
    if (heartTapTimeoutRef.current) {
      window.clearTimeout(heartTapTimeoutRef.current)
    }
    heartTapTimeoutRef.current = window.setTimeout(() => {
      heartTapCountRef.current = 0
    }, 2000)
  }

  const handleTitleLongPress = () => {
    if (!specialCoupon.unlocked) {
      const next = { unlocked: true, redeemed: false }
      setSpecialCoupon(next)
      window.localStorage.setItem('specialCoupon', JSON.stringify(next))
    }
    setEasterEggModal({ type: 'special' })
    setShowConfetti(true)
    window.setTimeout(() => setShowConfetti(false), 3000)
  }

  const redeemSpecialCoupon = () => {
    const next = { unlocked: true, redeemed: true }
    setSpecialCoupon(next)
    window.localStorage.setItem('specialCoupon', JSON.stringify(next))
    sendRedemptionNotification(SPECIAL_COUPON)
  }

  return (
    <div className="min-h-[100dvh] min-h-screen bg-stone-50 px-4 py-5 sm:px-6 sm:py-7 md:py-9">
      {showWelcome ? <WelcomeScreen onStart={dismissWelcome} /> : null}

      <div className="mx-auto w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <Header
          readyCount={readyCount}
          streak={streak}
          bestStreak={bestStreak}
          onHeartTap={handleHeartTap}
          onTitleLongPress={handleTitleLongPress}
        />

        {specialDate ? (
          <div className="mb-5 animate-fade-in-up rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white shadow-md sm:mb-6 sm:px-6 sm:py-4 sm:text-base" style={{ backgroundColor: specialDate.themeColor }}>
            {specialDate.message}
          </div>
        ) : null}

        <main>
          <DailyChallenge
            trivia={dailyTrivia}
            status={triviaStatus}
            selectedOptionId={selectedOptionId}
            wrongOptionId={wrongOptionId}
            onAnswer={handleAnswer}
            showConfetti={showConfetti}
          />

          {specialCoupon.unlocked && !specialCoupon.redeemed ? (
            <section className="mb-6 sm:mb-8" aria-labelledby="cupon-especial-titulo">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <Heart className="h-5 w-5 text-red-400" aria-hidden="true" />
                <h2 id="cupon-especial-titulo" className="text-base font-bold text-gray-800 sm:text-lg">
                  Cupón Especial
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                <CouponCard
                  coupon={{ ...SPECIAL_COUPON, locked: false, redeemed: false }}
                  onRedeem={() => {
                    setEasterEggModal({ type: 'special' })
                    redeemSpecialCoupon()
                  }}
                  isNewlyUnlocked={false}
                />
              </div>
            </section>
          ) : null}

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

        <SecretFooter onDoubleTap={() => setEasterEggModal({ type: 'note' })} />
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

      {easterEggModal?.type === 'heart' ? (
        <EasterEggModal
          title="Mensaje secreto 💓"
          message={HEART_TAP_MESSAGE}
          icon={Heart}
          showConfetti={true}
          onClose={() => setEasterEggModal(null)}
        />
      ) : null}

      {easterEggModal?.type === 'note' ? (
        <EasterEggModal
          title={SECRET_NOTE.title}
          message={SECRET_NOTE.message}
          icon={Heart}
          showConfetti={true}
          onClose={() => setEasterEggModal(null)}
        />
      ) : null}

      {easterEggModal?.type === 'special' ? (
        <EasterEggModal
          title="Cupón secreto desbloqueado 🎁"
          message={`Has encontrado el cupón especial: ${SPECIAL_COUPON.title}.\n\n${SPECIAL_COUPON.description}\n\nSolo por ser tú, mi Amochito. 💕`}
          icon={Gift}
          showConfetti={true}
          onClose={() => setEasterEggModal(null)}
        />
      ) : null}
    </div>
  )
}

export default App
