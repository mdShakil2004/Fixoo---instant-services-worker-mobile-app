import React from "react";
import { Tabs } from "expo-router";
import { Text } from "react-native"; // Import Text for custom labels
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1abc9c",
        tabBarInactiveTintColor: "#a5abc8",
        tabBarStyle: {
          backgroundColor: "#5f4a74",
          paddingBottom: 14,
          height: 75,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10, // No shadow on Android
          shadowOpacity: 0, // No shadow on iOS
          borderTopWidth: 0,
          zIndex: 40,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: focused ? 12 : 14, // Smaller title when active
                fontWeight: "bold",
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home"
              size={focused ? 20 : 24} // Smaller icon when active
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Shopping"
        options={{
          title: "Shop",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: focused ? 12 : 14, // Smaller title when active
                fontWeight: "bold",
              }}
            >
              Shop
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Foundation
              name="shopping-cart"
              size={focused ? 20 : 24} // Smaller icon when active
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookings"
        options={{
          title: "Bookings",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: focused ? 12 : 14, // Smaller title when active
                fontWeight: "bold",
              }}
            >
              Bookings
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="calendar-clear"
              size={focused ? 18 : 21} // Smaller icon when active
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: focused ? 12 : 14, // Smaller title when active
                fontWeight: "bold",
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person-sharp"
              size={focused ? 20 : 24} // Smaller icon when active
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
