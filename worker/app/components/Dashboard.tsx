// Dashboard.tsx
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RealTimeMap from "./RealTimeMap";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Switch } from "./ui/Switch";

interface DashboardProps {
  onJobSelect: (jobId: string) => void;
}

const mockJobs = [
  {
    id: "1",
    title: "Van Tyre Puncture",
    description: "Emergency tyre puncture repair",
    customer: "Rajesh Kumar",
    address: "Highway NH-8, Near Toll Plaza",
    distance: "3.2 km",
    eta: "12 min",
    price: "₹200",
    status: "pending",
    priority: "high",
    serviceTime: "30-60 min",
  },
  {
    id: "2",
    title: "AC Installation",
    description: "Split AC unit installation",
    customer: "Sarah Johnson",
    address: "456 Pine Avenue, Midtown",
    distance: "4.1 km",
    eta: "22 min",
    price: "₹2500",
    status: "accepted",
    priority: "medium",
    serviceTime: "2-3 hours",
  },
  {
    id: "3",
    title: "Electrical Repair",
    description: "Power outlet not working",
    customer: "Mike Davis",
    address: "789 Elm Drive, Uptown",
    distance: "1.8 km",
    eta: "12 min",
    price: "₹650",
    status: "in-progress",
    priority: "low",
    serviceTime: "20-30 min",
  },
];

export default function Dashboard({ onJobSelect }: DashboardProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [mapView, setMapView] = useState<"jobs" | "navigation">("jobs");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Feather name="alert-triangle" size={16} color="#EF4444" />;
      case "medium":
        return <Feather name="clock" size={16} color="#F59E0B" />;
      case "low":
        return <Feather name="clock" size={16} color="#16A34A" />;
      default:
        return null;
    }
  };

  const handleAcceptJob = (jobId: string) => {
    console.log(`Accepted job ${jobId}`);
  };

  const handleRejectJob = (jobId: string) => {
    console.log(`Rejected job ${jobId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-lg font-bold">Good morning, Alex!</Text>
            <Text className="text-gray-600 text-sm">
              Ready to help customers today?
            </Text>
          </View>
          <View className="text-right">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-sm text-gray-600">Status:</Text>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} />
            </View>
            <Text className={isOnline ? "text-green-600" : "text-red-600"}>
              {isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
        <View className="grid grid-cols-3 gap-3">
          <View className="bg-blue-50 p-3 rounded-lg text-center">
            <MaterialIcons name="attach-money" size={20} color="#3B82F6" />
            <Text className="text-xs text-gray-600">Today</Text>
            <Text className="text-blue-600">₹2450</Text>
          </View>
          <View className="bg-green-50 p-3 rounded-lg text-center">
            <Feather name="check-circle" size={20} color="#16A34A" />
            <Text className="text-xs text-gray-600">Completed</Text>
            <Text className="text-green-600">4 jobs</Text>
          </View>
          <View className="bg-yellow-50 p-3 rounded-lg text-center">
            <Feather name="clock" size={20} color="#F59E0B" />
            <Text className="text-xs text-gray-600">Hours</Text>
            <Text className="text-yellow-600">6.5h</Text>
          </View>
        </View>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-purple-600 border-purple-300 mt-3"
          onPress={() => console.log("View Customer Approval Demo")}
        >
          🔄 View Customer Approval Demo
        </Button>
      </View>

      <View className="bg-white m-4 rounded-lg overflow-hidden shadow-sm">
        <View className="flex-row border-b border-gray-200">
          <TouchableOpacity
            className={`flex-1 p-3 text-sm ${mapView === "jobs" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onPress={() => setMapView("jobs")}
          >
            <Text>🗺️ Live Map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-3 text-sm ${mapView === "navigation" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onPress={() => setMapView("navigation")}
          >
            <Text>🧭 Navigation</Text>
          </TouchableOpacity>
        </View>
        <View className="p-2">
          <RealTimeMap activeView={mapView} onJobMarkerClick={onJobSelect} />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pb-4">
        <Text className="text-gray-800 font-bold mb-3">
          Active Service Requests
        </Text>
        <View className="space-y-3">
          {mockJobs.map((job) => (
            <Card
              key={job.id}
              className="p-4 border-l-4 border-l-blue-500"
              onPress={() => onJobSelect(job.id)}
            >
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text className="text-gray-900 font-bold">{job.title}</Text>
                    {getPriorityIcon(job.priority)}
                  </View>
                  <Text className="text-gray-600 text-sm mb-1">
                    {job.description}
                  </Text>
                  <Text className="text-gray-500 text-xs">{job.customer}</Text>
                </View>
                <Badge
                  className={getStatusColor(job.status)}
                  variant="secondary"
                >
                  {job.status.replace("-", " ")}
                </Badge>
              </View>
              <View className="flex-row items-center justify-between text-sm text-gray-600 mb-3">
                <View className="flex-row items-center gap-1">
                  <Feather name="map-pin" size={12} color="#6B7280" />
                  <Text>{job.distance}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Feather name="clock" size={12} color="#6B7280" />
                  <Text>{job.eta}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <MaterialIcons
                    name="attach-money"
                    size={12}
                    color="#16A34A"
                  />
                  <Text className="text-green-600">{job.price}</Text>
                </View>
              </View>
              <View className="flex-row items-center text-xs text-gray-500 mb-3">
                <Feather name="navigation" size={12} color="#6B7280" />
                <Text className="truncate">{job.address}</Text>
              </View>
              {job.status === "pending" && (
                <View className="flex-row gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onPress={() => handleRejectJob(job.id)}
                  >
                    <Feather name="x-circle" size={16} color="#FFFFFF" />
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-green-600"
                    onPress={() => handleAcceptJob(job.id)}
                  >
                    <Feather name="check-circle" size={16} color="#FFFFFF" />
                    Accept
                  </Button>
                </View>
              )}
              {job.status === "accepted" && (
                <Button size="sm" className="w-full bg-blue-600">
                  <Feather name="navigation" size={16} color="#FFFFFF" />
                  Start Navigation
                </Button>
              )}
              {job.status === "in-progress" && (
                <View className="bg-green-50 p-2 rounded text-center">
                  <Text className="text-green-700 text-sm">
                    Job in progress
                  </Text>
                  <Text className="text-green-600 text-xs">
                    Expected: {job.serviceTime}
                  </Text>
                </View>
              )}
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
