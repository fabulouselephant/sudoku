import { Button } from "../../../ui/button"
import { checkAllDigitsAreSet } from "./helpers/checkAllDigitsareSet/checkAllDigitsAreSet"

interface IKeyboardNumberProps {
    onNumberClick: (digit: number) => void
    grid: number[][],
}

export const KeyBoardNumbers = ({ onNumberClick, grid }: IKeyboardNumberProps) => {
    const keyBoardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className="flex gap-1 justify-between">
            {keyBoardArray.map((num: number) => {
                const allSet = checkAllDigitsAreSet(grid, num)
                    return (
                        <Button disabled={allSet} className="hover:bg-selected/50" variant="outline" key={num} onClick={() => onNumberClick(num)} size={"icon-sm"}>{num}</Button>
                    )
                }
            )}
        </div>
    )
}