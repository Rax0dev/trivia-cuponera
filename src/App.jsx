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
  Sunset,
  ChefHat,
  TreePine,
  Camera,
  Smartphone,
  PenLine,
  EyeOff,
  CalendarX,
  Users,
  Lock,
  Flame,
  Trophy,
  Menu,
  Pizza,
  Candy,
  CupSoda,
  Footprints,
  BedDouble,
  Headphones,
  Brush,
  WashingMachine,
  ShoppingCart,
  Compass,
  Mountain,
  IceCreamCone,
  Crown,
  Infinity as InfinityIcon,
  Wrench,
  Briefcase,
  Music2,
  MessageCircle,
  Mic,
  Search,
  Baby,
  Shield,
} from 'lucide-react'
import TetrisGame from './components/TetrisGame.jsx'
import Sidebar from './components/Sidebar.jsx'

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
    question: '¿Qué es lo tuyo que me hizo pensar "ella nació para ser enfermera"?',
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
    question: 'Yo estaba super nervioso cuando te pedí matrimonio, pero se me ocurrió algo rápido para grabar el momento. ¿Qué hice?',
    options: [
      'Llevé un tripié escondido en la chamarra',
      'Le pedí a una persona que estaba ahí que grabara el momento',
      'Pagué un paquete VIP que incluía fotógrafo',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 25,
    question: 'Al día siguiente de comprometernos fuimos a desayunar a un lugar super rico. ¿A dónde?',
    options: [
      'A La Casa de Toño',
      'A Los Chilaquiles',
      'Al buffet del hotel',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 26,
    question: 'Cuando tenemos antojo de boneless, ¿a dónde queremos ir siempre?',
    options: [
      "Wings Stop",
      "Clock' Wings",
      'Wings Army',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 27,
    question: 'Cuando andamos en el carro juntos, ¿qué artista no puede faltar en nuestra playlist?',
    options: [
      'Bad Bunny',
      'Feid',
      'Karol G',
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
      'Recordar toda nuestra historia con anécdotas bonitas y divertidas y demostrarte cuánto te amo y lo importante y especial que te has vuelto para mí',
      'Que yo te prepare de cenar hoy',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 31,
    question: 'Si tengo un par de horas libres para jugar, ¿a qué me vas a ver pegado casi seguro?',
    options: [
      'A un juego de terror o supervivencia',
      'A uno de carreras o deportes',
      'A uno de cartas o estrategia pura',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 32,
    question: 'Cuando jugamos en línea con más gente, ¿qué rol me gusta tomar?',
    options: [
      'Ir al frente a dar con todo',
      'Quedarme atrás apoyando y curando',
      'El francotirador que se oculta y espera pacientemente',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 33,
    question: 'Si me fuera a una isla desierta y solo me dejaran llevar un juego para siempre, ¿cuál sería?',
    options: [
      'Uno de supervivencia y construcción estilo Minecraft o Project Zomboid',
      'Uno de carreras para andar a toda velocidad',
      'Uno de deportes para echar retas',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 34,
    question: '¿Cuál es mi postura cuando la cosa en el juego se pone realmente seria?',
    options: [
      'Reclinado hacia atrás en modo relajado',
      'Inclinado hacia adelante con los codos en las rodillas',
      'Recostado de lado en el sillón',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 35,
    question: 'Si me nineyos para comprar un videojuego, ¿Cuál crees que sería el primero en comprar?',
    options: [
      'Saga Assassin\'s Creed',
      'Saga Call of Duty',
      'Saga GTA',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 36,
    question: '¿Qué es lo que más me molesta cuando estoy jugando?',
    options: [
      'Que la conexión ande lenta o con interrupciones',
      'Cometer un error ingenuo yo solo',
      'Que a mis compañeros de equipo no les interese ayudar',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 37,
    question: 'Si no sabemos qué poner en la tele y nos está dando flojera buscar, ¿cuál es mi serie confiable de fondo?',
    options: [
      'Una comedia tipo The Big Bang Theory o Malcolm',
      'Un documental de asesinos o crímenes',
      'Una de doctores o policías',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 38,
    question: 'Cuando vamos al cine, ¿qué botana es la que no se perdona?',
    options: [
      'Palomitas combinadas (mantequilla y Cheetos Mix)',
      'Unas crepas bien ricolinas',
      'Un hot dog con todito',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 39,
    question: 'Si me toca poner la música en un viaje, ¿qué es lo primero que vas a escuchar?',
    options: [
      'Requeson',
      'Rock o Metal',
      'Pop viejito en español para ir gritando',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 40,
    question: 'Si me pongo a arreglar la casa o limpiar, ¿qué ritmo me hace acabar más rápido?',
    options: [
      'Reggaetón o rolas urbanas pegajosas',
      'Cumbias o salsa a todo volumen',
      'Música tranquila / instrumental',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 41,
    question: 'En una peli de superhéroes o acción, ¿qué es lo que más disfruto?',
    options: [
      'Las explosiones y los efectos especiales',
      'Que tenga chistes y momentos de risa',
      'Las peleas bien chidas',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 42,
    question: '¿Quién es mi superhéroe favorito de toda la vida?',
    options: [
      'Spider-Man',
      'Batman',
      'Iron Man',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 43,
    question: 'Es fin de semana, tenemos flojera de cocinar y te digo "vamos a pedirnos algo bien rico", ¿qué es lo primero que se me viene a la mente?',
    options: [
      'Unos buenos tacos o burritos',
      'Una pizza',
      'Unas alitas o boneless con salsa picosa',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 44,
    question: 'Si a fuerzas hay que elegir un postre, ¿con qué me convences fácil?',
    options: [
      'Algo que tenga chocolate',
      'Una nieve / helado',
      'Un rebanada de pastel o pay',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 45,
    question: '¿Cómo me gusta más tomarme el cafecito?',
    options: [
      'Bien caliente y bien cargado',
      'Frío, dulce o tipo frappé',
      'Prefiero un té o algo helado',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 46,
    question: 'Si armamos cenita en la casa, ¿qué me verás haciendo?',
    options: [
      'Al pie de la estufa cocinando todo',
      'Poniendo el ambiente, la botana y la música',
      'Picando verduras y ayudando a preparar',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 47,
    question: '¿Qué onda con el picante en mi comida?',
    options: [
      'Con que tenga tantita salsa de botella estoy bien',
      'Nomás un toque, prefiero sentirle el sabor a la comida',
      'Entre más pise y me haga sudar, mejor',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 48,
    question: 'Son las 12 de la noche y me entra un bajón de hambre, ¿qué iría a buscar a la cocina?',
    options: [
      'Un plato de cereal con leche bien fría',
      'Galletas o algo dulce que encuentre por ahí',
      'Unas papitas con limón y chile',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 49,
    question: 'Si se descompone algo en la casa o un aparato falla, ¿qué es lo primero que hago?',
    options: [
      'Agarrar herramientas y desarmarlo a ver qué tiene',
      'Buscarme un tutorial en YouTube antes de moverle a nada',
      'Decir "ya no sirve" y buscar a quién hablarle',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 50,
    question: '¿En qué me puedes cachar fácil viendo precios o reviews en internet?',
    options: [
      'Audífonos, bocinas y cosas de audio',
      'Teclados, mouses y cosas para la compu',
      'Relojes o gadgets varios',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 51,
    question: 'Si me pusiera a hacer ejercicio, ¿qué es lo que más disfrutaría hacer?',
    options: [
      'Cargar pesado / rutinitas de fuerza en el gym',
      'Salirme a dar una vuelta a caminar o correr',
      'Darle a la bici o hacer cardio',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 52,
    question: '¿Cuál es mi manía clásica cuando estoy frente a la compu o trabajando?',
    options: [
      'Tener como mil pestañas abiertas al mismo tiempo',
      'Tener los audífonos puestos a fuerza aunque no esté escuchando nada',
      'Andar cambiando entre modo claro y oscuro',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 53,
    question: 'Si entramos a una tienda de tecnología/electrónica/videojuegos, ¿qué va a pasar conmigo?',
    options: [
      'En 5 minutos ya vi lo que quería y me quiero ir',
      'Me vas a perder unos 20 minutos viendo tarugadas',
      'Me tienes que sacar a la fuerza del área de juegos y compus',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 54,
    question: '¿Cómo está mi escritorio o área de trabajo normalmente?',
    options: [
      'Súper limpio: nomás la compu y ya',
      'Es un desmadre, pero yo sé exactamente dónde está cada cosa',
      'Lleno de figuritas, juguetes y vasos vacíos',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 55,
    question: 'Al momento de andar manejando, ¿qué tal me comporto?',
    options: [
      'Súper tranquilo, voy a mi rollo escuchando música',
      'Práctico: voy buscando el camino más rápido en el mapa para no tragar tráfico',
      'Voy platicando de todo y al pendiente del camino',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 56,
    question: 'Si nos vamos a ir de fin de semana por ahí, ¿qué preferiría?',
    options: [
      'Irnos a la playita a no hacer nada',
      'Un pueblito o ciudad para andar caminando y comiendo rico',
      'Un lugar de aventura para andar en la naturaleza',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 57,
    question: '¿Qué cosita para Zapatito me emociona más comprarle o checarle?',
    options: [
      'Unas buenas llantas que se vean chilas',
      'Aromatizantes, ceras y cosas para que huela a nuevo',
      'Cositas de adorno o fundas para el interior de Spider-Man',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 58,
    question: '¿Cuál dirías que es mi "superpoder" en el día a día?',
    options: [
      'Resolver problemas rápido sin ahogarme en un vaso de agua',
      'No perderme nunca y ubicarme súper fácil',
      'Armar o arreglar cosas sin tener que leer el manual',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 59,
    question: 'Hace un calorón de la fregada, ¿con qué me refresco más a gusto?',
    options: [
      'Un agua fresca bien helada',
      'Meterme a un cuarto con el aire en 16°C',
      'Una paleta o nieve',
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 60,
    question: 'Si tuvieras que decir cuál es mi forma favorita de demostrarte mi amor, ¿cuál sería?',
    options: [
      'Cuidarte, ayudarte y hacerte la vida más fácil en todo lo que pueda',
      'Estar pegados haciendo planes o platicando',
      'Andar de encimoso con abrazos, besos y apapachos',
    ],
    correctAnswerIndex: 0,
  },
]

function getDailyQuestionIndex(answeredIds) {
  const unanswered = QUESTIONS.filter(q => !answeredIds.includes(q.id))
  if (unanswered.length === 0) return -1
  const randomIndex = Math.floor(Math.random() * unanswered.length)
  return QUESTIONS.findIndex(q => q.id === unanswered[randomIndex].id)
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

function getDailyTrivia(answeredIds) {
  const questionIndex = getDailyQuestionIndex(answeredIds)
  if (questionIndex === -1) return null
  const question = QUESTIONS[questionIndex]
  return {
    questionId: question.id,
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
    id: 'atardecer-juntos',
    title: 'Atardecer Juntos',
    description: 'Ver el atardecer desde un lugar cercano con una bebida rica.',
    icon: Sunset,
    redeemed: false,
    locked: true,
  },
  {
    id: 'receta-nueva-juntos',
    title: 'Receta Nueva Juntos',
    description: 'Cocinar juntos algo nuevo que nunca hayamos preparado.',
    icon: ChefHat,
    redeemed: false,
    locked: true,
  },
  {
    id: 'picnic-parque',
    title: 'Picnic en el Parque',
    description: 'Un picnic sencillo en un parque cercano o en la sala.',
    icon: TreePine,
    redeemed: false,
    locked: true,
  },
  {
    id: 'album-recuerdos',
    title: 'Álbum de Recuerdos',
    description: 'Ver fotos desde el inicio de la relación y recordar momentos.',
    icon: Camera,
    redeemed: false,
    locked: true,
  },
  {
    id: 'noche-sin-celulares',
    title: 'Noche Sin Celulares',
    description: 'Noche sin pantallas, solo platicar, abrazarse y estar juntos.',
    icon: Smartphone,
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
    id: 'lista-razones',
    title: 'Lista de Razones',
    description: 'Escribir una lista de razones por las que te amo.',
    icon: PenLine,
    redeemed: false,
    locked: true,
  },
  {
    id: 'noche-pizza',
    title: 'Noche de Pizza y Cero Cocina',
    description: 'Pedimos tu pizza favorita y los platos corren totalmente por mi cuenta.',
    icon: Pizza,
    redeemed: false,
    locked: true,
  },
  {
    id: 'antojo-dulce-nocturno',
    title: 'Antojo Dulce Nocturno',
    description: 'Salida relámpago o pedido a domicilio por el postre que más se te antoje.',
    icon: Candy,
    redeemed: false,
    locked: true,
  },
  {
    id: 'frappe-rescate',
    title: 'Frappé de Rescate',
    description: 'Pasa por tu bebida favorita de camino a casa para recargar pilas.',
    icon: CupSoda,
    redeemed: false,
    locked: true,
  },
  {
    id: 'masaje-pies',
    title: 'Masaje de Pies Cansados',
    description: 'Consentimiento total para tus pies después de estar horas de pie en el turno.',
    icon: Footprints,
    redeemed: false,
    locked: true,
  },
  {
    id: 'siesta-sagrada',
    title: 'Siesta Sagrada Sin Interrupciones',
    description: 'Casa en silencio total para que duermas y descanses todo lo que necesites.',
    icon: BedDouble,
    redeemed: false,
    locked: true,
  },
  {
    id: 'desconexion-total',
    title: 'Tiempo de Desconexión Total',
    description: 'Un par de horas para que veas tus series, juegues o escuches tu música favorita sin interrupciones.',
    icon: Headphones,
    redeemed: false,
    locked: true,
  },
  {
    id: 'pase-quehaceres',
    title: 'Pase Libre de Quehaceres',
    description: 'Hoy no levantas ni un solo plato; yo me encargo de limpiar y ordenar todo.',
    icon: Brush,
    redeemed: false,
    locked: true,
  },
  {
    id: 'lavanderia-vip',
    title: 'Servicio de Lavandería VIP',
    description: 'Me encargo de lavar, doblar y guardar la ropa de la semana por ti.',
    icon: WashingMachine,
    redeemed: false,
    locked: true,
  },
  {
    id: 'mandado-resuelto',
    title: 'Mandado Resuelto',
    description: 'Yo me encargo de hacer la lista del súper y traer todo a la casa.',
    icon: ShoppingCart,
    redeemed: false,
    locked: true,
  },
  {
    id: 'yo-cocino-hoy',
    title: 'Yo Cocino Hoy',
    description: 'Preparo algún platillo casero que sea tu preferido para consentirte el finde.',
    icon: ChefHat,
    redeemed: false,
    locked: true,
  },
  {
    id: 'cita-sorpresa-fin',
    title: 'Cita Sorpresa de Fin de Semana',
    description: 'Preparo una salida especial a algún lugar bonito sin que tengas que planear nada.',
    icon: Compass,
    redeemed: false,
    locked: true,
  },
  {
    id: 'escapada-fin-semana',
    title: 'Escapada de Fin de Semana',
    description: 'Plan para salir a despejarnos a algún parque o lugar tranquilo.',
    icon: Mountain,
    redeemed: false,
    locked: true,
  },
  {
    id: 'caminata-helado',
    title: 'Caminata Tranquila y Helado',
    description: 'Paseo sin prisas al aire libre para platicar de todo y desconectarnos.',
    icon: IceCreamCone,
    redeemed: false,
    locked: true,
  },
  {
    id: 'culpable-razon',
    title: 'La Culpable Siempre Tiene la Razón',
    description: 'Ganas una discusión menor automáticamente sin necesidad de explicaciones.',
    icon: Crown,
    redeemed: false,
    locked: true,
  },
  {
    id: 'detalle-nada',
    title: 'Un Detalle de la Nada',
    description: 'Valido por una sorpresa o regalito sorpresa sin necesidad de que sea fecha especial.',
    icon: Gift,
    redeemed: false,
    locked: true,
  },
  {
    id: 'comodin-infinito',
    title: 'Comodín Infinito',
    description: 'Canjeable por absolutamente cualquier favor o capricho que se te ocurra en el momento.',
    icon: InfinityIcon,
    redeemed: false,
    locked: true,
  },
  {
    id: 'soporte-tecnico',
    title: 'Soporte Técnico Personal',
    description: 'Arreglo cualquier problema con tu cel, tu pompu, la tele o las apps sin que reniegue.',
    icon: Wrench,
    redeemed: false,
    locked: true,
  },
  {
    id: 'preparar-maleta',
    title: 'Preparar la Maleta/Mochila',
    description: 'Te ayudo a organizar y alistar todo lo que necesites llevar listo para tu siguiente día.',
    icon: Briefcase,
    redeemed: false,
    locked: true,
  },
  {
    id: 'sesion-fotos-pareja',
    title: 'Sesión de Fotos en Pareja',
    description: 'Salimos a tomarnos fotitas bonitas sin poner peros.',
    icon: Camera,
    redeemed: false,
    locked: true,
  },
  {
    id: 'tarde-shopping',
    title: 'Tarde de Shopping',
    description: 'Te acompaño a recorrer tus tiendas favoritas a ver cosas sin presionar por el tiempo.',
    icon: ShoppingBag,
    redeemed: false,
    locked: true,
  },
  {
    id: 'canta-rolas-zapatito',
    title: 'Canta-Rolas en Zapatito',
    description: 'Ponemos tus canciones favoritas en Zapatito a todo volumen y las cantamos a todo volumen.',
    icon: Music2,
    redeemed: false,
    locked: true,
  },
  {
    id: 'regalito-mochila',
    title: 'Regalito Sorpresa en la Mochila',
    description: 'Un detallito oculto entre tus cosas para que lo encuentres a mitad de tu turno.',
    icon: Gift,
    redeemed: false,
    locked: true,
  },
  {
    id: 'noche-preguntas',
    title: 'Noche de Preguntas',
    description: 'Nos preparamos algo de tomar y jugamos a hacernos preguntas para platicar de la vida.',
    icon: MessageCircle,
    redeemed: false,
    locked: true,
  },
  {
    id: 'serenata-personalizada',
    title: 'Serenata Personalizada',
    description: 'Te pongo tu canción favorita a todo volumen mientras te hago reír un rato.',
    icon: Mic,
    redeemed: false,
    locked: true,
  },
  {
    id: 'detective-objetos',
    title: 'Detective de Objetos Perdidos',
    description: 'Busco por todos lados eso que se te haya perdido: las llaves, el cel, etc.',
    icon: Search,
    redeemed: false,
    locked: true,
  },
  {
    id: 'crema-panchita',
    title: 'Sesión de Crema en Panchita',
    description: 'Te pongo cremita o el aceite en panchita con un masajito suave mientras platicamos con bebé Ethan.',
    icon: Baby,
    redeemed: false,
    locked: true,
  },
  {
    id: 'guardian-silencio',
    title: 'Guardián del Silencio y Descanso',
    description: 'Me encargo de atender cualquier pendiente de la casa para que duermas la siesta que tu cuerpecito pida.',
    icon: Shield,
    redeemed: false,
    locked: true,
  },
  {
    id: 'platica-musica-pancita',
    title: 'Plática y Música para la Pancita',
    description: 'Me pongo a cantar, leerle un cuento o platicarle pegado a tu panchita para que bebé Ethan empiece a reconocer mi voz.',
    icon: Baby,
    redeemed: false,
    locked: true,
  },
  {
    id: 'foto-inesperada',
    title: 'Foto Inesperada y Bonita',
    description: 'Te aviso cuando te veas súper linda distraída y te tomo una foto desprevenida para guardarla de recuerdo.',
    icon: Camera,
    redeemed: false,
    locked: true,
  },
  {
    id: 'cancion-dedicada',
    title: 'Canción Dedicada con Historia',
    description: 'Te pongo una canción bonita y especial, te abrazo fuerte y te cuento exactamente qué pensé la primera vez que la escuché acordándome de ti.',
    icon: Music,
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

function Header({ readyCount, streak, bestStreak, onHeartTap, onTitleLongPress, onMenuClick }) {
  return (
    <header className="mb-5 sm:mb-7 md:mb-8">
      <div className="mb-3 flex items-center gap-3 sm:mb-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-200 hover:bg-stone-100 hover:shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          aria-label="Abrir menú de cupones"
        >
          <Menu className="h-5 w-5 text-gray-700" aria-hidden="true" />
        </button>
        <LongPressTitle onLongPress={onTitleLongPress}>
          La Bóveda de Mi Amochito
        </LongPressTitle>
      </div>

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

function CouponCard({ coupon, onRedeem, isNewlyUnlocked, canRedeemToday = true }) {
  const Icon = coupon.icon
  const hasGradientBorder = !coupon.locked && !coupon.redeemed
  const isBlockedByDailyLimit = !coupon.locked && !coupon.redeemed && !canRedeemToday

  return (
    <article
      className={[
        'flex flex-col rounded-2xl sm:rounded-3xl shadow-sm transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]',
        coupon.redeemed ? 'opacity-70 grayscale' : '',
        coupon.locked || isBlockedByDailyLimit ? 'opacity-80' : '',
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
          disabled={coupon.redeemed || coupon.locked || isBlockedByDailyLimit}
          onClick={() => onRedeem(coupon.id)}
          className={[
            'mt-auto min-h-[2.75rem] sm:min-h-[3rem] w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 sm:py-3 sm:text-base',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2',
            coupon.redeemed
              ? 'cursor-not-allowed bg-stone-200 text-stone-500'
              : coupon.locked
                ? 'cursor-not-allowed bg-stone-200 text-stone-400'
                : isBlockedByDailyLimit
                  ? 'cursor-not-allowed bg-purple-100 text-purple-400'
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
          ) : isBlockedByDailyLimit ? (
            <span className="flex items-center justify-center gap-2">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              Hoy ya canjeaste
            </span>
          ) : (
            'Canjear'
          )}
        </button>
      </div>
    </article>
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
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
      aria-label="Doble toque para una nota secreta"
    >
      Hecho con amor para Mi Amochito 💕
      <span className="block text-[10px] opacity-60">(doble toque sorpresa)</span>
    </footer>
  )
}

function App() {
  const todayKey = getTodayKey()

  const [triviaStatus, setTriviaStatus] = useState(() => {
    if (typeof window === 'undefined') return 'active'
    const saved = window.localStorage.getItem('triviaStatus')
    const savedDate = window.localStorage.getItem('triviaDate')
    return saved === 'success' && savedDate === todayKey ? 'success' : 'active'
  })
  const [gamePhase, setGamePhase] = useState(() => {
    if (typeof window === 'undefined') return 'tetris'
    const savedStatus = window.localStorage.getItem('triviaStatus')
    const savedDate = window.localStorage.getItem('triviaDate')
    if (savedStatus === 'success' && savedDate === todayKey) return 'success'
    const gamePlayedDate = window.localStorage.getItem('gamePlayedDate')
    return gamePlayedDate === todayKey ? 'trivia' : 'tetris'
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
  const [lastRedeemedDate, setLastRedeemedDate] = useState(() => {
    if (typeof window === 'undefined') return ''
    return window.localStorage.getItem('lastRedeemedDate') || ''
  })
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(() => {
    if (typeof window === 'undefined') return []
    return safeParseJSON(window.localStorage.getItem('answeredQuestionIds'), [])
  })
  const [streakPaused, setStreakPaused] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('streakPaused') === 'true'
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const dailyTrivia = getDailyTrivia(answeredQuestionIds)
  const noQuestionsAvailable = dailyTrivia === null

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

  useEffect(() => {
    const prevMaxId = safeParseJSON(window.localStorage.getItem('prevMaxQuestionId'), 0)
    const currentMaxId = QUESTIONS.reduce((max, q) => Math.max(max, q.id), 0)
    if (prevMaxId > 0 && currentMaxId > prevMaxId && noQuestionsAvailable) {
      window.setTimeout(() => {
        setToastMessage('¡Hay preguntas nuevas disponibles! 🎉')
        setStreakPaused(false)
      }, 0)
      window.localStorage.setItem('streakPaused', 'false')
    }
    window.localStorage.setItem('prevMaxQuestionId', String(currentMaxId))
  }, [noQuestionsAvailable])

  useEffect(() => {
    if (noQuestionsAvailable && triviaStatus !== 'success' && !streakPaused && streak > 0) {
      window.setTimeout(() => {
        setStreakPaused(true)
      }, 0)
      window.localStorage.setItem('streakPaused', 'true')
    }
  }, [noQuestionsAvailable, triviaStatus, streakPaused, streak])

  const readyCount = coupons.filter((c) => !c.locked && !c.redeemed).length + (specialCoupon.unlocked && !specialCoupon.redeemed ? 1 : 0)
  const modalCoupon = coupons.find((c) => c.id === modalCouponId) || null
  const canRedeemToday = lastRedeemedDate !== todayKey

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
      : isYesterday(lastCorrectDate) || streakPaused
        ? streak + 1
        : 1
    const nextBestStreak = Math.max(nextStreak, bestStreak)
    setStreak(nextStreak)
    setBestStreak(nextBestStreak)
    setLastCorrectDate(todayKey)
    if (streakPaused) {
      setStreakPaused(false)
      window.localStorage.setItem('streakPaused', 'false')
    }
    window.localStorage.setItem('streakCount', String(nextStreak))
    window.localStorage.setItem('bestStreak', String(nextBestStreak))
    window.localStorage.setItem('lastCorrectDate', todayKey)
  }

  const resetStreak = () => {
    if (streakPaused) return
    setStreak(0)
    window.localStorage.setItem('streakCount', '0')
  }

  const handleTetrisComplete = () => {
    window.localStorage.setItem('gamePlayedDate', todayKey)
    setGamePhase('trivia')
  }

  const handleAnswer = (option) => {
    setSelectedOptionId(option.id)

    if (option.isCorrect) {
      setWrongOptionId(null)
      const nextAnsweredIds = [...answeredQuestionIds, dailyTrivia.questionId]
      setAnsweredQuestionIds(nextAnsweredIds)
      window.localStorage.setItem('answeredQuestionIds', JSON.stringify(nextAnsweredIds))
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
      window.setTimeout(() => {
        setSelectedOptionId(null)
        setWrongOptionId(null)
      }, 600)
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
        body: JSON.stringify({ cupon: coupon.title, descripcion: coupon.description, id: coupon.id }),
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
    if (!canRedeemToday) {
      setModalCouponId(null)
      setToastMessage('Ya usaste un cupón hoy. Mañana podrás canjear otro. 💕')
      return
    }

    const coupon = coupons.find((c) => c.id === modalCouponId)
    const nextCoupons = coupons.map((c) =>
      c.id === modalCouponId ? { ...c, redeemed: true } : c
    )
    setCoupons(nextCoupons)
    saveCoupons(nextCoupons)
    setModalCouponId(null)
    setLastRedeemedDate(todayKey)
    window.localStorage.setItem('lastRedeemedDate', todayKey)

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
    if (!canRedeemToday) {
      setToastMessage('Ya usaste un cupón hoy. Mañana podrás canjear otro. 💕')
      return
    }

    const next = { unlocked: true, redeemed: true }
    setSpecialCoupon(next)
    window.localStorage.setItem('specialCoupon', JSON.stringify(next))
    setLastRedeemedDate(todayKey)
    window.localStorage.setItem('lastRedeemedDate', todayKey)
    sendRedemptionNotification(SPECIAL_COUPON)
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 px-4 py-5 sm:px-6 sm:py-7 md:py-9 transition-transform duration-300 ease-in-out" style={{ transform: sidebarOpen ? 'translateX(280px)' : 'translateX(0)' }}>
      {showWelcome ? <WelcomeScreen onStart={dismissWelcome} /> : null}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        coupons={coupons}
        onRedeem={openRedeem}
        canRedeemToday={canRedeemToday}
        newlyUnlockedId={newlyUnlockedId}
        CouponCard={CouponCard}
      />

      <div className="mx-auto w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <Header
          readyCount={readyCount}
          streak={streak}
          bestStreak={bestStreak}
          onHeartTap={handleHeartTap}
          onTitleLongPress={handleTitleLongPress}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {specialDate ? (
          <div className="mb-5 animate-fade-in-up rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white shadow-md sm:mb-6 sm:px-6 sm:py-4 sm:text-base" style={{ backgroundColor: specialDate.themeColor }}>
            {specialDate.message}
          </div>
        ) : null}

        <main>
          {noQuestionsAvailable && triviaStatus !== 'success' ? (
            <div className="mb-6 animate-fade-in-up rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-lg sm:mb-8 sm:p-8">
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <BookOpen className="h-8 w-8 text-amber-600" aria-hidden="true" />
                </div>
              </div>
              <h3 className="mb-3 text-center text-lg font-bold text-gray-800 sm:text-xl">
                ¡No hay preguntas disponibles!
              </h3>
              <p className="text-center text-sm text-gray-600 sm:text-base">
                Avisale a señor Eposo que agregue más preguntas!! Para no perder esa racha por falta de preguntas se guardará hasta detectar nuevas preguntas :D
              </p>
              {streak > 0 && (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white/60 p-3">
                  <Flame className="h-5 w-5 text-orange-500" aria-hidden="true" />
                  <span className="text-sm font-semibold text-gray-700">
                    Tu racha de {streak} días está guardada
                  </span>
                </div>
              )}
            </div>
          ) : gamePhase === 'tetris' && triviaStatus !== 'success' ? (
            <TetrisGame onComplete={handleTetrisComplete} />
          ) : (
            <DailyChallenge
              trivia={dailyTrivia}
              status={triviaStatus}
              selectedOptionId={selectedOptionId}
              wrongOptionId={wrongOptionId}
              onAnswer={handleAnswer}
              showConfetti={showConfetti}
            />
          )}

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
                  canRedeemToday={canRedeemToday}
                />
              </div>
            </section>
          ) : null}
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
