import Link from "next/link";

export default function Home() {
  return (
    <main className="content">
      <h1>X-mas Beer App</h1>
      <h2>Done so far</h2>
      <ul>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/events">List _all_ events</Link>
        </li>
        <li>
          <Link href="/beers">List _all_ beers</Link>
        </li>
        <li>
          <Link href="/beers/add">Add one beer</Link>
        </li>
        <li>
          <Link href="/votes">Vote!</Link>
        </li>
      </ul>
      <p>
        Currently we will open &quot;add beer&quot; for everyone, the concept of events is not used, and voting is just a form you can use for any beer at any time.
        This makes the app simpler to build, constraints are enforced by the user instead of the code.
      </p>

      <h2>User journey</h2>
      <ul>
        <li>Login (using auth0)</li>
        <li>From a DB, pick one event</li>
        <li>
          Event contains rules for voting (categories, available points, and a
          list of beers)
          <ul>
            <li>Admin for events can be pure DB inserts</li>
            <li>Add 1 to X categories, like Taste, Color, Design, whatnot</li>
            <li>
              For each category, define the available points, 1 to 6 being
              default
            </li>
            <li>
              Now, each event need to either be &quot;Add as you go&quot; or
              &quot;List of beer&quot;-type
            </li>
            <li>
              &quot;Add as you go&quot; means when an event starts, a beer must
              be added to the pool before anyone can vote on it
            </li>
            <li>
              &quot;List of beer&quot; means all beers are added before the
              event starts, stepping from first to last
            </li>
          </ul>
        </li>
        <li>
          As a logged in user, you will receive either the first beer of the
          list, or be forced to add one
        </li>
        <li>
          When voting, the users sees all available categories and the points
          available
        </li>
        <li>The users clicks &quot;Vote&quot; when ready</li>
        <li>All users can see &quot;X of X votes sent in</li>
        <li>
          When all votes are done, all users get a new button: &quot;Ready for
          next beer&quot;
        </li>
        <li>
          Until everyone have said that they are ready, each user see a summary
          of their given points on the given beer
        </li>
        <li>When everyone are done, next beer comes up (or the event stops)</li>
      </ul>
      <h2>Functionality</h2>
      <ul>
        <li>
          Login using
          [Auth0?](https://auth0.com/docs/quickstart/webapp/nextjs/interactive)
        </li>
        <li>
          For each beer fetch image and data from [Untappd
          API](https://untappd.com/api/docs#beerinfo)?
        </li>
        <li>
          A user should be able to edit points for a beer until they click ready
          for next beer.
        </li>
        <li>
          Based on total votes, we should be able to fetch some stats, like
          worst/best for each category, total win/loss, etc.
        </li>
        <li>
          The app should handle people joining late, and people leaving early.
        </li>
        <li>
          The app should handle a way to re-pick next beer if everyone is
          unhappy with the current one. Let say we get five very strong beers in
          a row, it would be nice to be able to control that in a way.
        </li>
        <li>
          If event has a list of beers, we could select next one randomly, and
          just have a button to fetch another one, or we could let users vote
          from the entire list of beers, or just let one person per round select
          from the list. &quot;Next beer&quot; could thus be very simple, or
          very complicated.
        </li>
      </ul>
    </main>
  );
}
