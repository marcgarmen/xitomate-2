import type { Meta, StoryObj } from "@storybook/react";
import { CardDescription } from "./CardDescription";

const meta: Meta<typeof CardDescription> = {
  title: "Components/CardDescription",
  component: CardDescription,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["textOnly", "withImage"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardDescription>;

export const TextoSolo: Story = {
  args: {
    title: "1. Predicción inteligente de la demanda",
    description:
      "Nuestro sistema analiza datos históricos y estacionales para anticipar cuántos insumos necesitarás.",
    variant: "textOnly",
  },
};

export const ConImagen: Story = {
  args: {
    title: "Automatización inteligente",
    description:
      "Reduce el trabajo operativo. Xitomate automatiza pedidos según demanda real y disponibilidad de productores.",
    image: "/tomate.svg", 
    variant: "withImage",
  },
};
