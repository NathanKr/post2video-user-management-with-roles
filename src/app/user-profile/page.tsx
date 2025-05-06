import { auth } from "@clerk/nextjs/server";

export default async function UserProfile() {
  const { userId } = await auth();
  
  return (
    <div>
      <h2>UserProfile</h2>
      <p>userId : {userId}</p>
    </div>
  );
}
