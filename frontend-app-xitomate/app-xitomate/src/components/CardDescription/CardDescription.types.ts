export type CardDescriptionVariant = "withImage" | "textOnly";

export interface CardDescriptionProps {
  title: string;
  description: string;
  image?: string;
  variant?: CardDescriptionVariant;
}