import Link from "next/link";
import { Container } from "@/components/layout/container";
import Decline from "@/assets/decline2.svg";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Mens", href: "/mens" },
  { label: "Womens", href: "/womens" },
  { label: "Sale", href: "/sale" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Snapchat", href: "https://snapchat.com" },
  { label: "Discord", href: "https://discord.com" },
];

const otherLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Legal", href: "/legal" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Our Commitment", href: "/commitment" },
];

interface FooterLinkGroupProps {
  title: string;
  links: { label: string; href: string }[];
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-primary">{title}</h3>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <Container as="footer">
      <div className="col-span-full border-t border-border pt-8 md:pt-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
          <Link href="/" className="shrink-0 col-span-full md:col-span-3">
            <Decline className="w-30 fill-red-700" />
          </Link>

          <div className="col-span-1 md:col-span-3">
            <FooterLinkGroup title="Site" links={siteLinks} />
          </div>
          <div className="col-span-1 md:col-span-3">
            <FooterLinkGroup title="Social" links={socialLinks} />
          </div>
          <div className="col-span-2 md:col-span-3">
            <FooterLinkGroup title="Other" links={otherLinks} />
          </div>

          <div className="flex flex-col gap-1 col-span-2 md:col-span-12 text-sm text-muted-foreground">
            <p>
              Template designed and developed by{" "}
              <Link
                href="https://pjos.dev"
                className="text-primary hover:underline"
              >
                pjos.dev
              </Link>
              .
            </p>
            <p>
              Ready to launch, no code experience required.{" "}
              <Link href="#" className="text-primary hover:underline">
                Buy now
              </Link>
              .
            </p>
            <p>
              Don&apos;t want to pay? Learn how to build it yourself{" "}
              <Link href="#" className="text-primary hover:underline">
                here
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 md:mt-12" />
      </div>
    </Container>
  );
}
