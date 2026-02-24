import { useState, useMemo, ReactNode, memo, useRef, useEffect } from 'react'
import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Search } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { format, differenceInDays } from 'date-fns'
import { type DateRange } from 'react-day-picker'
import { Input } from './ui/input'
import useBreakpoint, { Breakpoint } from '@/hooks/useBreakpoint'

interface SearchSectionProps {
    className?: string
    active?: boolean
    onClick?: () => void
    children?: ReactNode
    popoverContent?: ReactNode
    popoverContentClassName?: string
    onPopoverClose?: () => void
    popoverOpen?: boolean
    shrink?: boolean
    breakpoint?: Breakpoint
}

const SearchSection = memo(
    ({
        className,
        active = false,
        onClick,
        children,
        popoverContent,
        popoverContentClassName,
        onPopoverClose,
        popoverOpen,
        shrink,
        breakpoint = 'xs'
    }: SearchSectionProps) => {
        if (popoverContent) {
            return (
                <Popover
                    open={popoverOpen}
                    onOpenChange={(open) => {
                        if (!open && onPopoverClose) {
                            onPopoverClose()
                        }
                    }}
                >
                    <PopoverTrigger asChild>
                        <div
                            className={cn(
                                'w-28 h-10 md:w-64 md:h-16 rounded-full flex flex-col justify-center items-start p-4 md:p-8 bg-background dark:bg-transparent dark:hover:bg-muted hover:bg-muted cursor-pointer transition-all ease-out duration-200 relative z-10',
                                active && 'bg-transparent dark:hover:bg-transparent hover:bg-transparent',
                                className,
                                shrink && breakpoint !== 'xsPlus' && 'w-24 md:w-40 md:h-12 md:p-4',
                                shrink && breakpoint === 'xsPlus' && 'w-28',
                            )}
                            onClick={onClick}
                        >
                            {children}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className={popoverContentClassName}>
                        {popoverContent}
                    </PopoverContent>
                </Popover>
            )
        }

        return (
            <div
                className={cn(
                    'w-28 h-10 md:w-64 md:h-16 rounded-full flex flex-col justify-center items-start p-4 md:p-8 bg-background dark:bg-transparent dark:hover:bg-muted hover:bg-muted cursor-pointer transition-all ease-out duration-200 relative z-10',
                    active && 'bg-transparent dark:hover:bg-transparent hover:bg-transparent',
                    className,
                    shrink && 'w-24 md:w-40 md:h-12 md:p-4',
                )}
                onClick={onClick}
            >
                {children}
            </div>
        )
    },
)

SearchSection.displayName = 'SearchSection'

