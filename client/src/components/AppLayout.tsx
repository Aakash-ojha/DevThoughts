import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import NavBar from "./NavBar";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen w-full">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="md:px-18 px-10 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
