import { FC, PropsWithChildren } from "react";

export const SectionHeader: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-2xl font-bold text-[#41AC374] mb-4">{children}</h2>
);