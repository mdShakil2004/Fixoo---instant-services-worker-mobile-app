// JobHistory.tsx
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
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
  status: "completed" | "cancelled" | "in-progress";
  priority: "high" | "medium" | "low";
  serviceTime: string;
  price: string;
  rating: number | null;
  imageUrl?: string;
}

interface JobHistoryProps {
  onJobSelect: (jobId: string) => void;
  onBack?: () => void;
}

const mockJobHistory: Job[] = [
  {
    id: "1",
    title: "Car Battery Replacement",
    description: "Replaced car battery for customer",
    customer: "Amit Sharma",
    address: "123 MG Road, Bangalore",
    date: "2025-10-20",
    status: "completed",
    priority: "high",
    serviceTime: "45 min",
    price: "₹1500",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: "2",
    title: "AC Unit Repair",
    description: "Fixed cooling issue in split AC",
    customer: "Priya Singh",
    address: "456 Koramangala, Bangalore",
    date: "2025-10-18",
    status: "completed",
    priority: "medium",
    serviceTime: "2 hours",
    price: "₹3000",
    rating: 4.8,
  },
  {
    id: "3",
    title: "Plumbing Leak Fix",
    description: "Cancelled due to customer unavailability",
    customer: "Rahul Verma",
    address: "789 Indiranagar, Bangalore",
    date: "2025-10-15",
    status: "cancelled",
    priority: "low",
    serviceTime: "0 min",
    price: "₹0",
    rating: null,
  },
];

export default function JobHistory({ onJobSelect, onBack }: JobHistoryProps) {
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");

  const filteredJobs = mockJobHistory.filter((job) => {
    const statusMatch = filterStatus ? job.status === filterStatus : true;
    const dateMatch = filterDate ? job.date.includes(filterDate) : true;
    return statusMatch && dateMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      case "in-progress":
        return "blue";
      default:
        return "gray";
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

  const earningsData = mockJobHistory
    .filter((job) => job.status === "completed")
    .reduce(
      (acc, job) => {
        const date = job.date;
        acc[date] =
          (acc[date] || 0) + parseFloat(job.price.replace("₹", "")) || 0;
        return acc;
      },
      {} as Record<string, number>
    );

  const completionData = mockJobHistory.reduce(
    (acc, job) => {
      const status = job.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const screenWidth = Dimensions.get("window").width - 32; // padding 16px on both sides

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {onBack && (
            <Button variant="ghost" size="sm" onPress={onBack}>
              <Feather name="arrow-left" size={20} color="#1F2937" />
            </Button>
          )}
          <Text className="text-lg font-bold">Job History</Text>
        </View>
        <Text className="text-gray-600 text-sm">
          {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
        </Text>
      </View>

      <ScrollView className="px-4 py-4">
        {/* Filters */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
            </Select>
          </View>
          <View className="flex-1">
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Date" />
              </SelectTrigger>
              <SelectItem value="">All Dates</SelectItem>
              {Array.from(new Set(mockJobHistory.map((job) => job.date))).map(
                (date) => (
                  <SelectItem key={date} value={date}>
                    {date}
                  </SelectItem>
                )
              )}
            </Select>
          </View>
        </View>

        {/* Charts */}
        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3">
            Performance Analytics
          </Text>
          <Text className="text-gray-800 font-semibold mb-2">
            Earnings Over Time
          </Text>
          <LineChart
            data={{
              labels: Object.keys(earningsData),
              datasets: [{ data: Object.values(earningsData) }],
            }}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#f9fafb",
              backgroundGradientTo: "#f9fafb",
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              strokeWidth: 2,
              decimalPlaces: 0,
            }}
            style={{ borderRadius: 8 }}
          />

          <Text className="text-gray-800 font-semibold mt-4 mb-2">
            Job Completion Status
          </Text>
          <PieChart
            data={[
              {
                name: "Completed",
                population: completionData.completed || 0,
                color: "#16A34A",
                legendFontColor: "#000",
                legendFontSize: 12,
              },
              {
                name: "Cancelled",
                population: completionData.cancelled || 0,
                color: "#EF4444",
                legendFontColor: "#000",
                legendFontSize: 12,
              },
              {
                name: "In Progress",
                population: completionData["in-progress"] || 0,
                color: "#3B82F6",
                legendFontColor: "#000",
                legendFontSize: 12,
              },
            ]}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#f9fafb",
              backgroundGradientTo: "#f9fafb",
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card>

        {/* Job List */}
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View className="p-4 items-center">
              <Text className="text-gray-600">
                No jobs found matching your filters.
              </Text>
            </View>
          }
          renderItem={({ item: job }) => (
            <Card
              className="m-2 p-4 border-l-4 border-l-blue-500"
              onPress={() => onJobSelect(job.id)}
            >
              <View className="flex-row justify-between mb-2">
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
                  variant="secondary"
                  className={getStatusColor(job.status)}
                >
                  {job.status.replace("-", " ")}
                </Badge>
              </View>

              <View className="flex-row justify-between text-sm text-gray-600 mb-1">
                <View className="flex-row items-center gap-1">
                  <Feather name="map-pin" size={12} color="#6B7280" />
                  <Text className="text-gray-600 text-xs">{job.address}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Feather name="calendar" size={12} color="#6B7280" />
                  <Text className="text-gray-600 text-xs">{job.date}</Text>
                </View>
              </View>

              <View className="flex-row justify-between text-sm text-gray-600 mb-1">
                <View className="flex-row items-center gap-1">
                  <Feather name="clock" size={12} color="#6B7280" />
                  <Text className="text-gray-600 text-xs">
                    {job.serviceTime}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <MaterialIcons
                    name="attach-money"
                    size={12}
                    color="#16A34A"
                  />
                  <Text className="text-green-600 text-xs">{job.price}</Text>
                </View>
              </View>

              {job.rating && (
                <View className="flex-row items-center gap-1 mb-1">
                  <Feather name="star" size={12} color="#F59E0B" />
                  <Text className="text-gray-600 text-xs">
                    {job.rating.toFixed(1)}
                  </Text>
                </View>
              )}

              {job.imageUrl && (
                <Image
                  source={{ uri: job.imageUrl }}
                  className="w-full h-32 rounded-lg mt-2"
                  resizeMode="cover"
                />
              )}
            </Card>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
