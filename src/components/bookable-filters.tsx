import { Diamond, Gem, SlidersHorizontal, Sparkle, Sparkles, WalletMinimal } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from '@/lib/utils';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from './ui/field';
import { Checkbox } from './ui/checkbox';

const BookableFilters = ({ side = 'right', triggerClassName, contentClassName }: { side?: 'right' | 'bottom', triggerClassName?: string, contentClassName?: string }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className={cn('shadow-xs w-10 h-10 md:p-4 md:w-auto md:h-12 rounded-full border inline-flex gap-2 justify-center items-center cursor-pointer bg-background dark:bg-input/30 dark:hover:bg-muted hover:bg-muted transition-all duration-200 ease-in-out', triggerClassName)}>
                    <SlidersHorizontal size={16} />
                    <span className='hidden md:block'>Filters</span>
                </div>
            </SheetTrigger>
            <SheetContent side={side} className={cn(side === 'right' && "min-w-2/5", side === 'bottom' && "min-h-4/5", contentClassName)}>
                <SheetHeader className='gap-0'>
                    {/* <SheetTitle>Add Filters</SheetTitle>
                    <SheetDescription>Customise your search</SheetDescription> */}
                </SheetHeader>
                <div className="px-4">
                    <div>
                        <h3 className='text-base font-medium mb-1'>Living Standards</h3>
                        <p className='text-sm text-muted-foreground'>Select the level of comfort and experience</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3 mt-4">
                            <FieldLabel className="bg-muted/30 cursor-pointer">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <WalletMinimal strokeWidth={1.25} className='text-muted-foreground mb-1.5 w-5 h-5 md:w-6 md:h-6' />
                                        <FieldTitle className='-mb-0.5 md:mb-0'>Affordable</FieldTitle>
                                        <FieldDescription className="text-xs/snug -mt-1 md:mt-0 md:text-sm">
                                            Starting from <strong className="text-foreground font-semibold">₹5,000</strong>
                                        </FieldDescription>
                                    </FieldContent>
                                    <Checkbox id="affordable" name="affordable" className='invisible absolute' />
                                </Field>
                            </FieldLabel>
                            <FieldLabel className="bg-muted/30 cursor-pointer">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <Sparkles strokeWidth={1.25} className='text-muted-foreground mb-1.5 w-5 h-5 md:w-6 md:h-6' />
                                        <FieldTitle className='-mb-0.5 md:mb-0'>Luxury</FieldTitle>
                                        <FieldDescription className="text-xs/snug -mt-1 md:mt-0 md:text-sm">
                                            Starting from <strong className="text-foreground font-semibold">₹25,000</strong>
                                        </FieldDescription>
                                    </FieldContent>
                                    <Checkbox id="luxury" name="luxury" className='invisible absolute' />
                                </Field>
                            </FieldLabel>
                            <FieldLabel className="bg-muted/30 cursor-pointer">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <Gem strokeWidth={1.25} className='text-muted-foreground mb-1.5 w-5 h-5 md:w-6 md:h-6 -ml-0.5' />
                                        <FieldTitle className='-mb-0.5 md:mb-0'>VIP</FieldTitle>
                                        <FieldDescription className="text-xs/snug md:text-sm">
                                            Starting from <strong className="text-foreground font-semibold">₹50,000</strong>
                                        </FieldDescription>
                                    </FieldContent>
                                    <Checkbox id="vip" name="vip" className='invisible absolute' />
                                </Field>
                            </FieldLabel>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default BookableFilters