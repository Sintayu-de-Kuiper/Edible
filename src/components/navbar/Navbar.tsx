import React from "react";
import Link from "next/link";
import { ProfileButton } from "@/components/navbar/ProfileButton";
import { Button } from "@/components/ui/button";

// Navbar component renders the sidebar navigation
const Navbar: React.FC = () => {
  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="font-bold text-lg mb-4">Edible</h2>
      <nav className={"flex flex-col justify-between grow"}>
        <ul className="list-none p-0 space-y-4">
          <li>
            <Link
              href={"/"}
              className="flex items-center no-underline text-black"
            >
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                </svg>
              </span>
              Homepage
            </Link>
          </li>
          <li>
            <Link
              href={"/search"}
              className="flex items-center no-underline text-black"
            >
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000"
                >
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
              </span>
              Search
            </Link>
          </li>
          <li>
            <Link
              href={"/create-post"}
              className="flex items-center no-underline"
            >
              <Button className={"w-full"}>Post</Button>
            </Link>
          </li>
        </ul>
        <ProfileButton />
      </nav>
    </div>
  );
};

export default Navbar;
