import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { shuffleNums } from './helpers/shuffleNums'
import { checkNum } from './helpers/checkNum'
import { checkGameIsOver } from './helpers/checkGameIsOver'
import { KeyBoardNumbers } from "../KeyBoardNumbers/KeyBoardNumbers"
import { CELLS_TO_SHOW } from "@/consts/cellsToShow"


type Cell = {
    number: number
    row: number
    col: number
}

const fillCells = (grid: number[][], row: number, col: number): boolean => {
    if (row === 9) {
        return true
    }

    const nextR = col === 8 ? row + 1 : row
    const nextC = col === 8 ? 0 : col + 1

    const digits = shuffleNums([1, 2, 3, 4, 5, 6, 7, 8, 9])
    for (const digit of digits) {
        if (checkNum(grid, row, col, digit)) {
            grid[row][col] = digit
            if (fillCells(grid, nextR, nextC)) {
                return true
            }
            grid[row][col] = 0
        }
    }
    return false
}

const generateFullBoard = (): Cell[] => {
    
    const grid: number [][] = Array.from({length: 9}, () => Array(9).fill(0))
    fillCells(grid, 0, 0)

    const cells: Cell[] = []
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            cells.push({ number: grid[row][col], row, col })
        }
    }

    return cells
}

const generatePuzzle = () => {
    const solution = generateFullBoard()
    const puzzle: Cell[] = []
    const indices = Array.from({ length: 81 }, (_, i) => i)
    
    for (let i = 0; i < CELLS_TO_SHOW; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length)
        const cellIndex = indices.splice(randomIndex, 1)[0]
        puzzle.push(solution[cellIndex])
    }

    return { puzzle, solution }
}


export const Board = () => {
    const [{ puzzle, solution }, setGame] = useState(generatePuzzle)
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
    const [userInputs, setUserInputs] = useState<Record<string, number>>({})
    const [wrongCell, setWrongCell] = useState<{ row: number; col: number; digit: number } | null>(null)
    const [isGameOver, setIsGameOver] = useState(false)

    
    const createBoard = () => {
        setGame(generatePuzzle())
        setSelectedCell(null)
        setUserInputs({})
        setIsGameOver(false)
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
            const newInputs = { ...userInputs, [`${row}-${col}`]: digit }
            setUserInputs(newInputs)

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
                <Button variant="outline" onClick={createBoard}>New Game</Button>
            </div>
            <div className="grid grid-cols-9 w-fit border-2 border-foreground">
                {grid.map((row, rowIndex) =>
                    row.map((cellValue, colIndex) => (
                        <div
                            onClick={() => setSelectedCell({row: rowIndex, col: colIndex})}
                            key={`${rowIndex}-${colIndex}`}
                            className={`
                                lg:w-12 lg:h-12 w-10 h-10 text-center flex items-center justify-center
                                cursor-pointer hover:bg-muted
                                ${colIndex !== 8 ? 'border-r' : ''}
                                ${rowIndex !== 8 ? 'border-b' : ''}
                                ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-r-foreground' : 'border-r-border'}
                                ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-b-foreground' : 'border-b-border'}
                                ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-muted' : ''}
                                ${wrongCell?.row === rowIndex && wrongCell?.col === colIndex ? 'text-red-500 bg-red-100' : ''}
                            `}
                        >
                            {wrongCell?.row === rowIndex && wrongCell?.col === colIndex
                                ? wrongCell.digit
                                : cellValue !== 0 ? cellValue : ''}
                        </div>
                    ))
                )}
            </div>
            {isGameOver ? (
                <div className="text-center py-4 text-green-600 font-bold text-xl">
                    Congratulations! You won!
                </div>
            ) : (
                <KeyBoardNumbers onNumberClick={handleNumberInput}/>
            )}
        </Card>
    )
}
