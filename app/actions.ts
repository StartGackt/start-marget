"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { CategoryType } from "@prisma/client";
import { stripe } from "./lib/stripe";
import { redirect } from "next/navigation";


export type State = {
    status: "error" | "success" | undefined ;
    error?:{
        [key : string] : string[]
    }
    message?: string | null
}

const productSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    category: z.string().min(1, { message: "Category is required" }),
    price: z.number({ required_error: "Price is required" }).positive({ message: "Price must be greater than 0" }),
    smallDescription: z.string().min(1, { message: "Please provide a small description" }),
    description: z.string().min(1, { message: "Description is required" }),
    images: z.array(z.string()).min(1, { message: "At least one image is required" }),
    productFile: z.string().min(1, { message: "Please upload a zip of the product" }),
});

const userSettingsSchema = z.object({
    firstName: z.string().min(3, { message: "first name Minimum 3 characters" }).or(z.literal("")).optional(),
    lastName: z.string().min(1, { message: "Last name Minimum 3 characters" }).or(z.literal("")).optional(),
})
export async function SellProduct(prevState: any ,formData : FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        throw new Error("Authentication failed");
    }

    const validationFields = productSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        smallDescription: formData.get("smallDescription"),
        description: formData.get("description"),
        images:JSON.parse(formData.get("images") as string),
        productFile: formData.get("productFile"),
    });

    if (!validationFields.success) {
        const state: State = {
            status: "error",
            error: validationFields.error.flatten().fieldErrors,
            message: "Oops,I think there is a mistake in your form......."
        }
    
        return state;

    }

    await prisma.product.create({
        data: {
            name: validationFields.data.name,
            category: validationFields.data.category as CategoryType,
            price: validationFields.data.price,
            smallDescription: validationFields.data.smallDescription,
            description: JSON.parse(validationFields.data.description),
            images: validationFields.data.images,
            productFile: validationFields.data.productFile,
            userId: user.id
        }
    })

    const state: State = {
        status: "success",
        message: "Product added successfully"
    }
    return state
}
export async function UpdateUserSettings(prevState: any ,formData : FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("Authentication failed");
    }

    const validationFields = userSettingsSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
    });

    if (!validationFields.success) {
        const state: State = {
            status: "error",
            error: validationFields.error.flatten().fieldErrors,
            message: "Oops,I think there is a mistake in your form......."
        }
    
        return state;
    }
    const data = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            firstName: validationFields.data.firstName,
            lastName: validationFields.data.lastName
        }
    })
    const state: State = {
        status: "success",
        message: "Settings updated successfully"
    }
    return state
}


export async function BuyProduct(formData : FormData) {
     const id = formData.get("id") as string
     const data = await prisma.product.findUnique({
         where: {
             id: id,
         },
         select: {
             name: true,
             smallDescription: true,
             price: true,
             images: true,
             id: true,
             User: {
                 select: {
                   connectedAccountId: true
                 }
             }
         },
     })
     const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
            {
                price_data:{
                    currency: "usd",
                    unit_amount:Math.round((data?.price  as number) * 100),
                    product_data:{
                        name: data?.name as string,
                        description: data?.smallDescription as string,
                        images: data?.images as string[],
                        
                    },
                },
                quantity: 1,
            }
        ],
        payment_intent_data: {
            application_fee_amount: Math.round((data?.price  as number) * 0.1 * 100),
            transfer_data: {
                destination: data?.User?.connectedAccountId as string
            }
        },
        success_url: "http://localhost:3000/payment/success",
        cancel_url: "http://localhost:3000/payment/cancel",
     });
     return redirect(session.url as string)
}

export async function CrateStripeAccountLink() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      throw new Error("Authentication failed");
    }
  
    const data = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      select: {
        connectedAccountId: true,
      },
    });
  
    if (!data || !data.connectedAccountId) {
      // Handle the case where connectedAccountId is not found
      console.error(`No connected account ID found for user ID: ${user.id}`);
      // You can redirect the user to a page to complete the Stripe account setup
      return redirect('http://localhost:3000/payment/cancel');
    }
  
    console.log("Creating Stripe account link for account ID:", data.connectedAccountId);
  
    const accountLink = await stripe.accountLinks.create({
      account: data.connectedAccountId,
      refresh_url: `http://localhost:3000/billing`,
      return_url: `http://localhost:3000/return/${data?.connectedAccountId}`,
      type: "account_onboarding",
    });
  
    return redirect(accountLink.url);
  }

  export async function GetStripeDashboardLink() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      throw new Error("Authentication failed");
    }
  
    const data = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      select: {
        connectedAccountId: true,
      },
    });
            const loginLink = await stripe.accounts.createLoginLink(data?.connectedAccountId as string);
            return redirect(loginLink.url);
  }

