import { useState, useEffect } from "react";

import { contentfulClient } from "../../utils/contentfulClient";

import { createClient } from "contentful-management";

const commentsClient = createClient({
  accessToken: import.meta.env.VITE_CREATE_POST_COMMENT,
});



export default function CommentList() {




  useEffect(() => {
    contentfulClient
      .getEntries({
        content_type: "comment",
        order: "sys.createdAt",
      })
      .then((response) => {
        const filtered = response.items.filter((item) => {
          return item.fields.parentPostId === subjectId.blogItemid;
        });
        console.log(filtered);
        setComments(filtered);
      })
      .catch((err) => console.error(err));
  }, []);


}
