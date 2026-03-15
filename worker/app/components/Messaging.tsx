// Messaging.tsx
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

interface Message {
  id: string;
  text: string;
  sender: "worker" | "customer";
  timestamp: string;
  status: "sent" | "delivered" | "read";
  type: "text" | "image" | "voice";
  imageUrl?: string;
  duration?: string;
}

interface Chat {
  id: string;
  customerName: string;
  jobTitle: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  avatar: string;
}

const mockChats: Chat[] = [
  {
    id: "1",
    customerName: "John Smith",
    jobTitle: "Plumbing Repair",
    lastMessage: "Thank you! On my way now",
    timestamp: "2 min ago",
    unreadCount: 0,
    isOnline: true,
    avatar: "JS",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    jobTitle: "AC Installation",
    lastMessage: "What time will you arrive?",
    timestamp: "15 min ago",
    unreadCount: 2,
    isOnline: true,
    avatar: "SJ",
  },
  {
    id: "3",
    customerName: "Mike Davis",
    jobTitle: "Electrical Repair",
    lastMessage: "Service completed successfully",
    timestamp: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    avatar: "MD",
  },
];

const mockMessages: { [key: string]: Message[] } = {
  "1": [
    {
      id: "1",
      text: "Hi! I have accepted your plumbing repair request. I will be arriving in about 15 minutes.",
      sender: "worker",
      timestamp: "10:25 AM",
      status: "read",
      type: "text",
    },
    {
      id: "2",
      text: "Great! The leak is getting worse. I'll be waiting for you.",
      sender: "customer",
      timestamp: "10:26 AM",
      status: "read",
      type: "text",
    },
    {
      id: "3",
      text: "Could you please send me a photo of the leak so I can bring the right tools?",
      sender: "worker",
      timestamp: "10:27 AM",
      status: "read",
      type: "text",
    },
    {
      id: "4",
      text: "Here's the photo of the kitchen sink",
      sender: "customer",
      timestamp: "10:28 AM",
      status: "read",
      type: "image",
      imageUrl:
        "https://images.unsplash.com/photo-1599463698367-11cb72775b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrZXIlMjB0ZWNobmljaWFuJTIwc2VydmljZSUyMHJlcGFpcnxlbnwxfHx8fDE3NTkxNDYyODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "5",
      text: "Perfect! I can see the issue. Thank you for the photo.",
      sender: "worker",
      timestamp: "10:29 AM",
      status: "read",
      type: "text",
    },
    {
      id: "6",
      text: "Thank you! On my way now",
      sender: "worker",
      timestamp: "10:30 AM",
      status: "delivered",
      type: "text",
    },
  ],
};

export default function Messaging() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
  };

  const formatTime = (timestamp: string) => timestamp;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return "✓";
      case "delivered":
        return "✓✓";
      case "read":
        return "✓✓";
      default:
        return "";
    }
  };

  if (selectedChat) {
    const chat = mockChats.find((c) => c.id === selectedChat);
    const messages = mockMessages[selectedChat] || [];

    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="bg-white border-b border-gray-200 px-4 py-3">
          <View className="flex-row items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onPress={() => setSelectedChat(null)}
            >
              <Feather name="arrow-left" size={20} color="#1F2937" />
            </Button>
            <Avatar className="w-10 h-10">{chat?.avatar}</Avatar>
            <View className="flex-1">
              <Text className="text-gray-900 font-bold">
                {chat?.customerName}
              </Text>
              <View className="flex-row items-center gap-2">
                <View
                  className={`w-2 h-2 rounded-full ${chat?.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                />
                <Text className="text-gray-600 text-sm">
                  {chat?.isOnline ? "Online" : "Offline"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          className="flex-1 px-4 py-2"
          renderItem={({ item: message }) => (
            <View
              className={`mb-3 p-3 rounded-lg ${
                message.sender === "worker"
                  ? "bg-blue-100 ml-auto max-w-[80%]"
                  : "bg-gray-100 max-w-[80%]"
              }`}
            >
              {message.type === "text" && (
                <Text className="text-sm">{message.text}</Text>
              )}
              {message.type === "image" && (
                <View className="space-y-2">
                  {message.text && (
                    <Text className="text-sm">{message.text}</Text>
                  )}
                  <Image
                    source={{ uri: message.imageUrl }}
                    className="w-full rounded-lg max-w-[192px]"
                    style={{ height: 150 }}
                  />
                </View>
              )}
              {message.type === "voice" && (
                <View className="flex-row items-center gap-2">
                  <View className="w-8 h-8 bg-white bg-opacity-20 rounded-full items-center justify-center">
                    <Feather name="mic" size={16} color="#1F2937" />
                  </View>
                  <View className="flex-1 h-6 bg-white bg-opacity-20 rounded-full" />
                  <Text className="text-xs">{message.duration}</Text>
                </View>
              )}
              <View
                className={`flex-row items-center justify-between mt-1 text-xs ${
                  message.sender === "worker"
                    ? "text-blue-200"
                    : "text-gray-500"
                }`}
              >
                <Text>{formatTime(message.timestamp)}</Text>
                {message.sender === "worker" && (
                  <Text
                    className={
                      message.status === "read"
                        ? "text-blue-200"
                        : "text-blue-300"
                    }
                  >
                    {getStatusIcon(message.status)}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
        <View className="bg-white border-t border-gray-200 p-4">
          <View className="flex-row items-end gap-2">
            <Button variant="ghost" size="sm">
              <Feather name="camera" size={20} color="#1F2937" />
            </Button>
            <View className="flex-1">
              <TextInput
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type a message..."
                className="border border-gray-300 rounded-md p-2"
                onSubmitEditing={handleSendMessage}
              />
            </View>
            <Button
              variant="ghost"
              size="sm"
              onPress={handleVoiceRecord}
              className={isRecording ? "text-red-500" : ""}
            >
              <Feather
                name="mic"
                size={20}
                color={isRecording ? "#EF4444" : "#1F2937"}
              />
            </Button>
            <Button
              size="sm"
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-500"
            >
              <Feather name="send" size={16} color="#FFFFFF" />
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <Text className="text-lg font-bold">Messages</Text>
        <Text className="text-gray-600 text-sm">Chat with your customers</Text>
      </View>
      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        className="flex-1"
        renderItem={({ item: chat }) => (
          <Card
            className="m-4 p-4 border-l-4 border-l-blue-500"
            onPress={() => setSelectedChat(chat.id)}
          >
            <View className="flex-row items-center gap-3">
              <View className="relative">
                <Avatar className="w-12 h-12">{chat.avatar}</Avatar>
                <View
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    chat.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </View>
              <View className="flex-1 min-w-0">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-gray-900 font-bold truncate">
                    {chat.customerName}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {chat.timestamp}
                  </Text>
                </View>
                <Badge variant="outline" className="text-xs mb-1">
                  {chat.jobTitle}
                </Badge>
                <Text className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </Text>
              </View>
              {chat.unreadCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  {chat.unreadCount}
                </Badge>
              )}
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}
