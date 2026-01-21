import { CELLS_TO_SHOW, TOTAL_AMOUNT } from '@/consts/cellsToShow'
import { type Cell } from '@/components/Board/Board.consts'
import { fillGrid } from './fillGrid'

type CreateBoardResult = {
    solution: Cell[]
    puzzle: Cell[]
}

export interface IcreateBoardProps {
    complexity?: 'easy' | 'medium' | 'hard'
}

export const createBoard = ({ complexity = 'medium' }: IcreateBoardProps = {}): CreateBoardResult => {
    const grid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0))
    let cellsToShow = CELLS_TO_SHOW
    if (complexity === 'easy') {
        cellsToShow = 45
    } else if (complexity === 'medium') {
        cellsToShow = 36
    } else if (complexity === 'hard') {
        cellsToShow = 27
    }

    fillGrid(grid, 0)

    const solution: Cell[] = []
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            solution.push({ number: grid[row][col], row, col })
        }
    }

    const puzzle: Cell[] = []
    const indices = Array.from({ length: TOTAL_AMOUNT }, (_, i) => i)

    for (let i = 0; i < cellsToShow; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length)
        const cellIndex = indices.splice(randomIndex, 1)[0]
        puzzle.push(solution[cellIndex])
    }

    return { solution, puzzle }
}

