"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;
    console.log("User signed in: ", user);
  } catch (error) {
    console.error("Error during sign-in: ", error);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
    console.log("User signed out");
  } catch (error) {
    console.error("Error during sign-out: ", error);
  }
};
