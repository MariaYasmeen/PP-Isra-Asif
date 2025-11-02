import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@ahmedraza",
    icon: Icons.gitHub,
    link: "https://github.com/ahmedraza",
  },
  {
    name: "LinkedIn",
    username: "Ahmed Raza",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/ahmedraza",
  },
  {
    name: "Twitter",
    username: "@ahmedraza",
    icon: Icons.twitter,
    link: "https://twitter.com/ahmedraza",
  },
  {
    name: "Gmail",
    username: "naman.barkiya02",
    icon: Icons.gmail,
    link: "mailto:naman.barkiya02@gmail.com",
  },
];
