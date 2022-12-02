import { As } from "@chakra-ui/react";
import { MdBuild, MdVerifiedUser } from "react-icons/md";

type MenuItem = {
  icon?: As<any> | undefined;
  text: string;
  href?: string;
  children?: MenuItem[];
};

export const menu: MenuItem[] = [
  {
    icon: MdBuild,
    text: "Crud",
    href: "/",
  },
  {
    icon: MdVerifiedUser,
    text: "Validators",
    href: "/validators",
  },
];
