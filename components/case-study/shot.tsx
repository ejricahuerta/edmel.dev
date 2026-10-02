const BASE = "/case-studies/6ixback";

export function Shot({
  slug,
  url,
  caption,
  alt,
  desktopHeight = 1000,
}: {
  slug: string;
  url: string;
  caption: string;
  alt: string;
  desktopHeight?: number;
}) {
  return (
    <figure className="cs-shot">
      <div className="cs-shot-pair">
        <div className="cs-shot-frame">
          <div className="ed-window-bar">
            <span className="ed-window-dot" aria-hidden />
            <span className="ed-window-title">{url}</span>
          </div>
          <img
            src={`${BASE}/${slug}-desktop.webp`}
            alt={alt}
            width={1600}
            height={desktopHeight}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="cs-shot-mobile">
          <img
            src={`${BASE}/${slug}-mobile.webp`}
            alt=""
            aria-hidden="true"
            width={780}
            height={1688}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <figcaption className="ed-comment">{caption}</figcaption>
    </figure>
  );
}
