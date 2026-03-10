"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends React.PropsWithChildren {
  href: string;
  onClick?: () => void;
}

export default function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`uppercase md:text-base block md:inline-block text-xl font-medium text-foreground hover:text-foreground transition-colors ${isActive ? "underline underline-offset-4" : ""}`}
    >
      {children}
    </Link>
  );
}
