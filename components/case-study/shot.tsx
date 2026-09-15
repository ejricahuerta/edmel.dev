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
          <div className="form-header">
            <span className="form-header-dot" />
            <span className="form-header-label">{url}</span>
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
      <figcaption className="svc-n">{caption}</figcaption>
    </figure>
  );
}
