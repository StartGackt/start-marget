import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from 'next/server';

export async function GET () {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user || user === null || !user.id) {
    throw new Error("Not logged in");
  }
  
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  });

  if (!dbUser) {
    const account = await stripe.accounts.create({
     email: user.email as string, 
     controller :{
      losses :{
        payments: 'application',
      },
      fees : {
        payer : 'application',
      },
      stripe_dashboard : {
          type :'express',
      }
     }
    });
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage: user.picture ?? `https://avatar.vercel.sh/rauchg${user.given_name}`,
       connectedAccountId: account.id,
      }
    });
  }

  return NextResponse.redirect('http://localhost:3000');
  }