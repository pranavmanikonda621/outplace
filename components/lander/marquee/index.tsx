import { MARQUEE_LOGOS } from "@/components/lander/marquee/marquee-logos";
import Image from "next/image";

export function Marquee() {
    const images = MARQUEE_LOGOS;
    const renderLogoSet = (suffix = "", hidden = false) => (
      <div aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
        {images.map((img) => (
          <div
            key={`${img.src}${suffix}`}
            className="flex h-10 w-[100px] shrink-0 items-center"
          >
            <Image
              src={img.src}
              alt={img.alt || "logo"}
              width={100}
              height={40}
              style={{ objectFit: "contain", height: 40 }}
              className="w-auto max-h-10"
              unoptimized
            />
          </div>
        ))}
      </div>
    );
  
    return (
        <div className="w-full overflow-x-hidden py-5 mb-3">
        <div className="text-center text-sm font-semibold text-primary mb-8">
          Built by people who worked at
        </div>
        <div className="marquee relative w-full max-w-4xl mx-auto px-4 sm:px-8">
          <div className="flex w-max animate-marquee items-center">
            {renderLogoSet()}
            {renderLogoSet("-duplicate", true)}
          </div>
        </div>
        {/* Marquee CSS */}
        <style jsx>{`
          .animate-marquee {
            animation: marquee-scroll 28s linear infinite;
          }
          @keyframes marquee-scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    );
  }
