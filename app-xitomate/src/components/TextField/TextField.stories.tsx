import { TextField } from "./TextField";

export default {
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    placeholder: {
      control: "text", // Enables a text input in Storybook
      defaultValue: "Enter your text here", // Default value for the placeholder
    },
  },
};

// CSF3 Stories
export const DefaultTextField = {
  args: {
    placeholder: "desdrtfj",
  },
};