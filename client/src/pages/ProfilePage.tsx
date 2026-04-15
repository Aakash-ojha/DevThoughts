import {
  Camera,
  Edit2,
  MoreHorizontal,
  Plus,
  Users,
  Settings,
  List,
  Grid,
  Code2,
  MessageSquare,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/useAuthStore";
import getInitailName from "@/utlis/getInitialName";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/api";
import type { Post } from "@/types/postType";
import PostCard from "@/components/Home/PostCard";
import PostCardSkeleton from "@/components/Home/PostCardSkeleton";

interface ProfileUser {
  _id: string;
  name: string;
  username?: string;
  bio?: string;
  profilePicture?: string;
  skills?: string[];
  github?: string;
  followersCount: number;
  followingCount: number;
}

// Fixed GitHub SVG Component
function GithubIcon({ size = 18, className = "" }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.26.79-.58v-2.03c-3.2.72-3.88-1.58-3.88-1.58-.53-1.38-1.3-1.75-1.3-1.75-1.06-.75.08-.73.08-.73 1.17.08 1.79 1.23 1.79 1.23 1.04 1.84 2.72 1.31 3.38 1 .1-.78.41-1.31.75-1.61-2.55-.3-5.23-1.31-5.23-5.84 0-1.29.45-2.34 1.19-3.16-.12-.3-.52-1.5.11-3.13 0 0 .97-.32 3.18 1.2a10.7 10.7 0 0 1 2.9-.4c.99 0 1.98.13 2.9.4 2.2-1.52 3.17-1.2 3.17-1.2.63 1.63.23 2.83.11 3.13.74.82 1.18 1.87 1.18 3.16 0 4.54-2.69 5.53-5.26 5.82.42.37.8 1.1.8 2.22v3.29c0 .32.2.69.8.57A10.98 10.98 0 0 0 23.25 12C23.25 5.62 18.27.5 12 .5z" />
    </svg>
  );
}

