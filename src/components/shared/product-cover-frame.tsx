import { cn } from "@/lib/utils";

interface ProductCoverFrameProps {
  src: string;
  alt: string;
  className?: string;
  outerGlow?: boolean;
}

/**
 * Locks any uploaded image (9:16 portrait, 1:1 square, 16:9 landscape, etc.)
 * into a strict uniform 16:10 container without stretching the page layout
 * and without cropping important text/logos on portrait posters.
 */
export function ProductCoverFrame({
  src,
  alt,
  className,
  outerGlow = false,
}: ProductCoverFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border p-2.5",
        outerGlow
          ? "tech-glass-panel border-gold/45 bg-[#061224]/90 shadow-gold"
          : "border-line-strong bg-[#050D1A]",
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-[#030811]">
        {/* Ambient color-matched blurred backdrop so 9:16 / 1:1 images fill the 16:10 frame seamlessly */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-xl"
        />

        {/* Crisp full foreground image fit cleanly inside fixed 16:10 viewport */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="relative z-10 h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
