import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
const LoginModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState("phone"); // 'email' or 'phone'
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [recievedOtp, setRecievedOtp] = useState(null);

  const router = useRouter(); //

  const handleSendOtp = async (): Promise<void> => {
    setIsLoading(true);

    if (!validateInputs()) return;

    // Mock API call to send OTP
    try {
      console.log("Request body:", { phoneNumber, name });
      const response = await axios.post(
        "http://192.168.20.192:5000/api/auth/send-otp",
        {
          phoneNumber,
          name,
          isLogin,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("OTP  received:", response.data, response.data.success);
      if (response.data.success) {
        console.log("otp is ", response.data.data.otp);
        setLoginData(response.data.data);
        setRecievedOtp(response.data.data.otp);
        setIsLoading(false);
        router.push("/Home");
        setOtpSent(true);

        Alert.alert(
          "Success",
          `OTP sent successfully ${response.data.data.otp}`
        );
        console.log("welcome to home page ", otp);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "Failed to send OTP");
    }

    // Simulate sending OTP
    setTimeout(() => {
      console.log("Sending OTP to:", phoneNumber);
      setOtpSent(true);
      setIsLoading(false);
    }, 20000);
  };

  // Email validation with @gmail.com requirement
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  // Password validation (min 8 chars, 1 letter, 1 number)
  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // check entered valid input or not
  const validateInputs = (): boolean => {
    if (!isLogin && !name.trim()) {
      Alert.alert("Error", "Name is required for signup");
      return false;
    }

    if (loginMethod === "email") {
      if (!isValidEmail(email)) {
        Alert.alert("Error", "Email must be a valid Gmail address ");
        return false;
      }
      if (!isValidPassword(password)) {
        Alert.alert(
          "Error",
          "Password must be at least 8 characters with letters and numbers"
        );
        return false;
      }
    } else {
      if (phoneNumber.length !== 10 || isNaN(Number(phoneNumber))) {
        Alert.alert("Error", "invalid phone number ");
        return false;
      }
      if (otpSent && (!otp || otp.length < 6)) {
        Alert.alert("Error", "Please enter a valid OTP");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    setIsLoading(true);

    if (loginMethod === "phone" && !otpSent) {
      if (otp === null) {
        handleSendOtp();
      } else {
        if (otp === recievedOtp) {
          Alert.alert("Success", "OTP verified successfully");
          router.push("/Home");
        }
      }
      return;
    }

    setTimeout(() => {
      if (loginMethod === "phone") {
        console.log("Verifying OTP:", {
          phoneNumber,
          otp,
          ...(isLogin ? {} : { name }),
        });
      } else {
        // check valid email or password

        console.log("Login Data:", {
          email,
          password,
          ...(isLogin ? {} : { name }),
        });
      }

      resetFields();
      setIsLoading(false);
      setOtpSent(false);
    }, 1000);
  };

  const resetFields = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setOtp(null);
  };

  // console.log("is login ", isLogin);
  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="flex-1 items-center justify-center min-h-screen p-4">
        <View className="w-full max-w-[350px] bg-gray-800 border border-teal-900 rounded-lg p-6 shadow-lg relative">
          <TouchableOpacity
            className="absolute top-1 right-3"
            onPress={() => router.push("/")}
            disabled={isLoading}
          >
            <Text className="text-white text-xl">X</Text>
          </TouchableOpacity>

          <Text className="text-center text-white text-3xl font-extrabold mb-6 font-[Lucida_Sans]">
            {isLogin ? "Welcome back" : "Create account"}
          </Text>

          {!isLogin && (
            <Text className="text-center text-gray-400 text-sm mb-4 font-[Lucida_Sans]">
              Let's get started with your 30 days free trial
            </Text>
          )}

          <View className="flex-row justify-center gap-4 mb-4">
            <TouchableOpacity
              onPress={() => setLoginMethod("phone")}
              className={`px-4 py-2 rounded-full ${
                loginMethod === "phone" ? "bg-teal-600" : "bg-gray-700"
              }`}
            >
              <Text className="text-white font-[Lucida_Sans]">Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLoginMethod("email")}
              className={`px-4 py-2 rounded-full ${
                loginMethod === "email" ? "bg-teal-600" : "bg-gray-700"
              }`}
            >
              <Text className="text-white font-[Lucida_Sans]">Email</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-4 mb-4">
            {!isLogin && (
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor="#9CA3AF"
                className="w-full px-4 py-3 rounded-full text-gray-300 bg-gray-800 border border-gray-400"
                editable={!isLoading}
              />
            )}

            {loginMethod === "email" ? (
              <>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  className="w-full px-4 py-3 rounded-full text-gray-300 bg-gray-800 border border-gray-300"
                  editable={!isLoading}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={true}
                  className="w-full px-4 py-3 rounded-full text-gray-300 bg-gray-800 border border-gray-300"
                  editable={!isLoading}
                />
              </>
            ) : (
              <>
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Phone Number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  className="w-full px-4 py-3 rounded-full text-gray-300 bg-gray-800 border border-gray-300"
                  editable={!isLoading && !otpSent}
                />
                {otpSent && (
                  <TextInput
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="Enter OTP"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    className="w-full px-4 py-3 rounded-full text-gray-300 bg-gray-800 border border-gray-300"
                    editable={!isLoading}
                  />
                )}
              </>
            )}

            {isLogin && loginMethod === "email" && (
              <Text className="text-right text-gray-300 text-xs">
                Forgot Password?
              </Text>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full px-4 py-2 bg-teal-600 rounded-full shadow-md"
              disabled={isLoading}
            >
              <Text className="text-white text-center font-[Lucida_Sans]">
                {isLoading
                  ? "Processing..."
                  : loginMethod === "phone" && !otpSent
                  ? "Send OTP"
                  : isLogin
                  ? "Log in"
                  : "Create account"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-center text-gray-500 text-base font-[Lucida_Sans]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Text
              onPress={() => setIsLogin(!isLogin)}
              className="ml-1 text-teal-600 underline font-bold"
            >
              {isLogin ? "Sign up" : "Log in"}
            </Text>
          </Text>

          <View className="mt-6 flex-col gap-4">
            <TouchableOpacity
              className="flex-row items-center justify-center gap-2 w-full px-4 py-2 bg-gray-600 rounded-full border-2 border-black"
              disabled={isLoading}
            >
              <AntDesign name="apple1" size={20} color="black" />
              <Text className="text-white font-[Lucida_Sans] text-sm">
                {isLogin ? "Log in" : "Sign up"} with Apple
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-center gap-2 w-full px-4 py-2 bg-white rounded-full border-2 border-gray-500"
              disabled={isLoading}
            >
              <AntDesign name="google" size={18} color="black" />
              <Text className="text-gray-700 font-[Lucida_Sans] text-sm">
                {isLogin ? "Log in" : "Sign up"} with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginModal;
