import { Rejection } from './types';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getRejections(entries: Rejection[]): Rejection[] {
  return entries.filter((e) => !e.isYes);
}

export function getYeses(entries: Rejection[]): Rejection[] {
  return entries.filter((e) => e.isYes);
}

export function getStreak(entries: Rejection[]): number {
  const rejections = getRejections(entries);
  if (rejections.length === 0) return 0;

  const daySet = new Set<string>();
  for (const r of rejections) {
    const d = new Date(r.timestamp);
    daySet.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
  }

  const today = new Date();
  let streak = 0;
  let checkDate = new Date(today);

  // Check if today has a rejection; if not, start from yesterday
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  if (!daySet.has(todayKey)) {
    checkDate.setDate(checkDate.getDate() - 1);
    const yKey = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
    if (!daySet.has(yKey)) return 0;
  }

  while (true) {
    const key = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
    if (daySet.has(key)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function getYearlyRejections(entries: Rejection[]): number {
  const now = new Date();
  const year = now.getFullYear();
  return getRejections(entries).filter((e) => {
    const d = new Date(e.timestamp);
    return d.getFullYear() === year;
  }).length;
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function getPaceProjection(
  yearlyCount: number,
  joinDate: number,
  goal: number
): string | null {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1).getTime();
  const effectiveStart = Math.max(startOfYear, joinDate);
  const daysElapsed = Math.max(
    1,
    Math.floor((now.getTime() - effectiveStart) / 86400000)
  );
  const pace = yearlyCount / daysElapsed;

  if (pace <= 0) return null;

  const remaining = goal - yearlyCount;
  if (remaining <= 0) return 'Goal reached';

  const daysNeeded = Math.ceil(remaining / pace);
  const projectedDate = new Date(now.getTime() + daysNeeded * 86400000);

  return projectedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year:
      projectedDate.getFullYear() !== now.getFullYear()
        ? 'numeric'
        : undefined,
  });
}
