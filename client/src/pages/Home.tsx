import CreatePost from "@/components/Home/CreatePost";
import DevSuggestions from "@/components/Home/DevSuggestions";
import PostFeed from "@/components/Home/PostFeed";
import TrendingTags from "@/components/Home/TrendingTags";

const Home = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <div className="mb-5">
          <CreatePost />
        </div>

        <PostFeed />
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-6">
          <TrendingTags />
          <DevSuggestions />
        </div>
      </div>
    </div>
  );
};

export default Home;
