import React from "react";
import { ComponentBase } from "../types/component-base.type";

export type AlertProps = Omit<ComponentBase, "isDisabled" | "size"> & {
  showIcon?: boolean;
  children: React.ReactNode;
};
