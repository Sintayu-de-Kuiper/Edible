import Link from "next/link";
import ClientUser from "./client";

export default async function Home() {
  return (
    <main className={"flex flex-col items-center gap-10"}>
      <h1 className={"text-3xl mt-20"}>Home</h1>
      <Link href={"/sign-in"}>Sign In</Link>

      <ClientUser />
    </main>
  );
}
