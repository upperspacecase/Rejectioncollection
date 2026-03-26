import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manifesto - Rejection Collection',
  description: 'Why we collect rejection.',
};

export default function ManifestoPage() {
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
            <a href="/about" className="text-secondary text-[10px] font-mono uppercase tracking-[0.15em] hover:text-foreground transition-colors">
              About
            </a>
            <a href="/leaderboard" className="text-secondary text-[10px] font-mono uppercase tracking-[0.15em] hover:text-foreground transition-colors">
              Leaderboard
            </a>
          </div>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <p className="text-secondary text-[10px] font-mono uppercase tracking-[0.2em] mb-4">Manifesto</p>
          <h1 className="font-serif font-light text-4xl md:text-5xl lowercase leading-tight">
            most people avoid rejection. you collect it.
          </h1>
        </header>

        {/* Body */}
        <div className="space-y-10">
          <p className="font-serif font-light text-lg md:text-xl italic text-secondary leading-relaxed">
            The people who win the most are the people who hear &ldquo;no&rdquo; the most.
            Not because they&rsquo;re lucky. Because they ask.
          </p>

          <div className="h-px bg-border-light" />

          <section className="space-y-6">
            <p className="font-serif font-light text-base leading-relaxed text-foreground/80">
              Somewhere along the way you learned that rejection means you did something wrong.
              That a &ldquo;no&rdquo; is a verdict on your worth. That the smart move is to
              only ask when you&rsquo;re sure the answer is yes.
            </p>
            <p className="font-serif font-light text-base leading-relaxed text-foreground/80">
              That instinct protects your ego. It also keeps your life small.
            </p>
          </section>

          <div className="h-px bg-border-light" />

          <section className="space-y-6">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">The reframe</h2>
            <p className="font-serif font-light text-base leading-relaxed text-foreground/80">
              What if rejection wasn&rsquo;t something that happened to you, but something
              you went out and collected? What if every &ldquo;no&rdquo; was a rep --
              evidence that you showed up, asked for what you wanted, and survived the answer?
            </p>
            <p className="font-serif font-light text-base leading-relaxed text-foreground/80">
              A rejection count isn&rsquo;t a measure of failure. It&rsquo;s a measure of volume.
              And volume is the only variable you actually control.
            </p>
          </section>

          <div className="h-px bg-border-light" />

          <section className="space-y-6">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">The math</h2>
            <p className="font-serif font-light text-base leading-relaxed text-foreground/80">
              1,000 rejections in a year. That sounds impossible until you realize
              it&rsquo;s about 3 per day. Three asks. Three chances to be brave.
              Three moments where you chose action over avoidance.
            </p>
            <p className="font-serif font-light text-base leading-relaxed text-foreground/80">
              At that volume, individual rejections stop mattering. The pattern
              becomes the point. You&rsquo;re not someone who got rejected 3 times today.
              You&rsquo;re someone who asked for things 3 times today.
            </p>
          </section>

          <div className="h-px bg-border-light" />

          <section className="space-y-6">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">The rules</h2>
            <div className="space-y-4">
              {[
                'Every ask counts. Big or small. The muscle is the same.',
                'Log it immediately. Don\'t let your brain rewrite the story.',
                'A "yes" is a bonus, not the goal. The ask was the goal.',
                'Streaks matter. Show up every day. Consistency compounds.',
                'Mark the useful ones. Some rejections open doors you didn\'t see.',
              ].map((rule, i) => (
                <div key={i} className="flex gap-4 items-baseline">
                  <span className="text-accent font-mono text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                  <p className="font-serif font-light text-base text-foreground/80">{rule}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="h-px bg-border-light" />

          <section>
            <p className="font-serif font-light text-lg md:text-xl italic text-secondary leading-relaxed text-center">
              Your rejection count is the scoreboard of a life fully asked.
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
