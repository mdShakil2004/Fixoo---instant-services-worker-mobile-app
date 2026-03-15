// SafetyScreen.tsx
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  type: "personal" | "emergency" | "company";
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "Emergency Services",
    phone: "911",
    relationship: "Emergency",
    type: "emergency",
  },
  {
    id: "2",
    name: "Fixoo Support",
    phone: "+1 (555) 999-0000",
    relationship: "Company Support",
    type: "company",
  },
  {
    id: "3",
    name: "Safety Hotline",
    phone: "+1 (555) 888-0000",
    relationship: "Safety Team",
    type: "company",
  },
  {
    id: "4",
    name: "Maria Rodriguez",
    phone: "+1 (555) 123-4567",
    relationship: "Emergency Contact",
    type: "personal",
  },
];

const safetyTips = [
  {
    id: 1,
    title: "Before Starting Work",
    tips: [
      "Verify customer identity and address",
      "Inform someone of your location",
      "Check your safety equipment",
      "Review job site hazards",
    ],
  },
  {
    id: 2,
    title: "During Service",
    tips: [
      "Maintain professional boundaries",
      "Use proper safety equipment",
      "Report any safety concerns immediately",
      "Keep your phone charged and accessible",
    ],
  },
  {
    id: 3,
    title: "Emergency Situations",
    tips: [
      "Call 911 for immediate threats",
      "Contact Fixoo support for job-related issues",
      "Share your live location if feeling unsafe",
      "Trust your instincts - leave if uncomfortable",
    ],
  },
];

export default function SafetyScreen() {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [sosCountdown, setSOSCountdown] = useState(0);
  const [locationSharing, setLocationSharing] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isSOSActive) {
      interval = setInterval(() => {
        setSOSCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            triggerEmergencyAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSOSActive]);

  const handleSOSPress = () => {
    if (!isSOSActive) {
      setIsSOSActive(true);
      setSOSCountdown(5);
    }
  };

  const cancelSOS = () => {
    setIsSOSActive(false);
    setSOSCountdown(0);
  };

  const triggerEmergencyAlert = () => {
    setLocationSharing(true);
    console.log("Emergency alert triggered!");
  };

  const shareLocation = () => setLocationSharing(!locationSharing);

  const callEmergencyContact = (contact: EmergencyContact) => {
    console.log(`Calling ${contact.name} at ${contact.phone}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center gap-3">
          <Feather name="shield" size={20} color="#EF4444" />
          <Text className="text-lg font-bold">Safety & Emergency</Text>
        </View>
        <Text className="text-gray-600 text-sm mt-1">
          Your safety is our priority
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-4 space-y-4">
        {/* SOS Card */}
        <Card className="p-6 bg-red-50 border border-red-200">
          <Text className="text-red-800 font-bold text-center mb-2 flex-row items-center justify-center">
            <Feather name="alert-triangle" size={20} color="#B91C1C" />
            Emergency SOS
          </Text>
          <Text className="text-red-700 text-sm mb-4 text-center">
            Press and hold for 5 seconds to trigger emergency alert
          </Text>

          {isSOSActive ? (
            <View className="space-y-4 items-center">
              <Text className="text-4xl text-red-600">{sosCountdown}</Text>
              <Text className="text-red-700 text-center">
                Emergency alert will be sent in {sosCountdown} seconds
              </Text>
              <Button
                variant="outline"
                onPress={cancelSOS}
                className="border-red-300 text-red-700"
              >
                Cancel
              </Button>
            </View>
          ) : (
            <TouchableOpacity
              onPressIn={handleSOSPress}
              onPressOut={cancelSOS}
              className="bg-red-600 p-4 rounded-lg"
            >
              <Text className="text-white text-lg text-center">
                Hold for SOS
              </Text>
            </TouchableOpacity>
          )}

          {locationSharing && (
            <View className="mt-4 flex-row items-center gap-2 justify-center">
              <Feather name="check-circle" size={16} color="#15803D" />
              <Text className="text-green-700 text-sm">
                Location shared with emergency contacts
              </Text>
            </View>
          )}
        </Card>

        {/* Emergency Contacts */}
        <Card className="p-4">
          <Text className="text-gray-900 font-bold mb-4 flex-row items-center gap-2">
            <Feather name="phone" size={16} color="#1F2937" />
            Emergency Contacts
          </Text>
          {emergencyContacts.map((contact) => (
            <View
              key={contact.id}
              className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg mb-2"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                  {contact.type === "emergency" ? (
                    <Feather name="alert-triangle" size={20} color="#EF4444" />
                  ) : contact.type === "company" ? (
                    <Feather name="shield" size={20} color="#3B82F6" />
                  ) : (
                    <Feather name="user" size={20} color="#6B7280" />
                  )}
                </View>
                <View>
                  <Text className="text-gray-900">{contact.name}</Text>
                  <Text className="text-gray-600 text-sm">
                    {contact.relationship}
                  </Text>
                </View>
              </View>
              <Button
                size="sm"
                variant="outline"
                onPress={() => callEmergencyContact(contact)}
              >
                <Feather name="phone" size={16} color="#1F2937" />
              </Button>
            </View>
          ))}
        </Card>

        {/* Safety Tips */}
        <Card className="p-4">
          <Text className="text-gray-900 font-bold mb-4">
            Safety Guidelines
          </Text>
          {safetyTips.map((section) => (
            <View key={section.id} className="mb-4">
              <Text className="text-gray-800 font-semibold mb-2">
                {section.title}
              </Text>
              {section.tips.map((tip, index) => (
                <View key={index} className="flex-row items-start gap-2 mb-1">
                  <Feather name="check-circle" size={16} color="#16A34A" />
                  <Text className="text-gray-600 text-sm">{tip}</Text>
                </View>
              ))}
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
