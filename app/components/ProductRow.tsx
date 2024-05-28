import { Suspense } from "react";
import prisma from "../lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Skeleton } from '@/components/ui/skeleton';

interface iAppProps {
  category: 'news' | 'product' | 'about' | 'blog';
}

async function getData({ category }: iAppProps) {
  switch (category) {
    case 'blog': {
      const data = await prisma.product.findMany({
        where: {
          category: 'blog'
        },
        select: {
          name: true,
          smallDescription: true,
          price: true,
          images: true,
          id: true
        },
        take: 3,
        orderBy: {
          createdAt: 'desc'
        }
      });
      return {
        data: data,
        title: 'Blog',
        link: '/products/blog',
      };
    }
    case 'news': {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          smallDescription: true,
          price: true,
          id: true,
          images: true,
        },
        take: 3,
        orderBy: {
          createdAt: 'desc'
        }
      });
      return {
        data: data,
        title: 'Newest Products',
        link: '/all', // Make sure this route exists
      };
    }
    case 'product': {
      const data = await prisma.product.findMany({
        where: {
          category: 'product'
        },
        select: {
          name: true,
          smallDescription: true,
          price: true,
          images: true,
          id: true
        },
        take: 3,
        orderBy: {
          createdAt: 'desc'
        }
      });
      return {
        data: data,
        title: 'Product',
        link: '/products/product',
      };
    }
    case 'about': {
      const data = await prisma.product.findMany({
        where: {
          category: 'about'
        },
        select: {
          name: true,
          smallDescription: true,
          price: true,
          images: true,
          id: true
        },
        take: 3,
      });
      return {
        data: data,
        title: 'About',
        link: '/products/about',
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function ProductRow({ category }: iAppProps) {
  const data = await getData({ category: category });
  return (
    <section className="mt-12">
     <Suspense fallback={<LoadingState />}>
        <LoadRow category={category} />
     </Suspense>
    </section>
  );
}

async function LoadRow({ category }: iAppProps) {
    const data = await getData({ category: category });
    return (
        <>
        <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter py-2">{data.title}</h2>
        <Link href={data.link} className="text-sm font-medium text-violet-500 hover:text-primary/90 md:block">
          All products
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-4">
        {data.data.map((product) => (
          <ProductCard key={product.id} images={product.images} id={product.id} name={product.name} price={product.price} smallDescription={product.smallDescription} />
        ))}
      </div>
        </>
    )
}

function LoadingState() {
    return(
        <Skeleton className="h-8 w-56">
            <div className="grid gird-col-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
            </div>
        </Skeleton>
    )
}
