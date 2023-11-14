import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: import.meta.env.VITE_ENVIRONMENT,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN
});