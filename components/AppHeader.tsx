import Link from "next/link";
import { Beer, CalendarDays, LogIn, Plus, UserPlus, Vote } from "lucide-react";

const primaryLinks = [
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/beers", label: "Beers", icon: Beer },
  { href: "/votes", label: "Vote", icon: Vote },
];

export default function AppHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Christmas Beer Club home">
          <span className="brand-mark"><Beer aria-hidden="true" /></span>
          <span>
            <strong>Christmas Beer</strong>
            <small>Tasting club</small>
          </span>
        </Link>
        <div className="nav-links">
          {primaryLinks.map(({ href, label, icon: Icon }) => (
            <Link href={href} key={href}>
              <Icon aria-hidden="true" />{label}
            </Link>
          ))}
          <Link href="/beers/add" className="nav-add"><Plus aria-hidden="true" />Add beer</Link>
        </div>
        <div className="nav-account">
          <Link href="/login" aria-label="Log in" title="Log in"><LogIn aria-hidden="true" /><span>Log in</span></Link>
          <Link href="/register" className="button button-primary"><UserPlus aria-hidden="true" /><span>Join the club</span></Link>
        </div>
      </nav>
    </header>
  );
}