"use client";

import { useAuth } from "@/hooks/useAuth";
import { googleSignIn } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CurrentUserProfile() {
  const { currentUser: user } = useAuth();

  if (!user) {
    return (
      <div className={"flex flex-col gap-5 items-center justify-center"}>
        <p>You are not logged in</p>
        <Button onClick={googleSignIn}>Login with Google</Button>
        <Button>
          <Link href={"/"}>Return home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
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
      </div>
    </div>
  );
}
