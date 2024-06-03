import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      Hello world! {JSON.stringify(session)}
      {!session ? (
        <>
          <h1>Sign in</h1>
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <button type="submit">Signin</button>
          </form>
        </>
      ) : (
        <>
          <h1>Sign out</h1>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Signout</button>
          </form>
        </>
      )}
    </main>
  );
}
