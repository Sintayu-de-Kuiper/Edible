"use client";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import Image from "next/image";
import SignInForm from "@/components/sign-in/SignInForm";
import UserPosts from "@/components/profile/UserPosts";

export default function CurrentUserProfile() {
  const { currentUser: user } = useAuth();

  if (!user) {
    return <SignInForm />;
  }

  return (
    <div className="relative min-h-screen max-w-4xl mx-auto p-4">
      <button
        onClick={signOut}
        className="absolute top-4 right-4 p-2 text-destructive"
        aria-label="Logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
        </svg>
      </button>
      <div className="flex flex-col items-center">
        <Image
          src={user.photoURL ?? "/default-avatar.svg"}
          alt="Profile picture"
          width={128}
          height={128}
          className="rounded-full"
        />
        <div className="mt-5 flex flex-col items-center">
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
        </div>
        <div className="flex flex-col items-center mt-4">
          <div className="flex space-x-8 mt-4">
            <p>
              <span className="font-bold">(number)</span> Following
            </p>
            <p>
              <span className="font-bold">(number)</span> Follower
            </p>
          </div>
        </div>
      </div>
      <UserPosts userId={user.uid} />
    </div>
  );
}
