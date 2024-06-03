import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className={"flex flex-col items-center gap-10"}>
      <h1 className={"text-3xl mt-20"}>Home</h1>
      {JSON.stringify(session)}
      {!session ? (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button
            className={"bg-black px-3 py-2 text-lg text-white rounded-md"}
            type="submit"
          >
            Sign in
          </button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            className={"bg-black px-3 py-2 text-lg text-white rounded-md"}
            type="submit"
          >
            Sign out
          </button>
        </form>
      )}
      <Link href={"/profile"}>Profile</Link>
    </main>
  );
}
