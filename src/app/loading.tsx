export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] bg-background">
      {/* Top instant cyber loading progress strip */}
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-gold/15">
        <div className="h-full w-1/2 animate-pulse bg-gold-gradient shadow-[0_0_12px_#00C2FF]" />
      </div>

      <div className="container py-14 sm:py-18">
        <div className="max-w-2xl space-y-4">
          <div className="h-6 w-40 animate-pulse rounded-full bg-card-hover" />
          <div className="h-11 w-3/4 animate-pulse rounded-2xl bg-card-hover" />
          <div className="h-5 w-full animate-pulse rounded-xl bg-card" />
          <div className="h-5 w-2/3 animate-pulse rounded-xl bg-card" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-52 animate-pulse rounded-card border border-line bg-card/70"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
