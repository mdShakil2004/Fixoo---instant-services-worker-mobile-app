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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookings = () => {
  const [bookingFilter, setBookingFilter] = useState("upcoming");
  const [workerLocation, setWorkerLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    address: "Oak Street",
    distance: "2.3 km",
    eta: "12 mins",
    progress: 40,
  });
  const [showMessages, setShowMessages] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
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

  const flatListRef = useRef<FlatList>(null);

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

  useEffect(() => {
    const updateLocation = () => {
      setWorkerLocation((prev) => ({
        ...prev,
        distance: `${(parseFloat(prev.distance) - 0.1).toFixed(1)} km`,
        eta: `${Math.max(1, parseInt(prev.eta) - 1)} mins`,
        progress: Math.min(100, prev.progress + 2),
      }));
    };

    const locationInterval = setInterval(updateLocation, 10000);
    return () => clearInterval(locationInterval);
  }, []);

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: messageInput,
      sender: "user",
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
      const workerResponses = [
        "Thanks for your message! I’ll be there soon.",
        "I’m about 5 minutes away now.",
        "Any specific instructions I should know?",
        "I’m just around the corner!",
      ];
      const randomResponse =
        workerResponses[Math.floor(Math.random() * workerResponses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "worker",
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

  const renderPastBookingItem = ({ item }) => (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start">
          <Image
            source={{
              uri: `https://readdy.ai/api/search-image?query=professional ${item.service.toLowerCase()} worker portrait, modern business attire, clean background, high quality professional photo&width=48&height=48&seq=${
                item.id + 20
              }&orientation=squarish`,
            }}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <View className="ml-3">
            <Text className="font-medium text-gray-800">{item.service}</Text>
            <Text className="text-sm text-gray-600">{item.provider}</Text>
            <View className="mt-2 flex-row items-center text-sm text-gray-600">
              <Text className="mr-2">📅</Text>
              <Text>{item.date}</Text>
            </View>
            {item.rating && (
              <View className="mt-1 flex-row items-center">
                {[...Array(item.rating)].map((_, index) => (
                  <Text key={index} className="text-yellow-400 text-sm">
                    ★
                  </Text>
                ))}
                <Text className="ml-1 text-sm text-gray-600">
                  {item.rating}.0
                </Text>
              </View>
            )}
          </View>
        </View>
        <Text className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-700">
          Completed
        </Text>
      </View>
      <TouchableOpacity className="mt-4 w-full py-2 border border-gray-300 rounded-lg items-center">
        <Text className="text-gray-700 font-medium">Book Again</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMessageItem = ({ item }) => (
    <View
      className={`mb-4 ${item.sender === "user" ? "items-end" : "items-start"}`}
    >
      <View
        className={`max-w-[70%] p-3 rounded-lg ${
          item.sender === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-400 text-gray-800"
        }`}
      >
        <Text>{item.text}</Text>
        <View className="flex-row justify-between items-center mt-1">
          <Text
            className={`text-xs ${
              item.sender === "user" ? "text-blue-200" : "text-gray-500"
            }`}
          >
            {item.timestamp}
          </Text>
          {item.sender === "user" && (
            <Text
              className={`text-xs ml-2 ${
                item.sender === "user" ? "text-blue-200" : "text-gray-500"
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
    <View className="flex-1 bg-gray-50">
      {/* Fixed Header */}
      <SafeAreaView className="bg-slate-700">
        <View className="w-full px-4 py-3 flex-row justify-between items-center shadow-sm">
          <Text className="text-xl font-semibold text-blue-600">QuickFix</Text>
          <TouchableOpacity>
            <Text className="text-xl text-gray-600">🔔</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Main Content */}
      <View className="flex-1">
        {!showMessages ? (
          <FlatList
            className="px-4 pt-4"
            data={bookings.filter((booking) => booking.status === "Completed")}
            renderItem={renderPastBookingItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListHeaderComponent={() => (
              <>
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="text-xl font-semibold text-gray-800">
                    My Bookings
                  </Text>
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      onPress={() => setBookingFilter("upcoming")}
                      className={`px-3 py-1 rounded-full ${
                        bookingFilter === "upcoming"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <Text className="text-sm">Upcoming</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setBookingFilter("past")}
                      className={`px-3 py-1 rounded-full ${
                        bookingFilter === "past"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <Text className="text-sm">Past</Text>
                    </TouchableOpacity>
                  </View>
                </View>

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
                          House Cleaning
                        </Text>
                        <Text className="text-sm text-gray-600">
                          Emily Williams
                        </Text>
                        <View className="mt-2 flex-row items-center text-sm text-gray-600">
                          <Text className="mr-2">📅</Text>
                          <Text>Today, 2:00 PM</Text>
                        </View>
                        <View className="mt-1 flex-row items-center text-sm text-gray-600">
                          <Text className="mr-2">📍</Text>
                          <Text>123 Main Street</Text>
                        </View>
                      </View>
                    </View>
                    <Text className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                      On the way
                    </Text>
                  </View>

                  <View className="mt-4 rounded-lg overflow-hidden">
                    <View className="relative w-full h-52 bg-gray-100">
                      <Image
                        source={{
                          uri: "https://public.readdy.ai/ai/img_res/44e1f4ace414eb510df0920fc982ed43.jpg",
                        }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                      <View className="absolute top-2 right-2 bg-white rounded-lg shadow-md p-2">
                        <Text className="text-xs text-gray-600">
                          Estimated arrival in
                        </Text>
                        <Text className="text-sm font-medium text-blue-600">
                          {workerLocation.eta}
                        </Text>
                      </View>
                      <View className="absolute bottom-2 left-2 bg-white rounded-lg shadow-md p-2 flex-row items-center">
                        <Text className="text-blue-600 mr-2">🚚</Text>
                        <View>
                          <Text className="text-xs text-gray-600">
                            Current location
                          </Text>
                          <Text className="text-sm font-medium">
                            {workerLocation.address}, {workerLocation.distance}{" "}
                            away
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="mt-4 flex-row space-x-3">
                    <TouchableOpacity className="flex-1 py-2 bg-blue-600 rounded-lg items-center">
                      <Text className="text-white font-medium">📞 Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowMessages(true)}
                      className="flex-1 py-2 border border-gray-300 rounded-lg items-center"
                    >
                      <Text className="text-gray-700 font-medium">
                        💬 Message
                      </Text>
                    </TouchableOpacity>
                  </View>

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
                        <Text className="mt-1 text-xs text-gray-600">
                          Accepted
                        </Text>
                      </View>
                      <View className="items-center">
                        <View className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 items-center justify-center">
                          <Text className="text-sm">🛤️</Text>
                        </View>
                        <Text className="mt-1 text-xs text-gray-600">
                          On the way
                        </Text>
                      </View>
                      <View className="items-center">
                        <View className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 items-center justify-center">
                          <Text className="text-sm">🏁</Text>
                        </View>
                        <Text className="mt-1 text-xs text-gray-600">
                          Completed
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {bookingFilter === "past" && (
                  <Text className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                    Past Bookings
                  </Text>
                )}
              </>
            )}
          />
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
                    <Text className=" text-xl font-bold">← </Text> Back
                  </Text>
                </TouchableOpacity>
                <Text className="font-semibold text-gray-400">
                  Emily Williams
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

              <View className="px-6 relative py-3 border-t mb-24 border-gray-200 flex-row items-center ">
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
                  className=" bg-blue-600 absolute right-[30px] top-1/7   rounded-full p-2 pr-4"
                  disabled={!messageInput.trim()}
                >
                  <Text
                    className="text-white text-xl ml-1  font-[600]"
                    style={{ transform: [{ rotate: "-45deg" }] }}
                  >
                    ➤
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    </View>
  );
};

export default Bookings;
