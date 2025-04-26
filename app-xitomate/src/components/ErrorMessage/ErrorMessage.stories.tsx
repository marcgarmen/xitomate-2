import type { Meta, StoryObj } from "@storybook/react";
import { ErrorMessage } from "./ErrorMessage";
import type { ErrorMessageProps } from "./ErrorMessage.types";

const meta: Meta<typeof ErrorMessage> = {
  title: "Components/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "alert"],
    },
    message: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    message: "Contraseña inválida",
    variant: "default",
  },
};

export const AlertVariant: Story = {
  args: {
    message: "Este campo es obligatorio",
    variant: "alert",
  },
};
