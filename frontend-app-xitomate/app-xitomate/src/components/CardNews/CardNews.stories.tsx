import type { Meta, StoryObj } from "@storybook/react";
import CardNews from "./CardNews";

const meta: Meta<typeof CardNews> = {
  title: "Components/CardNews",
  component: CardNews,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CardNews>;

export const Default: Story = {
  args: {
    imageSrc: "/pretzels.jpg",
    tag: "Tendencia",
    title: "ENTRADAS PARA ABRIR EL APETITO: ¿POR QUÉ INCLUIRLAS EN EL MENÚ?",
    date: "14/02/2025",
    description:
      "Cuando se trata de una buena comida, el inicio es tan importante como el plato fuerte...",
    href: "/blog/entradas-para-abrir-el-apetito",
  },
};
