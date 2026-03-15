// BikeIcon.tsx
import React from "react";
import { View } from "react-native";
import Svg, {
  Circle,
  Rect,
  Polygon,
  LinearGradient,
  Stop,
  G,
} from "react-native-svg";

interface BikeIconProps {
  className?: string;
  size?: number;
}

export default function BikeIcon({ className = "", size = 24 }: BikeIconProps) {
  return (
    <View className={className}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <LinearGradient id="bikeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#60A5FA" />
          <Stop offset="100%" stopColor="#1E40AF" />
        </LinearGradient>
        <LinearGradient id="tealAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#5EEAD4" />
          <Stop offset="100%" stopColor="#0F766E" />
        </LinearGradient>
        <LinearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#60A5FA" />
          <Stop offset="100%" stopColor="#1E40AF" />
        </LinearGradient>
        <G>
          <Circle
            cx="6"
            cy="12"
            r="3.5"
            fill="url(#wheelGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Circle
            cx="18"
            cy="12"
            r="3.5"
            fill="url(#wheelGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Rect
            x="6"
            y="10"
            width="12"
            height="2"
            rx="1"
            fill="url(#bikeGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Rect
            x="7"
            y="8"
            width="2"
            height="1"
            rx="0.5"
            fill="url(#bikeGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Rect
            x="16"
            y="9"
            width="0.8"
            height="6"
            rx="0.4"
            fill="url(#bikeGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Circle
            cx="16.4"
            cy="9.5"
            r="0.8"
            fill="url(#tealAccent)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Circle
            cx="16.4"
            cy="14.5"
            r="0.8"
            fill="url(#tealAccent)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Rect
            x="15.5"
            y="11.2"
            width="2.5"
            height="1.6"
            rx="0.8"
            fill="url(#bikeGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Polygon
            points="19,11.5 21,12 19,12.5"
            fill="url(#bikeGradient)"
            stroke="white"
            strokeWidth="0.6"
          />
        </G>
      </Svg>
    </View>
  );
}

export function CompactBikeIcon({ className = "", size = 16 }: BikeIconProps) {
  return (
    <View className={className}>
      <Svg width={size} height={size} viewBox="0 0 16 16">
        <LinearGradient
          id="compactGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#3B82F6" />
          <Stop offset="100%" stopColor="#1D4ED8" />
        </LinearGradient>
        <G>
          <Circle
            cx="3"
            cy="8"
            r="2.5"
            fill="url(#compactGradient)"
            stroke="white"
            strokeWidth="0.4"
          />
          <Circle
            cx="13"
            cy="8"
            r="2.5"
            fill="url(#compactGradient)"
            stroke="white"
            strokeWidth="0.4"
          />
          <Rect
            x="5"
            y="7"
            width="6"
            height="2"
            rx="1"
            fill="url(#compactGradient)"
            stroke="white"
            strokeWidth="0.3"
          />
          <Polygon points="12.5,7.5 14,8 12.5,8.5" fill="white" />
        </G>
      </Svg>
    </View>
  );
}
