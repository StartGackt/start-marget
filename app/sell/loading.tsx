import { LoadingProductCard } from "@/app/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 ">
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-3 mt-4">
               <LoadingProductCard />
            </div>
        </section>
    );
}