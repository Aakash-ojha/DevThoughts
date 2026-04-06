import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  TrendingUp,
  Users,
  Briefcase,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "Trending", to: "/trending", icon: TrendingUp },
  { label: "Communities", to: "/communities", icon: Users },
  { label: "Jobs", to: "/jobs", icon: Briefcase },
  { label: "AI Tools", to: "/ai-tools", icon: Bot },
];

const languages = [
  "JavaScript",
  "Python",
  "TypeScript",
  "Java",
  "C++",
  "Go",
  "Rust",
  "Swift",
  "PHP",
  "C#",
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`flex flex-col h-full border-r border-slate-200 transition-all duration-300 ${
        collapsed ? "w-14" : "w-56"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2 border-b border-slate-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-all"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Nav Links */}
        <nav className="flex flex-col gap-1 p-2">
          {navLinks.map(({ label, to, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                title={collapsed ? label : ""}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 overflow-hidden whitespace-nowrap ${
                  isActive
                    ? "bg-slate-100 text-black font-medium"
                    : "text-slate-500 hover:bg-slate-100 hover:text-black"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="text-sm">{label}</span>}
              </Link>
            );
          })}
        </nav>

        <Separator className="mx-2" />

        {/* Languages */}
        {!collapsed && (
          <div className="p-2">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest px-3 py-2">
              Languages
            </p>
            <div className="flex flex-col gap-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-black transition-all text-sm text-left whitespace-nowrap overflow-hidden"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed — show dots only */}
        {collapsed && (
          <div className="flex flex-col gap-1 p-2 mt-1">
            {languages.map((lang) => (
              <div
                key={lang}
                title={lang}
                className="flex items-center justify-center py-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-slate-300" />
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
