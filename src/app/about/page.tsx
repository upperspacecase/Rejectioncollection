import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Rejection Collection',
  description: 'The scoreboard for people who ask for things.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto" style={{ position: 'static' }}>
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Nav back */}
        <nav className="mb-16 flex items-center justify-between">
          <a
            href="/landing"
            className="text-secondary text-[10px] font-mono uppercase tracking-[0.15em] hover:text-foreground transition-colors"
          >
            Back
          </a>
          <div className="flex gap-6">
            <a href="/manifesto" className="text-secondary text-[10px] font-mono uppercase tracking-[0.15em] hover:text-foreground transition-colors">
              Manifesto
            </a>
            <a href="/leaderboard" className="text-secondary text-[10px] font-mono uppercase tracking-[0.15em] hover:text-foreground transition-colors">
              Leaderboard
            </a>
          </div>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <p className="text-secondary text-[10px] font-mono uppercase tracking-[0.2em] mb-4">About</p>
          <h1 className="font-serif font-light text-4xl md:text-5xl lowercase leading-tight mb-6">
            the scoreboard for people who ask for things
          </h1>
          <p className="font-serif font-light text-lg md:text-xl italic text-secondary leading-relaxed">
            Every no logged, every attempt counted, every streak tracked.
          </p>
        </header>

        {/* Body */}
        <div className="space-y-12">
          <section>
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary mb-4">What it is</h2>
            <p className="font-serif font-light text-base leading-relaxed text-foreground/80">
              Rejection Collection is a personal courage ledger. You log every time you ask
              for something -- a raise, a meeting, a date, a discount, a favour -- and record
              whether you heard yes or no. The app tracks your streaks, celebrates milestones,
              and turns rejection from something you avoid into something you accumulate.
            </p>
          </section>

          <section>
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary mb-4">Who it's for</h2>
            <div className="space-y-4">
              <div className="border border-border-light rounded-lg p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2">Founders</p>
                <p className="font-serif font-light text-base text-foreground/80">
                  Sending cold emails, pitching investors, asking for introductions.
                  When you see 112 nos on your counter, the 113th email doesn't feel heavy anymore.
                </p>
              </div>
              <div className="border border-border-light rounded-lg p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2">Job seekers</p>
                <p className="font-serif font-light text-base text-foreground/80">
                  Applying in volume, following up, negotiating offers.
                  Stop catastrophizing individual rejections when you can see the aggregate effort.
                </p>
              </div>
              <div className="border border-border-light rounded-lg p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-2">Anyone building courage</p>
                <p className="font-serif font-light text-base text-foreground/80">
                  Asking for the table by the window. Returning the shirt that doesn't fit.
                  Requesting a deadline extension. Small asks compound into a different relationship with fear.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary mb-4">How it works</h2>
            <div className="space-y-3">
              {[
                { num: '01', text: 'Ask for something. Anything. Big or small.' },
                { num: '02', text: 'Open the app. Log what you asked for and whether they said yes or no.' },
                { num: '03', text: 'Watch your count climb. Build daily streaks. Hit milestones from 1 to 1,000.' },
                { num: '04', text: 'Mark the useful rejections -- the ones that taught you something or opened a door.' },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 items-baseline">
                  <span className="text-muted font-mono text-[10px]">{step.num}</span>
                  <p className="font-serif font-light text-base text-foreground/80">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary mb-4">The shift</h2>
            <p className="font-serif font-light text-base leading-relaxed text-foreground/80">
              You stop being &ldquo;someone who got rejected&rdquo; and become &ldquo;someone at 247
              attempts.&rdquo; The count reframes the narrative from failure to volume. Most people
              avoid rejection. You collect it.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-border-light text-center">
          <a
            href="/"
            className="inline-flex items-center min-h-[44px] px-8 border border-border-light rounded-lg font-mono text-[11px] uppercase tracking-[0.15em] text-foreground hover:border-border-active transition-colors"
          >
            Start Collecting
          </a>
        </div>
      </div>
    </div>
  );
}
