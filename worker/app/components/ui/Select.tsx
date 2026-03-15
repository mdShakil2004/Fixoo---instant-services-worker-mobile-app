// components/ui/Select.tsx
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text } from "react-native";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  children,
}) => (
  <View className="border border-gray-300 rounded-md">
    <Picker selectedValue={value} onValueChange={onValueChange}>
      {children}
    </Picker>
  </View>
);

export const SelectTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <View className={`p-2 bg-white ${className}`}>
    <Text>{children}</Text>
  </View>
);

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

export const SelectItem: React.FC<{
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <Picker.Item label={String(children)} value={value} />
);

export const SelectValue: React.FC<{ placeholder?: string }> = ({
  placeholder,
}) => (
  <Text className="text-gray-600">{placeholder || "Select an option"}</Text>
);
