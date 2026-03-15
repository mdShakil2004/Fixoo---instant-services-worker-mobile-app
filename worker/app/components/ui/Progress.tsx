import React from "react";
import { View } from "react-native";

interface ProgressProps {
  value: number;
  className?: string; // allow passing Tailwind classes from parent
}

export const Progress: React.FC<ProgressProps> = ({ value, className }) => (
  <View className={`w-full bg-gray-200 rounded-full h-2 ${className || ""}`}>
    <View
      className="bg-blue-600 h-2 rounded-full"
      style={{ width: `${value}%` }}
    />
  </View>
);
