import { ArrowRight, ChevronDown } from "lucide-react"
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


function BookingCTA() {
    const basePrice = 158410
    const [open, setOpen] = useState(false)
    const [breakfast, setBreakfast] = useState<string>("none")
    const [lunch, setLunch] = useState<string>("none")
    const [dinner, setDinner] = useState<string>("none")
    const [pickupDrop, setPickupDrop] = useState<string>("none")
    const [bonfire, setBonfire] = useState<string>("none")
    const [barbeque, setBarbeque] = useState<string>("none")

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

        return total
    }

    const totalPrice = calculateTotal()
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
                    <SheetContent side="bottom" className="max-h-3/4">
                        <SheetHeader className="flex-row items-center gap-2 border-b">
                            <img className="w-10 h-10 object-cover rounded-md" src="https://res.cloudinary.com/dzqivthv7/image/upload/v1765796073/ocs-stays/primary-images/gyputpyuahbsjc9vxhgp.jpg" />
                            <div className="gap-0.5">
                                <SheetTitle className="mt-0.5">Villa Mia & Montana</SheetTitle>
                                <SheetDescription>Ubud, Bali</SheetDescription>
                            </div>
                        </SheetHeader>
                        <div className="no-scrollbar overflow-y-auto py-2 flex flex-col gap-6">
                            <div className="flex justify-between items-center px-4">
                                <div className="flex gap-2 items-center">
                                    <img className="w-10 h-10 object-cover rounded-md" src="https://hips.hearstapps.com/hmg-prod/images/fluffy-pancakes-1675719604-657229c830876.jpg?crop=0.668xw:1.00xh;0.274xw,0" />
                                    <div>
                                        <h4 className="font-medium flex gap-0.5">Breakfast <span className="text-red-400 text-xs">*</span></h4>
                                        <h5 className="font-semibold text-xs text-muted-foreground mt-0.5">Customisable</h5>
                                        {/* <p className="text-muted-foreground text-xs/normal">Professional cab transfer service for arrival and departure</p> */}
                                    </div>
                                </div>
                                <Select required value={breakfast} onValueChange={setBreakfast}>
                                    <SelectTrigger className="min-w-28 max-w-48">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="airport">From Menu - Free</SelectItem>
                                            <SelectItem value="dark">Private Chef - ₹7000</SelectItem>
                                            {/* <SelectItem value="system">System</SelectItem> */}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-between items-center px-4">
                                <div className="flex gap-2 items-center">
                                    <img className="w-10 h-10 object-cover rounded-md" src="https://images.immediate.co.uk/production/volatile/sites/30/2024/01/Chicken-tzatziki-wraps-1569558.jpg?quality=90&resize=708,643" />
                                    <div>
                                        <h4 className="font-medium">Lunch</h4>
                                        <h5 className="font-semibold text-xs text-muted-foreground mt-0.5">Customisable</h5>
                                        {/* <p className="text-muted-foreground text-xs/normal">Professional cab transfer service for arrival and departure</p> */}
                                    </div>
                                </div>
                                <Select value={lunch} onValueChange={setLunch}>
                                    <SelectTrigger className="min-w-28 max-w-48">
                                        <SelectValue placeholder="None" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="airport">From Menu - ₹3500</SelectItem>
                                            <SelectItem value="dark">Private Chef - ₹7000</SelectItem>
                                            {/* <SelectItem value="system">System</SelectItem> */}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-between items-center px-4">
                                <div className="flex gap-2 items-center">
                                    <img className="w-10 h-10 object-cover rounded-md" src="https://hips.hearstapps.com/hmg-prod/images/one-pot-spaghetti-6408ea3a9a32c.jpg?crop=0.864xw:0.576xh;0,0.143xh&resize=640:*" />
                                    <div>
                                        <h4 className="font-medium">Dinner</h4>
                                        <h5 className="font-semibold text-xs text-muted-foreground mt-0.5">Customisable</h5>
                                        {/* <p className="text-muted-foreground text-xs/normal">Professional cab transfer service for arrival and departure</p> */}
                                    </div>
                                </div>
                                <Select value={dinner} onValueChange={setDinner}>
                                    <SelectTrigger className="min-w-28 max-w-48">
                                        <SelectValue placeholder="None" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="airport">From Menu - ₹3500</SelectItem>
                                            <SelectItem value="dark">Private Chef - ₹7000</SelectItem>
                                            {/* <SelectItem value="system">System</SelectItem> */}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-between items-center px-4 relative pb-2 pt-5 bg-amber-950/30">
                                <span className="absolute top-0 left-4 text-[0.5rem] uppercase px-1 rounded-b-md bg-amber-950">Highly Ordered</span>
                                <div className="flex gap-2 items-center">
                                    <img className="w-10 h-10 object-cover rounded-md" src="https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/01/Pictures/taxi-driver_ea0922da-8bb5-11ea-8bae-d48e751bd032.jpg" />
                                    <div>
                                        <h4 className="font-medium">Pickup & Drop</h4>
                                        <h5 className="font-semibold text-xs text-muted-foreground mt-0.5">₹2000</h5>
                                        {/* <p className="text-muted-foreground text-xs/normal">Professional cab transfer service for arrival and departure</p> */}
                                    </div>
                                </div>
                                <Select value={pickupDrop} onValueChange={setPickupDrop}>
                                    <SelectTrigger className="min-w-28 max-w-48">
                                        <SelectValue placeholder="None" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="airport">Airport</SelectItem>
                                            <SelectItem value="dark">Railway Station</SelectItem>
                                            {/* <SelectItem value="system">System</SelectItem> */}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-between items-center px-4">
                                <div className="flex gap-2 items-center">
                                    <img className="w-10 h-10 object-cover rounded-md" src="https://www.mosquitomagnet.com/media/Articles/Mosquito-Magnet/Dont-Fear-the-Fire.jpg" />
                                    <div>
                                        <h4 className="font-medium">Bonfire</h4>
                                        <h5 className="font-semibold text-xs text-muted-foreground mt-0.5">₹2000 / day</h5>
                                        {/* <p className="text-muted-foreground text-xs/normal">Professional cab transfer service for arrival and departure</p> */}
                                    </div>
                                </div>
                                <Select value={bonfire} onValueChange={setBonfire}>
                                    <SelectTrigger className="min-w-28 max-w-48">
                                        <SelectValue placeholder="None" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="none">None</SelectItem>
                                            {new Array(12).fill(0).map((_, i) => <SelectItem key={i} value={`${i + 1}`}>{i + 1} {i === 0 ? "Day" : "Days"}</SelectItem>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-between items-center px-4 relative pb-2 pt-5 bg-amber-950/30">
                                <span className="absolute top-0 left-4 text-[0.5rem] uppercase px-1 rounded-b-md bg-amber-950">Highly Ordered</span>
                                <div className="flex gap-2 items-center">
                                    <img className="w-10 h-10 object-cover rounded-md" src="https://www.safefood.net/getmedia/decf19cc-b796-40c2-863b-998f7257515c/Shutterstock_1722079528.jpg?w=1200&h=675&ext=.jpg&width=1360&resizemode=force" />
                                    <div>
                                        <h4 className="font-medium">Barbeque</h4>
                                        <h5 className="font-semibold text-xs text-muted-foreground mt-0.5">₹2000 / day</h5>
                                        {/* <p className="text-muted-foreground text-xs/normal">Professional cab transfer service for arrival and departure</p> */}
                                    </div>
                                </div>
                                <Select value={barbeque} onValueChange={setBarbeque}>
                                    <SelectTrigger className="min-w-28 max-w-48">
                                        <SelectValue placeholder="None" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="none">None</SelectItem>
                                            {new Array(12).fill(0).map((_, i) => <SelectItem key={i} value={`${i + 1}`}>{i + 1} {i === 0 ? "Day" : "Days"}</SelectItem>)}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
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

export default BookingCTA