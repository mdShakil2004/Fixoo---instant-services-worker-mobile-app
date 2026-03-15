// CustomerVerificationModal.tsx
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

interface VerificationRequest {
  jobId: string;
  workerName: string;
  serviceTitle: string;
  originalCharge: number;
  additionalService: string;
  additionalCharge: number;
  totalCharge: number;
  reason: string;
  estimatedTime: string;
}

interface CustomerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: VerificationRequest;
  onApprove: () => void;
  onDecline: () => void;
}

export default function CustomerVerificationModal({
  isOpen,
  onClose,
  request,
  onApprove,
  onDecline,
}: CustomerVerificationModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onApprove();
      setIsProcessing(false);
    }, 1500);
  };

  const handleDecline = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onDecline();
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onClose}
      style={{ justifyContent: "center", margin: 16 }}
    >
      <Card className="bg-white rounded-lg">
        {/* Header */}
        <View className="bg-yellow-50 border-b border-yellow-200 p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="warning" size={20} color="#D97706" />
              <Text className="text-yellow-800 font-semibold">
                Additional Service Required
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView className="p-4">
          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 text-sm mb-2">
                <Text className="font-medium">{request.workerName}</Text> has
                inspected your{" "}
                <Text className="font-medium">{request.serviceTitle}</Text> and
                found:
              </Text>
              <View className="bg-gray-50 p-3 rounded-lg">
                <Text className="text-gray-800 text-sm">{request.reason}</Text>
              </View>
            </View>

            {/* Service Options */}
            <View className="space-y-3">
              <View className="flex-row items-center justify-between p-3 bg-blue-50 rounded-lg">
                <View>
                  <Text className="text-blue-800">Original Service</Text>
                  <Text className="text-blue-600 text-sm">
                    {request.serviceTitle}
                  </Text>
                </View>
                <Text className="text-blue-900">₹{request.originalCharge}</Text>
              </View>
              <View className="flex-row items-center justify-between p-3 bg-orange-50 rounded-lg">
                <View>
                  <Text className="text-orange-800">Additional Service</Text>
                  <Text className="text-orange-600 text-sm">
                    {request.additionalService}
                  </Text>
                </View>
                <Text className="text-orange-900">
                  ₹{request.additionalCharge}
                </Text>
              </View>
              <View className="flex-row items-center justify-between p-3 bg-green-50 rounded-lg">
                <View>
                  <Text className="text-green-800">Total Charge</Text>
                  <Text className="text-green-600 text-sm">
                    Estimated Time: {request.estimatedTime}
                  </Text>
                </View>
                <Text className="text-green-900">₹{request.totalCharge}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="build" size={16} color="#16A34A" />
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  ✅ Verified Worker
                </Badge>
              </View>
            </View>

            {/* Action Message */}
            <View className="bg-blue-50 p-3 rounded-lg">
              <Text className="text-blue-800 text-sm text-center">
                Please approve or decline the additional service. The worker is
                waiting for your response.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Actions */}
        <View className="bg-gray-50 p-4 flex-row gap-3">
          <Button
            variant="outline"
            onPress={handleDecline}
            disabled={isProcessing}
            className="flex-1 border-red-300 text-red-700"
          >
            <Feather name="x" size={16} color="#EF4444" />
            <Text className="ml-1">Decline</Text>
          </Button>
          <Button
            onPress={handleApprove}
            disabled={isProcessing}
            className="flex-1 bg-green-600"
          >
            {isProcessing ? (
              <MaterialIcons name="access-time" size={16} color="#FFFFFF" />
            ) : (
              <Feather name="check-circle" size={16} color="#FFFFFF" />
            )}
            <Text className="ml-1 text-white">
              {isProcessing ? "Processing..." : "Approve"}
            </Text>
          </Button>
        </View>

        {/* Bottom Info */}
        <View className="bg-gray-100 p-3">
          <Text className="text-gray-600 text-xs text-center">
            You will only be charged if you approve the additional service
          </Text>
        </View>
      </Card>
    </Modal>
  );
}

export function CustomerApprovalDemo() {
  const [showModal, setShowModal] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState<
    "pending" | "approved" | "declined"
  >("pending");

  const mockRequest: VerificationRequest = {
    jobId: "JOB-001",
    workerName: "Arjun Sharma",
    serviceTitle: "Van Tyre Puncture",
    originalCharge: 200,
    additionalService: "Complete Tyre Replacement",
    additionalCharge: 2800,
    totalCharge: 3000,
    reason:
      "The tyre has severe damage and cannot be repaired. A complete replacement is required for safety.",
    estimatedTime: "30-40 minutes",
  };

  const handleApprove = () => {
    setApprovalStatus("approved");
    setShowModal(false);
  };

  const handleDecline = () => {
    setApprovalStatus("declined");
    setShowModal(false);
  };

  return (
    <View className="p-4 flex-1 bg-gray-50">
      <Card className="p-4 mb-4">
        <Text className="text-gray-900 font-bold mb-2">
          Customer App - Verification Demo
        </Text>
        <Text className="text-gray-600 text-sm mb-3">
          This shows how the customer would see the approval request:
        </Text>
        <Button variant="outline" onPress={() => setShowModal(true)}>
          <Text>Show Verification Request</Text>
        </Button>
        {approvalStatus !== "pending" && (
          <View
            className={`mt-3 p-3 rounded-lg ${
              approvalStatus === "approved" ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <Text
              className={`${
                approvalStatus === "approved"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              Service request {approvalStatus}!
            </Text>
          </View>
        )}
      </Card>
      <CustomerVerificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        request={mockRequest}
        onApprove={handleApprove}
        onDecline={handleDecline}
      />
    </View>
  );
}
