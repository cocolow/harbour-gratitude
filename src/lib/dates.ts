export function toDateKey(iso: string): string {
  return iso.slice(0, 10);
}

export function formatEntryTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatDayLabel(dateKey: string): string {
  const d = new Date(dateKey + 'T12:00:00');
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function daysSinceLastEntry(entries: { createdAt: string }[]): number | null {
  if (entries.length === 0) return null;
  const latest = entries.reduce((a, b) =>
    a.createdAt > b.createdAt ? a : b,
  );
  const last = new Date(latest.createdAt);
  const now = new Date();
  const diff = now.getTime() - last.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getHeatmapDays(weeks: number): string[] {
  const days: string[] = [];
  const end = new Date();
  end.setHours(12, 0, 0, 0);
  const total = weeks * 7;
  for (let i = total - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    days.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    );
  }
  return days;
}
