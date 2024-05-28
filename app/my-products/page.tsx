import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProductCard } from "../components/ProductCard";
async function getData(userId : string) {
    const data = await prisma.product.findMany({
        where: {
            userId: userId,
        },
        select: {
            name: true,
            smallDescription: true,
            price: true,
            images: true,
            id: true,
        },
    })
    return data
}

export  default async function MyProductsRoute() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        throw new Error("Not logged in");
    }
    const data = await getData(user.id);
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 ">
          <h1 className="text-2xl font-bold ">My Products</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
                {data.map((item) => (
                    <ProductCard key={item.id} id={item.id} name={item.name} price={item.price} smallDescription={item.smallDescription} images={item.images} />
                ))}
          </div>
        </section>
    );
}