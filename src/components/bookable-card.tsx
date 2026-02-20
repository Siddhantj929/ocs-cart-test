import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"

const BookableCard = ({ item }: { item: any }) => {
    const images = [item.primaryImage, ...item.images.slice(0, 4)];

    return (
        <div className="border h-full">
            <Carousel className="w-full h-[500px]">
                <CarouselContent>
                    {images?.map((url: string, index: number) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[500px]">
                                <img className="w-full h-[500px] object-cover" src={url} alt={`Image ${index + 1}`} loading="lazy" />
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-background/60 to-transparent p-4 text-foreground text-center">
                                    <span className="text-xs font-medium">{index + 1} of {images.length}</span>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default BookableCard