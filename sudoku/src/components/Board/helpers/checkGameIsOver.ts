import { type Cell } from '@/components/Board/Board.consts'

export const checkGameIsOver = (grid: number[][], solution: Cell[], puzzle: Cell[]): boolean => {
    const puzzleKeys = new Set(puzzle.map((c) => `${c.row}-${c.col}`))
    for (const cell of solution) {
        if (puzzleKeys.has(`${cell.row}-${cell.col}`)) continue
        if (grid[cell.row][cell.col] !== cell.number) {
            return false
        }
    }
    return true
}

