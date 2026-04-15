import { useState, useEffect } from "react";
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
import { getTags, type ITag } from "@/api/getTags"; // ← import

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "Trending", to: "/trending", icon: TrendingUp },
  { label: "Communities", to: "/communities", icon: Users },
  { label: "Jobs", to: "/jobs", icon: Briefcase },
  { label: "AI Tools", to: "/ai-tools", icon: Bot },
];

interface Props {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

export default function AppSidebar({ selectedTag, setSelectedTag }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [tags, setTags] = useState<ITag[]>([]);
  const location = useLocation();

  // fetch tags from backend
  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTags();
      setTags(data);
    };
    fetchTags();
  }, []);

  const handleTagClick = (tagName: string) => {
    if (selectedTag === tagName) {
      setSelectedTag(null); // ← click same tag = deselect = show all posts
    } else {
      setSelectedTag(tagName); // ← click new tag = filter posts
    }
  };

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

        {/* Tags from backend */}
        {!collapsed && (
          <div className="p-2">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest px-3 py-2">
              Languages
            </p>
            <div className="flex flex-col gap-1">
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  onClick={() => handleTagClick(tag.name)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm text-left whitespace-nowrap overflow-hidden
                    ${
                      selectedTag === tag.name
                        ? "bg-slate-200 text-black font-medium" // ← selected
                        : "text-slate-500 hover:bg-slate-100 hover:text-black"
                    }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: tag.color }} // ← real color!
                  />
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed dots */}
        {collapsed && (
          <div className="flex flex-col gap-1 p-2 mt-1">
            {tags.map((tag) => (
              <div
                key={tag._id}
                title={tag.name}
                onClick={() => handleTagClick(tag.name)}
                className="flex items-center justify-center py-2 cursor-pointer"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
