import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CartButton } from "@/components/cart/cart-button";
import MobileMenu from "@/components/navigation/site-nav/mobile-menu";
import NavLink from "@/components/navigation/site-nav/nav-link";
import Decline from "@/assets/decline2.svg";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/womens", label: "Womens" },
  { href: "/mens", label: "Mens" },
  { href: "/blog", label: "Blog" },
];

export default function SiteNav() {
  return (
    <Section as="nav" spacing={"none"}>
      <Container className="nav-height flex items-center justify-between">
        <div className="w-full h-full flex items-center justify-between relative">
          <Link href="/" className="shrink-0">
            <Decline className="w-30 fill-red-700" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4 lg:gap-6 ml-auto">
            <CartButton />
            <div className="md:hidden flex items-center">
              <MobileMenu
                title="menu"
                screenReaderDescription="Links to other site pages and your shopping cart"
                screenReaderTitle="Site Navigation Menu"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
