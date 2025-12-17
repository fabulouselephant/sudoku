import { Button } from "../ui/button"

interface IKeyboardNumberProps {
    onNumberClick: (digit: number) => void
}

export const KeyBoardNumbers = ({ onNumberClick }: IKeyboardNumberProps) => {
    const keyBoardArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className="flex gap-2 justify-between">
            {keyBoardArray.map((num: number) =>
                <Button variant="outline" key={num} onClick={() => onNumberClick(num)} size={"icon-sm"}>{num}</Button>
            )}
        </div>
    )
}