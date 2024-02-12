import { LucideProps } from "../../../node_modules/lucide-react/dist/lucide-react";

export const Icons = {
    logo: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 200 200" height="600" width="600">
  <circle cx="100" cy="100" r="80" fill="white" stroke="black" strokeWidth="5" />
  <circle cx="30" cy="30" r="25" fill="black" />
  <circle cx="170" cy="30" r="25" fill="black" />
  <circle cx="60" cy="90" r="25" fill="black" />
  <circle cx="140" cy="90" r="25" fill="black" />
  <circle cx="60" cy="90" r="10" fill="white" />
  <circle cx="140" cy="90" r="10" fill="white" />
  <ellipse cx="100" cy="135" rx="12" ry="10" fill="black" />
</svg>
    )
    }