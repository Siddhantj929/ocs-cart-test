import { ArrowRight, Calendar, ChevronDown, Minus, Plus, UsersRound } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldContent, FieldGroup, FieldLabel, FieldTitle } from "./ui/field"
import { Checkbox } from "./ui/checkbox"
import { cn } from "@/lib/utils"


function ZomatoCTA() {
    const basePrice = 158410
    const [open, setOpen] = useState(false)
    const [breakfast, setBreakfast] = useState<string>("none")
    const [lunch, setLunch] = useState<string>("none")
    const [dinner, setDinner] = useState<string>("none")
    const [pickupDrop, setPickupDrop] = useState<string>("none")
    const [bonfire, setBonfire] = useState<string>("none")
    const [barbeque, setBarbeque] = useState<string>("none")

    // Spa & Massage dialog state (current/editing state)
    const [spaDialogOpen, setSpaDialogOpen] = useState(false)
    const [spaPeople, setSpaPeople] = useState<string>("3")
    const [spaAllDays, setSpaAllDays] = useState(true)
    const [spaSelectedDays, setSpaSelectedDays] = useState<Set<number>>(new Set())

    // Spa & Massage committed state (what's actually added to stay)
    const [committedSpaPeople, setCommittedSpaPeople] = useState<string>()
    const [committedSpaAllDays, setCommittedSpaAllDays] = useState(true)
    const [committedSpaSelectedDays, setCommittedSpaSelectedDays] = useState<Set<number>>(new Set())

    // Airport Pickup & Drop committed state
    const [committedAirportPickup, setCommittedAirportPickup] = useState(false)

    const spaPricePerPersonPerDay = 2000
    const airportPickupPrice = 6200
    const totalDays = 3 // Day 1, Day 2, Day 3

    // Calculate price from current state (for preview in dialog)
    const calculateSpaPrice = () => {
        if (spaAllDays) {
            return spaPricePerPersonPerDay * parseInt(spaPeople) * totalDays
        }
        return spaPricePerPersonPerDay * parseInt(spaPeople) * spaSelectedDays.size
    }

    // Calculate price from committed state (for total price)
    const calculateCommittedSpaPrice = () => {
        if (committedSpaAllDays) {
            return spaPricePerPersonPerDay * parseInt(committedSpaPeople) * totalDays
        }
        return spaPricePerPersonPerDay * parseInt(committedSpaPeople) * committedSpaSelectedDays.size
    }

    // Check if current state differs from committed state
    const isSpaStateChanged = () => {
        if (spaPeople !== committedSpaPeople) return true
        if (spaAllDays !== committedSpaAllDays) return true

        // If both are "all days", they're the same (already checked people count above)
        if (spaAllDays && committedSpaAllDays) return false

        // Compare selected days sets (only needed if not using "all days")
        if (spaSelectedDays.size !== committedSpaSelectedDays.size) return true
        for (const day of spaSelectedDays) {
            if (!committedSpaSelectedDays.has(day)) return true
        }
        for (const day of committedSpaSelectedDays) {
            if (!spaSelectedDays.has(day)) return true
        }
        return false
    }

    const calculateTotal = () => {
        let total = basePrice

        // Breakfast: none (0), from-menu (0), private-chef (7000)
        if (breakfast === "dark") total += 7000

        // Lunch: none (0), from-menu (3500), private-chef (7000)
        if (lunch === "airport") total += 3500
        else if (lunch === "dark") total += 7000

        // Dinner: none (0), from-menu (3500), private-chef (7000)
        if (dinner === "airport") total += 3500
        else if (dinner === "dark") total += 7000

        // Pickup & Drop: none (0), airport/railway (2000)
        if (pickupDrop !== "none") total += 2000

        // Bonfire: none (0), 1-12 days (2000 * days)
        if (bonfire !== "none") total += 2000 * parseInt(bonfire)

        // Barbeque: none (0), 1-12 days (2000 * days)
        if (barbeque !== "none") total += 2000 * parseInt(barbeque)

        // Spa & Massage: per person per day (use committed state)
        const spaPrice = calculateCommittedSpaPrice()
        if (spaPrice > 0) total += spaPrice

        // Airport Pickup & Drop: fixed price (use committed state)
        if (committedAirportPickup) total += airportPickupPrice

        return total
    }

    const totalPrice = calculateTotal();
    const spaServicePrice = calculateSpaPrice();

    const isSpaSelected = () => {
        return calculateCommittedSpaPrice() > 0
    }

    const isAirportPickupSelected = () => {
        return committedAirportPickup
    }

    const handleAddAirportPickup = () => {
        setCommittedAirportPickup(true)
    }

    const handleRemoveAirportPickup = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCommittedAirportPickup(false)
    }

    const handleAddToStay = () => {
        // Commit current state to committed state
        setCommittedSpaPeople(spaPeople)
        setCommittedSpaAllDays(spaAllDays)
        setCommittedSpaSelectedDays(new Set(spaSelectedDays))
        setSpaDialogOpen(false)
    }

    const handleRemoveSpa = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        // Reset committed state to remove service (set allDays to false and clear selections)
        setCommittedSpaPeople("3")
        setCommittedSpaAllDays(false)
        setCommittedSpaSelectedDays(new Set())
    }

    const handleSpaDialogOpen = (isOpen: boolean) => {
        setSpaDialogOpen(isOpen)
        if (isOpen) {
            // Initialize dialog state from committed state when opening
            setSpaPeople(committedSpaPeople)
            setSpaAllDays(committedSpaAllDays)
            setSpaSelectedDays(new Set(committedSpaSelectedDays))
        }
    }

    const handleSpaDayToggle = (dayIndex: number) => {
        setSpaAllDays(false)
        const newSelected = new Set(spaSelectedDays)
        if (newSelected.has(dayIndex)) {
            newSelected.delete(dayIndex)
        } else {
            newSelected.add(dayIndex)
        }

        // If all days are selected, set allDays to true and clear individual selections
        if (newSelected.has(1) && newSelected.has(2) && newSelected.has(3)) {
            setSpaAllDays(true)
            setSpaSelectedDays(new Set())
        } else {
            setSpaSelectedDays(newSelected)
        }
    }

    const handleSpaAllDaysToggle = (checked: boolean) => {
        setSpaAllDays(checked)
        if (checked) {
            setSpaSelectedDays(new Set())
        }
    }


    return (
        <div className="fixed flex justify-between items-center bottom-0 left-0 right-0 border-t pt-1 pb-2 px-3 bg-background">
            <div>
                <span className="text-xs text-muted-foreground flex gap-0.5 items-center">For 12 Nights and 7 Guests
                    <ChevronDown className="text-foreground" size={14} />
                </span>
                <p className="text-xl font-semibold">₹{basePrice.toLocaleString('en-IN')}</p>
            </div>
            <div className="w-2/5 text-center">
                <Sheet open={open} onOpenChange={(isOpen) => {
                    setOpen(isOpen)
                    if (!isOpen) {
                        setBreakfast("none")
                        setLunch("none")
                        setDinner("none")
                        setPickupDrop("none")
                        setBonfire("none")
                        setBarbeque("none")
                    }
                }}>
                    <SheetTrigger asChild>
                        <Button size='lg' className="w-full mt-2">
                            <span className="font-extrabold">Book Now</span>
                            <ArrowRight data-icon="inline-end" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="max-h-[88%] gap-0">
                        <SheetHeader className="flex-row items-center gap-2 border-b">
                            <img className="w-10 h-10 object-cover rounded-md" src="https://res.cloudinary.com/dzqivthv7/image/upload/v1765796073/ocs-stays/primary-images/gyputpyuahbsjc9vxhgp.jpg" />
                            <div className="gap-0.5">
                                <SheetTitle className="mt-0.5">Villa Mia & Montana</SheetTitle>
                                <SheetDescription>Ubud, Bali</SheetDescription>
                            </div>
                        </SheetHeader>
                        <div className="no-scrollbar overflow-y-auto flex flex-col">
                            <div className={cn("flex gap-4 px-4 border-b pt-5 pb-8", isAirportPickupSelected() && "bg-muted")}>
                                <div className="flex-1 my-0.5">
                                    <h4 className="font-medium text-sm">Airport Pickup & Drop</h4>
                                    {isAirportPickupSelected() ? (
                                        <>
                                            <h5 className="font-bold text-base mt-1">₹{airportPickupPrice.toLocaleString()}</h5>
                                            <p className="text-foreground text-xs/normal mb-1.5">1 SUV Vehicle</p>
                                            <p className="text-muted-foreground text-xs/normal">Note: Our team will contact you to finalize the details.</p>
                                        </>
                                    ) : (
                                        <>
                                            <h5 className="font-bold text-base mt-1 mb-1">₹{(6200).toLocaleString()}</h5>
                                            <p className="text-muted-foreground text-xs/normal">Skip the hassle! Our reliable car service includes convenient airport pick-up and drop-off.</p>
                                        </>
                                    )}
                                </div>
                                <div className="relative">
                                    <img className="w-32 h-28 object-cover rounded-lg object-[66%]" src="https://bestay.co/_next/image?url=https%3A%2F%2Fbackend.bestay.co%2Fmedia%2FPrivate-Car-with-Driver_1.jpg&w=3840&q=75" />
                                    {isAirportPickupSelected() ? (
                                        <Button
                                            type="button"
                                            variant='destructive'
                                            className="bg-red-900 hover:bg-red-800 dark:bg-red-900 dark:hover:bg-red-800 text-white font-bold w-24 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 shadow-lg"
                                            onClick={handleRemoveAirportPickup}
                                        >
                                            <Minus data-icon="inline-start" />
                                            Remove
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant='default'
                                            className="font-bold w-24 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 shadow-lg"
                                            onClick={handleAddAirportPickup}
                                        >
                                            <Plus data-icon="inline-start" />
                                            Add
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className={cn("flex gap-4 px-4 border-b pt-5 pb-7 relative", isSpaSelected() && "bg-muted")}>
                                {/* <span className="absolute top-0 left-4 text-[0.6rem] font-bold tracking-wider uppercase px-1.5 rounded-b-md bg-amber-900/80">Highly Ordered</span> */}
                                <div className="flex-1 my-0.5">
                                    <h4 className="font-medium text-sm">Spa & Massage</h4>
                                    {isSpaSelected() ? (
                                        <>
                                            <h5 className="font-bold text-base mt-1">₹{calculateCommittedSpaPrice().toLocaleString()}</h5>
                                            <p className="text-foreground text-xs/normal mb-1.5">{committedSpaPeople} {committedSpaPeople === '1' ? "Person" : "People"}, {committedSpaAllDays ? 3 : Array.from(committedSpaSelectedDays).length} Days</p>
                                            <p className="text-muted-foreground text-xs/normal">Note: Our team will contact you to finalize the details.</p>
                                        </>
                                    ) : (
                                        <>
                                            <h5 className="font-bold text-base mt-1 mb-1">₹{(2000).toLocaleString()} <span className="text-muted-foreground text-xs/snug font-light">per person. per hour.</span></h5>
                                            <p className="text-muted-foreground text-xs/normal">Expert therapists await to create a pampering experience for you directly in your stay.</p>
                                        </>
                                    )}
                                </div>
                                <div className="relative">
                                    <img className="w-32 h-28 object-cover rounded-lg" src="https://bestay.co/_next/image?url=https%3A%2F%2Fbackend.bestay.co%2Fmedia%2FSpa_1.jpeg&w=3840&q=75" />
                                    {isSpaSelected() ? (
                                        <Button
                                            type="button"
                                            variant='destructive'
                                            className="bg-red-900 hover:bg-red-800 dark:bg-red-900 dark:hover:bg-red-800 text-white font-bold w-24 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 shadow-lg"
                                            onClick={handleRemoveSpa}
                                        >
                                            <Minus data-icon="inline-start" />
                                            Remove
                                        </Button>
                                    ) : (
                                        <Dialog open={spaDialogOpen} onOpenChange={handleSpaDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant='default' className="font-bold w-24 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 shadow-lg">
                                                    <Plus data-icon="inline-start" />
                                                    Add
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader className="flex-row items-center gap-2">
                                                    <img className="w-10 h-10 object-cover rounded-md" src="https://bestay.co/_next/image?url=https%3A%2F%2Fbackend.bestay.co%2Fmedia%2FSpa_1.jpeg&w=3840&q=75" />
                                                    <div className="gap-0.5">
                                                        <DialogTitle className="mt-0.5">Spa & Massage</DialogTitle>
                                                        <DialogDescription>Highly Ordered</DialogDescription>
                                                    </div>
                                                </DialogHeader>
                                                <div className="no-scrollbar overflow-y-auto -mx-4 max-h-[50vh] flex flex-col">
                                                    <div className="flex flex-col gap-6 px-4">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex gap-2 items-start">
                                                                <UsersRound size={14} strokeWidth={1.25} className="mt-0.5" />
                                                                <div>
                                                                    <h4 className="font-medium">No. of People</h4>
                                                                    <h5 className="text-xs text-muted-foreground mt-0.5">Who will be included?</h5>
                                                                </div>
                                                            </div>
                                                            <Select value={spaPeople} onValueChange={setSpaPeople}>
                                                                <SelectTrigger className="min-w-28 max-w-48">
                                                                    <SelectValue placeholder="None" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="1">1 Guest</SelectItem>
                                                                        <SelectItem value="2">2 Guests</SelectItem>
                                                                        <SelectItem value="3">3 Guests</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex gap-2 items-start">
                                                                <Calendar size={14} strokeWidth={1.25} className="mt-0.5" />
                                                                <div>
                                                                    <h4 className="font-medium">Select Days</h4>
                                                                    <h5 className="text-xs text-muted-foreground mt-0.5">Select as many days as you need</h5>
                                                                </div>
                                                            </div>
                                                            <FieldGroup className="gap-2">
                                                                <FieldLabel>
                                                                    <Field orientation="horizontal">
                                                                        <FieldContent>
                                                                            <FieldTitle>All Days</FieldTitle>
                                                                        </FieldContent>
                                                                        <Checkbox
                                                                            id="spa-all-days"
                                                                            name="spa-all-days"
                                                                            checked={spaAllDays}
                                                                            onCheckedChange={handleSpaAllDaysToggle}
                                                                        />
                                                                    </Field>
                                                                </FieldLabel>
                                                                <FieldLabel>
                                                                    <Field orientation="horizontal">
                                                                        <FieldContent>
                                                                            <FieldTitle>Day 1 - Apr 22, 2026</FieldTitle>
                                                                        </FieldContent>
                                                                        <Checkbox
                                                                            id="spa-day-1"
                                                                            name="spa-day-1"
                                                                            checked={spaAllDays || spaSelectedDays.has(1)}
                                                                            onCheckedChange={() => handleSpaDayToggle(1)}
                                                                            disabled={spaAllDays}
                                                                        />
                                                                    </Field>
                                                                </FieldLabel>
                                                                <FieldLabel>
                                                                    <Field orientation="horizontal">
                                                                        <FieldContent>
                                                                            <FieldTitle>Day 2 - Apr 23, 2026</FieldTitle>
                                                                        </FieldContent>
                                                                        <Checkbox
                                                                            id="spa-day-2"
                                                                            name="spa-day-2"
                                                                            checked={spaAllDays || spaSelectedDays.has(2)}
                                                                            onCheckedChange={() => handleSpaDayToggle(2)}
                                                                            disabled={spaAllDays}
                                                                        />
                                                                    </Field>
                                                                </FieldLabel>
                                                                <FieldLabel>
                                                                    <Field orientation="horizontal">
                                                                        <FieldContent>
                                                                            <FieldTitle>Day 3 - Apr 24, 2026</FieldTitle>
                                                                        </FieldContent>
                                                                        <Checkbox
                                                                            id="spa-day-3"
                                                                            name="spa-day-3"
                                                                            checked={spaAllDays || spaSelectedDays.has(3)}
                                                                            onCheckedChange={() => handleSpaDayToggle(3)}
                                                                            disabled={spaAllDays}
                                                                        />
                                                                    </Field>
                                                                </FieldLabel>
                                                            </FieldGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                                <DialogFooter className="flex-row justify-between items-center">
                                                    <div>
                                                        <p className="text-xl font-semibold">₹{spaServicePrice.toLocaleString('en-IN')}</p>
                                                    </div>
                                                    <div className="w-2/5 text-center">
                                                        <Button
                                                            size='lg'
                                                            className="w-full"
                                                            onClick={handleAddToStay}
                                                            disabled={!isSpaStateChanged()}
                                                        >
                                                            <Plus data-icon="inline-start" />
                                                            <span className="font-extrabold">Add to Stay</span>
                                                        </Button>
                                                    </div>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </div>
                        </div>
                        <SheetFooter className="flex-row justify-between items-center">
                            <div>
                                <span className="text-xs text-muted-foreground flex gap-0.5 items-center">For 12 Nights and 7 Guests
                                    <ChevronDown className="text-foreground" size={14} />
                                </span>
                                <p className="text-xl font-semibold">₹{totalPrice.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="w-2/5 text-center">
                                <Button size='lg' className="w-full">
                                    <span className="font-extrabold">Continue</span>
                                    <ArrowRight data-icon="inline-end" />
                                </Button>
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <p className="text-[0.7rem] text-zinc-500 mt-0.5 font-light mb-0">Customisable</p>
            </div>
        </div >
    )
}

export default ZomatoCTA