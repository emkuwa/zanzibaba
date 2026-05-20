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
        <p className="text-eyebrow">Partner With Us</p>
        <h2 className="mx-auto mt-5 max-w-2xl text-section-title text-white">
          Build the future of Zanzibar with Zanzibaba Group
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-body-luxury !text-white/75">
          Speak with our team in Paje or Stone Town — we respond to programme
          enquiries across all divisions.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-5">
          <Button href="/contact" variant="gold" size="lg">
            Get in Touch
            <span aria-hidden>→</span>
          </Button>
          <Button href="/solutions" variant="outline" size="lg" className="!border-white/60 !text-white hover:!bg-white/10">
            Explore Solutions
          </Button>
        </div>
      </div>
    </Section>
  );
}
