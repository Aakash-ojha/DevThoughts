import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Tag from "../models/TagModel.js";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("../.env"),
});

const developers = [
  { name: "Arjun Mehta", username: "arjun_codes" },
  { name: "Priya Sharma", username: "priya_dev" },
  { name: "Liam Wilson", username: "liam_tech" },
  { name: "Sanya Iyer", username: "sanya_web" },
  { name: "Marcus Chen", username: "marcus_js" },
  { name: "Aisha Khan", username: "aisha_dev" },
  { name: "David Miller", username: "david_m" },
  { name: "Elena Rossi", username: "elena_codes" },
  { name: "Hiroshi Tanaka", username: "hiro_tech" },
  { name: "Chloe Dupont", username: "chloe_dev" },
  { name: "Omar Farooq", username: "omar_codes" },
  { name: "Sofia Silva", username: "sofia_js" },
  { name: "Rajesh G", username: "rajesh_dev" },
  { name: "Emily Brown", username: "emily_web" },
  { name: "Kenji Sato", username: "kenji_codes" },
  { name: "Fatima Zahra", username: "fatima_dev" },
  { name: "Lucas Wagner", username: "lucas_tech" },
  { name: "Anjali Rao", username: "anjali_codes" },
  { name: "Mateo Garcia", username: "mateo_dev" },
  { name: "Zoe Jenkins", username: "zoe_codes" },
];

