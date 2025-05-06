import { User } from "@clerk/nextjs/server";
import { roleSchema } from "./zod-schemas";
import { IPrivateUserData, Role } from "@/types/types";
import { setPrivateMetadata } from "./clerk-user-data-utils";

function checkUserRole(user: User, targetRole: Role): boolean {
  try {
    const { role } = roleSchema.parse(user.privateMetadata);
    return role === targetRole;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function isAdmin(user: User): boolean {
  return checkUserRole(user, Role.admin);
}


export function isFreeTierUser(user: User): boolean {
  return checkUserRole(user, Role.freeTier);
}

export async function initializeSignupSuccessUserAsFreeTier () : Promise<void>{
  const userFreeTierData: IPrivateUserData = {
    role: Role.freeTier,
    creditConsumedCents: 0,
    youtubeVideosUploaded: 0
  }
  await setPrivateMetadata(userFreeTierData)
}
