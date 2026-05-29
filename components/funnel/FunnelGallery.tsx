import Image from "next/image";
import { FUNNEL_GALLERY } from "@/data/funnel";

export function FunnelGallery() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container-portal">
        <h2 className="text-center font-serif text-2xl font-semibold text-zb-navy sm:text-3xl">
          {FUNNEL_GALLERY.title}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {FUNNEL_GALLERY.images.map((item) => (
            <div key={item.src} className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
