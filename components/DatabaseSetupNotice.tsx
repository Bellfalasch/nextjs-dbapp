export default function DatabaseSetupNotice() {
  return (
    <section role="status" className="content">
      <h2 className="title is-4">Database connection required</h2>
      <p>
        Add a valid <code>DATABASE_URL</code> to <code>.env.local</code>, then
        restart the development server.
      </p>
    </section>
  );
}