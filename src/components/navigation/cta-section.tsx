import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button-link";
import CTA from "@/components/ui/cta";
import { Typography } from "@/components/ui/typography";

import gray from "@/assets/GRAY.jpg";
import club from "@/assets/club.jpg";

export default function CTASection() {
  return (
    <Section spacing={"xl"}>
      <Container as="div">
        <div className="col-span-full grid gap-4 2xl:grid-cols-2">
          <CTA backgroundImage={gray} overlayOpacity={0.4}>
            <div className="min-h-full flex flex-col justify-between">
              <div className="bg-muted-foreground text-primary-foreground! self-start px-3 py-1.5 rounded-full">
                <Typography
                  variant={"body"}
                  className="capitalize font-medium text-sm"
                  as="h2"
                >
                  oni editions
                </Typography>
              </div>
              <Typography
                variant={"headline"}
                className="text-primary-foreground text-3xl md:text-4xl"
              >
                NOT FOR THE MASSES. NOT FOREVER. ONI EDITIONS ARE CURATED
                SHORT-RUNS AVAILABLE IN LIMITED NUMBERS FOR A STRICTLY DEFINED
                WINDOW. EACH DROP IS PRODUCED ONCE THEN ARCHIVED—NO RESTOCKS, NO
                EXCEPTIONS. PREMIUM CRAFT MEETS CONTROLLED SCARCITY. RARE BREEDS
                FOR RARE SOULS. SECURE YOURS BEFORE THE WINDOW SEALS
              </Typography>
              <ButtonLink href="/" variant="secondary">Explore editions</ButtonLink>
            </div>
          </CTA>
          <CTA backgroundImage={club} overlayOpacity={0.4}>
            <div className="min-h-full flex flex-col justify-between">
              <div className="bg-muted-foreground text-primary-foreground! self-start px-3 py-1.5 rounded-full">
                <Typography
                  variant={"body"}
                  className="capitalize font-medium text-sm"
                  as="h2"
                >
                  Club Oni
                </Typography>
              </div>
              <Typography
                variant={"headline"}
                className="text-primary-foreground text-3xl md:text-4xl"
              >
                NOT FOR THE MASSES. NOT FOREVER. ONI EDITIONS ARE CURATED
                SHORT-RUNS AVAILABLE IN LIMITED NUMBERS FOR A STRICTLY DEFINED
                WINDOW. EACH DROP IS PRODUCED ONCE THEN ARCHIVED—NO RESTOCKS, NO
                EXCEPTIONS. PREMIUM CRAFT MEETS CONTROLLED SCARCITY. RARE BREEDS
                FOR RARE SOULS. SECURE YOURS BEFORE THE WINDOW SEALS
              </Typography>
              <ButtonLink href="/" variant="secondary">Explore Club Oni</ButtonLink>
            </div>
          </CTA>
        </div>
      </Container>
    </Section>
  );
}
