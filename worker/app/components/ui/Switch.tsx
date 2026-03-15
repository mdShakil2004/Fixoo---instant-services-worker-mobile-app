// components/ui/Switch.tsx
import React from "react";
import { Switch as RNSwitch, SwitchProps } from "react-native";

interface MySwitchProps {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

export const Switch: React.FC<
  MySwitchProps & Omit<SwitchProps, "value" | "onValueChange">
> = ({ checked, onCheckedChange, ...props }) => (
  <RNSwitch
    value={checked}
    onValueChange={onCheckedChange}
    trackColor={{ false: "#D1D5DB", true: "#16A34A" }}
    thumbColor="#FFFFFF"
    {...props}
  />
);
