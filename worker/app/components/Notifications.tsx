// Notifications.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Switch } from "./ui/Switch";

interface Notification {
  id: string;
  type: "job_request" | "job_update" | "payment" | "system" | "emergency";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  urgent: boolean;
  actionRequired: boolean;
  data?: {
    jobId?: string;
    amount?: number;
    location?: string;
    eta?: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "job_request",
    title: "Additional Service Verification Required",
    message:
      "Customer needs to approve additional charges for tyre replacement - ₹3000 total",
    timestamp: "2 min ago",
    read: false,
    urgent: true,
    actionRequired: false,
    data: {
      jobId: "JOB-001",
      amount: 3000,
      location: "Highway NH-8",
      eta: "Pending approval",
    },
  },
  {
    id: "0",
    type: "job_request",
    title: "New Emergency Job Request",
    message: "Van tyre puncture - customer stranded on highway",
    timestamp: "5 min ago",
    read: false,
    urgent: true,
    actionRequired: true,
    data: {
      jobId: "JOB-001",
      amount: 200,
      location: "Highway NH-8, Toll Plaza",
      eta: "12 min",
    },
  },
  {
    id: "2",
    type: "job_update",
    title: "Customer Approved Additional Service",
    message:
      "Rajesh Kumar approved ₹3000 for tyre replacement. You can proceed with the service.",
    timestamp: "8 min ago",
    read: false,
    urgent: false,
    actionRequired: false,
    data: {
      jobId: "JOB-002",
    },
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Received",
    message: "Payment of ₹850 received for Kitchen Sink Repair job",
    timestamp: "15 min ago",
    read: true,
    urgent: false,
    actionRequired: false,
    data: {
      amount: 850,
      jobId: "JOB-003",
    },
  },
  {
    id: "4",
    type: "system",
    title: "Weekly Earnings Report",
    message: "Your weekly earnings summary is ready to view",
    timestamp: "1 hour ago",
    read: true,
    urgent: false,
    actionRequired: false,
  },
  {
    id: "5",
    type: "job_request",
    title: "Job Request Expired",
    message: "Electrical outlet repair request has expired due to no response",
    timestamp: "2 hours ago",
    read: true,
    urgent: false,
    actionRequired: false,
    data: {
      jobId: "JOB-004",
    },
  },
  {
    id: "6",
    type: "emergency",
    title: "Safety Alert",
    message: "Weather advisory: Heavy rain expected in your service area",
    timestamp: "3 hours ago",
    read: false,
    urgent: true,
    actionRequired: false,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [notificationSettings, setNotificationSettings] = useState({
    newJobs: true,
    jobUpdates: true,
    payments: true,
    marketing: false,
    emergencies: true,
    sound: true,
    vibration: true,
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getIconForType = (type: Notification["type"]) => {
    switch (type) {
      case "job_request":
        return <Feather name="briefcase" size={20} color="#3B82F6" />;
      case "job_update":
        return <Feather name="refresh-cw" size={20} color="#3B82F6" />;
      case "payment":
        return <MaterialIcons name="attach-money" size={20} color="#16A34A" />;
      case "system":
        return <Feather name="info" size={20} color="#6B7280" />;
      case "emergency":
        return <MaterialIcons name="warning" size={20} color="#EF4444" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <Text className="text-lg font-bold">Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="p-12 items-center">
            <Feather name="check-circle" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 mt-4">All caught up!</Text>
            <Text className="text-gray-400 text-sm">
              No new notifications at this time.
            </Text>
          </View>
        }
        renderItem={({ item: notification }) => (
          <Card className="m-4 p-4 border-l-4 border-l-blue-500">
            <View className="flex-row items-start gap-3">
              <View className="mt-1">{getIconForType(notification.type)}</View>
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-gray-900 font-semibold">
                    {notification.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => dismissNotification(notification.id)}
                  >
                    <Feather name="x" size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                <Text className="text-gray-600 text-sm mb-2">
                  {notification.message}
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-500 text-xs">
                    {notification.timestamp}
                  </Text>
                  <View className="flex-row gap-2">
                    {notification.urgent && (
                      <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                    )}
                    {!notification.read && (
                      <TouchableOpacity
                        onPress={() => markAsRead(notification.id)}
                      >
                        <Badge className="bg-blue-100 text-blue-800">
                          Mark as Read
                        </Badge>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {(notification.data?.location || notification.data?.eta) && (
                  <View className="mt-2 space-y-1">
                    {notification.data.location && (
                      <View className="flex-row items-center gap-1 text-gray-600">
                        <Feather name="map-pin" size={12} color="#6B7280" />
                        <Text className="text-gray-600 text-sm">
                          {notification.data.location}
                        </Text>
                      </View>
                    )}
                    {notification.data.eta && (
                      <View className="flex-row items-center gap-1 text-blue-600">
                        <Feather name="clock" size={12} color="#3B82F6" />
                        <Text className="text-blue-600 text-sm">
                          ETA: {notification.data.eta}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                {notification.actionRequired &&
                  notification.type === "job_request" &&
                  !notification.read && (
                    <View className="flex-row gap-3 mt-3">
                      <Button variant="destructive" className="flex-1">
                        <Text className="text-white">Decline</Text>
                      </Button>
                      <Button className="flex-1 bg-green-600">
                        <Text className="text-white">Accept Job</Text>
                      </Button>
                    </View>
                  )}
              </View>
            </View>
          </Card>
        )}
      />
      <Card className="m-4 p-4">
        <Text className="text-gray-900 font-bold mb-4 flex-row items-center gap-2">
          <Feather name="settings" size={16} color="#1F2937" />
          Notification Settings
        </Text>
        <View className="space-y-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700 text-sm">New Job Requests</Text>
            <Switch
              value={notificationSettings.newJobs}
              onValueChange={(value) =>
                setNotificationSettings((prev) => ({ ...prev, newJobs: value }))
              }
            />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700 text-sm">Job Updates</Text>
            <Switch
              value={notificationSettings.jobUpdates}
              onValueChange={(value) =>
                setNotificationSettings((prev) => ({
                  ...prev,
                  jobUpdates: value,
                }))
              }
            />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700 text-sm">Payment Notifications</Text>
            <Switch
              value={notificationSettings.payments}
              onValueChange={(value) =>
                setNotificationSettings((prev) => ({
                  ...prev,
                  payments: value,
                }))
              }
            />
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-700 text-sm">Emergency Alerts</Text>
            <Switch
              value={notificationSettings.emergencies}
              onValueChange={(value) =>
                setNotificationSettings((prev) => ({
                  ...prev,
                  emergencies: value,
                }))
              }
            />
          </View>
        </View>
      </Card>
    </SafeAreaView>
  );
}
