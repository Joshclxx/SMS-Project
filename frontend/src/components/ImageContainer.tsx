import React from "react";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

export type ImageContainerProps = {
  /** Image source (public path, URL, or imported static image) */
  src: string | StaticImageData;
  /** Accessible alt text (required) */
  alt: string;
  /** Optional: fixed width/height for non-fill layout */
  width?: number;
  height?: number;
  /** Optional: aspect ratio (used when fill = true). e.g., 16/9, 1, 4/3 */
  aspectRatio?: number;
  /** Optional: rounded corners in px (defaults to 12) */
  borderRadius?: number;
  /** Optional: title & description below the image */
  title?: string;
  description?: string;
  /** Optional: make image use fill layout (default true if no width/height provided) */
  fill?: boolean;
  /** Optional: extra class names for the outer card */
  className?: string;
  /** Pass through a sizes string for responsive images when fill is used */
  sizes?: string;
  /** Image quality (1–100) */
  quality?: number;
  /** Priority loading */
  priority?: boolean;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  borderRadius = 12,
  title,
  description,
  fill, // if undefined, we infer it
  className,
  sizes = "(min-width: 768px) 400px, 100vw",
  quality,
  priority,
}) => {
  const useFill = typeof fill === "boolean" ? fill : !(width && height);

  return (
    <div
      className={clsx(
        "w-full max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md",
        className
      )}
      style={{ borderRadius }}
    >
      <div
        className={clsx("relative overflow-hidden")}
        style={{
          borderRadius,
          // If using fill, we need a sizing context: either fixed height or aspect-ratio.
          // Prefer CSS aspect-ratio for clean responsive boxes:
          aspectRatio: useFill ? aspectRatio ?? 16 / 9 : undefined,
          // If not using fill and you provided width/height, the wrapper can shrink-wrap:
          width: !useFill && width ? width : "100%",
          height: !useFill && height ? height : undefined,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill={useFill}
          width={!useFill ? width : undefined}
          height={!useFill ? height : undefined}
          className="object-cover"
          sizes={useFill ? sizes : undefined}
          quality={quality}
          priority={priority}
        />
      </div>

      {(title || description) && (
        <div className="mt-3">
          {title && <h3 className="text-sm font-semibold">{title}</h3>}
          {description && (
            <p className="text-sm text-gray-600 leading-snug">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
