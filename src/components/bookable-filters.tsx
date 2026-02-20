import { SlidersHorizontal } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from '@/lib/utils';

const BookableFilters = ({ side = 'right', triggerClassName, contentClassName }: { side?: 'right' | 'bottom', triggerClassName?: string, contentClassName?: string }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className={cn('shadow-xs p-4 h-12 rounded-full border inline-flex gap-2 items-center cursor-pointer bg-background dark:bg-input/30 dark:hover:bg-muted hover:bg-muted transition-all duration-200 ease-in-out', triggerClassName)}>
                    <SlidersHorizontal size={16} />
                    Filters
                </div>
            </SheetTrigger>
            <SheetContent side={side} className={contentClassName}>
                <SheetHeader className='gap-0'>
                    <SheetTitle>Add Filters</SheetTitle>
                    <SheetDescription>Customise your search</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default BookableFilters