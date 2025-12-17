import { CELLS_TO_SHOW } from '@/consts/cellsToShow'
import { type Cell } from '@/components/Board/Board.consts'
import { fillGrid } from './fillGrid'

type CreateBoardResult = {
    solution: Cell[]
    puzzle: Cell[]
}

export const createBoard = (): CreateBoardResult => {
    const grid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0))

    fillGrid(grid, 0)

    const solution: Cell[] = []
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            solution.push({ number: grid[row][col], row, col })
        }
    }

    const puzzle: Cell[] = []
    const indices = Array.from({ length: 81 }, (_, i) => i)

    for (let i = 0; i < CELLS_TO_SHOW; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length)
        const cellIndex = indices.splice(randomIndex, 1)[0]
        puzzle.push(solution[cellIndex])
    }

    return { solution, puzzle }
}

