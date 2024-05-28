'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Sellform } from '../components/form/Sellform';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";

async function getData(userId : string) {
    
    const data = await prisma.user.findUnique({
       where: {
        id: userId,
        },select:{
            stripeConnectedLinked: true
        }
    });
    console.log("Stripe connected link status:", data?.stripeConnectedLinked);  
    if (data?.stripeConnectedLinked === false) {
        return  redirect('/billing')
    }
   return null
}


export default async function SellRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        throw new Error("Unauthorized");

    }

    const redirectResult = await getData(user.id);
    if (redirectResult) {
        return redirectResult;  
    }
}
