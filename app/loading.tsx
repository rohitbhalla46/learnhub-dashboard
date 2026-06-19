export default function Loading() {
  return (
    <main className="min-h-screen bg-black p-6">
      <div className="animate-pulse">

        <div className="h-40 bg-zinc-800 rounded-3xl mb-6"></div>

        <div className="grid grid-cols-3 gap-4">
          <div className="h-32 bg-zinc-800 rounded-3xl"></div>
          <div className="h-32 bg-zinc-800 rounded-3xl"></div>
          <div className="h-32 bg-zinc-800 rounded-3xl"></div>
        </div>

      </div>
    </main>
  );
}