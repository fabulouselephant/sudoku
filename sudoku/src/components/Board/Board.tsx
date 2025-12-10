import { useEffect, useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { shuffleNums } from './helpers/shuffleNums'
import { checkNum } from './helpers/checkNum'

type Cell = {
    number: number
    row: number
    col: number
}

const fillCell = (grid: number[][], row: number, col: number): boolean => {
    if (row === 9) {
        return true
    }

    const nextR = col === 8 ? row + 1 : row
    const nextC = col === 8 ? 0 : col + 1

    const digits = shuffleNums([1, 2, 3, 4, 5, 6, 7, 8, 9])
    for (const d of digits) {
        if (checkNum(grid, row, col, d)) {
            grid[row][col] = d
            if (fillCell(grid, nextR, nextC)) {
                return true
            }
            grid[row][col] = 0
        }
    }
    return false
}

const generateFullBoard = (): Cell[] => {
    const grid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0))
    fillCell(grid, 0, 0)

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
    const cellsToShow = 36
    for (let i = 0; i < cellsToShow; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length)
        const cellIndex = indices.splice(randomIndex, 1)[0]
        puzzle.push(solution[cellIndex])
    }

    return { puzzle, solution }
}


export const Board = () => {
    const [puzzleBoard, setPuzzleBoard] = useState<Cell[]>([])
    const [solutionBoard, setSolutionBoard] = useState<Cell[]>([])
    const {solution, puzzle} = generatePuzzle()

    const createBoard = () => {
        setPuzzleBoard(puzzle)
    }

    useEffect(() => {
        createBoard()
    }, [])

    
    const grid = Array.from({ length: 9 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => {
            const cell = puzzle.find(c => c.row === row && c.col === col)
            return cell ? cell.number : 0
        })
    )

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
                            key={`${rowIndex}-${colIndex}`}
                            className={`
                                lg:w-12 lg:h-12 w-10 h-10 text-center flex items-center justify-center
                                cursor-pointer hover:bg-muted
                                ${colIndex !== 8 ? 'border-r' : ''}
                                ${rowIndex !== 8 ? 'border-b' : ''}
                                ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-r-foreground' : 'border-r-border'}
                                ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-b-foreground' : 'border-b-border'}
                            `}
                        >
                            {cellValue !== 0 ? cellValue : ''}
                        </div>
                    ))
                )}
            </div>
        </Card>
    )
}
