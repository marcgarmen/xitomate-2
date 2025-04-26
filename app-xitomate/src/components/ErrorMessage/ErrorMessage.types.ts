export type ErrorMessageVariant = "default" | "alert";

export interface ErrorMessageProps {
  message: string;
  variant?: ErrorMessageVariant;
}
