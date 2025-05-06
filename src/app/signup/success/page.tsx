import { initializeSignupSuccessUserAsFreeTier } from "@/logic/clerk-user-data-helper-utils";

export default async function SignupSuccessPage() {

  await initializeSignupSuccessUserAsFreeTier()

  return <p>Signup is success , you can start your free tier</p>;
}

