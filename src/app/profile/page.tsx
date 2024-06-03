import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect("/api/auth/signin?callbackUrl=/profile");
  }

  return (
    <main className={"flex flex-col items-center gap-10 p-10"}>
      <h1 className={"text-3xl mt-20"}>Profile page</h1>
      <p>This is a protected page. You are signed in as {session.user.email}</p>
      <Link href={"/"}>Home</Link>
    </main>
  );
}
