"use client";

import Image from "next/image";
import { CardDescriptionProps } from "@/components/CardDescription/CardDescription.types";
import clsx from "clsx";

export const CardDescription = ({
  title,
  description,
  image,
  variant = "textOnly",
}: CardDescriptionProps) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md max-w-[280px] text-center flex flex-col items-center gap-3">
      {variant === "withImage" && image && (
        <div className="w-8 h-8">
          <Image
            src={image}
            alt="Icono"
            width={32}
            height={32}
            className="mx-auto"
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-sm text-black">{title}</h3>
        <p className="text-gray-800 text-sm leading-snug">{description}</p>
      </div>
    </div>
  );
};