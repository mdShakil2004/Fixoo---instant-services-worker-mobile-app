// WorkerRegistration.tsx
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Progress } from "./ui/Progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

import { Badge } from "./ui/Badge";

interface WorkerRegistrationProps {
  onRegistrationComplete: () => void;
}

interface RegistrationData {
  fullName: string;
  phone: string;
  serviceCategory: string;
  experience: string;
  idProof: any | null;
  experienceCertificate: any | null;
  bankDetails: string;
}

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

export default function WorkerRegistration({
  onRegistrationComplete,
}: WorkerRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: "",
    phone: "",
    serviceCategory: "",
    experience: "",
    idProof: null,
    experienceCertificate: null,
    bankDetails: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "approved" | "rejected"
  >("pending");
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setRegistrationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (
    field: "idProof" | "experienceCertificate"
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setRegistrationData((prev) => ({ ...prev, [field]: file }));
      }
    } catch (err) {
      setError("Failed to upload file");
      console.log(err);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setVerificationStatus("approved");
      setTimeout(() => {
        onRegistrationComplete();
      }, 2000);
    }, 3000);
  };

  const FileUploadCard: React.FC<{
    title: string;
    description: string;
    field: "idProof" | "experienceCertificate";
    icon: any;
  }> = ({ title, description, field, icon: Icon }) => {
    const file = registrationData[field];

    return (
      <Card className="p-4 border-2 border-dashed border-gray-300">
        <View className="text-center">
          <Icon name="upload" size={32} color="#6B7280" />
          <Text className="text-gray-900 font-medium mb-1">{title}</Text>
          <Text className="text-gray-600 text-sm mb-3">{description}</Text>
          {file ? (
            <View className="flex-row items-center justify-center gap-2 text-green-600">
              <Feather name="check-circle" size={16} color="#16A34A" />
              <Text className="text-sm">{file.name || "File uploaded"}</Text>
            </View>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onPress={() => handleFileUpload(field)}
            >
              <Feather name="upload" size={16} color="#1F2937" />
              <Text className="ml-2">Choose File</Text>
            </Button>
          )}
        </View>
      </Card>
    );
  };

  if (isSubmitted) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center p-8">
        <Card className="p-8 text-center max-w-sm w-full">
          {verificationStatus === "pending" && (
            <>
              <Feather
                name="clock"
                size={64}
                color="#F59E0B"
                className="mx-auto mb-4 animate-pulse"
              />
              <Text className="text-xl text-gray-900 mb-2">Under Review</Text>
              <Text className="text-gray-600 mb-4">
                Your registration is being reviewed by the Fixoo team. This
                usually takes 24-48 hours.
              </Text>
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                Pending Verification
              </Badge>
            </>
          )}
          {verificationStatus === "approved" && (
            <>
              <View className="relative mb-4">
                <Feather name="shield" size={64} color="#16A34A" />
                <Feather
                  name="check-circle"
                  size={24}
                  color="#FFFFFF"
                  className="absolute -top-1 -right-1 bg-green-500 rounded-full"
                />
              </View>
              <Text className="text-xl text-gray-900 mb-2">Verified!</Text>
              <Text className="text-gray-600 mb-4">
                Congratulations! You are now a verified Fixoo worker.
              </Text>
              <Badge className="bg-green-100 text-green-800">
                ✅ Verified Worker
              </Badge>
            </>
          )}
        </Card>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <Text className="text-lg font-bold">Worker Registration</Text>
        <Progress value={progress} className="mt-2" />
      </View>
      <ScrollView className="flex-1 px-4 py-4">
        {currentStep === 1 && (
          <View className="space-y-4">
            <Card className="p-4">
              <Text className="text-gray-900 font-bold mb-4 flex-row items-center gap-2">
                <Feather name="user" size={20} color="#1F2937" />
                Personal Information
              </Text>
              <View className="space-y-4">
                <View>
                  <Label>Full Name *</Label>
                  <Input
                    value={registrationData.fullName}
                    onChangeText={(value) =>
                      handleInputChange("fullName", value)
                    }
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </View>
                <View>
                  <Label>Phone Number *</Label>
                  <Input
                    value={registrationData.phone}
                    onChangeText={(value) => handleInputChange("phone", value)}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    className="mt-1"
                  />
                </View>
              </View>
            </Card>
          </View>
        )}
        {currentStep === 2 && (
          <View className="space-y-4">
            <Card className="p-4">
              <Text className="text-gray-900 font-bold mb-4 flex-row items-center gap-2">
                <Feather name="briefcase" size={20} color="#1F2937" />
                Professional Details
              </Text>
              <View className="space-y-4">
                <View>
                  <Label>Service Category *</Label>
                  <Select
                    value={registrationData.serviceCategory}
                    onValueChange={(value) =>
                      handleInputChange("serviceCategory", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select service category" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </View>
                <View>
                  <Label>Years of Experience *</Label>
                  <Select
                    value={registrationData.experience}
                    onValueChange={(value) =>
                      handleInputChange("experience", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
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
                </View>
              </View>
            </Card>
          </View>
        )}
        {currentStep === 3 && (
          <View className="space-y-4">
            <Card className="p-4">
              <Text className="text-gray-900 font-bold mb-4 flex-row items-center gap-2">
                <Feather name="file-text" size={20} color="#1F2937" />
                Document Verification
              </Text>
              <View className="space-y-4">
                <FileUploadCard
                  title="ID Proof"
                  description="Aadhar Card / Driving License / Voter ID"
                  field="idProof"
                  icon={Feather}
                />
                <FileUploadCard
                  title="Experience Certificate"
                  description="Work experience or skill certificate"
                  field="experienceCertificate"
                  icon={Feather}
                />
              </View>
            </Card>
          </View>
        )}
        {currentStep === 4 && (
          <View className="space-y-4">
            <Card className="p-4">
              <Text className="text-gray-900 font-bold mb-4 flex-row items-center gap-2">
                <Feather name="credit-card" size={20} color="#1F2937" />
                Payment Information
              </Text>
              <View className="space-y-4">
                <View>
                  <Label>Bank Account / UPI ID *</Label>
                  <Input
                    value={registrationData.bankDetails}
                    onChangeText={(value) =>
                      handleInputChange("bankDetails", value)
                    }
                    placeholder="Account number or UPI ID"
                    className="mt-1"
                  />
                  <Text className="text-xs text-gray-500 mt-1">
                    Your earnings will be transferred to this account
                  </Text>
                </View>
              </View>
            </Card>
            <Card className="p-4 bg-blue-50 border border-blue-200">
              <Text className="text-blue-800 font-bold mb-2">
                Before you continue
              </Text>
              <View className="space-y-2 text-sm text-blue-700">
                {[
                  "I agree to Fixoo's Terms of Service and Privacy Policy",
                  "I confirm that all provided information is accurate",
                  "I understand that verification may take 24-48 hours",
                ].map((text, index) => (
                  <View key={index} className="flex-row items-start gap-2">
                    <Feather name="check" size={16} color="#1F2937" />
                    <Text>{text}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        )}
      </ScrollView>
      <View className="bg-white border-t border-gray-200 p-4">
        <View className="flex-row gap-3">
          {currentStep > 1 && (
            <Button variant="outline" onPress={prevStep} className="flex-1">
              Previous
            </Button>
          )}
          {currentStep < totalSteps ? (
            <Button
              onPress={nextStep}
              className="flex-1 bg-blue-600"
              disabled={
                (currentStep === 1 &&
                  (!registrationData.fullName || !registrationData.phone)) ||
                (currentStep === 2 &&
                  (!registrationData.serviceCategory ||
                    !registrationData.experience))
              }
            >
              Next
            </Button>
          ) : (
            <Button
              onPress={handleSubmit}
              className="flex-1 bg-green-600"
              disabled={
                !registrationData.idProof || !registrationData.bankDetails
              }
            >
              Submit for Verification
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
