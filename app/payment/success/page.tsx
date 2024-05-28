import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, XCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
    return (
        <section className="w-full min-h-[80vh] flex items-center justify-center"> 
  <Card className="w-[350px]">
    <div className="p-6 flex flex-col items-center">
      <div className="w-12 h-12 flex items-center justify-center">
        <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
      </div>
      <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">Payment Success</h3>
            <p className="mt-2 text-sm text-muted-foreground">Congrats your payment was purchase! Please check your email for more details.</p>

            <Button className="mt-5 sm:mt-6 w-full" asChild>
                <Link href="/">Back to Home</Link>
            </Button>
      </div>
    </div>
  </Card>
</section>

      
      
    );
}