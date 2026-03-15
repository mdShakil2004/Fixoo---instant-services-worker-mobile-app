import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Audio } from "expo-av";

interface ServiceRequest {
  id: string;
  service: string;
  specifications: string[];
  description: string;
  userName: string;
  userMobile: string;
  userAddress: string;
  coordinates: { lat: number; lng: number };
  status: "pending" | "accepted" | "in_progress" | "completed";
  timestamp: string;
  photoUris?: string[];
}

interface Message {
  id: string;
  text: string;
  sender: "worker" | "user";
  timestamp: string;
  status: "sent" | "delivered";
}

const Worker = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: "1",
      service: "House Cleaning",
      specifications: ["Deep Cleaning", "Kitchen"],
      description: "Need urgent cleaning for kitchen and living room",
      userName: "John Doe",
      userMobile: "+1234567890",
      userAddress: "123 Main Street, Downtown",
      coordinates: { lat: 40.7128, lng: -74.006 },
      status: "pending",
      timestamp: "2025-05-02 10:30 AM",
      photoUris: [
        "https://public.readdy.ai/ai/img_res/2c9d2102535d98123c0e7f217e82e938.jpg",
      ],
    },
  ]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null
  );
  const [workerLocation, setWorkerLocation] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    address: "Oak Street",
    distance: "2.3 km",
    eta: "12 mins",
    progress: 40,
  });
  const [showMessages, setShowMessages] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi, I’m on my way!",
      sender: "worker",
      timestamp: "1:45 PM",
      status: "sent",
    },
    {
      id: "2",
      text: "Great, thanks for the update!",
      sender: "user",
      timestamp: "1:46 PM",
      status: "delivered",
    },
  ]);
  const [notification, setNotification] = useState<ServiceRequest | null>(null);
  const notificationAnim = useRef(new Animated.Value(-100)).current;
  const flatListRef = useRef<FlatList>(null);
  const mapRef = useRef<MapView>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Load and unload sound
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/music/notification-alert.mp3") // Local asset
      );
      setSound(sound);
    };
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Simulate receiving new service requests, show notification, and play sound
  useEffect(() => {
    const interval = setInterval(async () => {
      const newRequest: ServiceRequest = {
        id: Date.now().toString(),
        service: ["Plumbing", "Electrical", "Cleaning"][
          Math.floor(Math.random() * 3)
        ],
        specifications: ["Emergency", "Installation"],
        description: "New service request",
        userName: "Jane Smith",
        userMobile: "+1987654321",
        userAddress: "456 Oak Avenue, Midtown",
        coordinates: { lat: 40.7589, lng: -73.9851 },
        status: "pending",
        timestamp: new Date().toLocaleString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setRequests((prev) => [...prev, newRequest]);
      setNotification(newRequest);
      Animated.timing(notificationAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      // Play ring sound
      if (sound) {
        await sound.replayAsync();
      }
    }, 30000); // New request every 30 seconds for demo
    return () => clearInterval(interval);
  }, [sound]);

  // Simulate worker location updates after accepting
  useEffect(() => {
    if (selectedRequest && selectedRequest.status !== "pending") {
      const locationInterval = setInterval(() => {
        setWorkerLocation((prev) => ({
          ...prev,
          distance: `${(parseFloat(prev.distance) - 0.1).toFixed(1)} km`,
          eta: `${Math.max(1, parseInt(prev.eta) - 1)} mins`,
          progress: Math.min(100, prev.progress + 2),
        }));
      }, 10000);
      return () => clearInterval(locationInterval);
    }
  }, [selectedRequest]);

  const handleAcceptRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "accepted" } : req
      )
    );
    const request = requests.find((req) => req.id === requestId);
    if (request) {
      setSelectedRequest({ ...request, status: "accepted" });
      setNotification(null);
      Animated.timing(notificationAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Alert.alert("Success", "Service request accepted!");
      // Update map to show user's location
      mapRef.current?.animateToRegion({
        latitude: request.coordinates.lat,
        longitude: request.coordinates.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleStartService = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "in_progress" } : req
      )
    );
    setSelectedRequest((prev) =>
      prev ? { ...prev, status: "in_progress" } : prev
    );
  };

  const handleCompleteService = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "completed" } : req
      )
    );
    setSelectedRequest(null);
    setShowMessages(false);
    Alert.alert("Success", "Service marked as completed!");
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageInput,
      sender: "worker",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    setTimeout(() => {
      const userResponses = [
        "Thanks for the update!",
        "Great, see you soon!",
        "Any specific instructions?",
        "Looking forward to it!",
      ];
      const randomResponse =
        userResponses[Math.floor(Math.random() * userResponses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "delivered",
        },
      ]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);
  };

  const dismissNotification = async () => {
    Animated.timing(notificationAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setNotification(null));
  };

  const renderRequestItem = ({ item }: { item: ServiceRequest }) => (
    <TouchableOpacity
      onPress={() => setSelectedRequest(item)}
      className="bg-white rounded-xl shadow-sm p-4 mb-4"
    >
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="font-medium text-gray-800">{item.service}</Text>
          <Text className="text-sm text-gray-600">{item.userName}</Text>
          <Text className="text-sm text-gray-600">{item.userAddress}</Text>
          <Text className="text-xs text-gray-500 mt-1">{item.timestamp}</Text>
        </View>
        <Text
          className={`px-2 py-1 text-sm rounded-full ${
            item.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : item.status === "accepted"
              ? "bg-blue-100 text-blue-700"
              : item.status === "in_progress"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }: { item: Message }) => (
    <View
      className={`mb-4 ${
        item.sender === "worker" ? "items-end" : "items-start"
      }`}
    >
      <View
        className={`max-w-[70%] p-3 rounded-lg ${
          item.sender === "worker"
            ? "bg-blue-600 text-white"
            : "bg-gray-400 text-gray-800"
        }`}
      >
        <Text>{item.text}</Text>
        <View className="flex-row justify-between items-center mt-1">
          <Text
            className={`text-xs ${
              item.sender === "worker" ? "text-blue-200" : "text-gray-500"
            }`}
          >
            {item.timestamp}
          </Text>
          {item.sender === "worker" && (
            <Text
              className={`text-xs ml-2 ${
                item.sender === "worker" ? "text-blue-200" : "text-gray-500"
              }`}
            >
              {item.status === "sent" ? "✓" : "✓✓"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="w-full bg-slate-300 px-4 py-3 shadow-sm">
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-semibold text-blue-600">
            Worker Dashboard
          </Text>
          <TouchableOpacity>
            <Text className="text-xl text-gray-600">🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification */}
      {notification && (
        <Animated.View
          style={{ transform: [{ translateY: notificationAnim }] }}
          className="absolute top-0 left-0 right-0 bg-white p-4 shadow-md z-10"
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-medium text-gray-800">
                New Request: {notification.service}
              </Text>
              <Text className="text-sm text-gray-600">
                {notification.userName}
              </Text>
              <Text className="text-sm text-gray-600">
                {notification.userAddress}
              </Text>
            </View>
            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={() => handleAcceptRequest(notification.id)}
                className="px-3 py-1 bg-blue-600 rounded-lg"
              >
                <Text className="text-white text-sm">Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={dismissNotification}
                className="px-3 py-1 bg-gray-200 rounded-lg"
              >
                <Text className="text-gray-600 text-sm">Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}

      {!selectedRequest ? (
        <View className="flex-1 px-4 pt-4">
          {/* Default Map */}
          <View className="rounded-lg overflow-hidden mb-4">
            <View className="relative w-full h-80 bg-gray-100">
              <MapView
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                initialRegion={{
                  latitude: workerLocation.latitude,
                  longitude: workerLocation.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: workerLocation.latitude,
                    longitude: workerLocation.longitude,
                  }}
                  title="Your Location"
                  description={workerLocation.address}
                />
                {selectedRequest && (
                  <Marker
                    coordinate={{
                      latitude: selectedRequest.coordinates.lat,
                      longitude: selectedRequest.coordinates.lng,
                    }}
                    title={selectedRequest.userName}
                    description={selectedRequest.userAddress}
                    pinColor="blue"
                  />
                )}
              </MapView>
              {selectedRequest && (
                <>
                  <View className="absolute top-2 right-2 bg-white rounded-lg shadow-md p-2">
                    <Text className="text-xs text-gray-600">
                      Estimated arrival in
                    </Text>
                    <Text className="text-sm font-medium text-blue-600">
                      {workerLocation.eta}
                    </Text>
                  </View>
                  <View className="absolute bottom-2 left-2 bg-white rounded-lg shadow-md p-2 flex-row items-center">
                    <Text className="text-blue-600 mr-2">📍</Text>
                    <View>
                      <Text className="text-xs text-gray-600">
                        User location
                      </Text>
                      <Text className="text-sm font-medium">
                        {selectedRequest.userAddress}, {workerLocation.distance}{" "}
                        away
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>

          <FlatList
            data={requests}
            renderItem={renderRequestItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListHeaderComponent={() => (
              <Text className="text-xl font-semibold text-gray-800 mb-4">
                Service Requests
              </Text>
            )}
          />
        </View>
      ) : !showMessages ? (
        <View className="flex-1 px-4 pt-4">
          <TouchableOpacity
            onPress={() => setSelectedRequest(null)}
            className="flex-row items-center mb-4"
          >
            <FontAwesome name="arrow-left" size={16} color="#6b7280" />
            <Text className="text-blue-600 ml-2">Back to Dashboard</Text>
          </TouchableOpacity>

          <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <View className="flex-row items-start justify-between">
              <View className="flex-row items-start">
                <Image
                  source={{
                    uri: "https://public.readdy.ai/ai/img_res/e120dfc58909d92361800d060df04fc1.jpg",
                  }}
                  className="w-12 h-12 rounded-full"
                  resizeMode="cover"
                />
                <View className="ml-3">
                  <Text className="font-medium text-gray-800">
                    {selectedRequest.service}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {selectedRequest.userName}
                  </Text>
                  <View className="mt-2 flex-row items-center text-sm text-gray-600">
                    <Text className="mr-2">📍</Text>
                    <Text>{selectedRequest.userAddress}</Text>
                  </View>
                </View>
              </View>
              <Text
                className={`px-2 py-1 text-sm rounded-full ${
                  selectedRequest.status === "accepted"
                    ? "bg-blue-100 text-blue-700"
                    : selectedRequest.status === "in_progress"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {selectedRequest.status.charAt(0).toUpperCase() +
                  selectedRequest.status.slice(1)}
              </Text>
            </View>

            <Text className="text-sm text-gray-600 mt-2">Specifications:</Text>
            {selectedRequest.specifications.map((spec, index) => (
              <Text key={index} className="text-sm text-gray-600 ml-2">
                • {spec}
              </Text>
            ))}
            <Text className="text-sm text-gray-600 mt-2">Description:</Text>
            <Text className="text-sm text-gray-600">
              {selectedRequest.description}
            </Text>

            {selectedRequest.photoUris &&
              selectedRequest.photoUris.length > 0 && (
                <View className="mt-4">
                  <Text className="text-sm text-gray-600 mb-2">
                    Attached Photos:
                  </Text>
                  <FlatList
                    horizontal
                    data={selectedRequest.photoUris}
                    renderItem={({ item }) => (
                      <Image
                        source={{ uri: item }}
                        className="w-20 h-20 rounded-lg mr-2"
                      />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}

            {(selectedRequest.status === "accepted" ||
              selectedRequest.status === "in_progress") && (
              <View className="mt-4 rounded-lg overflow-hidden">
                <View className="relative w-full h-72 bg-gray-100">
                  <MapView
                    ref={mapRef}
                    style={{ width: "100%", height: "100%" }}
                    initialRegion={{
                      latitude: selectedRequest.coordinates.lat,
                      longitude: selectedRequest.coordinates.lng,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: selectedRequest.coordinates.lat,
                        longitude: selectedRequest.coordinates.lng,
                      }}
                      title={selectedRequest.userName}
                      description={selectedRequest.userAddress}
                    />
                    <Marker
                      coordinate={{
                        latitude: workerLocation.latitude,
                        longitude: workerLocation.longitude,
                      }}
                      title="Your Location"
                      description={workerLocation.address}
                      pinColor="green"
                    />
                  </MapView>
                  <View className="absolute top-2 right-2 bg-white rounded-lg shadow-md p-2">
                    <Text className="text-xs text-gray-600">
                      Estimated arrival in
                    </Text>
                    <Text className="text-sm font-medium text-blue-600">
                      {workerLocation.eta}
                    </Text>
                  </View>
                  <View className="absolute bottom-2 left-2 bg-white rounded-lg shadow-md p-2 flex-row items-center">
                    <Text className="text-blue-600 mr-2">📍</Text>
                    <View>
                      <Text className="text-xs text-gray-600">
                        User location
                      </Text>
                      <Text className="text-sm font-medium">
                        {selectedRequest.userAddress}, {workerLocation.distance}{" "}
                        away
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View className="mt-4 flex-row space-x-3">
              {(selectedRequest.status === "accepted" ||
                selectedRequest.status === "in_progress") && (
                <TouchableOpacity
                  onPress={() => {
                    const mapsUrl = `https://www.google.com/maps?q=${selectedRequest.coordinates.lat},${selectedRequest.coordinates.lng}`;
                    Linking.openURL(mapsUrl);
                  }}
                  className="flex-1 py-2 bg-blue-600 rounded-lg items-center"
                >
                  <Text className="text-white font-medium">
                    🧭 Get Directions
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => setShowMessages(true)}
                className="flex-1 py-2 border border-gray-300 rounded-lg items-center"
              >
                <Text className="text-gray-700 font-medium">💬 Message</Text>
              </TouchableOpacity>
            </View>

            {(selectedRequest.status === "accepted" ||
              selectedRequest.status === "in_progress") && (
              <View className="mt-4 pt-4 border-t border-gray-100">
                <View className="flex-row items-center justify-between text-sm">
                  <View className="flex-row items-center">
                    <Text className="text-blue-600 mr-2">⏰</Text>
                    <Text>Service Progress</Text>
                    <Text className="text-blue-600">
                      {workerLocation.progress}%
                    </Text>
                  </View>
                </View>
                <View className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${workerLocation.progress}%` }}
                  />
                </View>
                <View className="mt-3 flex-row justify-between">
                  <View className="items-center">
                    <View className="w-8 h-8 rounded-full bg-green-100 text-green-600 items-center justify-center">
                      <Text className="text-sm">✓</Text>
                    </View>
                    <Text className="mt-1 text-xs text-gray-600">Accepted</Text>
                  </View>
                  <View className="items-center">
                    <View
                      className={`w-8 h-8 rounded-full ${
                        selectedRequest.status === "in_progress" ||
                        selectedRequest.status === "completed"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                      } items-center justify-center`}
                    >
                      <Text className="text-sm">🛤️</Text>
                    </View>
                    <Text className="mt-1 text-xs text-gray-600">
                      On the way
                    </Text>
                  </View>
                  <View className="items-center">
                    <View
                      className={`w-8 h-8 rounded-full ${
                        selectedRequest.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      } items-center justify-center`}
                    >
                      <Text className="text-sm">🏁</Text>
                    </View>
                    <Text className="mt-1 text-xs text-gray-600">
                      Completed
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {selectedRequest.status === "accepted" && (
              <TouchableOpacity
                onPress={() => handleStartService(selectedRequest.id)}
                className="mt-4 w-full py-2 bg-green-600 rounded-lg items-center"
              >
                <Text className="text-white font-medium">Start Service</Text>
              </TouchableOpacity>
            )}

            {selectedRequest.status === "in_progress" && (
              <TouchableOpacity
                onPress={() => handleCompleteService(selectedRequest.id)}
                className="mt-2 w-full py-2 bg-green-600 rounded-lg items-center"
              >
                <Text className="text-white font-medium">
                  Mark as Completed
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <View className="flex-1 bg-slate-700">
            <View className="px-4 py-3 bg-slate-600 border-b border-gray-200 flex-row items-center justify-between">
              <TouchableOpacity onPress={() => setShowMessages(false)}>
                <Text className="text-gray-200 flex flex-row text-base">
                  <Text className="text-xl font-bold">← </Text> Back
                </Text>
              </TouchableOpacity>
              <Text className="font-semibold text-gray-400">
                {selectedRequest.userName}
              </Text>
              <View className="w-6" />
            </View>

            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessageItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 16,
                paddingBottom: 100,
              }}
              initialNumToRender={10}
            />

            <View className="px-6 relative py-3 border-t mb-24 border-gray-200 flex-row items-center">
              <TextInput
                value={messageInput}
                onChangeText={setMessageInput}
                placeholder="Type a message..."
                className="flex-1 pl-5 border border-gray-300 rounded-full px-4 py-3 mr-2"
                multiline
                numberOfLines={2}
                returnKeyType="send"
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity
                onPress={sendMessage}
                className="bg-blue-600 absolute right-[30px] top-1/7 rounded-full p-2 pr-4"
                disabled={!messageInput.trim()}
              >
                <Text
                  className="text-white text-xl ml-1 font-[600]"
                  style={{ transform: [{ rotate: "-45deg" }] }}
                >
                  ➤
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default Worker;
