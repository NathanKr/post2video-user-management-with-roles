import { IPrivateUserData } from "@/types/types";
import { auth, clerkClient, currentUser, User } from "@clerk/nextjs/server";
import { privateUserDataSchema } from "./zod-schemas";

export async function setPrivateMetadata(
  userData: IPrivateUserData
): Promise<void> {
  const client = await clerkClient();

  const { userId } = await auth();
  if (!userId) {
    throw new Error("userId does not exist - you need to sign in");
  }

  const data: UserPrivateMetadata = { ...userData };

  await client.users.updateUserMetadata(userId, {
    privateMetadata: data,
  });
}

export async function getPrivateMetadata(): Promise<IPrivateUserData | null> {
  const user = await getUser();

  if (!user) {
    throw new Error("user does not exist - you need to sign in");
  }

  if (!user.privateMetadata) {
    return null;
  }

  const privateData = privateUserDataSchema.parse(user.privateMetadata);

  return privateData;
}

export async function getUser(): Promise<User | null> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("userId does not exist - you need to sign in");
  }

  const user = await currentUser();

  return user;
}
