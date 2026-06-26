import { useCallback, useRef } from 'react'

function createAudioContext() {
  if (typeof window === 'undefined') return null
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  return AudioContextClass ? new AudioContextClass() : null
}

function resumeContext(ctx) {
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }
}

function playTone(ctx, frequency, type, duration, when, volume = 0.08) {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const t = when || ctx.currentTime

  osc.type = type
  osc.frequency.setValueAtTime(frequency, t)

  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(volume, t + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(t)
  osc.stop(t + duration + 0.05)
}

function playNotes(ctx, notes, type, noteDuration, volume = 0.08) {
  if (!ctx) return
  const now = ctx.currentTime
  notes.forEach((freq, index) => {
    playTone(ctx, freq, type, noteDuration, now + index * noteDuration, volume)
  })
}

export default function useTetrisSounds() {
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext()
    }
    resumeContext(ctxRef.current)
    return ctxRef.current
  }, [])

  const playMove = useCallback(() => {
    const ctx = getCtx()
    playTone(ctx, 220, 'square', 0.06, undefined, 0.05)
  }, [getCtx])

  const playRotate = useCallback(() => {
    const ctx = getCtx()
    playTone(ctx, 440, 'square', 0.08, undefined, 0.05)
  }, [getCtx])

  const playDrop = useCallback(() => {
    const ctx = getCtx()
    playTone(ctx, 130, 'sawtooth', 0.12, undefined, 0.06)
  }, [getCtx])

  const playClear = useCallback(() => {
    const ctx = getCtx()
    playNotes(ctx, [523.25, 659.25, 783.99, 1046.5], 'square', 0.08, 0.06)
  }, [getCtx])

  const playWin = useCallback(() => {
    const ctx = getCtx()
    playNotes(ctx, [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5], 'square', 0.12, 0.07)
  }, [getCtx])

  const playGameOver = useCallback(() => {
    const ctx = getCtx()
    playNotes(ctx, [440, 349.23, 293.66, 220], 'sawtooth', 0.18, 0.06)
  }, [getCtx])

  return {
    playMove,
    playRotate,
    playDrop,
    playClear,
    playWin,
    playGameOver,
  }
}
