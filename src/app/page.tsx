import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      {JSON.stringify(session)}
      {!session ? (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button type="submit">Signin</button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Signout</button>
        </form>
      )}
    </main>
  );
}
