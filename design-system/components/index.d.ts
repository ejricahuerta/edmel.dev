// edmel.dev — prop contract for the Fixline components. Types are documentation;
// the implementations live in components/ui.tsx and the per-feature files under components/.
import type { ReactNode } from "react";

type Status = "open" | "progress" | "resolved";

export interface LogoProps { variant?: "lockup" | "wordmark" | "mark"; height?: number; href?: string; className?: string }
export interface FixlineProps { width?: number; strokeWidth?: number; amplitude?: number; className?: string; style?: object }
export interface ButtonProps { variant?: "primary" | "secondary" | "ghost"; size?: "md" | "sm"; arrow?: boolean; block?: boolean; href?: string; external?: boolean; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean; children: ReactNode }
export interface SectionLabelProps { children: ReactNode; count?: number; id?: string; as?: string }
export interface SquiggleProps { variant: "error" | "warn"; code: string; message?: ReactNode; children: ReactNode }
export interface MarkProps { children: ReactNode }
export interface FixProps { from: ReactNode; to: ReactNode }
export interface StatusPillProps { status: Status; children?: ReactNode }
export interface ChipsProps { items: string[]; label?: string }
export interface WindowProps { title: ReactNode; meta?: ReactNode; live?: boolean; dot?: string; action?: ReactNode; flush?: boolean; children: ReactNode }
export interface AskPromptProps { placeholders?: string[]; availability?: string; expanded?: boolean }
export interface RescueFormProps { initialMessage?: string; submitLabel?: string; onSubmit?: (v: { name: string; email: string; kind: string; message: string }) => void; errors?: Record<string, string>; sent?: boolean }
export interface TickerProps { items?: string[] }
export interface Service { n?: string; title: ReactNode; desc: ReactNode; status?: Status }
export interface ServiceGridProps { items?: Service[] }
export interface Product { name: string; url?: string; href?: string; desc: ReactNode; list?: string[]; tag?: string; feature?: boolean }
export interface ProductCardProps { product: Product }
export interface Issue { id: string; summary: string; status: Status; body: string[]; lead?: string; list?: string[] }
export interface IssueListProps { items?: Issue[]; footer?: boolean; openId?: string }
export interface StatStripProps { items?: { value: string; label: string; accent?: boolean }[] }
export interface SpecListProps { items?: [string, string][] }
export interface ShotProps { src?: string; alt?: string; caption?: string; device?: "desktop" | "mobile"; url?: string }
export interface DecisionProps { title: ReactNode; children: ReactNode }
export interface CTABlockProps { title?: ReactNode; body?: ReactNode; cta?: string; href?: string; file?: string; meta?: string }
export interface SiteNavProps { avatar?: string; current?: string; links?: [string, string][]; themeToggle?: boolean; menuOpen?: boolean }
export interface SiteFooterProps {}
