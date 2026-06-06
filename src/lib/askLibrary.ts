export interface AskScript {
  title: string;
  soft: string;
  bold: string;
}

export interface AskCategory {
  id: string;
  label: string;
  blurb: string;
  scripts: AskScript[];
}

export const ASK_LIBRARY: AskCategory[] = [
  {
    id: 'dating',
    label: 'Dating',
    blurb: 'Make the move before you talk yourself out of it.',
    scripts: [
      {
        title: 'Ask someone on a date',
        soft: "I've enjoyed talking with you. Would you want to grab a drink sometime this week?",
        bold: "I think you're great and I'd like to take you out. Friday or Saturday?",
      },
      {
        title: "Ask for their number",
        soft: "I'd love to keep talking — can I get your number?",
        bold: "I'm glad I met you. Give me your number and I'll plan something good.",
      },
      {
        title: 'Slide into the DMs',
        soft: "Your post made me laugh — had to say hi. How's your week going?",
        bold: "I don't usually do this, but you're worth the risk of being left on read. Coffee?",
      },
      {
        title: 'Make a move in person',
        soft: "I'd really like to kiss you — is that okay?",
        bold: "I've wanted to kiss you all night.",
      },
      {
        title: 'Define where things are going',
        soft: "Can we talk about where this is heading? No pressure.",
        bold: "I want to know what we are. Where do you stand?",
      },
      {
        title: 'Ask to make it exclusive',
        soft: "I really like where this is going. Would you be open to seeing just each other?",
        bold: "I want to be with you and no one else. Are we on the same page?",
      },
      {
        title: 'Ask someone out again after a gap',
        soft: "I keep thinking about that conversation. Want to pick it back up over dinner?",
        bold: "I let too much time pass. Let me make up for it — dinner this week?",
      },
    ],
  },
  {
    id: 'money',
    label: 'Money',
    blurb: 'The price is rarely the final price. Ask.',
    scripts: [
      {
        title: 'Ask for a discount',
        soft: "Is there any discount or deal you can do on this today?",
        bold: "I'd love to buy this — what's the best price you can give me?",
      },
      {
        title: 'Ask for a refund',
        soft: "This didn't work out the way I hoped. Could I get a refund?",
        bold: "This wasn't right, and I'd like a full refund, please.",
      },
      {
        title: 'Get a fee waived',
        soft: "I've been a customer a while — is there anything you can do about this fee?",
        bold: "I'd like this fee removed. Can you take care of that for me?",
      },
      {
        title: 'Ask for a payment plan',
        soft: "Money's a bit tight this month — could we set up a payment plan?",
        bold: "I want to make this work. Let's set up a plan I can actually pay.",
      },
      {
        title: 'Beat a better offer',
        soft: "I've had a few better offers — can you match or beat them?",
        bold: "Beat this offer or I'm switching. What can you do?",
      },
      {
        title: 'Ask a friend to pay you back',
        soft: "Hey, no rush, but could you send over that money when you get a sec?",
        bold: "Can you settle up what you owe me this week?",
      },
      {
        title: 'Ask for free shipping or an extra',
        soft: "Any chance you could throw in free shipping?",
        bold: "Free shipping and I'll order right now — deal?",
      },
    ],
  },
  {
    id: 'career',
    label: 'Career',
    blurb: 'The people two levels up started by asking too.',
    scripts: [
      {
        title: 'Ask for a raise',
        soft: "I'd like to talk about my compensation — do you have time this week?",
        bold: "I've earned a raise and I'd like to walk you through why. When can we talk?",
      },
      {
        title: 'Ask for a promotion',
        soft: "I'm ready for more responsibility. Can we map a path to the next role?",
        bold: "I want the next role. Here's what I've done to earn it.",
      },
      {
        title: "Ask for feedback you're avoiding",
        soft: "I want to get better — what's one thing I could be doing differently?",
        bold: "Be straight with me: where am I falling short, and how do I fix it?",
      },
      {
        title: 'Ask for a meeting two levels up',
        soft: "I'd value 15 minutes to learn how you think about this.",
        bold: "I've got an idea worth your 15 minutes. Can we meet this week?",
      },
      {
        title: 'Ask for flexibility',
        soft: "Would you be open to me working from home a couple of days a week?",
        bold: "I do my best work remotely. Let's set up two days from home.",
      },
      {
        title: 'Ask for help when stuck',
        soft: "I'm stuck on this — could you point me in the right direction?",
        bold: "I need a hand with this. Can you walk me through it?",
      },
    ],
  },
  {
    id: 'sales',
    label: 'Sales',
    blurb: 'Ask for the sale. The worst case is a no you already expected.',
    scripts: [
      {
        title: 'Ask for the sale',
        soft: "Does this feel like a fit? Happy to get you started whenever you're ready.",
        bold: "I think this solves your problem. Want to get started today?",
      },
      {
        title: 'Ask for the cold meeting',
        soft: "Would you be open to a quick 15-minute call to see if this is useful?",
        bold: "Give me 15 minutes and I'll show you how to fix this.",
      },
      {
        title: 'Ask for a referral',
        soft: "If you know anyone who'd find this useful, I'd be grateful for an intro.",
        bold: "Who are two people you know who need this? I'd love an intro.",
      },
      {
        title: 'Follow up after silence',
        soft: "Floating this back up — is this still on your radar?",
        bold: "Haven't heard back — are we doing this, or should I close it out?",
      },
      {
        title: 'Ask for a testimonial',
        soft: "Glad it's working for you — would you be open to sharing a few words?",
        bold: "You said this changed things for you. Can I quote you on that?",
      },
      {
        title: 'Ask for the upgrade',
        soft: "There's a version that does even more for you — want to see it?",
        bold: "You're ready for the next tier. Let's upgrade you.",
      },
    ],
  },
  {
    id: 'friendship',
    label: 'Friendship',
    blurb: 'Connection is on the other side of one small ask.',
    scripts: [
      {
        title: 'Ask someone to hang out',
        soft: "Want to grab coffee this week? Been meaning to catch up.",
        bold: "Let's actually hang out — what day works for you?",
      },
      {
        title: 'Ask a stranger for advice',
        soft: "Random question — you seem to know this area. Any recommendations?",
        bold: "You look like you know what you're doing. What should I try?",
      },
      {
        title: 'Ask to join a group or table',
        soft: "Mind if I join you? I don't know many people here.",
        bold: "This looks like the fun table — room for one more?",
      },
      {
        title: 'Ask a friend for honest feedback',
        soft: "Can I get your honest take on something? I won't be offended.",
        bold: "Tell me the truth — what am I not seeing here?",
      },
      {
        title: 'Ask for support',
        soft: "I'm going through it a bit — could we talk this week?",
        bold: "I need a friend right now. Can you call me?",
      },
      {
        title: 'Reconnect after losing touch',
        soft: "It's been too long. How have you been? Want to catch up?",
        bold: "I dropped the ball on staying in touch. Coffee, on me?",
      },
    ],
  },
  {
    id: 'creative',
    label: 'Creative',
    blurb: 'Put the work in front of people. Ask them to look.',
    scripts: [
      {
        title: 'Ask someone to share your work',
        soft: "I made something I'm proud of — would you be open to taking a look?",
        bold: "I think your audience would love this. Want to share it?",
      },
      {
        title: 'Ask for a collaboration',
        soft: "I admire your work — any interest in making something together?",
        bold: "Let's make something together. I've got an idea you'll like.",
      },
      {
        title: 'Ask for feedback on your work',
        soft: "Would you have a few minutes to tell me what's working and what isn't?",
        bold: "Rip this apart for me — what would make it great?",
      },
      {
        title: 'Ask to be a guest',
        soft: "I'd love to share this with your audience — would a guest spot fit?",
        bold: "I'd be a great guest on your show. Here's the episode we should do.",
      },
      {
        title: 'Ask people to support it',
        soft: "I made this and I'm putting it out there — would you check it out?",
        bold: "I built this. If it's for you, buy it — it'd mean a lot.",
      },
      {
        title: 'Show someone you admire',
        soft: "You inspired a lot of this — would you take a look at what I made?",
        bold: "I made this because of your work. Tell me what you think.",
      },
    ],
  },
  {
    id: 'fundraising',
    label: 'Fundraising',
    blurb: 'Ask for the meeting, the money, and the intro.',
    scripts: [
      {
        title: 'Ask an investor for a meeting',
        soft: "Would you be open to a short call about what we're building?",
        bold: "We're building something you'll want in on. Can we talk this week?",
      },
      {
        title: 'Ask for the check',
        soft: "Would you be interested in joining the round?",
        bold: "I'd love you on the cap table. Are you in?",
      },
      {
        title: 'Ask for an intro to another investor',
        soft: "Is there anyone in your network who might be a fit to introduce us to?",
        bold: "Who are the two investors I should meet, and would you introduce us?",
      },
      {
        title: 'Ask an operator for advice',
        soft: "Could I borrow 15 minutes to learn how you handled this?",
        bold: "You've done this. Give me 20 minutes and tell me what I'm getting wrong.",
      },
      {
        title: 'Ask for a warm customer intro',
        soft: "Do you know anyone at that company who'd want to see this?",
        bold: "Introduce me to the right person there — I'll take it from here.",
      },
      {
        title: 'Coffee with someone impressive',
        soft: "Hey, I admire what you've built. Would you be open to a 15-minute coffee sometime? No worries if not.",
        bold: "I'm trying to learn from people who think differently. You seem like one of them. Could I buy you coffee next week?",
      },
    ],
  },
  {
    id: 'confidence',
    label: 'Confidence',
    blurb: 'Low-stakes reps. Build the muscle on easy mode.',
    scripts: [
      {
        title: 'Ask a stranger for directions',
        soft: "Excuse me — do you have a second to point me the right way?",
        bold: "Hey, quick favor — which way to the station?",
      },
      {
        title: 'Ask for the better seat',
        soft: "Any chance we could take that table by the window?",
        bold: "We'd love the window table — can you make it happen?",
      },
      {
        title: 'Ask to try before you buy',
        soft: "Could I try a small sample before I decide?",
        bold: "Let me taste it first, then I'll buy.",
      },
      {
        title: 'Ask someone to slow down',
        soft: "Sorry, could you say that one more time?",
        bold: "Hang on — slow down and walk me through that again.",
      },
      {
        title: 'Ask for it your way',
        soft: "Could I swap the side for something else?",
        bold: "I'll have it my way — here's the swap. Thanks.",
      },
      {
        title: 'Ask for an upgrade',
        soft: "Is there any chance of a complimentary upgrade today?",
        bold: "It's a special occasion — what can you do to upgrade us?",
      },
      {
        title: 'Ask for a photo',
        soft: "Would you mind taking a quick photo of us?",
        bold: "Take a great photo of us — get the whole view in, thanks!",
      },
    ],
  },
];

