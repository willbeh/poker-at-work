export function initials(name?: string | null): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const PALETTE = [
  { bg: '#B8E04A', fg: '#1F3A0E' },
  { bg: '#3B82F6', fg: '#FFFFFF' },
  { bg: '#F97316', fg: '#FFFFFF' },
  { bg: '#A855F7', fg: '#FFFFFF' },
  { bg: '#EC4899', fg: '#FFFFFF' },
  { bg: '#14B8A6', fg: '#FFFFFF' },
  { bg: '#EAB308', fg: '#1F3A0E' },
  { bg: '#0EA5E9', fg: '#FFFFFF' },
  { bg: '#EF4444', fg: '#FFFFFF' },
  { bg: '#22C55E', fg: '#FFFFFF' },
];

export function avatarColor(uid?: string | null): { bg: string; fg: string } {
  if (!uid) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < uid.length; i++) {
    hash = (hash * 31 + uid.charCodeAt(i)) | 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}
