// components/ui/Card.tsx
import React from "react";
import { Pressable, View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  onPress,
  ...props
}) => {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`bg-white rounded-lg shadow-sm ${className}`}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
  return (
    <View className={`bg-white rounded-lg shadow-sm ${className}`} {...props}>
      {children}
    </View>
  );
};