const devTopics = [
  {
    title: "Mastering Go Routines",
    content:
      "Concurrency in Go is just built different. Finally got my worker pool running efficiently.",
    code: 'go func() { fmt.Println("Hello World") }()',
    tagName: "Go",
  },
  {
    title: "React 19 Actions",
    content:
      "The new Form Actions in React 19 are going to eliminate so much boilerplate. Goodbye useFormStatus hacks!",
    code: "<form action={submitAction}>",
    tagName: "React",
  },
  {
    title: "Express Middleware",
    content:
      "Custom middleware in Node is the secret sauce for clean auth flows.",
    code: "app.use((req, res, next) => { ... })",
    tagName: "Node.js",
  },
  {
    title: "Aggregation Pipelines",
    content:
      "MongoDB's aggregation framework is powerful. Just solved a complex reporting query with $facet.",
    code: "db.collection.aggregate([{ $match: { ... } }])",
    tagName: "MongoDB",
  },
  {
    title: "Next.js Server Components",
    content:
      "Server components are a game changer for SEO and performance. Loving the App Router.",
    code: "async function Page() { const data = await getData(); }",
    tagName: "Next.js",
  },
  {
    title: "Tailwind Grid",
    content:
      "I used to hate CSS Grid until I saw how Tailwind handles it. So intuitive.",
    code: 'className="grid grid-cols-3 gap-4"',
    tagName: "Tailwind CSS",
  },
  {
    title: "The 'npm install' abyss",
    content:
      "Added one small library and now my node_modules is 2GB. Classic Node life.",
    code: "npm install --save-dev massive-lib",
    tagName: "Node.js",
  },
  {
    title: "Go Interfaces",
    content:
      "Implicit interfaces in Go make testing and mocking so much easier than in Java.",
    code: "type Writer interface { Write([]byte) (int, error) }",
    tagName: "Go",
  },
  {
    title: "Zod + React Hook Form",
    content: "The perfect duo for type-safe form validation in React.",
    code: "const schema = z.object({ email: z.string().email() })",
    tagName: "React",
  },
  {
    title: "Tailwind Dark Mode",
    content:
      "Implementing dark mode with the 'dark:' modifier is honestly a 5-minute job.",
    code: 'className="bg-white dark:bg-slate-950"',
    tagName: "Tailwind CSS",
  },
  {
    title: "MongoDB Indexing",
    content:
      "Reminder: Always index your frequently queried fields. Saved 2 seconds on my fetch today!",
    code: "db.posts.createIndex({ createdAt: -1 })",
    tagName: "MongoDB",
  },
  {
    title: "Server-side Rendering",
    content:
      "Why ship JS when you can render on the server? Next.js makes this effortless.",
    code: "export default async function Page() { ... }",
    tagName: "Next.js",
  },
  {
    title: "The Power of Go Channels",
    content: "Channels make passing data between go routines safe and elegant.",
    code: 'ch := make(chan string)\ngo func() { ch <- "ping" }()',
    tagName: "Go",
  },
  {
    title: "Custom React Hooks",
    content:
      "Built a useLocalStorage hook to sync state across browser tabs. Super clean.",
    code: "const [val, setVal] = useLocalStorage('key', 'default');",
    tagName: "React",
  },
  {
    title: "Node.js Streams",
    content:
      "Handling large file uploads? Use streams to keep your memory usage low.",
    code: "fs.createReadStream('large-file.zip').pipe(res);",
    tagName: "Node.js",
  },
  {
    title: "Schema Design in Mongo",
    content:
      "Denormalization isn't a sin in NoSQL. Sometimes embedding is better than linking.",
    code: "comments: [{ user: 'ID', text: 'Hello' }]",
    tagName: "MongoDB",
  },
  {
    title: "Responsive Layouts",
    content:
      "Tailwind's 'sm:', 'md:', 'lg:' prefixes are the best way to handle media queries.",
    code: 'className="w-full md:w-1/2 lg:w-1/3"',
    tagName: "Tailwind CSS",
  },
  {
    title: "Next.js API Routes",
    content:
      "Building a full-stack app in one repo is so fast with Next.js internal APIs.",
    code: "export async function GET() { return Response.json(data); }",
    tagName: "Next.js",
  },
  {
    title: "Go Error Handling",
    content:
      "People complain about 'if err != nil', but it makes you handle every case explicitly.",
    code: "if err != nil { return nil, err }",
    tagName: "Go",
  },
  {
    title: "React Context API",
    content:
      "For small apps, you really don't need Redux. Context + useReducer is enough.",
    code: "const ThemeContext = createContext('light');",
    tagName: "React",
  },
  {
    title: "Node Cluster Module",
    content:
      "Utilize all your CPU cores by running a cluster of Node processes.",
    code: "if (cluster.isMaster) { cluster.fork(); }",
    tagName: "Node.js",
  },
  {
    title: "Mongo $lookup Joins",
    content:
      "Joins in Mongo aren't slow if you index the foreign keys correctly.",
    code: "{ $lookup: { from: 'users', ... } }",
    tagName: "MongoDB",
  },
  {
    title: "Next.js Middleware",
    content: "Handling redirects and auth checks before a page even renders.",
    code: "export function middleware(req) { ... }",
    tagName: "Next.js",
  },
  {
    title: "Tailwind Typography",
    content:
      "The @tailwindcss/typography plugin makes markdown rendering beautiful instantly.",
    code: 'className="prose dark:prose-invert"',
    tagName: "Tailwind CSS",
  },
  {
    title: "Go Struct Tags",
    content: "Mapping JSON fields to Go structs is so much cleaner with tags.",
    code: 'type User struct { Name string `json:"name"` }',
    tagName: "Go",
  },
  {
    title: "React Virtualization",
    content:
      "Rendering 10,000 items? Use react-window to keep your DOM footprint small.",
    code: "<FixedSizeList height={500} itemCount={10000}>",
    tagName: "React",
  },
  {
    title: "Node.js fs/promises",
    content:
      "Stop using callbacks for file systems. The promise-based API is so much better.",
    code: "const data = await fs.readFile('config.json');",
    tagName: "Node.js",
  },
  {
    title: "Mongoose Middleware",
    content:
      "Use .pre('save') hooks to hash passwords or slugify titles automatically.",
    code: "schema.pre('save', async function() { ... })",
    tagName: "MongoDB",
  },
  {
    title: "Next.js Image Component",
    content:
      "Automatic WebP conversion and lazy loading? Never using <img> again.",
    code: '<Image src={img} alt="Dev" width={500} />',
    tagName: "Next.js",
  },
  {
    title: "Tailwind Transitions",
    content:
      "Adding 'transition-all duration-300' makes every UI interaction feel premium.",
    code: 'className="hover:scale-105 transition-all"',
    tagName: "Tailwind CSS",
  },
  {
    title: "Go Build Speed",
    content:
      "Compiling a massive Go project in seconds is a refreshing break from Node.",
    code: "go build -o server main.go",
    tagName: "Go",
  },
  {
    title: "React Memoization",
    content:
      "Only use useMemo and useCallback when you actually have expensive calculations.",
    code: "const memoVal = useMemo(() => calc(a), [a]);",
    tagName: "React",
  },
  {
    title: "Dotenv in Node",
    content: "Keep your secrets secret. Never commit your .env file to GitHub!",
    code: "require('dotenv').config()",
    tagName: "Node.js",
  },
  {
    title: "MongoDB Atlas Search",
    content:
      "Full-text search directly in Mongo without needing ElasticSearch. Impressed.",
    code: "{ $search: { text: { query: 'React' } } }",
    tagName: "MongoDB",
  },
  {
    title: "Next.js Static Export",
    content:
      "Exporting a Next app as static HTML for hosting on GitHub Pages is super easy.",
    code: "output: 'export'",
    tagName: "Next.js",
  },
  {
    title: "Tailwind Arbitrary Values",
    content:
      "When you need a specific pixel value, square brackets are your friend.",
    code: 'className="top-[117px] h-[calc(100vh-200px)]"',
    tagName: "Tailwind CSS",
  },
  {
    title: "Go Defer Statement",
    content:
      "The 'defer' keyword is a genius way to ensure cleanup like closing database connections.",
    code: "defer resp.Body.Close()",
    tagName: "Go",
  },
  {
    title: "React Strict Mode",
    content:
      "It's annoying that it renders twice in dev, but it catches so many side-effect bugs.",
    code: "<StrictMode><App /></StrictMode>",
    tagName: "React",
  },
  {
    title: "Express Rate Limit",
    content:
      "Protect your Node server from brute force attacks with this simple middleware.",
    code: "app.use(rateLimit({ windowMs: 15*60*1000 }))",
    tagName: "Node.js",
  },
  {
    title: "Mongo Transactions",
    content:
      "Multi-document ACID transactions are available in Mongo if you really need them.",
    code: "session.startTransaction();",
    tagName: "MongoDB",
  },
  {
    title: "Next.js SEO",
    content:
      "The new Metadata API makes managing titles and OG tags per page very simple.",
    code: "export const metadata = { title: 'Home' }",
    tagName: "Next.js",
  },
  {
    title: "Tailwind Reusable Classes",
    content:
      "Don't repeat yourself. Use @apply in your CSS to create custom utility components.",
    code: ".btn-primary { @apply px-4 py-2 bg-blue-500 }",
    tagName: "Tailwind CSS",
  },
  {
    title: "Go Modules",
    content:
      "Managing dependencies with go.mod and go.sum is so much cleaner than npm.",
    code: "go mod tidy",
    tagName: "Go",
  },
  {
    title: "React Server Components vs SSR",
    content:
      "Important distinction: RSCs don't re-hydrate, SSR does. Choose wisely!",
    code: "// 'use client' or not?",
    tagName: "React",
  },
  {
    title: "Node.js Worker Threads",
    content:
      "Doing heavy math? Move it to a worker thread so you don't block the event loop.",
    code: "new Worker('./worker.js')",
    tagName: "Node.js",
  },
  {
    title: "MongoDB Compass",
    content:
      "The visual query builder is actually great for debugging complex filters.",
    code: "Filter: { score: { $gt: 90 } }",
    tagName: "MongoDB",
  },
  {
    title: "Next.js ISR",
    content:
      "Incremental Static Regeneration: The best of both worlds (Static + Dynamic).",
    code: "export const revalidate = 3600;",
    tagName: "Next.js",
  },
  {
    title: "Tailwind Aspect Ratio",
    content:
      "Handling video containers and image headers with aspect-video/aspect-square.",
    code: 'className="aspect-video w-full"',
    tagName: "Tailwind CSS",
  },
  {
    title: "Go Pointer Receiver",
    content:
      "Knowing when to use a value receiver vs a pointer receiver is crucial in Go.",
    code: "func (u *User) UpdateName(n string) { ... }",
    tagName: "Go",
  },
  {
    title: "The Developer Journey",
    content:
      "Keep building, keep breaking things. Every error is just a lesson in disguise.",
    code: "while(true) { build(); }",
    tagName: "React",
  },
];

