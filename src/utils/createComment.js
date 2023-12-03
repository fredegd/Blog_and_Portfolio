import { createClient } from "contentful-management";

const commentsClient = createClient({
  accessToken: import.meta.env.VITE_CREATE_POST_COMMENT,
});

export default async function createComment(commentData) {
  // console.log(commentData);
  try {
    const space = await commentsClient.getSpace(import.meta.env.VITE_SPACE_ID);
    const environment = await space.getEnvironment(
      import.meta.env.VITE_ENVIRONMENT
    );
    const entry = await environment.createEntry("comment", {
      fields: {
        commentAuthor: { "en-US": commentData.commentAuthor }, // author
        commentBody: { "en-US": commentData.commentBody }, // comment
        parentPostId: { "en-US": commentData.parentPostId }, // the id of the post
        parentComment: commentData.parentCommentId
          ? {
              "en-US": {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: commentData.parentCommentId,
                },
              },
            }
          : null, // the id of the parent comment
      },
    });
    const entry_1 = await entry.publish();
    return console.log(entry_1);
  } catch (message_1) {
    return console.error(message_1);
  }
}
