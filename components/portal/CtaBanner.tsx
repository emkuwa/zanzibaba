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
        <h2 className="mx-auto max-w-3xl font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2.5rem]">
          Building Beyond Structures.
          <span className="mt-2 block text-zb-gold">Creating Lasting Impact.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base lg:text-lg">
          Partner with Zanzibaba Group — seven divisions, one commitment to excellence
          throughout Zanzibar.
        </p>
        <div className="mt-8 flex flex-row flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
          <Button href="/contact" variant="gold" size="lg" className="shadow-zb-gold">
            Get in Touch with Us
          </Button>
          <Button
            href="/projects"
            variant="outline-light"
            size="lg"
            className="!border-white !bg-transparent !text-white hover:!bg-white/10"
          >
            Our Projects
          </Button>
        </div>
      </div>
    </Section>
  );
}
