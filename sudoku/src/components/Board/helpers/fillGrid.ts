import { TOTAL_AMOUNT } from "@/consts/cellsToShow"
import { shuffleNums} from "./shuffleNums"
import { checkNum } from "./checkNum"

export const fillGrid = (grid: number[][], cellIndex: number): boolean => {
    if (cellIndex === TOTAL_AMOUNT) {
        return true
    }

    const row = Math.floor(cellIndex / 9)
    const col = cellIndex % 9

    const digits = shuffleNums([1, 2, 3, 4, 5, 6, 7, 8, 9])

    for (const digit of digits) {
        if (checkNum(grid, row, col, digit)) {
            grid[row][col] = digit

            if (fillGrid(grid, cellIndex + 1)) {
                return true
            }
            grid[row][col] = 0
        }
    }
    return false
}