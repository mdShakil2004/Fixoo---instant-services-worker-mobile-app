// App.tsx
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Fixed import
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomerApprovalDemo } from "./components/CustomerVerificationModal";
import Dashboard from "./components/Dashboard";
import JobDetails from "./components/JobDetails";
import JobHistory from "./components/JobHistory";
import Messaging from "./components/Messaging";
import Notifications from "./components/Notifications";
import Profile from "./components/ProfileScreen";
import Safety from "./components/Safety";
import WorkerRegistration from "./components/WorkerRegistration";

type RootStackParamList = {
  Registration: undefined;
  Main: undefined;
  JobDetails: { jobId: string | null };
  Safety: undefined;
  CustomerApprovalDemo: undefined;
};

type MainTabParamList = {
  Dashboard: undefined;
  Messaging: undefined;
  History: undefined;
  Profile: undefined;
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>(); // Fixed navigator name

const MainTabs = () => (
  <Tabs.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingBottom: 8,
        paddingTop: 8,
        height: 60,
      },
      tabBarActiveTintColor: "#3B82F6",
      tabBarInactiveTintColor: "#6B7280",
    }}
  >
    <Tabs.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Feather name="home" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Messaging"
      component={Messaging}
      options={{
        tabBarLabel: "Messages",
        tabBarIcon: ({ color, size }) => (
          <Feather name="message-circle" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="History"
      component={JobHistory}
      options={{
        tabBarLabel: "History",
        tabBarIcon: ({ color, size }) => (
          <Feather name="clock" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => (
          <Feather name="user" size={size} color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="Notifications"
      component={Notifications}
      options={{
        tabBarLabel: "Alerts",
        tabBarIcon: ({ color, size }) => (
          <View className="relative">
            <Feather name="bell" size={size} color={color} />
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs">3</Text>
            </View>
          </View>
        ),
      }}
    />
  </Tabs.Navigator>
);

export default function Index() {
  const [isWorkerVerified, setIsWorkerVerified] = useState(false);

  const handleRegistrationComplete = () => {
    setIsWorkerVerified(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#3B82F6" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isWorkerVerified ? (
            <Stack.Screen name="Registration" options={{ headerShown: false }}>
              {() => (
                <WorkerRegistration
                  onRegistrationComplete={handleRegistrationComplete}
                />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen
                name="JobDetails"
                component={JobDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Safety"
                component={Safety}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CustomerApprovalDemo"
                component={CustomerApprovalDemo}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
        {isWorkerVerified && (
          <TouchableOpacity
            className="absolute bottom-20 right-4 bg-red-500 p-3 rounded-full shadow-lg"
            onPress={() => {
              // Navigate to Safety screen
              // Placeholder: Requires navigation prop for dynamic navigation
            }}
          >
            <MaterialIcons name="security" size={24} color="white" />
          </TouchableOpacity>
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}
