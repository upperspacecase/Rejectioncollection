import { MilestoneDef } from './types';

export const MILESTONES: MilestoneDef[] = [
  {
    count: 1,
    title: 'First Blood',
    message: "You did it. One rejection. You're in the arena now.",
  },
  {
    count: 10,
    title: 'Double Digits',
    message: "Ten nos. Most people don't get past three.",
  },
  {
    count: 25,
    title: 'Quarter Century',
    message: "25 rejections. You're building something most people can't even start.",
  },
  {
    count: 50,
    title: 'Half Century',
    message: "50. You've been rejected more times than most people try anything. That's the difference.",
  },
  {
    count: 100,
    title: 'Triple Digits',
    message: "Triple digits. Most people never get here.",
  },
  {
    count: 250,
    title: 'Quarter Thousand',
    message: "250 rejections. You don't flinch anymore, do you?",
  },
  {
    count: 500,
    title: 'Five Hundred',
    message: "You've been told no 500 times and you're still here. That's the whole point.",
  },
  {
    count: 750,
    title: 'Three Quarters',
    message: "750. The people who told you no? They forgot. You didn't. That's power.",
  },
  {
    count: 1000,
    title: 'The Thousand',
    message: "1,000. You win. (Now keep going.)",
  },
];

export function getNewMilestone(
  oldCount: number,
  newCount: number
): MilestoneDef | null {
  for (const m of MILESTONES) {
    if (oldCount < m.count && newCount >= m.count) {
      return m;
    }
  }
  return null;
}

export function getAchievedMilestones(count: number): MilestoneDef[] {
  return MILESTONES.filter((m) => count >= m.count);
}
