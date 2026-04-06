import Logo from "./NavComponent/Logo";
import SearchBar from "./NavComponent/SearchBar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, MessageCircleCodeIcon, Plus } from "lucide-react";
import Profile from "./NavComponent/Profile";

const PostNav = () => {
  return (
    <Button variant="outline" className="flex gap-2 rounded-xl px-4">
      <Plus className="w-5 h-5" />
      Post
    </Button>
  );
};

const NotificationsNav = () => {
  const notifications = [
    "User A liked your post",
    "User B commented",
    "User C started following you",
  ];

  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-500" />
          <span className="absolute -top-0.5 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {notifications.length}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h4 className="font-bold">Notifications</h4>
        <ul className="mt-2 space-y-2">
          {notifications.map((item, index) => (
            <li
              key={index}
              className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

const MessageNav = () => {
  return (
    <Button variant="outline">
      <MessageCircleCodeIcon />
      Chat
    </Button>
  );
};

const NavBar = () => {
  return (
    <div className="flex gap-5 items-center p-3 border-b-2 border-slate-200 h-20 justify-between">
      <div className="flex gap-5">
        <Logo />
        <SearchBar />
      </div>
      <div className="flex gap-5 items-center">
        <PostNav />
        <NotificationsNav />
        <MessageNav />
        <Profile />
      </div>
    </div>
  );
};

export default NavBar;
