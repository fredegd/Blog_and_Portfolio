import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from '@mui/icons-material/X';




const contactItems = [
  {
    id: "linkedin",
    name: "LinkedIN",
    linkTo: "https://www.linkedin.com/in/federicoegidi/",
    icon: LinkedInIcon,
    shortText:
      "In my LinkedIn profile you can find my work experience and education but i also like to use it to get in touch with Developer. peers",

  },
  {
    id: "github",
    name: "gitHub",
    linkTo: "https://github.com/fredegd",
    icon: GitHubIcon,
    shortText:
      "Here's my GitHub profile, where you can find repositories of my projects and latest contributions.",

  },

  {
    id: "instagram",
    name: "Instagram",
    linkTo: "https://www.instagram.com/tapiwo/",
    icon: InstagramIcon,
    shortText:
      "Trough Instagram, i do mostly share my latest creative coding experiments under the profile name TAPIWO, i got in contact with a lot of  peers from CC community there.",

  },
  {
    id: "twitter",
    name: "Twitter ",
    linkTo: "https://twitter.com/tapiwoHB",
    icon: XIcon,
    shortText:
      "Here's my Twitter, ehm.. 'X' profile,  mostly used for retweet and stuff,  although, since the  latest, owner-change i don't like the platform anymore ",

  },
];

export default contactItems;
