"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ClientUser() {
  const auth = useAuth();

  console.log("auth", auth);
  return (
    <div>
      <h1>Client User</h1>
    </div>
  );
}
