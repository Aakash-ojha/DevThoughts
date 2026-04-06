const devs = [
  {
    name: "Tim K",
    username: "timk",
    role: "Go Developer",
    initials: "TK",
    color: "bg-pink-100 text-pink-700",
  },
  {
    name: "Amy L",
    username: "amyl",
    role: "Rust Developer",
    initials: "AL",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Mark C",
    username: "markc",
    role: "AI Engineer",
    initials: "MC",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Sara J",
    username: "saraj",
    role: "Frontend Dev",
    initials: "SJ",
    color: "bg-blue-100 text-blue-700",
  },
];

export default function DevSuggestions() {
  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <h3 className="font-semibold text-sm text-slate-800 mb-3">
        Devs to Follow
      </h3>
      <div className="flex flex-col gap-3">
        {devs.map((dev) => (
          <div key={dev.username} className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${dev.color}`}
            >
              {dev.initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {dev.name}
              </p>
              <p className="text-xs text-slate-400 truncate">{dev.role}</p>
            </div>

            {/* Follow Button */}
            <button className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shrink-0">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
