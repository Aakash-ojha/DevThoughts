import { Code2 } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="">
      <Link to="/" className="flex items-center gap-2 justify-center ">
        <Code2 className="text-[#00f5c4] w-10 h-7 rounded-md bg-[#0e0f10] flex items-center justify-center" />

        <span className="text-blue-600 font-extrabold text-lg">
          DevThoughts
        </span>
      </Link>
    </div>
  );
};

export default Logo;
