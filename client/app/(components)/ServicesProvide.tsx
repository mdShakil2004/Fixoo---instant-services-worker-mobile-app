import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { services } from "../../assets/Worker";
const ServicesProvide = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Electrician");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Service selection states
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedSpecifications, setSelectedSpecifications] = useState([]); // Changed to array
  const [searchQuery, setSearchQuery] = useState("");
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceSelect = (service) => {
    console.log("service", service);
    setSelectedService(service);
    setSelectedProvider(null);
    setSelectedSpecifications([]); // Reset to empty array when changing service
    setShowServiceDropdown(false);
    setSearchQuery("");
  };

  // New function to handle multiple specification selection
  const toggleSpecification = (spec) => {
    if (selectedSpecifications.includes(spec)) {
      setSelectedSpecifications(
        selectedSpecifications.filter((item) => item !== spec)
      );
    } else {
      setSelectedSpecifications([...selectedSpecifications, spec]);
    }
  };

  const handlePhotoUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos(
        [...photos, ...result.assets.map((asset) => asset.uri)].slice(0, 4)
      );
    }
  };

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }
    if (!mobileNumber.trim()) {
      Alert.alert("Error", "Please enter your mobile number");
      return;
    }
    if (mobileNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid mobile number");
      return;
    }
    if (!selectedService) {
      Alert.alert("Error", "Please select a service");
      return;
    }
    if (selectedSpecifications.length === 0) {
      Alert.alert("Error", "Please select at least one specification");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location permission is required to use this feature.");
      setIsGettingLocation(false);
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
      if (reverseGeocode.length > 0) {
        let { street, city, region, postalCode } = reverseGeocode[0];
        setAddress(`${street}, ${city}, ${region} ${postalCode}`);
      }
    } catch (error) {
      Alert.alert("Unable to get your location");
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="py-4  flex-row border-b z-10 border-gray-200">
        <TouchableOpacity
          className="w-8 ml-2 h-8 border border-gray-700 rounded-full flex justify-center items-center"
          onPress={() => router.push("/Home")}
        >
          <FontAwesome name="arrow-left" size={16} color="#6b7280" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-center flex-1">
          Book a Service
        </Text>
      </View>
      <ScrollView className="px-4 flex-1 pb-32 mb-20">
        {/* Service Selection */}
        <View className="mt-6">
          <Text className="text-sm font-medium mb-2">
            Select Service Type *
          </Text>
          <TouchableOpacity
            className="border border-gray-300 p-3  rounded-lg flex-row items-center justify-between"
            onPress={() => setShowServiceDropdown(!showServiceDropdown)}
          >
            <Text className={selectedService ? "text-black " : "text-gray-400"}>
              {selectedService?.name || "Select a service"}
            </Text>
            <FontAwesome
              name={showServiceDropdown ? "chevron-up" : "chevron-down"}
              size={16}
              color="#6b7280"
            />
          </TouchableOpacity>

          {showServiceDropdown && (
            <ScrollView className="mt-2 border border-gray-200  rounded-lg bg-slate-200 ">
              <TextInput
                className="p-2 border-b  border-gray-800"
                placeholder="Search services..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <FlatList
                data={filteredServices}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="p-3 border-b  border-gray-200 flex-row items-center w-1/2"
                    onPress={() => handleServiceSelect(item)}
                  >
                    <FontAwesome
                      name={item.icon}
                      size={16}
                      color="#3b82f6"
                      className="mr-2"
                    />
                    <Text className="text-sm">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          )}

          {selectedService && (
            <>
              <Text className="text-sm font-medium mt-4 mb-2">
                Select Provider
              </Text>
              <FlatList
                horizontal
                data={selectedService.providers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={`p-2 mr-2 rounded-lg ${
                      selectedProvider?.id === item.id
                        ? "bg-blue-600"
                        : "bg-gray-100"
                    }`}
                    onPress={() => setSelectedProvider(item)}
                  >
                    <Text
                      className={`text-sm ${
                        selectedProvider?.id === item.id
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              <Text className="text-sm font-medium mt-4 mb-2">
                Select Specifications * (Select all that apply)
              </Text>
              <View className="flex-row flex-wrap">
                {selectedService.specifications.map((spec) => (
                  <TouchableOpacity
                    key={spec}
                    className={`p-2 m-1 rounded-lg flex-row items-center ${
                      selectedSpecifications.includes(spec)
                        ? "bg-blue-600"
                        : "bg-gray-100"
                    }`}
                    onPress={() => toggleSpecification(spec)}
                  >
                    <Text
                      className={`text-sm mr-1 ${
                        selectedSpecifications.includes(spec)
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {spec}
                    </Text>
                    {selectedSpecifications.includes(spec) && (
                      <FontAwesome name="check" size={12} color="white" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Describe Your Need Section (Updated) */}
        <Text className="text-sm font-medium mt-6">Describe Your Need</Text>
        <TextInput
          className="border border-gray-200 p-3 rounded-lg mt-2 h-24 text-sm"
          placeholder="Please describe your service need in detail..."
          value={description}
          onChangeText={setDescription}
          multiline
          maxLength={500}
          style={{ textAlignVertical: "top" }}
        />

        {/* Display Uploaded Photos (New Section) */}
        {photos.length > 0 && (
          <ScrollView horizontal className="mt-2">
            <View className="flex-row">
              {photos.map((photo, index) => (
                <View key={index} className="relative mr-2">
                  <Image
                    source={{ uri: photo }}
                    className="w-20 h-20 rounded-lg"
                  />
                  <TouchableOpacity
                    className="absolute top-1 right-1 bg-gray-800 rounded-full p-1"
                    onPress={() => {
                      setPhotos(photos.filter((_, i) => i !== index));
                    }}
                  >
                    <FontAwesome name="times" size={12} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Character Count & Add Photo Button (Existing) */}
        <View className="flex-row justify-between mt-1">
          <Text className="text-xs text-gray-500">
            {description.length}/500 characters
          </Text>
          <TouchableOpacity
            onPress={handlePhotoUpload}
            className="flex-row items-center"
          >
            <FontAwesome name="camera" size={12} color="#6b7280" />
            <Text className="text-xs text-gray-500 ml-1">
              Add Photos ({photos.length}/4)
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-medium">
              {isUrgent ? "Service Needed Instantly" : "Preferred Time "}
            </Text>
            <TouchableOpacity
              onPress={() => setIsUrgent(!isUrgent)}
              className="flex-row items-center"
            >
              <View
                className={`w-4 h-4 rounded-sm border ${
                  isUrgent ? "bg-red-500 border-red-500" : "border-gray-400"
                } mr-2 justify-center items-center`}
              >
                {isUrgent && (
                  <FontAwesome name="check" size={10} color="white" />
                )}
              </View>
              <Text className="text-sm text-red-500">Urgent/ASAP</Text>
            </TouchableOpacity>
          </View>

          {!isUrgent && (
            <>
              <TextInput
                className="w-full p-3 border border-gray-200 rounded-lg text-sm mb-3"
                value={selectedDate}
                onChangeText={setSelectedDate}
                placeholder="Select date (YYYY-MM-DD)"
              />
              <View className="flex-row flex-wrap">
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    onPress={() => setSelectedTime(time)}
                    className={`p-2 m-1 rounded-lg ${
                      selectedTime === time ? "bg-blue-600" : "bg-gray-100"
                    }`}
                    style={{ width: "22%" }}
                  >
                    <Text
                      className={`text-xs text-center ${
                        selectedTime === time ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>

        <Text className="text-sm font-medium mt-4">Full Name *</Text>
        <TextInput
          className="border border-gray-200 p-3 rounded-lg mt-2 text-sm"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text className="text-sm font-medium mt-4">Mobile Number *</Text>
        <TextInput
          className="border border-gray-200 p-3 rounded-lg mt-2 text-sm"
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
          maxLength={15}
        />

        <View className="mt-6">
          <Text className="text-sm font-medium mb-2">Service Location</Text>
          <View className="relative">
            <TextInput
              className="border border-gray-200 p-3 pl-10 rounded-lg text-sm"
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
            />
            <FontAwesome
              name="map-marker"
              size={16}
              color="#9ca3af"
              style={{ position: "absolute", left: 12, top: 14 }}
            />
          </View>
          <TouchableOpacity
            onPress={getCurrentLocation}
            className="mt-2 flex-row items-center"
            disabled={isGettingLocation}
          >
            {isGettingLocation ? (
              <FontAwesome name="spinner" size={14} color="#3b82f6" />
            ) : (
              <FontAwesome name="location-arrow" size={14} color="#3b82f6" />
            )}
            <Text className="text-sm text-blue-600 ml-1">
              {isGettingLocation
                ? "Getting location..."
                : "Use Current Location"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 mb-12 bg-blue-50 p-4 rounded-lg">
          <View className="flex-row items-center">
            <FontAwesome name="info-circle" size={16} color="#3b82f6" />
            <Text className="ml-3 text-sm text-gray-600 flex-1">
              Final service cost will be determined based on the specific
              requirements and duration of the service.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <TouchableOpacity
          className="w-full bg-blue-600 py-3 rounded-lg justify-center items-center"
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Submit Request</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ServicesProvide;
