"use server";
import { auth } from "@/utils/auth";
import { signUpSchema, signInSchema } from "@/utils/validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { errorFormat } from "@/utils/error-handler";

export async function signUpWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const { name, email, password } = signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const data = await auth.api.signUpEmail({
      body: { name, email, password },
    });
    redirect("/");
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: errorFormat(error, "SignUp Failed") };
  }
}

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const { email, password } = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const data = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: errorFormat(error, "Invalid Credentials"),
    };
  }
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/sign-in");
}
