import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";


interface iAppProps {
    images: string[]
    name: string
    price: number
    smallDescription: string
    id: string
}
export function ProductCard({ images, id, name, price, smallDescription }: iAppProps) {
    return (
        <div className="rounded-lg">
            <Carousel className="w-full mx-auto">
                <CarouselContent>
                    {images.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[230px]">
                                <Image alt="product" src={item} fill className="object-cover w-full h-full rounded-lg" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-16" />
                <CarouselNext className="mr-16" />
            </Carousel>
            {/* */}

            <div className="flex justify-between items-center mt-2">
                <h1 className="font-semibold text-lg">{name}</h1>
                <h3 className="inline-flex items-center rounded-md bg-violet/10 px-2 py-1 text-xs font-medium text-violet-500 ring-1 ring-inset ring-violet/10">${price}</h3>
            </div>

            <p className=" text-gray-500 line-clamp-2 text-sm mt-2">{smallDescription}</p>
            <Button asChild className="w-full mt-5">
                <Link href={`/product/${id}`}>Learn More!</Link>
            </Button>
        </div>
    )
}

export function LoadingProductCard() {
    return (
        <div className="flex flex-col">
            <Skeleton className=" w-full h-[230px]" />
           <div className="flex flex-col mt-2 gap-y-2">
                <Skeleton className=" h-4 w-full" />
                <Skeleton className="w-full h-6" />
            </div> 
            <Skeleton className="w-full h-10 mt-5" />
        </div>
    )
}