const colors = [
  "bg-red-100 text-red-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
];

const runSeed = async () => {
  try {
    const DB = process.env.MONGO_URL.replace(
      "<db_password>",
      process.env.DB_PASSWORD,
    );

    const mongoUrl = DB;
    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined in .env file");
    }
    console.log("connecting to mongodb");

    await mongoose.connect(mongoUrl);

    // 2. CLEANUP
    await User.deleteMany({ email: /@example.com/ });
    await Post.deleteMany({});
    console.log("Database cleared.");

    // 3. FETCH EXISTING TAGS
    const tagsFromDB = await Tag.find();
    if (tagsFromDB.length === 0) {
      console.error(
        "No tags found! Please create your Go, React, etc. tags first.",
      );
      process.exit(1);
    }

    // 4. CREATE USERS
    const hashed = await bcrypt.hash("password123", 10);
    const userObjects = developers.map((dev, i) => ({
      ...dev,
      email: `${dev.username}@example.com`,
      password: hashed,
      confirmPassword: hashed,
      avatarColor: colors[i % colors.length],
      initials: dev.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    }));
    const createdUsers = await User.insertMany(userObjects);
    console.log(`Created ${createdUsers.length} users.`);

    // 5. CREATE POSTS (Mapping topics to actual Tag IDs)
    const posts = devTopics.map((topic, i) => {
      const randomUser = createdUsers[i % createdUsers.length];

      // Find the ID of the tag that matches the topic (e.g., find ID for "React")
      const matchingTag = tagsFromDB.find((t) => t.name === topic.tagName);
      const tagId = matchingTag ? matchingTag._id : tagsFromDB[0]._id;

      return {
        title: topic.title,
        content: topic.content,
        codeSnippet: topic.code,
        author: randomUser._id,
        tags: [tagId],
        likes: [],
        comments: [],
        createdAt: new Date(Date.now() - i * 3600000), // Spaced out by 1 hour
      };
    });

    await Post.insertMany(posts);
    console.log("Created 50 tagged posts. Seed Complete! 🚀");
    process.exit();
  } catch (err) {
    console.error("Seed Error:", err);
    process.exit(1);
  }
};

runSeed();
