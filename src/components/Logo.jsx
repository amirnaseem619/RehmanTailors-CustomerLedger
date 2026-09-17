export default function Logo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="47" stroke="var(--gold)" strokeWidth="4" fill="var(--navy-deep)" />
      <g stroke="var(--gold-soft)" strokeWidth="3.5" strokeLinecap="round">
        <path d="M35 32 L68 65" />
        <path d="M68 32 L35 65" />
        <circle cx="34" cy="31" r="4.5" fill="none" />
        <circle cx="34" cy="66" r="4.5" fill="none" />
      </g>
      <path d="M40 70 Q55 62 66 72" stroke="#F2ECDD" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
