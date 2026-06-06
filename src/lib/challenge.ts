export interface Mission {
  id: string;
  text: string;
}

export interface ChallengeWeek {
  week: number;
  title: string;
  theme: string;
  missions: Mission[];
}

export const CHALLENGE: ChallengeWeek[] = [
  {
    week: 1,
    title: 'Low-stakes noes',
    theme: 'Warm up. Ask for small things and feel how little a no actually costs.',
    missions: [
      { id: 'w1m1', text: 'Ask for a discount at a shop or service.' },
      { id: 'w1m2', text: 'Ask for a free upgrade — a bigger size, a better table, a better seat.' },
      { id: 'w1m3', text: 'Ask a stranger for a recommendation.' },
      { id: 'w1m4', text: 'Ask to try or sample something before you buy.' },
      { id: 'w1m5', text: 'Ask someone to repeat or explain something you didn’t catch.' },
    ],
  },
  {
    week: 2,
    title: 'Social courage',
    theme: 'Point the asks at people. Connection lives on the other side.',
    missions: [
      { id: 'w2m1', text: 'Ask someone to coffee.' },
      { id: 'w2m2', text: 'Ask a friend for honest feedback.' },
      { id: 'w2m3', text: 'Ask to join a group, a table, or an event.' },
      { id: 'w2m4', text: 'Ask a stranger for advice.' },
      { id: 'w2m5', text: 'Reconnect with someone you lost touch with.' },
    ],
  },
  {
    week: 3,
    title: 'Opportunity asks',
    theme: 'Ask for things that move your work and life forward.',
    missions: [
      { id: 'w3m1', text: 'Ask for an introduction.' },
      { id: 'w3m2', text: 'Ask for a collaboration.' },
      { id: 'w3m3', text: 'Ask for a sales or discovery call.' },
      { id: 'w3m4', text: 'Ask for feedback from someone senior to you.' },
      { id: 'w3m5', text: 'Ask for a meeting two levels above you.' },
    ],
  },
  {
    week: 4,
    title: 'The big ask',
    theme: 'You’ve built the muscle. Now point it at what actually matters.',
    missions: [
      { id: 'w4m1', text: 'Ask for the raise, the deal, or the role you want.' },
      { id: 'w4m2', text: 'Ask the person you’ve been too scared to ask.' },
      { id: 'w4m3', text: 'Make an ask that could genuinely change things.' },
      { id: 'w4m4', text: 'Ask for something that actually scares you.' },
      { id: 'w4m5', text: 'Ask again after a no.' },
    ],
  },
];

export const TOTAL_MISSIONS = CHALLENGE.reduce((n, w) => n + w.missions.length, 0);

/** Which challenge week the user is on (1–4), based on days since they joined. */
export function getCurrentWeek(joinDate: number): number {
  const days = Math.floor((Date.now() - joinDate) / 86400000);
  return Math.min(4, Math.max(1, Math.floor(days / 7) + 1));
}
