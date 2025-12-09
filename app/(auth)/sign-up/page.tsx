"use client";

import Link from "next/link";
import { signUpWithCredentials } from "@/actions/user.actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import SignUpWithGoogleButton from "@/components/shared/SignUpWithGoogle";

function SignUpPage() {
  const [data, action] = useActionState(signUpWithCredentials, {
    success: false,
    message: "",
  });

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full cursor-pointer" disabled={pending}>
        {pending ? "Signing Up..." : "Sign Up"}
      </Button>
    );
  };

  return (

    <div className="mt-8"> <form action={action}>
        <div className="space-y-4 px-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" required />
          </div>
          <SubmitButton />
        </div>
      </form>

      <div className="px-8 my-4">
        <SignUpWithGoogleButton />
      </div>

      {data && !data.success && (
        <div className="text-destructive text-center">{data.message}</div>
      )}

      {/* Sign-in section */}
      <div className="text-center text-sm mt-4">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link
          href="/sign-in"
          className="text-primary font-medium hover:underline"
        >
          Sign in
        </Link>
      </div>

    </div>
   
     

  );
}

export default SignUpPage;
