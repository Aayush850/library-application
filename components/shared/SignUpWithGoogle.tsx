"use client";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth-client";
import { Spinner } from "../ui/spinner";
import GoogleIconIcon from "../icons/logos-google-icon";

const SignUpWithGoogleButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: "google",
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button
        className="w-full cursor-pointer"
        disabled={isPending}
        variant={"outline"}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <GoogleIconIcon /> <Spinner /> Signing In...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <GoogleIconIcon /> Sign In With Google
          </span>
        )}
      </Button>
    </form>
  );
};

export default SignUpWithGoogleButton;
