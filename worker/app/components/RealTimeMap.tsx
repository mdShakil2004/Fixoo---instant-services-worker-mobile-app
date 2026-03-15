// RealTimeMap.tsx
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSharedValue, withTiming } from "react-native-reanimated";
import {
  DeliveryBikeIcon,
  EmergencyVehicleIcon,
  ServiceVanIcon,
} from "./VehicleIcons";

interface MapProps {
  activeView: "jobs" | "navigation";
  onJobMarkerClick?: (jobId: string) => void;
}

interface BikePosition {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  direction: string;
  heading: number;
  isMoving: boolean;
}

interface JobMarker {
  id: string;
  x: number;
  y: number;
  status: "pending" | "accepted" | "in-progress";
  title: string;
  type: "van" | "bike" | "emergency" | "standard";
  priority: "high" | "medium" | "low";
}

const mockJobMarkers: JobMarker[] = [
  {
    id: "1",
    x: 28.4595,
    y: 77.0266,
    status: "pending",
    title: "Van Tyre Puncture",
    type: "van",
    priority: "high",
  },
  {
    id: "2",
    x: 28.5355,
    y: 77.391,
    status: "accepted",
    title: "AC Installation",
    type: "standard",
    priority: "medium",
  },
  {
    id: "3",
    x: 28.459,
    y: 77.027,
    status: "in-progress",
    title: "Electrical Repair",
    type: "bike",
    priority: "low",
  },
];

export default function RealTimeMap({
  activeView,
  onJobMarkerClick,
}: MapProps) {
  const [bikePosition, setBikePosition] = useState<BikePosition>({
    x: 28.4595,
    y: 77.0266,
    rotation: 0,
    speed: 0,
    direction: "North",
    heading: 0,
    isMoving: false,
  });

  const animatedPosition = useSharedValue({
    latitude: 28.4595,
    longitude: 77.0266,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBikePosition((prev) => {
        const time = Date.now() / 5000;
        const segment = Math.floor(time) % 4;
        const progress = time % 1;
        let newX, newY, rotation, speed, direction, heading, isMoving;

        switch (segment) {
          case 0:
            newX = 28.4595 + progress * 0.01;
            newY = 77.0266 + Math.sin(progress * Math.PI) * 0.001;
            rotation = 90;
            speed = 35 + Math.random() * 10;
            direction = "East";
            heading = 90;
            isMoving = true;
            break;
          case 1:
            newX = 28.4695 - Math.sin(progress * Math.PI) * 0.001;
            newY = 77.0266 + progress * 0.01;
            rotation = 180;
            speed = 30 + Math.random() * 8;
            direction = "South";
            heading = 180;
            isMoving = true;
            break;
          case 2:
            newX = 28.4695 - progress * 0.01;
            newY = 77.0366 - Math.sin(progress * Math.PI) * 0.001;
            rotation = 270;
            speed = 40 + Math.random() * 12;
            direction = "West";
            heading = 270;
            isMoving = true;
            break;
          default:
            newX = 28.4595 + Math.sin(progress * Math.PI) * 0.001;
            newY = 77.0366 - progress * 0.01;
            rotation = 360;
            speed = 32 + Math.random() * 9;
            direction = "North";
            heading = 0;
            isMoving = true;
            break;
        }

        if (progress > 0.7 && progress < 0.8 && Math.random() < 0.3) {
          speed = 0;
          isMoving = false;
        }

        animatedPosition.value = withTiming(
          { latitude: newX, longitude: newY },
          { duration: 400 }
        );

        return {
          x: newX,
          y: newY,
          rotation: rotation % 360,
          speed: Math.round(speed),
          direction,
          heading: heading % 360,
          isMoving,
        };
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "van":
        return <ServiceVanIcon size={24} />;
      case "bike":
        return <DeliveryBikeIcon size={24} />;
      case "emergency":
        return <EmergencyVehicleIcon size={24} />;
      default:
        return <Feather name="map-pin" size={24} color="#3B82F6" />;
    }
  };

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 28.4595,
          longitude: 77.0266,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker.Animated
          coordinate={animatedPosition}
          title="Your Location"
          description="Current position"
        >
          <DeliveryBikeIcon size={24} />
        </Marker.Animated>
        {mockJobMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.x, longitude: marker.y }}
            title={marker.title}
            description={`${marker.status} • ${marker.priority}`}
            onPress={() => onJobMarkerClick?.(marker.id)}
          >
            {getMarkerIcon(marker.type)}
          </Marker>
        ))}
        {activeView === "navigation" && (
          <Polyline
            coordinates={[
              { latitude: bikePosition.x, longitude: bikePosition.y },
              { latitude: mockJobMarkers[1].x, longitude: mockJobMarkers[1].y },
            ]}
            strokeColor="#3B82F6"
            strokeWidth={4}
            lineDashPattern={[10, 5]}
          />
        )}
      </MapView>
      <View className="absolute bottom-2 right-2 flex-col gap-1">
        <TouchableOpacity className="bg-white bg-opacity-90 p-1 rounded shadow-sm">
          <Text className="text-lg">+</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white bg-opacity-90 p-1 rounded shadow-sm">
          <Text className="text-lg">−</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs flex-row items-center gap-2">
        <Feather name="navigation" size={12} color="#3B82F6" />
        <Text>
          {Math.floor(Math.random() * 15 + 20)} km/h •{" "}
          {
            ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][
              Math.floor(bikePosition.rotation / 45) % 8
            ]
          }
        </Text>
      </View>
      {activeView === "jobs" && (
        <View className="absolute top-1/2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs flex-row items-center gap-1">
          <Feather name="users" size={12} color="#F59E0B" />
          <Text>{mockJobMarkers.length}</Text>
        </View>
      )}
    </View>
  );
}
