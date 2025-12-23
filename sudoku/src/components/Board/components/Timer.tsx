import { useEffect, useState } from "react"

const STORAGE_KEY = 'sudoku-game-timer'

type TimerProps = {
    isRunning: boolean
    onReset?: () => void
}

const formatTime = (seconds: number): string => {
    const hours =  Math.floor(seconds / 3600)
    const mins = Math.floor((seconds - (hours * 3600)) / 60)
    const secs = (seconds - (hours * 3600) - (mins * 60))
    return `${hours ? `${hours.toString().padStart(2, '0')}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const Timer = ({ isRunning }: TimerProps) => {
    const [timeSpent, setTimeSpent] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : 0
    })

    useEffect(() => {
        if (!isRunning) return

        const interval = setInterval(() => {
            setTimeSpent((prev: number) => {
                const newTime = prev + 1
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newTime))
                return newTime
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning])

    return (
        <div className="font-mono">{formatTime(timeSpent)}</div>
    )
}

export const resetTimer = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(0))
}