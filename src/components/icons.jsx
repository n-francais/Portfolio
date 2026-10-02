const common = {
  width: "1.3rem",
  height: "1.3rem",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function UserIcon(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.5-4 4.5-6 7.5-6s6 2 7.5 6" />
    </svg>
  );
}

export function FolderIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M3.5 6.5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-11z" />
    </svg>
  );
}

export function CapIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 4.5 2.5 9 12 13.5 21.5 9 12 4.5z" />
      <path d="M6 11v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" />
    </svg>
  );
}

export function PathIcon(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="18.5" cy="5.5" r="2" />
      <path d="M7.2 17 C 10 14, 9 10, 12 9 S 16 5.5, 16.5 7" />
    </svg>
  );
}

export function MusicIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M9 18V5.5L20 4v12.5" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16.5" r="2.5" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function HeartIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 20s-7-4.4-9.5-9C.8 7.3 3 4 6.3 4c2 0 3.4 1.1 4.2 2.3C11.3 5.1 12.7 4 14.7 4 18 4 20.2 7.3 20.5 11c-2.5 4.6-8.5 9-8.5 9z" />
    </svg>
  );
}

export function BagIcon(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M8.5 7.5V6a2.5 2.5 0 0 1 2.5-2.5h2A2.5 2.5 0 0 1 15.5 6v1.5" />
    </svg>
  );
}

export function CodeIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M8.5 7 3.5 12l5 5" />
      <path d="M15.5 7l5 5-5 5" />
    </svg>
  );
}

export function FlagIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M5 20V4" />
      <path d="M5 5h12l-3 4 3 4H5" />
    </svg>
  );
}

export const NAV_ICONS = {
  apropos: UserIcon,
  projets: FolderIcon,
  competences: CapIcon,
  parcours: PathIcon,
  horscode: MusicIcon,
  contact: MailIcon,
};

export const TIMELINE_ICONS = {
  cap: CapIcon,
  bag: BagIcon,
  heart: HeartIcon,
  code: CodeIcon,
  flag: FlagIcon,
};
