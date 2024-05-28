'use client';
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navbarLinks } from "./NavbarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from '@/lib/utils';

export function MobileMenu() {
    const pathname = usePathname();
    return ( 
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                    <Menu className="h-4 w-4" />
                </Button>
            </SheetTrigger>

            <SheetContent>
                <div className="mt-5 flex px-2 space-y-1 flex-col">
                    {navbarLinks.map((link) => (
                         <Link key={link.id} href={link.href} className={cn(
                            pathname === link.href ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75',
                            'group flex items-center px-2 py-2 font-medium rounded-md'
                          )}>{link.name}</Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
     );
}