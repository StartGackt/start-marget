import prisma from "../lib/db"
import Link from "next/link"
import Image from 'next/image';
import { ProductCard } from "./ProductCard";

async function getData() {
  const data = await prisma.product.findMany({
    select: {
      price: true,
      smallDescription: true,
      category: true,
      name: true,
      id: true,
      images: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  })
  return data
}

export async function NewestProducts() {
  const data = await getData() 
  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter py-2">Newest Products</h2>
        <Link href="/#" className="text-sm font-medium text-violet-500 hover:text-primary/90 md:block">
          All products
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-4 ">
        {data.map((product) => (
          <ProductCard key={product.id} images={product.images} id={product.id} name={product.name} price={product.price} smallDescription={product.smallDescription} />
        ))}
      </div>
    </section>
  )
}