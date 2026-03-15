// JobDetails.tsx
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";

interface Job {
  id: string;
  title: string;
  description: string;
  customer: string;
  address: string;
  date: string;
  status: "pending" | "accepted" | "in-progress" | "completed" | "cancelled";
  priority: "high" | "medium" | "low";
  serviceTime: string;
  price: string;
  rating: number | null;
  imageUrl?: string;
  customerPhone: string;
  customerEmail: string;
  jobNotes: string;
  serviceCategory: string;
  estimatedTime: string;
  materialsRequired: string[];
  jobLocation: {
    latitude: number;
    longitude: number;
  };
}

interface JobDetailsProps {
  job: Job | null;
  onBack: () => void;
  onStartNavigation: () => void;
  onCompleteJob: () => void;
  onReportIssue: () => void;
}

const mockJob: Job = {
  id: "1",
  title: "Car Battery Replacement",
  description: "Replace car battery for customer vehicle",
  customer: "Amit Sharma",
  address: "123 MG Road, Bangalore",
  date: "2025-10-20",
  status: "accepted",
  priority: "high",
  serviceTime: "45 min",
  price: "₹1500",
  rating: 4.5,
  imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  customerPhone: "+91 98765 43210",
  customerEmail: "amit.sharma@example.com",
  jobNotes: "Customer reports car not starting. Battery model: XYZ-123.",
  serviceCategory: "Automotive",
  estimatedTime: "30-60 min",
  materialsRequired: ["Car Battery (XYZ-123)", "Wrench", "Gloves"],
  jobLocation: {
    latitude: 12.9716,
    longitude: 77.5946,
  },
};

export default function JobDetails({
  job = mockJob,
  onBack,
  onStartNavigation,
  onCompleteJob,
  onReportIssue,
}: JobDetailsProps) {
  const [jobStatus, setJobStatus] = useState(job?.status || "accepted");

  if (!job) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">No job data available.</Text>
        <Button variant="outline" onPress={onBack} className="mt-4">
          Go Back
        </Button>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
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
        return <Feather name="check-circle" size={16} color="#16A34A" />;
      default:
        return null;
    }
  };

  const handleStatusChange = (value: string) => {
    setJobStatus(value as Job["status"]);
    if (value === "completed") {
      onCompleteJob();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Button variant="ghost" size="sm" onPress={onBack}>
              <Feather name="arrow-left" size={20} color="#1F2937" />
            </Button>
            <Text className="text-lg font-bold">{job.title}</Text>
          </View>
          <Badge className={getStatusColor(jobStatus)} variant="secondary">
            {jobStatus.replace("-", " ")}
          </Badge>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
            <Feather name="info" size={20} color="#1F2937" />
            Job Details
          </Text>
          <View className="space-y-2">
            <View className="flex-row items-center gap-2">
              <Feather name="user" size={16} color="#6B7280" />
              <Text className="text-gray-600">{job.customer}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Feather name="map-pin" size={16} color="#6B7280" />
              <Text className="text-gray-600">{job.address}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Feather name="calendar" size={16} color="#6B7280" />
              <Text className="text-gray-600">{job.date}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Feather name="clock" size={16} color="#6B7280" />
              <Text className="text-gray-600">
                Estimated: {job.estimatedTime}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="attach-money" size={16} color="#16A34A" />
              <Text className="text-green-600">{job.price}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              {getPriorityIcon(job.priority)}
              <Text className="text-gray-600">Priority: {job.priority}</Text>
            </View>
          </View>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
            <Feather name="user" size={20} color="#1F2937" />
            Customer Information
          </Text>
          <View className="flex-row items-center gap-3 mb-3">
            <Avatar>{job.customer.charAt(0)}</Avatar>
            <View>
              <Text className="text-gray-900">{job.customer}</Text>
              <Text className="text-gray-600 text-sm">{job.customerEmail}</Text>
              <Text className="text-gray-600 text-sm">{job.customerPhone}</Text>
            </View>
          </View>
          <Button variant="outline" size="sm" className="w-full">
            <Feather name="phone" size={16} color="#1F2937" />
            Contact Customer
          </Button>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
            <Feather name="file-text" size={20} color="#1F2937" />
            Job Notes
          </Text>
          <Text className="text-gray-600">{job.jobNotes}</Text>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
            <Feather name="tool" size={20} color="#1F2937" />
            Materials Required
          </Text>
          <View className="space-y-2">
            {job.materialsRequired.map((material, index) => (
              <View key={index} className="flex-row items-center gap-2">
                <Feather name="check-circle" size={16} color="#16A34A" />
                <Text className="text-gray-600">{material}</Text>
              </View>
            ))}
          </View>
        </Card>

        {job.imageUrl && (
          <Card className="p-4 mb-4">
            <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
              <Feather name="image" size={20} color="#1F2937" />
              Job Image
            </Text>
            <Image
              source={{ uri: job.imageUrl }}
              className="w-full h-48 rounded-lg"
              resizeMode="cover"
            />
          </Card>
        )}

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
            <Feather name="settings" size={20} color="#1F2937" />
            Update Job Status
          </Text>
          <Select value={jobStatus} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Job Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </Card>
      </ScrollView>

      <View className="bg-white border-t border-gray-200 p-4">
        <View className="flex-row gap-3">
          <Button
            className="flex-1 bg-blue-600"
            onPress={onStartNavigation}
            disabled={jobStatus === "completed" || jobStatus === "cancelled"}
          >
            <Feather name="navigation" size={16} color="#FFFFFF" />
            Start Navigation
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onPress={onReportIssue}
            disabled={jobStatus === "completed" || jobStatus === "cancelled"}
          >
            <Feather name="alert-circle" size={16} color="#FFFFFF" />
            Report Issue
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
