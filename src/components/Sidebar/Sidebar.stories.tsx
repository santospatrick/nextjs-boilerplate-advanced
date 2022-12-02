import { ComponentMeta } from "@storybook/react";
import Sidebar from "./Sidebar";

export const Primary = () => {
  return <Sidebar />;
};

const config = {
  title: "Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

export default config;
