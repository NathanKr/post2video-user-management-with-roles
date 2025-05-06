import {
  getPrivateMetadata,
  getUser,
} from "@/logic/clerk-user-data-utils";

export default async function UserDataServerComponent() {
  const user = await getUser();

  if (!user) return <p>user is empty</p>;

  const privateMetadata = await getPrivateMetadata();

  return (
    <div>
      <p>email : {user.emailAddresses[0].emailAddress}</p>
      <p>
        privateMetadata :{" "}
        {privateMetadata
          ? `creditLeftCents : ${privateMetadata.creditConsumedCents} , numYoutubeVideoUploadLeft : ${privateMetadata.youtubeVideosUploaded} , role : ${privateMetadata.role}`
          : "N / A"}
      </p>
    </div>
  );
}
