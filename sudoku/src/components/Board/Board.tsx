import { createBoard } from "./helpers/createBoard"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { KeyBoardNumbers } from "../KeyBoardNumbers/KeyBoardNumbers"
import { checkGameIsOver } from "./helpers/checkGameIsOver"
import { type Cell } from "./Board.consts"
import Confetti from 'react-confetti-boom'
import { Timer, resetTimer } from "./components/Timer"

const STORAGE_KEY = 'sudoku-game'

const getRandomColorClass = () => `user-color-${Math.floor(Math.random() * 9) + 1}`

type GameState = {
    puzzle: Cell[]
    solution: Cell[]
    userInputs: Record<string, number>
    userColors: Record<string, string>
    isGameOver: boolean
}

const loadGame = (): GameState | null => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
        return JSON.parse(saved)
    }
    return null
}

const saveGame = (state: GameState): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const Board = () => {
    const [{solution, puzzle}, setGame] = useState(() => {
        const saved = loadGame()
        if (saved) {
            return { puzzle: saved.puzzle, solution: saved.solution }
        }
        return createBoard()
    })

    const [highlightedDigit, setHighlightedCells] = useState<number | null>(null)
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
    const [userInputs, setUserInputs] = useState<Record<string, number>>(() => {
        const saved = loadGame()
        return saved?.userInputs ?? {}
    })
    const [userColors, setUserColors] = useState<Record<string, string>>(() => {
        const saved = loadGame()
        return saved?.userColors ?? {}
    })
    const [wrongCell, setWrongCell] = useState<{ row: number; col: number; digit: number } | null>(null)
    const [isGameOver, setIsGameOver] = useState(() => {
        const saved = loadGame()
        return saved?.isGameOver ?? false
    })

    const onCellSelect = (rowIndex: number, colIndex: number) => {
        setSelectedCell({row: rowIndex, col: colIndex})

        const selectedDigit = grid[rowIndex][colIndex]

        if (selectedDigit !== 0) {
            setHighlightedCells(selectedDigit)
        } else {
            setHighlightedCells(null)
        }
    }

    useEffect(() => {
        saveGame({ puzzle, solution, userInputs, userColors, isGameOver })
    }, [puzzle, solution, userInputs, userColors, isGameOver])

    const [timerKey, setTimerKey] = useState(0)

    const generateGame = () => {
        const newGame = createBoard()
        setGame(newGame)
        setSelectedCell(null)
        setUserInputs({})
        setUserColors({})
        setIsGameOver(false)
        resetTimer()
        setTimerKey(prev => prev + 1)
    }

    const grid = Array.from({ length: 9 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => {
            const cell = puzzle.find(c => c.row === row && c.col === col)
            if (cell) return cell.number
            const key = `${row}-${col}`
            return userInputs[key] ?? 0
        })
    )
    const handleNumberInput = (digit: number) => {
        if (!selectedCell || isGameOver) return
        const { row, col } = selectedCell
        if (puzzle.find(c => c.row === row && c.col === col)) return

        const correctCell = solution.find(c => c.row === row && c.col === col)
        if (correctCell && correctCell.number === digit) {
            const key = `${row}-${col}`
            const newInputs = { ...userInputs, [key]: digit }
            setUserInputs(newInputs)
            setUserColors(prev => ({ ...prev, [key]: getRandomColorClass() }))

            const newGrid = grid.map((r, ri) =>
                r.map((c, ci) => (ri === row && ci === col ? digit : c))
            )
            if (checkGameIsOver(newGrid, solution)) {
                setIsGameOver(true)
            }
        } else {
            setWrongCell({ row, col, digit })
            setTimeout(() => setWrongCell(null), 1000)
        }
    }
    
    return (
        <Card className="w-fit mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Sudoku</h1>
                <div className="flex justify-between items-center gap-2">
                    <Button variant="outline" onClick={generateGame}>New Game</Button>
                    <Timer key={timerKey} isRunning={!isGameOver} />
                </div>
            </div>
            <div className="grid grid-cols-9 w-fit border-1 border-foreground rounded-sm">
                {grid.map((row, rowIndex) =>
                    row.map((cellValue, colIndex) => {
                        const cellKey = `${rowIndex}-${colIndex}`
                        const colorClass = userColors[cellKey] || ''
                        const isHighlighted = highlightedDigit !== null && cellValue === highlightedDigit
                        const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                        return (
                            <div
                                onClick={() => onCellSelect(rowIndex, colIndex)}
                                key={cellKey}
                                className={`
                                    lg:w-12 lg:h-12 w-10 h-10 text-center flex items-center justify-center
                                    cursor-pointer hover:bg-selected/50
                                    ${colIndex !== 8 ? 'border-r' : ''}
                                    ${rowIndex !== 8 ? 'border-b' : ''}
                                    ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-1 border-r-foreground' : 'border-r-border'}
                                    ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-1 border-b-foreground' : 'border-b-border'}
                                    ${isSelected ? 'bg-selected/50' : ''}
                                    ${isHighlighted && !isSelected ? 'bg-selected/50' : ''}
                                    ${wrongCell?.row === rowIndex && wrongCell?.col === colIndex ? 'text-red-500 bg-red-100' : ''}
                                    ${colorClass}
                                `}
                            >
                                {wrongCell?.row === rowIndex && wrongCell?.col === colIndex
                                    ? wrongCell.digit
                                    : cellValue !== 0 ? cellValue : ''}
                            </div>
                        )
                    })
                )}
            </div>
            {isGameOver ? (
                <>
                <Confetti mode="boom" particleCount={150}/>
                <div className="text-center py-4 text-green-600 font-bold text-xl">
                    Congratulations! You won!
                </div>
                </>
            ) : (
                <KeyBoardNumbers onNumberClick={handleNumberInput}/>
            )}
        </Card>

    )
}