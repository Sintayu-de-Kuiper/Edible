"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { googleSignIn } from "@/lib/auth";

export function ProfileButton() {
  const { currentUser: user } = useAuth();

  return user ? (
    <Link
      href={"/profile"}
      className="flex items-center no-underline text-black"
    >
      <Image
        src={user.photoURL ?? "/default-avatar.svg"}
        alt="Profile picture"
        width={32}
        height={32}
        className="rounded-full mr-2"
      />
      {user.displayName ?? "Profile"}
    </Link>
  ) : (
    <Button onClick={googleSignIn} className="flex items-center no-underline">
      Login
    </Button>
  );
}
