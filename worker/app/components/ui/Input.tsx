// components/ui/Input.tsx
import React from "react";
import { TextInput, TextInputProps } from "react-native";

export const Input: React.FC<TextInputProps> = ({ className, ...props }) => (
  <TextInput
    className={`border border-gray-300 rounded-md p-2 ${className}`}
    {...props}
  />
);
