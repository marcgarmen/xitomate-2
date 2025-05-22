"use client";

import { ErrorMessageProps } from "./ErrorMessage.types";
import clsx from "clsx";

export const ErrorMessage = ({ message, variant = "default" }: ErrorMessageProps) => {
  return (
    <div
      className={clsx(
        "text-sm font-medium px-4 py-2 rounded-md max-w-md",
        "text-[#6D6D6D]",
        {
          "bg-[#FDE7E7] text-[#F45E62]": variant === "default",
          "bg-red-100 text-red-600": variant === "alert",
        }
      )}
    >
      <span className="text-red-500 mr-1">*</span>
      {message}
    </div>
  );
};
