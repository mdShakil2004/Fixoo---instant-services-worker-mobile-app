// ProfileScreen.tsx
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/Select";
import { Switch } from "./ui/Switch";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceCategory: string;
  experience: string;
  profileImage?: string;
  availability: boolean;
  notificationsEnabled: boolean;
}

interface ProfileScreenProps {
  onEditProfile?: () => void;
  onLogout: () => void;
}

const mockUserProfile: UserProfile = {
  id: "1",
  fullName: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+91 98765 43210",
  serviceCategory: "Automotive",
  experience: "5-10 years",
  profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  availability: true,
  notificationsEnabled: true,
};

const serviceCategories = [
  "Plumbing",
  "Electrical",
  "HVAC/AC Repair",
  "Car/Bike Repair",
  "Appliance Repair",
  "Cleaning Services",
  "Carpentry",
  "Painting",
  "Other",
];

export default function ProfileScreen({
  onEditProfile,
  onLogout,
}: ProfileScreenProps) {
  const [user, setUser] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof UserProfile,
    value: string | boolean
  ) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    if (!user.fullName || !user.email || !user.phone || !user.serviceCategory) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    setIsEditing(false);
    console.log("Profile saved:", user);
    if (onEditProfile) onEditProfile();
  };

  const handleCancelEdit = () => {
    setUser(mockUserProfile);
    setIsEditing(false);
    setError(null);
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">No profile data available.</Text>
        <Button variant="outline" onPress={onLogout} className="mt-4">
          Log Out
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold">My Profile</Text>
          <Button variant="ghost" size="sm" onPress={onLogout}>
            <Feather name="log-out" size={20} color="#EF4444" />
          </Button>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        <Card className="p-4 mb-4 items-center">
          <View className="relative mb-3">
            <Avatar className="w-24 h-24">
              {user.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-2xl text-blue-700">
                  {user.fullName.charAt(0)}
                </Text>
              )}
            </Avatar>
            {user.availability && (
              <View className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
            )}
          </View>
          <Text className="text-gray-900 font-bold text-lg">
            {user.fullName}
          </Text>
          <Text className="text-gray-600 text-sm">{user.serviceCategory}</Text>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onPress={() => setIsEditing(!isEditing)}
          >
            <Feather
              name={isEditing ? "x" : "edit"}
              size={16}
              color="#1F2937"
            />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
            <Feather name="user" size={20} color="#1F2937" />
            Personal Information
          </Text>
          <View className="space-y-4">
            <View>
              <Label>Full Name *</Label>
              <Input
                value={user.fullName}
                onChangeText={(value) => handleInputChange("fullName", value)}
                placeholder="Enter your full name"
                className="mt-1"
                editable={isEditing}
              />
            </View>
            <View>
              <Label>Email *</Label>
              <Input
                value={user.email}
                onChangeText={(value) => handleInputChange("email", value)}
                placeholder="Enter your email"
                keyboardType="email-address"
                className="mt-1"
                editable={isEditing}
              />
            </View>
            <View>
              <Label>Phone Number *</Label>
              <Input
                value={user.phone}
                onChangeText={(value) => handleInputChange("phone", value)}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                className="mt-1"
                editable={isEditing}
              />
            </View>
          </View>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
            <Feather name="briefcase" size={20} color="#1F2937" />
            Professional Details
          </Text>
          <View className="space-y-4">
            <View>
              <Label>Service Category *</Label>
              {isEditing ? (
                <Select
                  value={user.serviceCategory}
                  onValueChange={(value) =>
                    handleInputChange("serviceCategory", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Text className="text-gray-600 mt-1">
                  {user.serviceCategory}
                </Text>
              )}
            </View>
            <View>
              <Label>Years of Experience</Label>
              {isEditing ? (
                <Select
                  value={user.experience}
                  onValueChange={(value) =>
                    handleInputChange("experience", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Text className="text-gray-600 mt-1">{user.experience}</Text>
              )}
            </View>
          </View>
        </Card>

        <Card className="p-4 mb-4">
          <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
            <Feather name="settings" size={20} color="#1F2937" />
            Settings
          </Text>
          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Feather name="bell" size={16} color="#6B7280" />
                <Text className="text-gray-600">Notifications</Text>
              </View>
              <Switch
                value={user.notificationsEnabled}
                onValueChange={(value) =>
                  handleInputChange("notificationsEnabled", value)
                }
              />
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Feather name="clock" size={16} color="#6B7280" />
                <Text className="text-gray-600">Availability</Text>
              </View>
              <Switch
                value={user.availability}
                onValueChange={(value) =>
                  handleInputChange("availability", value)
                }
              />
            </View>
          </View>
        </Card>

        {isEditing && (
          <View className="flex-row gap-3 mb-4">
            <Button
              variant="outline"
              className="flex-1"
              onPress={handleCancelEdit}
            >
              Cancel
            </Button>
            <Button className="flex-1 bg-green-600" onPress={handleSaveProfile}>
              Save Profile
            </Button>
          </View>
        )}

        {error && (
          <Card className="p-4 mb-4 bg-red-50 border border-red-200">
            <Text className="text-red-600">{error}</Text>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
