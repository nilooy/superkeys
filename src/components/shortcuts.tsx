import { FunctionComponent } from 'preact'

export const Shortcuts: FunctionComponent<{
    command: string
    size?: string
}> = ({ command = '', size = 'md' }) => {
    const cmdArray: string[] = command.split('+') || []

    return (
        <span>
            {!!cmdArray.length &&
                cmdArray.map((cmd, index) => (
                    <span key={cmd}>
                        {index ? '+' : ''}
                        <kbd
                            key={`key-${cmd}`}
                            className={`kbd kbd-${size} mx-1`}
                        >
                            {cmd}
                        </kbd>
                    </span>
                ))}
        </span>
    )
}
