/**
 * The resume lives in Google Drive, shared as "anyone with the link can view", so it can be
 * updated without a deploy. Replace the file with Drive's "Manage versions → Upload new version";
 * uploading a new file instead gives it a new link.
 */
export const RESUME_URL = "https://drive.google.com/file/d/16MWgWBzC2J1kR23YfQFTcNADegGVGrsC/view";

export const SOCIALS: [label: string, href: string][] = [
  ["Resume", RESUME_URL],
  ["GitHub", "https://github.com/ejricahuerta"],
  ["LinkedIn", "https://linkedin.com/in/exricahuerta"],
  ["Instagram", "https://www.instagram.com/dev.exd"],
];
