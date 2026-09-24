import Image from "next/image";

export function SiteNav({
  logoHref = "#",
  ctaHref = "#contact",
}: {
  logoHref?: string;
  ctaHref?: string;
}) {
  return (
    <nav>
      <a href={logoHref} className="nav-logo">
        <Image
          src="/edmel.png"
          alt=""
          width={32}
          height={32}
          className="nav-avatar"
          priority
        />
        <span className="nav-logo-text">
          edmel<span>.dev</span>
        </span>
      </a>
      <div className="nav-actions">
        <div className="nav-social">
          <a
            href="https://github.com/ejricahuerta"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href="https://linkedin.com/in/exricahuerta"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href="https://www.instagram.com/dev.exd"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
        <a href={ctaHref} className="nav-cta">
          Get in touch
        </a>
      </div>
    </nav>
  );
}
