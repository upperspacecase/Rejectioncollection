const ASKS = [
  'Reach out to one person you’ve been putting off emailing.',
  'Ask for the deeper discount.',
  'DM the speaker you admired at that last talk.',
  'Request the corner table.',
  'Send the cold pitch you’ve been drafting for three weeks.',
  'Ask your manager for the feedback you’re avoiding.',
  'Ask for an intro you’d never expect to get.',
  'Pitch the idea everyone said was too ambitious.',
  'Ask for a refund on the thing that wasn’t quite right.',
  'Request the meeting with someone two levels above you.',
  'Ask for help with the thing you keep getting stuck on.',
  'Cold-email someone whose work you’ve quoted.',
  'Tell that person you appreciate them — out loud.',
  'Ask for the raise. Today. Not after the next review.',
];

export function getAskOfTheDay(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return ASKS[dayOfYear % ASKS.length];
}

export function getGreetingPeriod(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Late night';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Late night';
}

export function getDayName(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

export const QUICK_FILL_SUGGESTIONS = [
  'Sent a cold email',
  'Asked for a discount',
  'Pitched my idea',
  'Asked for help',
];
