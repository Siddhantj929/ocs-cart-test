import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const BookableCard = ({ item }: { item: any }) => {
    const primaryImage = item.primaryImage;
    const otherImages = item.images.slice(0, 4);
    const totalImages = otherImages.length + (primaryImage ? 1 : 0);
    const [isLoading, setIsLoading] = useState(true);
    const skeletonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isLoading && skeletonRef.current)
            skeletonRef.current?.classList.add('hidden');
    }, [isLoading]);


    return (
        <>
            <Skeleton ref={skeletonRef} className={cn("w-full h-full absolute top-0 left-0 z-20")} />
            <div className={cn("h-[500px] rounded-md overflow-hidden relative transition-all duration-300 ease-in opacity-0", !isLoading && "opacity-100")}>
                <Carousel className="w-full h-full">
                    <CarouselContent>
                        <CarouselItem key={0}>
                            <div className="relative h-[500px]">
                                <img
                                    className="w-full h-[500px] object-cover"
                                    src={primaryImage}
                                    alt={`Primary Image`}
                                    loading="eager"
                                    onLoad={() => {
                                        // Wait for the next frame
                                        requestAnimationFrame(() => {
                                            // Wait for the frame after that to ensure the paint occurred
                                            requestAnimationFrame(() => {
                                                setIsLoading(false)
                                            });
                                        });
                                    }}
                                    onError={() => setIsLoading(false)}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-background/60 to-transparent p-4 text-foreground text-center">
                                    <span className="text-xs font-medium">1 of {totalImages}</span>
                                </div>
                            </div>
                        </CarouselItem>
                        {otherImages?.map((url: string, index: number) => (
                            <CarouselItem key={index + 1}>
                                <div className="relative h-[500px]">
                                    <img className="w-full h-[500px] object-cover" src={url} alt={`Image ${index + 1}`} loading="lazy" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-background/60 to-transparent p-4 text-foreground text-center">
                                        <span className="text-xs font-medium">{index + 1} of {totalImages}</span>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    )
}

export default BookableCard