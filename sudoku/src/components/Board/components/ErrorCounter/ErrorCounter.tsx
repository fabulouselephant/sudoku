interface IErrorCounterProps {
    errorCounter: number
}

export const ErrorCounter = ({errorCounter}: IErrorCounterProps) => {
    return (
        <div className="font-mono text-foreground text-sm">errors:{errorCounter}</div>
    )
}