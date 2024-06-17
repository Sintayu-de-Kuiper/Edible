import SignInForm from "@/components/sign-in/SignInForm";

export default async function Home() {
  return (
    <main className={"flex flex-col items-center gap-10"}>
      <h1 className={"text-3xl mt-20"}>Sign in</h1>
      <SignInForm />
    </main>
  );
}
