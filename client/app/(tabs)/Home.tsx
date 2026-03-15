import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Linking } from "react-native";
import MessagesScreen from "../(components)/MessagesScreen";
import { BlurView } from "expo-blur";
import { activeWorkers1 } from "../../assets/activeWorkers1";
const Home = () => {
  const router = useRouter(); // to route on deffer page
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const categories = [
    { id: 0, name: "All" },
    { id: 1, name: "Cleaner" },
    { id: 2, name: "Electrician" },
    { id: 3, name: "Normal Worker" },
    { id: 4, name: "Painter" },
    { id: 5, name: "Plumber" },
  ];

  const activeWorkers = [
    {
      id: 1,
      name: "Michael Anderson",
      profession: "Electrician",
      experience: 3,
      rating: 4.8,
      distance: "1.2 km",
      location: "789 Oak Street, Downtown",
      coordinates: { lat: 40.7128, lng: -74.006 },
      imageUrl:
        "https://public.readdy.ai/ai/img_res/566ae81d9440c8e1bf94678b4fbfd674.jpg",
    },
    {
      id: 2,
      name: "Sarah Williams",
      profession: "Plumber",
      experience: 4,
      rating: 4.9,
      distance: "0.8 km",
      location: "456 Pine Avenue, Midtown",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      imageUrl:
        "https://public.readdy.ai/ai/img_res/9de95e36697a2cd3458b1e631e5064af.jpg",
    },
    {
      id: 3,
      name: "David Thompson",
      profession: "Cleaner",
      rating: 4.7,
      experience: 7,
      distance: "2.5 km",
      location: "123 Maple Road, Uptown",
      coordinates: { lat: 40.7829, lng: -73.9654 },
      imageUrl:
        "https://public.readdy.ai/ai/img_res/3eb0e32f1d71f306c19ae0533b4ae172.jpg",
    },
    {
      id: 4,
      name: "James Wilson",
      rating: 4.9,
      reviews: 284,
      profession: "Electrician",
      experience: 8,
      distance: "2.5 km",
      location: "123 Maple Road, Uptown",
      coordinates: { lat: 40.7829, lng: -73.9654 },
      hourlyRate: 75,

      isOnline: true,
      isVerified: true,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/3ac567b0928e49d2a9baa0c1f04f9b46.jpg",
    },
    {
      id: 5,
      name: "Emily Rodriguez",
      rating: 4.8,
      reviews: 156,
      experience: 6,
      hourlyRate: 65,
      profession: "Electrician",

      distance: "2.5 km",
      location: "123 Maple Road, Uptown",
      coordinates: { lat: 40.7829, lng: -73.9654 },
      isOnline: true,
      isVerified: true,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/4008d556b4eb79dcfd00a9268623d0e7.jpg",
    },
    {
      id: 6,
      name: "Michael Chen",
      rating: 4.7,
      reviews: 198,
      experience: 10,
      hourlyRate: 85,
      profession: "Electrician",
      distance: "2.5 km",
      location: "123 Maple Road, Uptown",
      coordinates: { lat: 40.7829, lng: -73.9654 },
      isOnline: false,
      isVerified: true,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/1f93835304cb73030643f10791a85081.jpg",
    },
    {
      id: 7,
      name: "Robert Thompson",
      rating: 4.9,
      reviews: 312,
      experience: 12,
      hourlyRate: 90,
      profession: "Electrician",
      distance: "2.5 km",
      location: "123 Maple Road, Uptown",
      coordinates: { lat: 40.7829, lng: -73.9654 },
      isOnline: true,
      isVerified: true,
      imageUrl:
        "https://public.readdy.ai/ai/img_res/c1b41163699b61d59543661e67824963.jpg",
    },
  ];

  // Filter active workers based on selected category
  const filteredActiveWorkers =
    selectedCategory === "All" || !selectedCategory
      ? activeWorkers
      : activeWorkers.filter(
          (worker) =>
            worker.profession &&
            worker.profession.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <SafeAreaView className="flex-1 mb-20 bg-gray-50">
      {/* Header  */}
      <View className="w-full bg-white shadow-sm z-50">
        <View className="flex-row items-center justify-between px-4 h-14">
          <Text className="text-gray-600">☰</Text>
          <Text className="text-xl font-semibold text-blue-600">Fixoo</Text>
          <Text className="text-gray-600">🔔</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="relative ">
          <Image
            source={{
              uri: "https://public.readdy.ai/ai/img_res/50438b9324114339dc7cebe0b71794f8.jpg",
            }}
            className="w-full h-[155px] rounded-sm   mt-4"
            resizeMode="cover"
          />
          <BlurView
            intensity={60}
            tint="dark"
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,

              borderRadius: 10,
              overflow: "hidden",
            }}
            className="  p-1 "
          >
            <Text className="text-sm   font-bold text-white">
              Get instant help from verified professionals near you
            </Text>
          </BlurView>
        </View>

        {/* Service activeWorkers1 */}
        <View className="px-4 py-6 bg-white">
          <Text className="text-lg font-semibold mb-4">Services</Text>
          <FlatList
            horizontal
            data={activeWorkers1}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="items-center  w-[66px] mr-3"
                onPress={() => setSelectedCategory(item.name)}
              >
                <View className="w-12 h-12  rounded-full overflow-hidden mb-2">
                  {item.imageUrl === null ? (
                    <View className="w-11 h-11 rounded-full bg-blue-100/80 items-center justify-center ">
                      <Text className="text-blue-600 text-md">{item.icon}</Text>
                    </View>
                  ) : (
                    <Image
                      source={{ uri: item.imageUrl }}
                      className="w-full h-full "
                      resizeMode="cover"
                    />
                  )}
                </View>
                <Text className="text-xs text-gray-600 text-center">
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Quick Action */}
        <View className="px-4 py-6">
          <TouchableOpacity
            onPress={() => router.push("/ServicesProvide")}
            className="w-full bg-blue-600 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold text-center">
              Find Help Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* Service Process */}
        <View className="bg-white px-4 py-6">
          <Text className="text-lg font-semibold mb-4">How it works</Text>
          <View className="flex-row justify-between">
            {[
              { icon: "💬", text: "Share Your Problem" },
              { icon: "✅", text: "Get Matched" },
              { icon: "⏰", text: "Pay Per Hour" },
            ].map((step, index) => (
              <View key={index} className="items-center flex-1">
                <TouchableOpacity
                  onPress={() => {
                    if (step.text === "Share Your Problem") {
                      router.push("/ServicesProvide");
                    }
                  }}
                  className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2"
                >
                  <Text className="text-blue-600 text-xl">{step.icon}</Text>
                </TouchableOpacity>
                <Text className="text-sm text-gray-600 text-center">
                  {step.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Feature Selection */}
        <View className="bg-white px-4 py-6">
          <Text className="text-md font-semibold mb-4">
            {" "}
            Services Available near your location{" "}
          </Text>
          <FlatList
            horizontal
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`py-2 px-4 rounded-full mr-2 ${
                  selectedCategory === item.name ? "bg-blue-600" : "bg-gray-200"
                }`}
                onPress={() => setSelectedCategory(item.name)}
              >
                <Text
                  className={`text-sm ${
                    selectedCategory === item.name
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Filtered MessagesScreen */}
        <MessagesScreen selectedCategory={selectedCategory} />

        {/* Filtered Active Workers */}
        <View className="bg-white mt-2 px-4 py-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Available Now</Text>
            <Text className="text-sm text-blue-600">View All</Text>
          </View>
          <FlatList
            data={filteredActiveWorkers} // Updated to use filteredActiveWorkers
            renderItem={({ item }) => (
              <View className="flex-row items-center p-3 bg-gray-50 rounded-lg mb-4">
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
                <View className="ml-3 flex-1">
                  <Text className="font-medium">{item.name}</Text>
                  <Text className="text-sm text-gray-600">
                    {item.profession}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {item.experience} yr experience
                  </Text>

                  <View className="flex-row items-center mt-1">
                    <Text className="text-red-500 text-sm mr-1">📍</Text>
                    <Text className="text-xs text-gray-500">
                      {item.distance}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-yellow-400 mr-1">★</Text>
                    <Text className="text-sm font-medium">{item.rating}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedWorker(item.id);
                      setShowLocationModal(true);
                    }}
                  >
                    <Text className="text-blue-600 text-sm">📍 View Map</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>

      {/* Location Modal */}
      <Modal visible={showLocationModal} transparent animationType="fade">
        <View className="flex-1  bg-slate-900 bg-opacity-50 items-center justify-center">
          <View className="bg-white w-[90%] rounded-lg">
            <View className="p-4 border-b">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">Worker Location</Text>
                <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                  <Text className="text-gray-500">✕</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="p-4">
              {selectedWorker && (
                <>
                  <View className="flex-row items-start mb-4">
                    <Text className="text-red-500 text-lg mt-1 mr-3">📍</Text>
                    <View>
                      <Text className="font-medium">
                        {
                          activeWorkers.find((w) => w.id === selectedWorker)
                            ?.location
                        }
                      </Text>
                      <Text className="text-sm text-gray-500 mt-1">
                        Distance:{" "}
                        {
                          activeWorkers.find((w) => w.id === selectedWorker)
                            ?.distance
                        }
                      </Text>
                    </View>
                  </View>
                  <View className="bg-gray-100 h-48 rounded-lg items-center justify-center">
                    <Text className="text-gray-400 text-4xl mb-2">🗺️</Text>
                    <Text className="text-sm text-gray-500">
                      Map view placeholder
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="w-full mt-4 bg-blue-600 py-3 rounded-lg"
                    onPress={() => {
                      const worker = activeWorkers.find(
                        (w) => w.id === selectedWorker
                      );
                      if (worker) {
                        const mapsUrl = `https://www.google.com/maps?q=${worker.coordinates.lat},${worker.coordinates.lng}`;
                        Linking.openURL(mapsUrl);
                      }
                    }}
                  >
                    <Text className="text-white font-semibold  text-center">
                      🧭 Get Directions
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
