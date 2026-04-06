import { Input } from "@base-ui/react";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="">
      <div className="relative">
        {/* mobile */}
        <button
          onClick={() => setSearchOpen(true)}
          className={`p-1 md:hidden text-xs  ${searchOpen ? "invisible" : "visible"}`}
          aria-label="Open Search"
        >
          <Search className="w-7 h-5 " strokeWidth={3} />
        </button>

        {searchOpen && (
          <div
            className=" absolute  top-0 left-0 h-90 w-80 p-4 inset-shadow-2xs  md:hidden shadow-[0_0_20px_rgba(0,0,0,0.16)] rounded-3xl bg-white"
            ref={searchRef}
          >
            <div className=" flex items-center justify-center">
              <Input
                placeholder="Search devthoughts..."
                className="shadow-[0_0_20px_rgba(0,0,0,0.2)] h-10  outline-none px-5 py-2 rounded-2xl md:w-70"
              />
            </div>

            <div className="mt-4 outline-1 outline-blue-100" />
            <div className="flex gap-8 flex-col mt-9">
              {Array.from({ length: 5 }, (_, i) => (
                <div className="flex-col" key={i + 1}>
                  {i}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* desktop */}

      <div className="hidden md:block">
        <Input
          placeholder="Search devthoughts..."
          className="shadow-[0_0_20px_rgba(0,0,0,0.2)] h-9 outline-none p-2 rounded-2xl md:w-70"
        />
      </div>
    </div>
  );
};

export default SearchBar;
