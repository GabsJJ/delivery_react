type LImageProps = {
  src: string; // caminho relativo à pasta public, ex: "/img/banner.jpg"
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

export function LImage({ src, alt, className, style }: LImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={style}
    />
  );
}