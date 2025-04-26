import React from "react";
import { CombinedUserChart } from "./CombinedUserChart";

export default {
  title: "Components/Area Chart",
  component: CombinedUserChart,
  argTypes: {
    title: {
      control: "text",
      defaultValue: "Retención de usuarios",
    },
    description: {
      control: "text",
      defaultValue: "",
    },
  },
};

export const Default = {
  args: {
    title: "Retención de",
    description: "asdfgh",
  },
};