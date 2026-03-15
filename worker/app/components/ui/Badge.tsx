// components/ui/Badge.tsx
import { Text, View, ViewProps } from "react-native";

interface BadgeProps extends ViewProps {
  variant?: "default" | "secondary" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className,
  ...props
}) => {
  const variantStyles = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 bg-transparent text-gray-700",
  };

  return (
    <View
      className={`px-2 py-1 rounded-full ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <Text className="text-xs">{children}</Text>
    </View>
  );
};