const SearchBar = ({
    shrink = false,
    hideSearchButton = false,
    className,
    onOpen,
    onClose,
}: {
    shrink?: boolean
    hideSearchButton?: boolean
    className?: string
    onOpen?: () => void
    onClose?: () => void
}) => {
    const [activeSection, setActiveSection] = useState<
        'location' | 'dates' | 'guests' | null
    >(null)
    const [date, setDate] = useState<DateRange | undefined>(undefined)
    const locationInputRef = useRef<HTMLInputElement>(null)
    const popoverCloseTimeoutRef = useRef<any>(null)
    const hasBeenOpenedRef = useRef(false)
    const breakpoint = useBreakpoint();
    const isWindowMdPlus = useMemo(() => breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl', [breakpoint])

    const isSearchBarActive = useMemo(
        () => activeSection !== null,
        [activeSection],
    )

    useEffect(() => {
        if (activeSection === 'location' && locationInputRef.current) {
            // Small delay to ensure popover is open and input is rendered
            if (breakpoint !== 'xsPlus') {
                setTimeout(() => {
                    locationInputRef.current?.focus()
                }, 0)
            }
        }

    }, [activeSection])

    useEffect(() => {
        if (isSearchBarActive) hasBeenOpenedRef.current = true;

        if (!isSearchBarActive) {
            const timeoutId = setTimeout(() => {
                if (hasBeenOpenedRef.current === true) onClose?.();
                hasBeenOpenedRef.current = false;
            }, 200);
            return () => clearTimeout(timeoutId);
        }
    }, [isSearchBarActive])

    const handleLocationClick = () => {
        onOpen?.()
        clearTimeout(popoverCloseTimeoutRef.current);
        setActiveSection(activeSection === 'location' ? null : 'location')
    }

    const handleDatesClick = () => {
        onOpen?.()
        clearTimeout(popoverCloseTimeoutRef.current);
        setActiveSection(activeSection === 'dates' ? null : 'dates')
    }

    const handleGuestsClick = () => {
        onOpen?.()
        clearTimeout(popoverCloseTimeoutRef.current);
        setActiveSection(activeSection === 'guests' ? null : 'guests')
    }

    const handleDateSelect = (
        selectedDate: DateRange | undefined,
        selectedDay: Date,
    ) => {
        if (!selectedDate) {
            setDate(undefined)
            return
        }

        if (date?.from && date?.to) {
            const isSameDate = date.from.getTime() === date.to.getTime()

            if (!isSameDate) {
                setDate({
                    from: selectedDay,
                    to: undefined,
                })
            } else {
                setDate(selectedDate)
            }
        } else {
            setDate(selectedDate)
        }
    }

    const handlePopoverClose = (sectionName: string) => {
        if (activeSection === sectionName) {
            popoverCloseTimeoutRef.current = setTimeout(() => {
                setActiveSection(null);
            }, 50)
        }
    }

    return (
        <div
            className={cn(
                'flex w-fit justify-center items-center shadow-xs bg-background dark:bg-input/30 rounded-full border transition-all ease-out duration-200 group/container relative',
                isSearchBarActive && 'bg-muted',
                className,
            )}
        >
            <div
                key="animated-background"
                style={{
                    transform: `translateX(${activeSection === 'location' ? '0' : activeSection === 'dates' ? isWindowMdPlus ? '16rem' : breakpoint === 'xsPlus' ? '7rem' : '6rem' : activeSection === 'guests' ? isWindowMdPlus ? '32rem' : breakpoint === 'xsPlus' ? '14rem' : '12rem' : '0'})`,
                }}
                className={cn(
                    'w-24 h-10 md:w-64 md:h-16 rounded-full bg-background dark:bg-muted absolute top-0 left-0 origin-center scale-0 opacity-0 z-0 transition-[transform,scale,opacity] duration-300 ease-in-out',
                    breakpoint === 'xsPlus' && "w-28",
                    isSearchBarActive && 'scale-100 opacity-100',
                )}
            />
            <SearchSection
                shrink={shrink}
                breakpoint={breakpoint}
                className="location"
                active={isSearchBarActive}
                onClick={handleLocationClick}
                popoverContent={<div>Location</div>}
                popoverContentClassName="w-64"
                popoverOpen={activeSection === 'location'}
                onPopoverClose={() => handlePopoverClose('location')}
            >
                {!shrink && (
                    <h3 className="hidden md:block text-xs text-muted-foreground mb-0.5">Where</h3>
                )}
                <Input
                    ref={locationInputRef}
                    className="text-sm p-0 m-0 bg-transparent dark:bg-transparent border-0 rounded-none focus-visible:border-0 focus-visible:ring-0 shadow-none max-w-5/6"
                    placeholder="Location"
                />
            </SearchSection>
            <Separator
                className={cn(
                    'self-center h-6 mt-2 md:h-10 md:mt-3 group-has-[.location:hover:not(.bg-transparent)]/container:invisible group-has-[.dates:hover:not(.bg-transparent)]/container:invisible',
                    (activeSection === 'location' || activeSection === 'dates') &&
                    'hidden',
                    shrink && 'md:mt-2.5 md:h-7',
                )}
                orientation="vertical"
            />
            <SearchSection
                shrink={shrink}
                breakpoint={breakpoint}
                className="dates"
                active={isSearchBarActive}
                onClick={handleDatesClick}
                popoverContent={
                    <Calendar
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateSelect}
                        numberOfMonths={2}
                        className="[--cell-size:--spacing(10)]"
                    />
                }
                popoverContentClassName="w-auto p-0"
                popoverOpen={activeSection === 'dates'}
                onPopoverClose={() => handlePopoverClose('dates')}
            >
                {!shrink && (
                    <h3 className="hidden md:block text-xs text-muted-foreground mb-0.5">When</h3>
                )}
                <p className="text-sm p-0 m-0">
                    {date?.from ? (
                        date.to ? (
                            <>
                                {isWindowMdPlus ? (
                                    <>
                                        {format(date.from, 'LLL dd')} - {format(date.to, 'LLL dd')}
                                    </>
                                ) : (
                                    `${differenceInDays(date.to, date.from)} nights`
                                )}
                            </>
                        ) : (
                            format(date.from, 'LLL dd')
                        )
                    ) : (
                        'Dates'
                    )}
                </p>
            </SearchSection>
            <Separator
                className={cn(
                    'self-center h-6 mt-2 md:h-10 md:mt-3 group-has-[.dates:hover:not(.bg-transparent)]/container:invisible group-has-[.guests:hover:not(.bg-transparent)]/container:invisible',
                    (activeSection === 'guests' || activeSection === 'dates') && 'hidden',
                    shrink && 'md:mt-2.5 md:h-7',
                )}
                orientation="vertical"
            />
            <SearchSection
                shrink={shrink}
                breakpoint={breakpoint}
                className="guests"
                active={isSearchBarActive}
                onClick={handleGuestsClick}
                popoverContent={<div>Guests</div>}
                popoverContentClassName="w-64"
                popoverOpen={activeSection === 'guests'}
                onPopoverClose={() => handlePopoverClose('guests')}
            >
                {!shrink && (
                    <h3 className="hidden md:block text-xs text-muted-foreground mb-0.5">Who</h3>
                )}
                <p className="text-sm p-0 m-0">Guests</p>
            </SearchSection>
            <Button
                className={cn(
                    'h-10.5 w-10.5 md:h-13 md:w-13 rounded-full absolute right-2 z-20 cursor-pointer transition-all duration-200 ease-in-out opacity-100 scale-100',
                    isSearchBarActive && 'md:w-24',
                    shrink && 'md:h-11 md:w-11 -right-12.5 md:right-0.5',
                    hideSearchButton && !isSearchBarActive && "opacity-0 scale-0"
                )}
                size="icon-lg"
            >
                <Search />
                {isSearchBarActive && (
                    <span className="hidden md:inline-block ml-1.5">Search</span>
                )}
            </Button>
        </div>
    )
}

export default SearchBar
