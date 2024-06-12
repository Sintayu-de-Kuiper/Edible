import Link from "next/link";

export default async function Home() {
  return (
    <main className={"flex flex-col items-center gap-10"}>
      <h1 className={"text-3xl mt-20"}>Home</h1>
      <button
        className={"bg-black px-3 py-2 text-lg text-white rounded-md"}
        type="submit"
      >
        Sign in
      </button>
      <button
        className={"bg-black px-3 py-2 text-lg text-white rounded-md"}
        type="submit"
      >
        Sign out
      </button>
      <Link href={"/profile"}>Profile</Link>
    </main>
  );
}
