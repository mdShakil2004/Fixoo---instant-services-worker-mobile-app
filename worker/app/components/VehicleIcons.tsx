// VehicleIcons.tsx
import React from "react";
import { View } from "react-native";
import Svg, {
  Rect,
  Circle,
  Polygon,
  LinearGradient,
  Stop,
  G,
} from "react-native-svg";

interface VehicleIconProps {
  className?: string;
  size?: number;
}

export function ServiceVanIcon({
  className = "",
  size = 20,
}: VehicleIconProps) {
  return (
    <View className={className}>
      <Svg width={size} height={size} viewBox="0 0 20 20">
        <LinearGradient id="vanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#F59E0B" />
          <Stop offset="100%" stopColor="#D97706" />
        </LinearGradient>
        <G>
          <Rect
            x="2"
            y="6"
            width="16"
            height="8"
            rx="2"
            fill="url(#vanGradient)"
            stroke="white"
            strokeWidth="0.5"
          />
          <Rect
            x="14"
            y="7"
            width="4"
            height="6"
            rx="1"
            fill="url(#vanGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Circle
            cx="5"
            cy="15"
            r="1.5"
            fill="white"
            stroke="#374151"
            strokeWidth="0.3"
          />
          <Circle
            cx="15"
            cy="15"
            r="1.5"
            fill="white"
            stroke="#374151"
            strokeWidth="0.3"
          />
          <Circle
            cx="5"
            cy="5"
            r="1.5"
            fill="white"
            stroke="#374151"
            strokeWidth="0.3"
          />
          <Circle
            cx="15"
            cy="5"
            r="1.5"
            fill="white"
            stroke="#374151"
            strokeWidth="0.3"
          />
          <Rect
            x="4"
            y="8"
            width="8"
            height="4"
            rx="0.5"
            fill="white"
            opacity="0.9"
          />
          {/* Approximate 'S' with simple shape */}
          <Rect x="7.5" y="9" width="1" height="2" fill="#D97706" />
        </G>
      </Svg>
    </View>
  );
}

export function DeliveryBikeIcon({
  className = "",
  size = 18,
}: VehicleIconProps) {
  return (
    <View className={className}>
      <Svg width={size} height={size} viewBox="0 0 18 18">
        <LinearGradient
          id="deliveryGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#10B981" />
          <Stop offset="100%" stopColor="#059669" />
        </LinearGradient>
        <G>
          <Circle
            cx="4"
            cy="9"
            r="2.5"
            fill="url(#deliveryGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Circle
            cx="14"
            cy="9"
            r="2.5"
            fill="url(#deliveryGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Rect
            x="5.5"
            y="8"
            width="7"
            height="2"
            rx="1"
            fill="url(#deliveryGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Rect
            x="6.5"
            y="6.5"
            width="3"
            height="3"
            rx="0.5"
            fill="#F59E0B"
            stroke="white"
            strokeWidth="0.2"
          />
          <Polygon points="13,8.5 15,9 13,9.5" fill="white" />
        </G>
      </Svg>
    </View>
  );
}

export function EmergencyVehicleIcon({
  className = "",
  size = 22,
}: VehicleIconProps) {
  return (
    <View className={className}>
      <Svg width={size} height={size} viewBox="0 0 22 22">
        <LinearGradient
          id="emergencyGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#EF4444" />
          <Stop offset="100%" stopColor="#DC2626" />
        </LinearGradient>
        <G>
          <Rect
            x="3"
            y="7"
            width="16"
            height="8"
            rx="2"
            fill="url(#emergencyGradient)"
            stroke="white"
            strokeWidth="0.5"
          />
          <Rect
            x="5"
            y="5"
            width="3"
            height="2"
            rx="1"
            fill="#FEF3C7"
            stroke="white"
            strokeWidth="0.2"
          />
          <Rect
            x="14"
            y="5"
            width="3"
            height="2"
            rx="1"
            fill="#FEF3C7"
            stroke="white"
            strokeWidth="0.2"
          />
          <Circle
            cx="6"
            cy="16"
            r="2"
            fill="white"
            stroke="#374151"
            strokeWidth="0.4"
          />
          <Circle
            cx="16"
            cy="16"
            r="2"
            fill="white"
            stroke="#374151"
            strokeWidth="0.4"
          />
          <Circle
            cx="6"
            cy="6"
            r="2"
            fill="white"
            stroke="#374151"
            strokeWidth="0.4"
          />
          <Circle
            cx="16"
            cy="6"
            r="2"
            fill="white"
            stroke="#374151"
            strokeWidth="0.4"
          />
          <Rect x="10" y="9" width="2" height="4" fill="white" />
          <Rect x="9" y="10" width="4" height="2" fill="white" />
          {/* Pulse effect approximated with static circle */}
          <Circle
            cx="11"
            cy="11"
            r="8"
            fill="none"
            stroke="#EF4444"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </G>
      </Svg>
    </View>
  );
}
