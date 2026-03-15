// AnimatedBikeIcon.tsx
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  G,
  LinearGradient,
  Polygon,
  Rect,
  Stop,
} from "react-native-svg";

interface AnimatedBikeIconProps {
  className?: string;
  size?: number;
  isMoving?: boolean;
  speed?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function AnimatedBikeIcon({
  className = "",
  size = 24,
  isMoving = false,
  speed = 0,
}: AnimatedBikeIconProps) {
  const wheelRotation = useSharedValue(0);

  const wheelRotationSpeed = isMoving ? Math.max(0.5, speed / 60) : 0;

  useEffect(() => {
    if (isMoving) {
      wheelRotation.value = withTiming(360, {
        duration: 1000 / wheelRotationSpeed,
        easing: Easing.linear,
        loop: true,
      });
    } else {
      wheelRotation.value = 0;
    }
  }, [isMoving, wheelRotationSpeed]);

  const animatedWheelProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${wheelRotation.value}deg` }],
    origin: { x: 6, y: 12 },
  }));

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
          {/* Rear wheel */}
          <AnimatedCircle
            cx="6"
            cy="12"
            r="3.5"
            fill="url(#wheelGradient)"
            stroke="white"
            strokeWidth="0.3"
            animatedProps={animatedWheelProps}
          />
          {/* Front wheel */}
          <AnimatedCircle
            cx="18"
            cy="12"
            r="3.5"
            fill="url(#wheelGradient)"
            stroke="white"
            strokeWidth="0.3"
            animatedProps={animatedWheelProps}
          />
          {/* Bike frame */}
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
          {/* Seat */}
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
          {/* Handlebars */}
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
          {/* Handlebar grips */}
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
          {/* Front fork */}
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
          {/* Direction indicator */}
          <Polygon
            points="19,11.5 21,12 19,12.5"
            fill={isMoving ? "url(#tealAccent)" : "url(#bikeGradient)"}
            stroke="white"
            strokeWidth="0.6"
          />
          {/* Speed indicator */}
          {isMoving && speed > 20 && (
            <G opacity="0.7">
              <Polygon
                points="18.5,11.8 19.8,12 18.5,12.2"
                fill="url(#tealAccent)"
              />
            </G>
          )}
        </G>
      </Svg>
    </View>
  );
}
