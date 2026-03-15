// components/ui/Label.tsx
import React from "react";
import { Text, TextProps } from "react-native";

export const Label: React.FC<TextProps> = ({
  children,
  className,
  ...props
}) => (
  <Text className={`text-gray-700 text-sm font-medium ${className}`} {...props}>
    {children}
  </Text>
);
