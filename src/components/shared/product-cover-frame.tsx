import { cn } from "@/lib/utils";

interface ProductCoverFrameProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Pure borderless 16:9 horizontal image container.
 * Enforces a strict uniform 16:9 aspect ratio with tasteful sizing regardless
 * of the raw uploaded file dimensions.
 */
export function ProductCoverFrame({
  src,
  alt,
  className,
}: ProductCoverFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl bg-[#050D1A]",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  );
}
