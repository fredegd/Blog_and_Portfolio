import { createClient } from "contentful-management";

import {contentful} from 'contentful-management'


export const commentsClient = createClient({
  accessToken: import.meta.env.CONTENTFUL_CONTENT_MANAGEMENT_ACCESS_TOKEN
})

