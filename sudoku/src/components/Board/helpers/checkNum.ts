export const checkNum = (grid: number[][], row: number, col: number, val: number): boolean => {
    for (let j = 0; j < 9; j++) {
        if (grid[row][j] === val) return false
    }

    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === val) return false
    }

    const boxRow = Math.floor(row / 3) * 3
    const boxCol = Math.floor(col / 3) * 3

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[boxRow + i][boxCol + j] === val) return false
        }
    }

    return true
}