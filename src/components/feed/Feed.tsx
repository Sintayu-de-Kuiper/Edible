"use client";
import React, { useState } from "react";

const Feed: React.FC = () => {
  const [activeFeed, setActiveFeed] = useState<"foryou" | "following">(
    "foryou",
  );

  return (
    <div>
      <div className="bg-white mb-4 border-b">
        <button
          className={`px-4 py-4 w-1/2 ${activeFeed === "foryou" ? "bg-black text-white" : "text-black"}`}
          onClick={() => setActiveFeed("foryou")}
        >
          For You
        </button>
        <button
          className={`px-4 py-4 w-1/2 ${activeFeed === "following" ? "bg-black text-white" : "text-black"}`}
          onClick={() => setActiveFeed("following")}
        >
          Following
        </button>
      </div>
      <div>
        {activeFeed === "foryou" ? (
          <div>
            {/* For You feed content goes here */}
            <p>For You feed content...</p>
          </div>
        ) : (
          <div>
            {/* Following feed content goes here */}
            <p>Following feed content...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
