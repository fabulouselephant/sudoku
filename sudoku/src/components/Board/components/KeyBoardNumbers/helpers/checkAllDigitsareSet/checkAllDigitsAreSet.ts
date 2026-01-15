export const checkAllDigitsAreSet = (grid: number[][], digit: number): boolean => {

    const userInputsCount: Record<number, number> = {}

    for (const row in grid) {
        for(const col in grid[row]) {
            const value = grid[row][col]
            userInputsCount[value] = (userInputsCount[value] || 0) + 1
        }
    }

    return userInputsCount[digit] === 9
}