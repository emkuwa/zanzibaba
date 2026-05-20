import { Section } from "./Section";
import { Button } from "./Button";

export function CtaBanner() {
  return (
    <Section dark animate={false} className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(200,155,60,0.12), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative text-center">
        <h2 className="mx-auto max-w-3xl font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
          Building Beyond Structures.
          <span className="mt-2 block text-zb-gold">Creating Lasting Impact.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Partner with Zanzibaba Group — seven divisions, one commitment to excellence
          across Zanzibar and Tanzania.
        </p>
        <div className="mt-10 flex flex-row flex-wrap justify-center gap-3 sm:mt-12 sm:gap-4">
          <Button href="/contact" variant="gold" size="lg" className="uppercase tracking-wider">
            Get in Touch with Us
            <span aria-hidden>→</span>
          </Button>
          <Button
            href="/solutions"
            variant="outline-light"
            size="lg"
            className="!border-white !bg-transparent !text-white hover:!bg-white/10"
          >
            Our Services
          </Button>
        </div>
      </div>
    </Section>
  );
}
