// app/all/page.tsx
import prisma from "@/app/lib/db";
import { ProductCard } from "@/app/components/ProductCard";

export default async function AllProductsPage() {
  const data = await prisma.product.findMany({
    select: {
      id: true,
      images: true,
      name: true,
      smallDescription: true,
      price: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <h2 className="text-2xl font-extrabold tracking-tighter py-2">Newest Products</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data.map((product) => (
          <ProductCard key={product.id.toString()} images={product.images} price={product.price} id={product.id.toString()} name={product.name} smallDescription={product.smallDescription} />
        ))}
      </div>
    </section>
  );
}
