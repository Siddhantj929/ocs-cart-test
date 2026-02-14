import { ArrowRight, ChevronDown, Plus } from "lucide-react"
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
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "./ui/field"
import { Checkbox } from "./ui/checkbox"
import { Collapsible, CollapsibleContent } from "./ui/collapsible"


function ZomatoCTA() {
    const basePrice = 158410
    const [open, setOpen] = useState(false)
    const [breakfast, setBreakfast] = useState<string>("none")
    const [lunch, setLunch] = useState<string>("none")
    const [dinner, setDinner] = useState<string>("none")
    const [pickupDrop, setPickupDrop] = useState<string>("none")
    const [bonfire, setBonfire] = useState<string>("none")
    const [barbeque, setBarbeque] = useState<string>("none")
    const [balineseMassage, setBalineseMassage] = useState(false)

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
                    <SheetContent side="bottom" className="max-h-[88%]">
                        <SheetHeader className="flex-row items-center gap-2 border-b">
                            <img className="w-10 h-10 object-cover rounded-md" src="https://res.cloudinary.com/dzqivthv7/image/upload/v1765796073/ocs-stays/primary-images/gyputpyuahbsjc9vxhgp.jpg" />
                            <div className="gap-0.5">
                                <SheetTitle className="mt-0.5">Villa Mia & Montana</SheetTitle>
                                <SheetDescription>Ubud, Bali</SheetDescription>
                            </div>
                        </SheetHeader>
                        <div className="no-scrollbar overflow-y-auto flex flex-col">
                            <div className="flex gap-4 px-4 border-b pt-1 pb-9">
                                <div className="flex-1 my-0.5">
                                    <h4 className="font-medium text-base">Airport Pickup & Drop</h4>
                                    <h5 className="font-semibold text-sm text-primary mt-2 mb-1">Customisable</h5>
                                    <p className="text-muted-foreground text-xs/normal">Skip the hassle! Our reliable car service includes convenient airport pick-up and drop-off.</p>
                                </div>
                                <div className="relative">
                                    <img className="w-32 h-32 object-cover rounded-lg object-[66%]" src="https://bestay.co/_next/image?url=https%3A%2F%2Fbackend.bestay.co%2Fmedia%2FPrivate-Car-with-Driver_1.jpg&w=3840&q=75" />
                                    <Button variant='default' className="font-bold w-24 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-lg">
                                        <Plus data-icon="inline-start" />
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <div className="flex gap-4 px-4 border-b pt-6 pb-8 bg-amber-50 dark:bg-amber-950/25 relative">
                                <span className="absolute top-0 left-4 text-[0.6rem] font-bold tracking-wider uppercase px-1.5 rounded-b-md bg-amber-900/80">Highly Ordered</span>
                                <div className="flex-1 my-0.5 mt-2">
                                    <h4 className="font-medium text-base">Spa & Massage</h4>
                                    <h5 className="font-semibold text-sm text-primary mt-2 mb-1">Customisable</h5>
                                    <p className="text-muted-foreground text-xs/normal">Indulge in pure spa bliss without ever leaving your villa. Expert therapists await to customize a pampering experience for you.</p>
                                </div>
                                <div className="relative">
                                    <img className="w-32 h-32 object-cover rounded-lg" src="https://bestay.co/_next/image?url=https%3A%2F%2Fbackend.bestay.co%2Fmedia%2FSpa_1.jpeg&w=3840&q=75" />
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant='default' className="font-bold w-24 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 shadow-lg">
                                                <Plus data-icon="inline-start" />
                                                Add
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="bottom" className="max-h-3/4">
                                            <SheetHeader className="flex-row items-center gap-2 border-b">
                                                <img className="w-10 h-10 object-cover rounded-md" src="https://bestay.co/_next/image?url=https%3A%2F%2Fbackend.bestay.co%2Fmedia%2FSpa_1.jpeg&w=3840&q=75" />
                                                <div className="gap-0.5">
                                                    <SheetTitle className="mt-0.5">Spa & Massage</SheetTitle>
                                                    <SheetDescription>Highly Ordered</SheetDescription>
                                                </div>
                                            </SheetHeader>

                                            <div className="no-scrollbar overflow-y-auto flex flex-col">
                                                <div className="flex flex-col gap-3.5 px-4">
                                                    <Collapsible open={balineseMassage} onOpenChange={setBalineseMassage}>
                                                        <FieldLabel className="bg-muted/30">
                                                            <Field orientation="horizontal">
                                                                <FieldContent>
                                                                    <FieldTitle>Balinese Massage</FieldTitle>
                                                                    <FieldDescription className="text-xs/snug max-w-5/6">
                                                                        Traditional full-body relaxation.
                                                                    </FieldDescription>
                                                                </FieldContent>
                                                                <Checkbox
                                                                    id="balinese-massage"
                                                                    name="balinese-massage"
                                                                    checked={balineseMassage}
                                                                    onCheckedChange={(checked) => setBalineseMassage(checked === true)}
                                                                />
                                                            </Field>
                                                            <CollapsibleContent className="px-2 mb-3 flex flex-col justify-center items-center">
                                                                <Select>
                                                                    <SelectTrigger className="w-76">
                                                                        <SelectValue placeholder="Select Price" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectItem value="none">60-minute - ₹1130/guest</SelectItem>
                                                                            <SelectItem value="airport">2 Guests</SelectItem>
                                                                            <SelectItem value="dark">3 Guests</SelectItem>
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                                <div className="flex gap-2.5 mt-2.5">
                                                                    <Select>
                                                                        <SelectTrigger className="w-[9.2rem]">
                                                                            <SelectValue placeholder="Select Guests" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectItem value="none">1 Guest</SelectItem>
                                                                                <SelectItem value="airport">2 Guests</SelectItem>
                                                                                <SelectItem value="dark">3 Guests</SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <Select>
                                                                        <SelectTrigger className="w-[9.2rem]">
                                                                            <SelectValue placeholder="Select Days" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectItem value="none">1 Day</SelectItem>
                                                                                <SelectItem value="airport">2 Days</SelectItem>
                                                                                <SelectItem value="dark">3 Days</SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </CollapsibleContent>
                                                        </FieldLabel>
                                                    </Collapsible>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Aromatherapy Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Relaxing massage with oils.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="aromatherapy-massage" name="aromatherapy-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Lomi - Lomi Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Hawaiian flowing strokes.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="lomi-lomi-massage" name="lomi-lomi-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Holistic Balinese Shiatsu</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Deep pressure point therapy.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="holistic-balinese-shiatsu" name="holistic-balinese-shiatsu" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Thai Dry Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Stretching and acupressure.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="thai-dry-massage" name="thai-dry-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Warm Stone Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Heated stones relax muscles.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="warm-stone-massage" name="warm-stone-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Hawaiian Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Rhythmic island-style therapy.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="hawaiian-massage" name="hawaiian-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Four-Hands Balinese Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Two therapists, synchronized.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="four-hands-balinese-massage" name="four-hands-balinese-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Four-Hands Thai Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Dual therapist Thai therapy.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="four-hands-thai-massage" name="four-hands-thai-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Pregnancy Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Gentle care for mothers.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="pregnancy-massage" name="pregnancy-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Authentic Back Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Focused back tension relief.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="authentic-back-massage" name="authentic-back-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Body Scrub Without Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Exfoliating body treatment.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="body-scrub-without-massage" name="body-scrub-without-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Balinese Traditional Facial</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Natural cleansing facial.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="balinese-traditional-facial" name="balinese-traditional-facial" />
                                                        </Field>
                                                    </FieldLabel>

                                                    <FieldLabel className="bg-muted/30">
                                                        <Field orientation="horizontal">
                                                            <FieldContent>
                                                                <FieldTitle>Foot Reflexology Massage</FieldTitle>
                                                                <FieldDescription className="text-xs/snug max-w-5/6">
                                                                    Pressure points on feet.
                                                                </FieldDescription>
                                                            </FieldContent>
                                                            <Checkbox id="foot-reflexology-massage" name="foot-reflexology-massage" />
                                                        </Field>
                                                    </FieldLabel>

                                                </div>
                                            </div>
                                            <SheetFooter className="flex-row justify-between items-center">
                                                <div>
                                                    <p className="text-xl font-semibold">₹{totalPrice.toLocaleString('en-IN')}</p>
                                                </div>
                                                <div className="w-2/5 text-center">
                                                    <Button size='lg' className="w-full">
                                                        <Plus data-icon="inline-start" />
                                                        <span className="font-extrabold">Add to Stay</span>
                                                    </Button>
                                                </div>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
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