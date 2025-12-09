"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth-client";

const SignUpWithGoogleButton = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button className="w-full cursor-pointer">Sign In With Google</Button>
    </form>
  );
};

export default SignUpWithGoogleButton;
