import { Section } from "./Section";
import { Button } from "./Button";

export function CtaBanner() {
  return (
    <Section dark animate={false} className="relative overflow-hidden">
      <div className="absolute inset-0 pattern-architectural opacity-40" aria-hidden />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(200,155,60,0.14), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative text-center">
        <h2 className="mx-auto max-w-3xl font-serif text-xl font-semibold leading-tight text-white sm:text-2xl lg:text-[2.5rem]">
          Ready to invest in
          <span className="mt-1 block text-zb-gold sm:mt-2">Zanzibar real estate?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-base lg:mt-6 lg:text-lg">
          Speak with our advisory team about beachfront villas, investment land, and
          luxury property for sale in Zanzibar.
        </p>
        <div className="mt-5 flex flex-row flex-wrap justify-center gap-2.5 sm:mt-7 sm:gap-3 lg:mt-10 lg:gap-4">
          <Button href="/contact" variant="gold" size="md" className="sm:px-8 sm:py-3.5 sm:text-base">
            Book Consultation
          </Button>
          <Button
            href="/properties"
            variant="outline-light"
            size="md"
            className="!border-white !bg-transparent !text-white hover:!bg-white/10 sm:px-8 sm:py-3.5 sm:text-base"
          >
            Browse Properties
          </Button>
        </div>
      </div>
    </Section>
  );
}