export default function ProfilePage() {
  const { id } = useParams();
  const currentUser = useAuthStore((state) => state.user);

  const [user, setUser] = useState<ProfileUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const isOwnProfile = currentUser?._id === id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(`/user/${id}`);
        setUser(data.data);

        const postRes = await apiClient.get(`/post/getpost?author=${id}`);
        // Ensure only posts authored by THIS user are shown
        const authoredPosts = (postRes.data.data || []).filter((p: Post) =>
          typeof p.author === "string" ? p.author === id : p.author?._id === id,
        );
        setPosts(authoredPosts);

        if (!isOwnProfile) {
          const followRes = await apiClient.get(`/user/check-follow/${id}`);
          setIsFollowing(followRes.data.following);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfileData();
  }, [id, isOwnProfile]);

  const handleFollow = async () => {
    try {
      setFollowLoading(true);
      const { data } = await apiClient.post(`/user/follow/${id}`);
      setIsFollowing(data.following);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              followersCount: data.following
                ? prev.followersCount + 1
                : prev.followersCount - 1,
            }
          : prev,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) return <ProfileSkeleton />;
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        User not found!
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 pb-20">
      {/* Top Banner - Subtle Gradient instead of Image */}
      <div className="h-48 w-full bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100 via-transparent to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 -mt-12">
          {/* Left Side: Identity Bento */}
          <aside className="md:w-80 space-y-6">
            <div className="relative inline-block">
              <Avatar className="h-40 w-40 border-[6px] border-[#fafafa] shadow-xl rounded-[2.5rem]">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="text-4xl bg-slate-100 text-violet-600 font-bold rounded-[2rem]">
                  {getInitailName(user.name)}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button
                  size="icon"
                  className="absolute bottom-2 right-2 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
                >
                  <Camera size={16} />
                </Button>
              )}
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tight">
                {user.name}
              </h1>
              <p className="text-violet-500 font-medium text-sm">
                @{user.username || "developer"}
              </p>
            </div>

            <div className="flex gap-6 py-2">
              <StatItem value={user.followersCount} label="Followers" />
              <StatItem value={user.followingCount} label="Following" />
              <StatItem value={posts.length} label="Posts" />
            </div>

            <div className="space-y-2">
              {isOwnProfile ? (
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl h-12 font-bold transition-all">
                  <Plus className="mr-2" size={18} /> New Post
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleFollow}
                    disabled={followLoading}
                    className={`flex-1 rounded-2xl h-11 font-bold ${isFollowing ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-violet-600 text-white hover:bg-violet-700"}`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 w-11 rounded-2xl border-slate-200 bg-white"
                  >
                    <MessageSquare size={18} className="text-slate-600" />
                  </Button>
                </div>
              )}
            </div>

            {/* Detail Bento */}
            <Card className="border-slate-200/60 shadow-sm rounded-[2rem] overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2">
                    About
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {user.bio ||
                      "Digital craftsman building tools for developers."}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {user.github && (
                    <a
                      href={user.github}
                      target="_blank"
                      className="flex items-center gap-3 text-slate-500 hover:text-violet-600 text-sm transition-colors"
                    >
                      <GithubIcon size={16} />{" "}
                      <span className="font-medium truncate">
                        {user.github.replace("https://", "")}
                      </span>
                    </a>
                  )}
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <Zap size={16} className="text-amber-500" />{" "}
                    <span className="font-medium">Open to collaborate</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Right Side: Content Feed */}
          <main className="flex-1 space-y-6 md:pt-16">
            {/* Tabs & View Toggles */}
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <div className="flex gap-8">
                {["posts", "about"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-bold capitalize transition-all relative ${activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute -bottom-[17px] left-0 w-full h-0.5 bg-violet-500" />
                    )}
                  </button>
                ))}
              </div>

              {activeTab === "posts" && posts.length > 0 && (
                <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200/50">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-violet-600" : "text-slate-400"}`}
                  >
                    <List size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-violet-600" : "text-slate-400"}`}
                  >
                    <Grid size={16} />
                  </button>
                </div>
              )}
            </div>

            {activeTab === "posts" && (
              <div
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
              >
                {posts.length > 0 ? (
                  posts.map((post) =>
                    viewMode === "list" ? (
                      <PostCard key={post._id} post={post} />
                    ) : (
                      <Card
                        key={post._id}
                        className="border-slate-200/60 shadow-sm p-5 rounded-[1.5rem] hover:border-violet-200 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Code2 className="w-4 h-4 text-violet-500" />
                          <h4 className="font-bold text-sm truncate group-hover:text-violet-600">
                            {post.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                          {post.content}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag._id}
                              className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-medium"
                            >
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      </Card>
                    ),
                  )
                ) : (
                  <div className="text-center py-20 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
                    <p className="text-slate-400 text-sm font-medium">
                      No posts shared by this user yet.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "about" && (
              <Card className="border-slate-200/60 shadow-sm rounded-[2rem]">
                <CardContent className="p-8 space-y-6">
                  {user.skills && user.skills.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase text-slate-400 tracking-widest">
                        Technical Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-violet-50 text-violet-600 text-xs font-bold rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <Separator className="bg-slate-100" />
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Joined DevThoughts to share technical insights and
                    collaborate with the global developer community.
                  </p>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-left">
      <p className="text-lg font-black leading-none text-slate-900">{value}</p>
      <p className="text-[10px] uppercase text-slate-400 font-bold mt-1 tracking-tight">
        {label}
      </p>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#fafafa] animate-pulse">
      <div className="h-48 bg-white border-b border-slate-200" />
      <div className="max-w-5xl mx-auto px-6 -mt-12 flex gap-8">
        <div className="w-80 space-y-6">
          <div className="h-40 w-40 bg-slate-200 rounded-[2.5rem]" />
          <div className="h-6 w-48 bg-slate-200 rounded-lg" />
        </div>
        <div className="flex-1 space-y-6 mt-16">
          <div className="h-10 w-full bg-slate-200 rounded-xl" />
          <div className="h-64 w-full bg-slate-200 rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
}
