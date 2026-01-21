import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface IComplexitySelectionProps {
    onClick: (complexity: 'easy' | 'medium' | 'hard') => void
}
export const ComplexitySelection = ({ onClick }: IComplexitySelectionProps) => {
    const [complexity, setComplexity] = useState<'easy' | 'medium' | 'hard'>('medium')
    const handleClick = (complexity: 'easy' | 'medium' | 'hard') => {
        onClick(complexity)
        setComplexity(complexity)
    }
    return (
       <DropdownMenu>
        <DropdownMenuTrigger><Button variant="ghost" className="text-foreground bg-background hover:bg-accent/90">{complexity}</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Complexity</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-sm hover:bg-accent hover:text-accent-foreground user-color-7" onClick={() => handleClick('easy')}>Easy</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm hover:bg-accent hover:text-accent-foreground user-color-2" onClick={() => handleClick('medium')}>Medium</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm hover:bg-accent hover:text-accent-foreground user-color-5" onClick={() => handleClick('hard')}>Hard</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}