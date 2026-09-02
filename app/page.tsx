import Link from "next/link";
import { ArrowRight, Beer, CalendarDays, Plus, Vote } from "lucide-react";

export default function Home() {
  return (
    <main className="home">
      <section className="home-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">The 2026 tasting season</p>
          <h1>Christmas Beer Club</h1>
          <p className="hero-copy">
            Bring the bottles. Gather your favorite people. We&apos;ll keep the
            score and settle which brew deserves the crown.
          </p>
          <div className="hero-actions">
            <Link href="/votes" className="button button-primary button-large"><Vote aria-hidden="true" />Start voting</Link>
            <Link href="/beers" className="button button-ghost button-large">Browse the lineup<ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="quick-actions" aria-labelledby="quick-actions-title">
        <div className="section-heading">
          <div><p className="eyebrow">Tonight&apos;s essentials</p><h2 id="quick-actions-title">Everything for the tasting table</h2></div>
          <p>Keep the evening moving, from first pour to final score.</p>
        </div>
        <div className="action-grid">
          <Link href="/events" className="action-card">
            <span className="action-icon action-icon-green"><CalendarDays /></span><span className="action-number">01</span>
            <h3>Choose an event</h3><p>Find the tasting you&apos;re joining and see what&apos;s on deck.</p><span className="text-link">View events <ArrowRight /></span>
          </Link>
          <Link href="/beers/add" className="action-card">
            <span className="action-icon action-icon-gold"><Plus /></span><span className="action-number">02</span>
            <h3>Add your bottle</h3><p>Put a new contender into the evening&apos;s beer lineup.</p><span className="text-link">Add a beer <ArrowRight /></span>
          </Link>
          <Link href="/votes" className="action-card">
            <span className="action-icon action-icon-red"><Vote /></span><span className="action-number">03</span>
            <h3>Make it count</h3><p>Score taste, design, and that hard-to-define festive bonus.</p><span className="text-link">Cast a vote <ArrowRight /></span>
          </Link>
        </div>
      </section>
      <section className="club-note"><Beer aria-hidden="true" /><p>Good beer is better together.</p><span>Skål</span></section>
    </main>
  );
}
