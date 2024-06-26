"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "@/lib/firebase";
import { doc, setDoc } from "@firebase/firestore";
import { User } from "@/types";

const saveUserData = async ({ id, ...rest }: User) => {
  try {
    await setDoc(doc(db, "users", id), rest, { merge: true });
    console.log("User data saved successfully.");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!user.displayName || !user.email || !user.photoURL) {
      throw new Error("Google sign-in failed. Missing required user data.");
    }

    await saveUserData({
      id: user.uid,
      name: user.displayName,
      email: user.email,
      imageUrl: user.photoURL,
      createdAt: new Date(),
    });
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
