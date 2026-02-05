import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export function CarouselDemo() {
    const total = 5

    return (
        <Carousel className="w-full h-[55dvh]">
            <CarouselContent>
                {Array.from({ length: total }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="relative">
                            <img className="w-full h-[55dvh] object-cover" src="https://res.cloudinary.com/dzqivthv7/image/upload/v1765796073/ocs-stays/primary-images/gyputpyuahbsjc9vxhgp.jpg" alt={`Image ${index + 1}`} />
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-background/60 to-transparent p-4 text-foreground text-center">
                                <span className="text-xs font-medium">{index + 1} of {total}</span>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
