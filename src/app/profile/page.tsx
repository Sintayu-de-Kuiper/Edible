import Navbar from "@/components/navbar/Navbar";
import Search from "@/components/search/Search";
import React from "react";
import CurrentUserProfile from "@/components/profile/CurrentUserProfile";

export default async function ProfilePage() {
  return (
    <main className={"grid grid-cols-[1fr_2fr_1fr] min-h-screen"}>
      {/* Navbar sidebar */}
      <div className="border-r border-gray-200">
        <Navbar />
      </div>
      {/* Main content area */}
      <div>
        <CurrentUserProfile />
      </div>
      {/* Search sidebar */}
      <div className="border-l border-gray-200">
        <Search />
      </div>
    </main>
  );
}
