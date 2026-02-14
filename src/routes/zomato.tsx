import { createFileRoute } from '@tanstack/react-router'
import { CarouselDemo } from "@/components/carousel-demo";
import { Bed, MapPin, Star, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BookingCTA from "@/components/booking-cta";
import ZomatoCTA from '@/components/zomato-cta';

export const Route = createFileRoute('/zomato')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className="relative">
        <CarouselDemo />
        <div className="relative -mt-2 rounded-t-xl bg-background px-3 pt-3 pb-20">
            <div className="rounded-full bg-muted w-1/4 h-1 mx-auto mb-5"></div>
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-1">
                        <MapPin className="text-muted-foreground" size={14} strokeWidth={1.25} />
                        <span className="text-muted-foreground text-sm mt-0.5">Ubud, Bali</span>
                    </div>
                    {/* <img className="h-5" src="https://backend.bestay.co/media/Primier-Logo-Blue.svg" alt="BeStay" /> */}
                    <h1 className="my-2 font-medium text-2xl w-[66vw]">Villa Mia & Montana</h1>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                            <Bed data-icon="inline-start" />
                            12 Rooms
                        </Badge>
                        <Badge variant="secondary">
                            <UsersRound data-icon="inline-start" />
                            30 Guests
                        </Badge>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex gap-1 items-center bg-accent border px-1.5 pr-2 rounded-full">
                        <span><Star className="text-primary" size={16} /></span>
                        <span className="font-bold">4.5</span>
                    </div>
                    <p className="text-muted-foreground text-xs text-center py-1 underline decoration-dotted underline-offset-4">By 10K+</p>
                </div>
            </div>
            <div className="my-4 bg-zinc-900 rounded-md w-full h-80"></div>
            <div className="my-4 bg-zinc-900 rounded-md w-full h-80"></div>
            <div className="my-4 bg-zinc-900 rounded-md w-full h-80"></div>
        </div>
        <ZomatoCTA />
    </div>
}
