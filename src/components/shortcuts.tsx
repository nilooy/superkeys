import { FunctionComponent } from 'preact'
import { memo } from 'preact/compat'

export const Shortcuts: FunctionComponent<{
 command: string
 size?: string
}> = memo(
 ({ command = '', size = 'md' }) => {
  const cmdArray: string[] = command.split('+') || []

  return (
   <span>
    {!!cmdArray.length &&
     cmdArray.map((cmd, index) => (
      <span key={cmd}>
       {index ? '+' : ''}
       <kbd key={`key-${cmd}`} className={`kbd kbd-${size} mx-1`}>
        {cmd}
       </kbd>
      </span>
     ))}
   </span>
  )
 },
 (prev, next) => prev.command === next.command,
)
