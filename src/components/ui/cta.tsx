import Image, { StaticImageData } from "next/image";

interface CTAProps extends React.PropsWithChildren {
  backgroundImage: string | StaticImageData;
  overlayOpacity?: number;
  className?: string;
}

export default function CTA({
  backgroundImage,
  children,
  overlayOpacity = 0.2,
}: CTAProps) {
  return (
    <article className="relative h-175 w-full">
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt="" fill className="object-cover" />
      </div>
      <div
        className="bg-foreground absolute inset-0 mix-blend-multiply"
        style={{ opacity: Math.max(0, Math.min(1, overlayOpacity)) }}
      ></div>
      <div className="absolute inset-0 p-4 lg:p-12">{children}</div>
    </article>
  );
}
