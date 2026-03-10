interface SiteNavLogoProps {
  brandName: string;
}

export default function SiteNavLogo({brandName}: SiteNavLogoProps) {
  return <p className="font-medium uppercase text-xl">{brandName}</p>
}