export function SkeletonResults() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Rezumat skeleton */}
      <div className="glass rounded-2xl p-5 space-y-3">
        <div className="skeleton h-3 w-24 rounded-full" />
        <div className="skeleton h-4 w-full rounded-full" />
        <div className="skeleton h-4 w-4/5 rounded-full" />
        <div className="skeleton h-4 w-3/5 rounded-full" />
      </div>

      {/* Platform skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <div className="skeleton h-3 w-20 rounded-full mb-3" />
          <div className="space-y-3">
            {[1, 2].map((j) => (
              <div key={j} className="glass rounded-2xl p-5 space-y-3">
                <div className="skeleton h-4 w-full rounded-full" />
                <div className="skeleton h-4 w-5/6 rounded-full" />
                <div className="skeleton h-4 w-2/3 rounded-full" />
                <div className="flex gap-2 mt-2">
                  <div className="skeleton h-5 w-16 rounded-full" />
                  <div className="skeleton h-5 w-20 rounded-full" />
                  <div className="skeleton h-5 w-14 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
