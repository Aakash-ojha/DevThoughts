import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CircleQuestionMark, Code, StickyNote } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="w-full h-40 p-3 shadow-[0_0_20px_rgba(0,0,0,0.13)] flex gap-3 flex-col">
      <div className="flex flex-row gap-6 items-center">
        <img src="" alt="ak" className="w-15 h-14 bg-black p-2 rounded-full" />
        <Input placeholder="what is on you mind?" />
      </div>

      <div className="outline-1 outline-gray-200" />

      <div className="flex flex-row shrink gap-5 items-center mt-3 ">
        <Button variant="outline">
          <Code />
          Code Snippet
        </Button>
        <Button variant="outline">
          <StickyNote />
          Article
        </Button>
        <Button variant="outline">
          <CircleQuestionMark />
          Quesetion
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
