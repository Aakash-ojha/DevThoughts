import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import NavBar from "./NavBar";
import { useState } from "react";

export default function AppLayout() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // ← add this

  return (
    <div className="flex flex-col h-screen w-full">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar
          selectedTag={selectedTag} // ← pass to sidebar
          setSelectedTag={setSelectedTag} // ← pass to sidebar
        />
        <main className="flex-1 overflow-y-auto">
          <div className="md:px-18 px-10 py-6">
            <Outlet context={{ selectedTag }} /> {/* ← pass to PostFeed */}
          </div>
        </main>
      </div>
    </div>
  );
}
