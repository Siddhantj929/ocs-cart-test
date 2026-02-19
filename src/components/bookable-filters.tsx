import { SlidersHorizontal } from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const BookableFilters = ({ side = 'right', className }: { side?: 'right' | 'bottom', className?: string }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='shadow-xs py-8 px-6 h-16 rounded-full border inline-flex gap-2 items-center cursor-pointer bg-background hover:bg-muted'>
                    <SlidersHorizontal size={16} />
                    Filters
                </div>
            </SheetTrigger>
            <SheetContent side={side} className={className}>
                <SheetHeader className='gap-0'>
                    <SheetTitle>Add Filters</SheetTitle>
                    <SheetDescription>Customise your search</SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default BookableFilters