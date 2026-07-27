export function BrandMark({ size = 34, className = "lp-brand-logo" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M12 3h24a9 9 0 0 1 9 9v20a9 9 0 0 1-9 9H21.5L12.5 47v-6H12a9 9 0 0 1-9-9V12a9 9 0 0 1 9-9Z" fill="#E51D35" />
      <path d="M17 30.5V15.5L31 30.5V15.5" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="31" cy="15.5" r="3.4" fill="#37D5A1" />
    </svg>
  );
}
