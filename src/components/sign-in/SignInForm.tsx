"use client";

import React from "react";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/lib/firebase";

export default function SignInForm() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      console.log("User signed in: ", user);
    } catch (error) {
      console.error("Error during sign-in: ", error);
    }
  };

  return (
    <Button onClick={handleGoogleSignIn} className="shadcn-button">
      Sign Up with Google
    </Button>
  );
}
