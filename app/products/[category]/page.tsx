import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import {type CategoryType } from "@prisma/client";
import { ProductCard } from "@/app/components/ProductCard";

async function getData(category: string) {
    let input: CategoryType | undefined; // Added undefined as a possible type for input

    switch (category.toLowerCase()) {
        case "product":
            input = 'product' as CategoryType; // Added type assertion for input assignment
            break;
        case "about":
            input = 'about' as CategoryType; 
            break;
        case "blog":
            input = 'blog' as CategoryType;
            break;
        case "all":
            input = undefined;
            break;
        default:
            return notFound();
    }

    try {
        const data = await prisma.product.findMany({
            where: {
               category: input as CategoryType,
            },
            select: {
                id: true,
                images: true,
                name: true,
                smallDescription: true,
                price: true,
            },
        });
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return notFound();
    }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const data = await getData(params.category);

    if (!data) {
        return notFound();
    }

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
                {data.map((product) => (
                    <ProductCard key={product.id.toString()} images={product.images} price={product.price} id={product.id.toString()} name={product.name} smallDescription={product.smallDescription}
                    />
                ))}
            </div>
        </section>
    );
}


