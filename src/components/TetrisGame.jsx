import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RotateCw, MoveLeft, MoveRight, MoveDown, Trophy, RefreshCw } from 'lucide-react'
import useTetrisSounds from '../hooks/useTetrisSounds.js'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const LINES_TO_WIN = 5

const COLORS = {
  I: '#f9a8d4', // pink-300
  O: '#f472b6', // pink-400
  T: '#c084fc', // purple-400
  S: '#fda4af', // rose-300
  Z: '#fb7185', // rose-400
  J: '#a5b4fc', // indigo-300
  L: '#fcd34d', // amber-300
}

const TETROMINOES = {
  I: {
    color: COLORS.I,
    shape: [
      [1, 1, 1, 1],
    ],
  },
  O: {
    color: COLORS.O,
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  T: {
    color: COLORS.T,
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  S: {
    color: COLORS.S,
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  Z: {
    color: COLORS.Z,
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  J: {
    color: COLORS.J,
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  L: {
    color: COLORS.L,
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
}

function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0))
}

function randomPiece() {
  const keys = Object.keys(TETROMINOES)
  const key = keys[Math.floor(Math.random() * keys.length)]
  const piece = TETROMINOES[key]
  return {
    key,
    color: piece.color,
    shape: piece.shape.map((row) => [...row]),
  }
}

function rotateMatrix(matrix) {
  const rows = matrix.length
  const cols = matrix[0].length
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0))
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      rotated[x][rows - 1 - y] = matrix[y][x]
    }
  }
  return rotated
}

function isValidPosition(board, piece, position) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = position.x + x
        const newY = position.y + y
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) return false
        if (newY >= 0 && board[newY][newX]) return false
      }
    }
  }
  return true
}

function createInitialState() {
  const piece = randomPiece()
  return {
    board: createEmptyBoard(),
    currentPiece: piece,
    position: {
      x: Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2),
      y: 0,
    },
    linesCleared: 0,
    level: 1,
    score: 0,
    gameOver: false,
    won: false,
  }
}

function getDropInterval(level) {
  return Math.max(150, 1000 - (level - 1) * 100)
}