export interface LifeArea {
  id: string;
  label: string;
  categoryId: string;
  firstAsk: string;
}

export const LIFE_AREAS: LifeArea[] = [
  { id: 'dating', label: 'Dating', categoryId: 'dating', firstAsk: 'Message someone you find interesting and ask them one real question.' },
  { id: 'sales', label: 'Sales', categoryId: 'sales', firstAsk: 'Message one potential customer and ask for 15 minutes of their time.' },
  { id: 'career', label: 'Career', categoryId: 'career', firstAsk: 'Ask someone at work for one piece of honest feedback today.' },
  { id: 'money', label: 'Money', categoryId: 'money', firstAsk: "Ask one shop or service: “Is there any discount available today?”" },
  { id: 'friendship', label: 'Friendship', categoryId: 'friendship', firstAsk: 'Ask one person you like to grab a coffee this week.' },
  { id: 'creative', label: 'Creative work', categoryId: 'creative', firstAsk: 'Show one piece of your work to someone and ask what they think.' },
  { id: 'fundraising', label: 'Fundraising', categoryId: 'fundraising', firstAsk: 'Ask one impressive person for a 15-minute coffee.' },
  { id: 'confidence', label: 'General confidence', categoryId: 'confidence', firstAsk: 'Ask one stranger for a small favor or a recommendation today.' },
];

export function getFirstAsk(areaId: string | undefined): string {
  const area = LIFE_AREAS.find((a) => a.id === areaId);
  return area?.firstAsk ?? 'Ask one person for something small today. Anything counts.';
}
