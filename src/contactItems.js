import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import linkedIn from "./assets/linkedin.png"; 
import gitHub from "./assets/gitHub.png";
import instagram from "./assets/instagram.png";
import twitter from "./assets/twitterX.png";

const contactItems = [
  {
    id: "linkedin",
    name: "LinkedIN",
    linkTo: "https://www.linkedin.com/in/federicoegidi/",
    icon: LinkedInIcon,
    shortText: "Here's my LinkedIn where you can find my work experience and education but i also use it to get in touch with Dev. peers.",
    screenshot: linkedIn,
  },
  {
    id: "github",
    name: "gitHub",
    linkTo: "https://github.com/fredegd",
    icon: GitHubIcon,
    shortText: "Here's my GitHub profile, where you can find repositories of my projects and latest contributions.",
    screenshot: gitHub,
  },
  
  {
    id: "instagram",
    name: "Instagram",
    linkTo: "https://www.instagram.com/tapiwo/",
    icon: InstagramIcon,
    shortText: "Here's my Instagram profile, where i do mostly share my latest creative coding experiments and get in contact with peers from CC community.",
    screenshot: instagram,
  },
  {
    id: "twitter",
    name: "Twitter ",
    linkTo: "https://twitter.com/tapiwoHB",
    icon: TwitterIcon,
    shortText: "Here's my Twitter profile, mostly used for retweet and stuff but also share here now and then some creative coding experiments.",
  screenshot: twitter,
  }
];

export default contactItems;
