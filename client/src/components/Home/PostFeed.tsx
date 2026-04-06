import PostCard from "./PostCard";

const dummyPosts = [
  {
    id: 1,
    name: "Rahul Kumar",
    username: "rahulk",
    initials: "RK",
    avatarColor: "bg-violet-100 text-violet-700",
    time: "2h ago",
    content:
      "Just built a custom React hook for real-time collaboration with zero dependencies!",
    code: "const { state, sync } = useCollaboration(roomId)",
    tags: ["#react", "#hooks", "#typescript"],
    likes: 142,
    comments: 24,
  },
  {
    id: 2,
    name: "Sarah M",
    username: "sarahm",
    initials: "SM",
    avatarColor: "bg-green-100 text-green-700",
    time: "5h ago",
    content:
      "Why Rust is taking over systems programming — a thread for people coming from C++",
    tags: ["#rust", "#systems"],
    likes: 89,
    comments: 17,
  },
];

export default function PostFeed() {
  return (
    <div className="flex flex-col gap-4">
      {dummyPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
