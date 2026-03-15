// components/ui/Button.tsx
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "default" | "outline" | "destructive" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}) => {
  const baseStyles = "rounded-md items-center justify-center";
  const variantStyles = {
    default: "bg-blue-600 text-white",
    outline: "border border-gray-300 bg-transparent",
    destructive: "bg-red-600 text-white",
    ghost: "bg-transparent text-gray-700",
  };

  const sizeStyles = {
    default: "px-4 py-2",
    sm: "px-3 py-1",
    lg: "px-6 py-3",
  };

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      <Text
        className={`text-base ${variant === "outline" ? "text-gray-700" : "text-white"}`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
