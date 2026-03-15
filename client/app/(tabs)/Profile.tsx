import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [bookings] = useState([
    {
      id: 1,
      service: "Plumbing Repair",
      provider: "Michael Chen",
      date: "2025-03-20",
      status: "Completed",
      rating: 5,
    },
    {
      id: 2,
      service: "Electrical Installation",
      provider: "Sarah Johnson",
      date: "2025-03-15",
      status: "Completed",
      rating: 4,
    },
    {
      id: 3,
      service: "House Cleaning",
      provider: "Emily Williams",
      date: "2025-03-23",
      status: "Scheduled",
      rating: null,
    },
  ]);

  const renderBookingItem = ({ item }) => (
    <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
      <View className="flex-row justify-between items-start">
        <View>
          <Text className="font-medium text-gray-800">{item.service}</Text>
          <Text className="text-sm text-gray-600 mt-1">
            Provider: {item.provider}
          </Text>
          <Text className="text-sm text-gray-600">Date: {item.date}</Text>
        </View>
        <View className="items-end">
          <Text
            className={`text-sm px-2 py-1 rounded-full ${
              item.status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {item.status}
          </Text>
          {item.rating && (
            <View className="mt-2 flex-row items-center">
              <Text className="text-yellow-400 text-sm">★</Text>
              <Text className="ml-1 text-sm text-gray-600">{item.rating}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="w-full bg-white px-4 py-3 flex-row justify-between items-center z-50 shadow-sm">
        <Text className="text-xl font-semibold text-blue-600">QuickFix</Text>
        <TouchableOpacity>
          <Text className="text-xl text-gray-600">🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Content */}
      <FlatList
        className="px-4 pt-4"
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            {/* Profile Header */}
            <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <View className="flex-row items-center">
                <View className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    source={{
                      uri: "https://public.readdy.ai/ai/img_res/eed888df083ee5f28ae265d5466ee8a1.jpg",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="ml-4">
                  <Text className="text-xl font-semibold text-gray-800">
                    David Anderson
                  </Text>
                  <Text className="text-gray-600">
                    david.anderson@email.com
                  </Text>
                  <View className="mt-2 flex-row items-center">
                    <Text className="text-yellow-400">★</Text>
                    <Text className="ml-1 text-gray-600">4.8 (32 reviews)</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity className="mt-4 w-full py-2 border border-blue-600 rounded-lg items-center">
                <Text className="text-blue-600 font-medium">Edit Profile</Text>
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <View className="flex-row justify-between mb-6">
              <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2 items-center">
                <Text className="text-2xl font-semibold text-blue-600">12</Text>
                <Text className="text-sm text-gray-600 mt-1">
                  Total Bookings
                </Text>
              </View>
              <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mx-2 items-center">
                <Text className="text-2xl font-semibold text-green-600">8</Text>
                <Text className="text-sm text-gray-600 mt-1">Completed</Text>
              </View>
              <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2 items-center">
                <Text className="text-2xl font-semibold text-orange-600">
                  4
                </Text>
                <Text className="text-sm text-gray-600 mt-1">Upcoming</Text>
              </View>
            </View>

            {/* Booking History Header */}
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Booking History
            </Text>
          </>
        )}
        ListFooterComponent={() => (
          /* Settings Section */
          <View className="mt-6 bg-white rounded-xl shadow-sm mb-20">
            <View className="p-4 border-b border-gray-100">
              <Text className="text-xl font-semibold text-gray-800">
                Settings
              </Text>
            </View>
            <View className="divide-y divide-gray-100">
              <TouchableOpacity className="w-full px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-gray-400 w-6">🔔</Text>
                  <Text className="ml-3 text-gray-700">Notifications</Text>
                </View>
                <Text className="text-gray-400">➤</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-full px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-gray-400 w-6">🔒</Text>
                  <Text className="ml-3 text-gray-700">Privacy & Security</Text>
                </View>
                <Text className="text-gray-400">➤</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-full px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-gray-400 w-6">💳</Text>
                  <Text className="ml-3 text-gray-700">Payment Methods</Text>
                </View>
                <Text className="text-gray-400">➤</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-full px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-gray-400 w-6">❓</Text>
                  <Text className="ml-3 text-gray-700">Help & Support</Text>
                </View>
                <Text className="text-gray-400">➤</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-full px-4 py-3 flex-row items-center">
                <Text className="text-red-600 w-6">🚪</Text>
                <Text className="ml-3 text-red-600">Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-4 py-3 flex-row justify-between">
        <TouchableOpacity className="items-center">
          <Text className="text-xl text-gray-400">🏠</Text>
          <Text className="text-xs mt-1 text-gray-400">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Text className="text-xl text-gray-400">🛍️</Text>
          <Text className="text-xs mt-1 text-gray-400">Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Text className="text-xl text-gray-400">📅</Text>
          <Text className="text-xs mt-1 text-gray-400">Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Text className="text-xl text-blue-600">👤</Text>
          <Text className="text-xs mt-1 text-blue-600">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
