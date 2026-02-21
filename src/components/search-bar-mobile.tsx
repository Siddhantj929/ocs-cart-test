import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'

const SearchBarMobile = ({
    shrink = false,
    className,
    onOpen,
    onClose,
}: {
    shrink?: boolean
    className?: string
    onOpen?: () => void
    onClose?: () => void
}) => {
    return (
        <div
            className={cn(
                'flex md:hidden w-fit justify-center items-center shadow-xs bg-background dark:bg-input/30 rounded-full border transition-all ease-out duration-200 group/container relative',
                className,
            )}
        >
            <div
                className={cn(
                    'w-28 h-10 rounded-full flex flex-col justify-center items-start p-4 bg-background dark:bg-transparent dark:hover:bg-muted hover:bg-muted cursor-pointer transition-all ease-out duration-200 relative z-10',
                    shrink && 'w-24',
                )}
            >
                <p className="text-sm p-0 m-0">Location</p>
            </div>
            <Separator
                className={cn('self-center h-6 mt-2')}
                orientation="vertical"
            />
            <div
                className={cn(
                    'w-28 h-10 rounded-full flex flex-col justify-center items-start p-4 bg-background dark:bg-transparent dark:hover:bg-muted hover:bg-muted cursor-pointer transition-all ease-out duration-200 relative z-10',
                    shrink && 'w-24',
                )}
            >
                <p className="text-sm p-0 m-0">Dates</p>
            </div>
            <Separator
                className={cn('self-center h-6 mt-2')}
                orientation="vertical"
            />
            <div
                className={cn(
                    'w-28 h-10 rounded-full flex flex-col justify-center items-start p-4 bg-background dark:bg-transparent dark:hover:bg-muted hover:bg-muted cursor-pointer transition-all ease-out duration-200 relative z-10',
                    shrink && 'w-24',
                )}
            >
                <p className="text-sm p-0 m-0">Guests</p>
            </div>
        </div>
    )
}

export default SearchBarMobile
