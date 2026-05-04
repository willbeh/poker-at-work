export function timeAgo(date: Date | number | string | undefined): string {
  if (!date) return '';
  const d = date instanceof Date ? date.getTime() : new Date(date).getTime();
  const diff = Date.now() - d;
  if (isNaN(diff) || diff < 0) return 'just now';

  const sec = Math.floor(diff / 1000);
  if (sec < 30) return 'just now';
  if (sec < 60) return `${sec} sec ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;

  const hr = Math.floor(min / 60);
  const remMin = min - hr * 60;
  if (hr < 24) return remMin > 0 ? `${hr}h ${remMin}m ago` : `${hr}h ago`;

  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  const wk = Math.floor(day / 7);
  if (wk < 5) return `${wk}w ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(day / 365)}y ago`;
}
