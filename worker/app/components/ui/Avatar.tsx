// components/ui/Avatar.tsx
import React from "react";
import { View, Text, ViewProps } from "react-native";

interface AvatarProps extends ViewProps {
  children: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  children,
  className,
  ...props
}) => (
  <View
    className={`w-12 h-12 rounded-full items-center justify-center bg-blue-100 ${className}`}
    {...props}
  >
    <Text className="text-blue-700 text-lg">{children}</Text>
  </View>
);
