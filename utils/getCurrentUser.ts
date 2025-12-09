import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export const getCurrentUser = async ()=>{
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      throw new Error("User is not authenticated!");
    }
    return session.user
}