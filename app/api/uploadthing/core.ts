import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

const f = createUploadthing();

export const getCurrentUser = async () => {};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) {
     throw new UploadThingError("Unauthorized");
      }
      return session.user;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
