import { Button } from "@/components/ui/button";
import { googleSignIn } from "@/lib/auth";
import Link from "next/link";

export default function SignInForm() {
  return (
    <div className={"flex flex-col gap-5 items-center justify-center"}>
      <p>You are not logged in</p>
      <Button onClick={googleSignIn}>Login with Google</Button>
      <Button>
        <Link href={"/"}>Return home</Link>
      </Button>
    </div>
  );
}
