import { useRouter } from "expo-router";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-slate-700 h-screen">
      <StatusBar barStyle="light-content" backgroundColor="#0f2151" />

      <View>
        <TouchableOpacity
          className="bg-blue-400 border rounded-full mt-4"
          onPress={() => router.push("/Home")}
        >
          <Text className="text-white p-4 text-lg">Go to user home Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-400 border rounded-full mt-4"
          onPress={() => router.push("/ServicesProvide")}
        >
          <Text className="text-white p-4 text-lg"> book service page </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-400 border rounded-full mt-4"
          onPress={() => router.push("/Worker")}
        >
          <Text className="text-white p-4 text-lg"> worker dashboard </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-400 border rounded-full mt-4"
          onPress={() => router.push("/LoginModel")}
        >
          <Text className="text-white p-4 text-lg"> Login page </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
