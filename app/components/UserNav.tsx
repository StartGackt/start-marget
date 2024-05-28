
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";


interface iAppProps {
    email: string;
    name: string;
    userImage: string | undefined;
}
export function UserNav({email, name, userImage}: iAppProps) {
    return (
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={userImage}  alt = {userImage}/>
                        <AvatarFallback>
                           {name.slice(0, 3)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {name}
                        </p>
                        <p className="text-sm leading-none text-muted-foreground">
                            oat@startover.de
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild><Link href="/sell">Sell Products</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="my-products">My Products</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/billing">Billing</Link></DropdownMenuItem>
                    
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
       </DropdownMenuContent>
       </DropdownMenu>
    )
}