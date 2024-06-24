import Link from "next/link";

export default async function Profile() {
  return (
    <main className={"flex flex-col items-center gap-10 p-10"}>
      <h1 className={"text-3xl mt-20"}>Profile page</h1>
      <p>This is a protected page. You are signed in as</p>
      <Link href={"/"}>Home</Link>
    </main>
  );
}
