'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarLink {
  id: number;
  name: string;
  href: string;
}

export const navbarLinks: NavbarLink[] = [
  {
    id: 0,
    name: "Home",
    href: "/"
  },
  {
    id: 1,
    name: "Products",
    href: "/products/product"
  },
  {
    id: 2,
    name: "Contact",
    href: "/products/about"
  },
  {
    id: 3,
    name: "Blog",
    href: "/products/blog"
  }
];

export function NavbarLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      {navbarLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            pathname === link.href ? 'bg-muted' : 'hover:bg-muted hover:bg-opacity-75',
            'group flex items-center px-2 py-2 font-medium rounded-md'
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
