const REJECTION_REFRAMES = [
  'Good. That was a rep.',
  "You asked. Most people don't.",
  'No is data. Now you know.',
  'This one didn’t work. You still got harder to stop.',
  'A no costs nothing. Not asking costs everything.',
  "That's one more no between you and the yes.",
  'You felt the fear and asked anyway. That’s the whole game.',
  "Nothing bad happened. You're still here.",
  'The ask was the win. The answer was never up to you.',
  'Braver than yesterday. Logged.',
  'You shrank the fear by one.',
  "Most people stayed quiet today. You didn't.",
  'Rejection is the toll. You paid it. Keep driving.',
  'Another no for the collection. They add up to courage.',
  'You aimed high enough to get told no. Good.',
  'Reps make the muscle. That was a rep.',
  'You did the uncomfortable thing. That’s the whole point.',
  'Felt uncomfortable? Good. That’s growth.',
  'Comfortable is where wanting goes to die. Not today.',
];

const YES_LINES = [
  'A yes! Proof the asking works.',
  'Yes. Keep the volume up.',
  "That's what asking gets you.",
  "A yes. Don't stop now.",
  'Look at that. You asked and it landed.',
];

export function getReframe(isRejection: boolean): string {
  const pool = isRejection ? REJECTION_REFRAMES : YES_LINES;
  return pool[Math.floor(Math.random() * pool.length)];
}
