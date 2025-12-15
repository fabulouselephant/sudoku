
type Cell = {
    number: number
        row: number
        col: number
    }

export const checkGameIsOver = (grid: number[][], solution: Cell[]): boolean => {
    for (const cell of solution) {
        if (grid[cell.row][cell.col] !== cell.number) {
            return false
        }
    }
    return true
}

