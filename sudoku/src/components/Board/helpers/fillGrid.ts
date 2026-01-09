import { TOTAL_AMOUNT } from "@/consts/cellsToShow"
import { shuffleNums } from "./shuffleNums"
import { checkNum } from "./checkNum"

const GRID_SIZE = 9
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const getRowFromIndex = (cellIndex: number) => Math.floor(cellIndex / GRID_SIZE)
const getColFromIndex = (cellIndex: number) => cellIndex % GRID_SIZE

export const fillGrid = (grid: number[][], cellIndex: number): boolean => {
    const isGridComplete = cellIndex === TOTAL_AMOUNT
    if (isGridComplete) {
        return true
    }

    const row = getRowFromIndex(cellIndex)
    const col = getColFromIndex(cellIndex)
    const shuffledDigits = shuffleNums(DIGITS)

    for (const digit of shuffledDigits) {
        const isValidPlacement = checkNum(grid, row, col, digit)
        if (isValidPlacement) {
            grid[row][col] = digit

            const isSolved = fillGrid(grid, cellIndex + 1)
            if (isSolved) {
                return true
            }

            grid[row][col] = 0
        }
    }

    return false
}