export default function TetrisGame({ onComplete }) {
  const [game, setGame] = useState(createInitialState)
  const [showHint, setShowHint] = useState(true)
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  const boardRef = useRef(null)
  const touchStartRef = useRef(null)
  const { playMove, playRotate, playDrop, playClear, playWin, playGameOver } = useTetrisSounds()
  const prevPieceKeyRef = useRef(null)
  const prevLinesRef = useRef(0)

  const displayBoard = useMemo(() => {
    const newBoard = game.board.map((row) => [...row])
    if (game.currentPiece && !game.gameOver && !game.won) {
      const { currentPiece, position } = game
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const newY = position.y + y
            const newX = position.x + x
            if (newY >= 0 && newY < BOARD_HEIGHT && newX >= 0 && newX < BOARD_WIDTH) {
              newBoard[newY][newX] = currentPiece.color
            }
          }
        }
      }
    }
    return newBoard
  }, [game])

  const lockAndSpawn = (prevGame) => {
    const mergedBoard = prevGame.board.map((row) => [...row])
    const { currentPiece, position } = prevGame

    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const newY = position.y + y
          const newX = position.x + x
          if (newY >= 0) {
            mergedBoard[newY][newX] = currentPiece.color
          }
        }
      }
    }

    const fullRows = []
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      if (mergedBoard[y].every((cell) => cell !== 0)) {
        fullRows.push(y)
      }
    }

    let nextBoard = mergedBoard.filter((_, index) => !fullRows.includes(index))
    const cleared = fullRows.length
    while (nextBoard.length < BOARD_HEIGHT) {
      nextBoard.unshift(Array(BOARD_WIDTH).fill(0))
    }

    const nextPiece = randomPiece()
    const nextPosition = {
      x: Math.floor((BOARD_WIDTH - nextPiece.shape[0].length) / 2),
      y: 0,
    }

    const totalLines = prevGame.linesCleared + cleared
    const nextLevel = Math.floor(totalLines / 3) + 1
    const lineScore = cleared === 4 ? 800 : cleared === 3 ? 500 : cleared === 2 ? 300 : cleared === 1 ? 100 : 0
    const nextScore = prevGame.score + lineScore * prevGame.level

    if (!isValidPosition(nextBoard, nextPiece, nextPosition)) {
      return {
        ...prevGame,
        board: nextBoard,
        linesCleared: totalLines,
        score: nextScore,
        level: nextLevel,
        gameOver: true,
      }
    }

    const hasWon = totalLines >= LINES_TO_WIN

    if (hasWon) {
      return {
        ...prevGame,
        board: nextBoard,
        linesCleared: totalLines,
        score: nextScore,
        level: nextLevel,
        won: true,
      }
    }

    return {
      ...prevGame,
      board: nextBoard,
      currentPiece: nextPiece,
      position: nextPosition,
      linesCleared: totalLines,
      score: nextScore,
      level: nextLevel,
    }
  }

  const move = useCallback((dx) => {
    setGame((prev) => {
      if (prev.gameOver || prev.won) return prev
      const newPosition = { ...prev.position, x: prev.position.x + dx }
      if (isValidPosition(prev.board, prev.currentPiece, newPosition)) {
        playMove()
        return { ...prev, position: newPosition }
      }
      return prev
    })
  }, [playMove])

  const moveDown = useCallback(() => {
    setGame((prev) => {
      if (prev.gameOver || prev.won) return prev
      const newPosition = { ...prev.position, y: prev.position.y + 1 }
      if (isValidPosition(prev.board, prev.currentPiece, newPosition)) {
        return { ...prev, position: newPosition }
      }
      return lockAndSpawn(prev)
    })
  }, [])

  const hardDrop = useCallback(() => {
    setGame((prev) => {
      if (prev.gameOver || prev.won) return prev
      let newY = prev.position.y
      while (isValidPosition(prev.board, prev.currentPiece, { ...prev.position, y: newY + 1 })) {
        newY += 1
      }
      return lockAndSpawn({ ...prev, position: { ...prev.position, y: newY } })
    })
  }, [])

  const rotate = useCallback(() => {
    setGame((prev) => {
      if (prev.gameOver || prev.won) return prev
      const rotatedPiece = {
        ...prev.currentPiece,
        shape: rotateMatrix(prev.currentPiece.shape),
      }
      const kicks = [0, -1, 1, -2, 2]
      for (const kick of kicks) {
        const newPosition = { ...prev.position, x: prev.position.x + kick }
        if (isValidPosition(prev.board, rotatedPiece, newPosition)) {
          playRotate()
          return { ...prev, currentPiece: rotatedPiece, position: newPosition }
        }
      }
      return prev
    })
  }, [playRotate])

  const restart = useCallback(() => {
    setGame(createInitialState())
    setShowHint(true)
  }, [])

  useEffect(() => {
    if (game.won) {
      playWin()
      const timeout = window.setTimeout(onComplete, 1500)
      return () => window.clearTimeout(timeout)
    }
  }, [game.won, onComplete, playWin])

  useEffect(() => {
    if (game.gameOver) {
      playGameOver()
    }
  }, [game.gameOver, playGameOver])

  useEffect(() => {
    if (game.linesCleared > prevLinesRef.current) {
      playClear()
    }
    prevLinesRef.current = game.linesCleared
  }, [game.linesCleared, playClear])

  useEffect(() => {
    if (game.gameOver || game.won) return
    if (prevPieceKeyRef.current && prevPieceKeyRef.current !== game.currentPiece.key) {
      playDrop()
    }
    prevPieceKeyRef.current = game.currentPiece.key
  }, [game.currentPiece.key, game.gameOver, game.won, playDrop])

  useEffect(() => {
    if (game.gameOver || game.won) return
    const interval = window.setInterval(() => {
      moveDown()
    }, getDropInterval(game.level))
    return () => window.clearInterval(interval)
  }, [game.gameOver, game.won, game.level, moveDown])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (game.gameOver || game.won) return
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          move(-1)
          break
        case 'ArrowRight':
          event.preventDefault()
          move(1)
          break
        case 'ArrowDown':
          event.preventDefault()
          moveDown()
          break
        case 'ArrowUp':
        case ' ':
          event.preventDefault()
          rotate()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [game.gameOver, game.won, move, moveDown, rotate])

  useEffect(() => {
    const timer = window.setTimeout(() => setShowHint(false), 5000)
    return () => window.clearTimeout(timer)
  }, [])

  const handleTouchStart = useCallback((event) => {
    if (game.gameOver || game.won) return
    const touch = event.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }
  }, [game.gameOver, game.won])

  const handleTouchMove = useCallback((event) => {
    if (touchStartRef.current) {
      event.preventDefault()
    }
  }, [])

  const handleTouchEnd = useCallback((event) => {
    if (!touchStartRef.current || game.gameOver || game.won) return

    const touch = event.changedTouches[0]
    const start = touchStartRef.current
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    const dt = Date.now() - start.time
    touchStartRef.current = null

    const minSwipe = 30
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    // Tap = rotate
    if (absDx < minSwipe && absDy < minSwipe && dt < 250) {
      rotate()
      return
    }

    if (absDx > absDy) {
      if (dx > minSwipe) move(1)
      else if (dx < -minSwipe) move(-1)
    } else {
      if (dy > minSwipe) {
        hardDrop()
      } else if (dy < -minSwipe) {
        rotate()
      }
    }
  }, [game.gameOver, game.won, move, rotate, hardDrop])

  const progressPercent = Math.min(100, (game.linesCleared / LINES_TO_WIN) * 100)

  return (
    <section className="relative mb-6 sm:mb-8 md:mb-10" aria-labelledby="tetris-titulo">
      <div className="rounded-3xl bg-gradient-to-br from-rose-200 to-purple-300 p-1 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="rounded-[1.35rem] bg-white p-4 sm:p-6 md:p-7">
          <div className="mb-3 flex items-center gap-2 md:mb-4">
            <Trophy className="h-5 w-5 text-purple-400" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-400">
              Minijuego del día
            </span>
          </div>

          <h2
            id="tetris-titulo"
            className="mb-4 text-lg font-bold leading-snug text-gray-800 sm:text-xl md:mb-5 md:text-2xl"
          >
            Completa 5 líneas para desbloquear la pregunta de hoy
          </h2>

          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start">
            <div
              ref={boardRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative mx-auto aspect-[10/20] w-full max-w-[260px] touch-none rounded-xl border-4 border-purple-100 bg-stone-100 p-1 shadow-inner sm:mx-0"
            >
              {isTouchDevice ? (
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-gradient-to-b from-purple-500/5 to-pink-500/5">
                  <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium text-purple-500 shadow-sm backdrop-blur-sm">
                    Toca para rotar · Desliza para jugar
                  </span>
                </div>
              ) : null}
              <div
                className="grid h-full w-full gap-px"
                style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))` }}
              >
                {displayBoard.map((row, rowIndex) =>
                  row.map((cell, cellIndex) => (
                    <div
                      key={`${rowIndex}-${cellIndex}`}
                      className="rounded-[1px]"
                      style={{
                        backgroundColor: cell || 'transparent',
                        boxShadow: cell ? 'inset 0 0 0 1px rgba(255,255,255,0.3)' : 'none',
                      }}
                      aria-hidden="true"
                    />
                  ))
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 sm:pt-2">
              <div className="rounded-2xl bg-purple-50 p-3 sm:p-4">
                <p className="text-xs text-purple-500 sm:text-sm">Líneas completadas</p>
                <p className="text-2xl font-bold text-gray-800 sm:text-3xl">
                  {game.linesCleared} <span className="text-base font-medium text-gray-500">/ {LINES_TO_WIN}</span>
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-purple-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-rose-50 p-3 sm:p-4">
                  <p className="text-xs text-rose-500 sm:text-sm">Nivel</p>
                  <p className="text-xl font-bold text-gray-800 sm:text-2xl">{game.level}</p>
                </div>
                <div className="rounded-2xl bg-pink-50 p-3 sm:p-4">
                  <p className="text-xs text-pink-500 sm:text-sm">Puntos</p>
                  <p className="text-xl font-bold text-gray-800 sm:text-2xl">{game.score.toLocaleString()}</p>
                </div>
              </div>

              {showHint ? (
                <p className="animate-fade-in-up rounded-xl bg-stone-50 p-2 text-center text-xs text-gray-500 sm:text-sm">
                  {isTouchDevice
                    ? 'Desliza izquierda/derecha para mover, arriba para rotar, abajo para caer al instante, o toca para rotar'
                    : 'Usa las flechas del teclado o los botones de abajo'}
                </p>
              ) : null}
            </div>
          </div>

          {game.won ? (
            <div className="animate-fade-in-up rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-4 text-center sm:p-5">
              <p className="text-lg font-bold text-gray-800 sm:text-xl">¡Lo lograste! 🎉</p>
              <p className="text-sm text-gray-600 sm:text-base">Preparando la pregunta del día...</p>
            </div>
          ) : game.gameOver ? (
            <div className="animate-fade-in-up rounded-2xl bg-red-50 p-4 text-center sm:p-5">
              <p className="mb-3 text-lg font-bold text-gray-800 sm:text-xl">¡Se acabó el juego!</p>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-xl bg-red-400 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-500 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 sm:text-base"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Intentar de nuevo
              </button>
            </div>
          ) : isTouchDevice ? (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-center text-xs text-gray-500 sm:text-sm">
              <div className="flex items-center gap-1.5">
                <span className="rounded-lg bg-purple-100 px-2 py-1">👈 Deslizar</span>
                <span>mover</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-lg bg-pink-100 px-2 py-1">👆 Tocar</span>
                <span>rotar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-lg bg-rose-100 px-2 py-1">👇 Deslizar abajo</span>
                <span>caer</span>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => move(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm transition-all active:scale-90 hover:bg-purple-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:h-14 sm:w-14"
                aria-label="Mover izquierda"
              >
                <MoveLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={rotate}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600 shadow-sm transition-all active:scale-90 hover:bg-pink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 sm:h-14 sm:w-14"
                  aria-label="Rotar pieza"
                >
                  <RotateCw className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={moveDown}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600 shadow-sm transition-all active:scale-90 hover:bg-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 sm:h-14 sm:w-14"
                  aria-label="Bajar rápido"
                >
                  <MoveDown className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => move(1)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm transition-all active:scale-90 hover:bg-purple-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:h-14 sm:w-14"
                aria-label="Mover derecha"
              >
                <MoveRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
