import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Shopping = () => {
  const [cartCount, setCartCount] = useState(0);
  // const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("rating");
  const categories = [
    {
      id: 1,
      name: "Service Bookings",
      icon: "calendar-check",
      image:
        "https://public.readdy.ai/ai/img_res/afe389c937a1300da04b32541c93fc5f.jpg",
    },
    {
      id: 2,
      name: "Plumbing",
      icon: "wrench",
      image:
        "https://public.readdy.ai/ai/img_res/9f122c42f4922134b269abf2e12cf429.jpg",
    },
    {
      id: 3,
      name: "Electrical",
      icon: "bolt",
      image:
        "https://public.readdy.ai/ai/img_res/5e6823c992aff1318c44b5738d19caae.jpg",
    },
    {
      id: 4,
      name: "Cleaning",
      icon: "broom",
      image:
        "https://public.readdy.ai/ai/img_res/4cc11629f51450bb764777e4d5de092f.jpg",
    },
    {
      id: 5,
      name: "Carpentry",
      icon: "hammer",
      image:
        "https://public.readdy.ai/ai/img_res/c5460e1b2178787fc8d98930a4f7cb46.jpg",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Professional Plumbing Service",
      image:
        "https://www.piranhaindia.com/product-images/1047.jpg/2365100000000090247/600x600",
      price: 89.99,
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      name: "Professional Plumbing Service",
      image: "https://rajabdeensons.com/uploads/3104.jpg",
      price: 89.99,
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 3,
      name: "Professional Plumbing Service",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/2/EW/VS/WM/164285067/swan-neck-500x500.jpg",
      price: 89.99,
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 4,
      name: "Professional Plumbing Service",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/2/CY/TS/ID/4853295/nano-basin-mixer-250x250.JPG",
      price: 89.99,
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      name: "Emergency Electrical Repair",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/2/CY/TS/ID/4853295/nano-basin-mixer-250x250.JPG",
      price: 129.99,
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 3,
      name: "Deep House Cleaning",
      image:
        "https://public.readdy.ai/ai/img_res/2c9d2102535d98123c0e7f217e82e938.jpg",
      price: 149.99,
      rating: 4.7,
      reviews: 178,
    },
    {
      id: 4,
      name: "Custom Carpentry Work",
      image:
        "https://public.readdy.ai/ai/img_res/1d2d7cca3e703186936ffff7df902243.jpg",
      price: 199.99,
      rating: 4.9,
      reviews: 142,
    },
    {
      id: 5,
      name: "Custom Carpentry Work",
      image:
        "https://public.readdy.ai/ai/img_res/1d2d7cca3e703186936ffff7df902243.jpg",
      price: 199.99,
      rating: 4.9,
      reviews: 142,
    },
    {
      id: 6,
      name: "Maruti Packed Tube .",
      image:
        "https://m.media-amazon.com/images/I/41pDh+oq4ZL._AC_UF1000,1000_QL80_.jpg",
      price: 199.99,
      rating: 4.9,
      reviews: 142,
    },
    {
      id: 6,
      name: "Michelin launches ET Auto",
      image: "https://etimg.etb2bimg.com/photo/69430161.cms",
      price: 199.99,
      rating: 4.9,
      reviews: 142,
    },
    {
      id: 7,
      name: "Glass Cleaner",
      image:
        "https://www.careclean.co/wp-content/uploads/2018/06/002edit-600x900.png",
      price: 99.99,
      rating: 4.9,
      reviews: 143,
    },
    {
      id: 7,
      name: "Glass Cleaner",
      image:
        "https://www.careclean.co/wp-content/uploads/2018/06/002edit-600x900.png",
      price: 99.99,
      rating: 4.9,
      reviews: 143,
    },
  ];

  const handleAddToCart = (productId) => {
    setCartCount((prev) => prev + 1);
  };

  const filters = [
    { id: "all", name: "All" },
    { id: "1", name: "Cleaning" },
    { id: "2", name: "Electrical" },
    { id: "3", name: "Plumbing" },
    { id: "4", name: "Carpentry" },
    { id: "5", name: "Service Bookings" },
    // Add more filters as needed
  ];

  const handleSort = (type: string) => {
    setSortBy(type);
    setShowSortModal(false);
  };

  const renderHeader = () => (
    <>
      <View className="mb-6 overflow-x-auto">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filters}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedFilter(item.id)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedFilter === item.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <Text className="text-xs text-gray-600 text-center">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Banner */}
      <Image
        source={{
          uri: "https://public.readdy.ai/ai/img_res/50438b9324114339dc7cebe0b71794f8.jpg",
        }}
        className="w-full h-[150px] rounded-xl mx-4 mt-4"
        resizeMode="cover"
      />

      {/* Featured Services Header */}
      <View className="mt-6 flex-row justify-between items-center px-4">
        <Text className="text-lg font-semibold">Featured Services</Text>
        <View>
          <TouchableOpacity
            onPress={() => setShowSortOptions(true)}
            className="flex-row items-center gap-1"
          >
            <Text className="text-sm text-gray-600">↕ Sort</Text>
          </TouchableOpacity>
          {showSortOptions && (
            <View className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg py-2 w-48 z-20">
              {[
                "Popular",
                "Price: Low to High",
                "Price: High to Low",
                "Rating",
              ].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setSelectedSort(option.toLowerCase());
                    setShowSortOptions(false);
                  }}
                  className="px-4 py-2"
                >
                  <Text className="text-sm">{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1  bg-gray-50">
      {/* Header */}
      <View className="w-full bg-white px-4 py-3 shadow-sm z-50">
        <View className="flex-row items-center gap-3">
          <View className="flex-1  relative">
            <TextInput
              placeholder="Search services..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="w-full pl-10 pr-4 py-3  border border-gray-400 rounded-lg text-sm"
            />
            <Text className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </Text>
          </View>
          <View className="relative">
            <TouchableOpacity>
              <Text className="text-xl text-gray-700">🛒</Text>
              {cartCount > 0 && (
                <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs">{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={{ gap: 16, paddingHorizontal: 16 }}
        className="pt-4 mb-24"
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden mb-4">
            <Image
              source={{ uri: item.image }}
              className="w-full h-[180px]"
              resizeMode="cover"
            />
            <View className="p-3">
              <Text className="text-sm font-medium line-clamp-2">
                {item.name}
              </Text>
              <View className="flex-row items-center mt-2">
                <Text className="text-yellow-400">★</Text>
                <Text className="ml-1 text-sm">{item.rating}</Text>
                <Text className="text-xs text-gray-500 ml-2">
                  ({item.reviews} reviews)
                </Text>
              </View>
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-sm font-semibold">${item.price}</Text>
                <TouchableOpacity
                  onPress={() => handleAddToCart(item.id)}
                  className="bg-blue-600 rounded-lg px-3 py-1.5"
                >
                  <Text className="text-white text-xs">Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        visible={showSortModal}
        transparent={true}
        onRequestClose={() => setShowSortModal(false)}
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-white rounded-t-xl p-4">
            <View className="flex justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Sort By</Text>
              <TouchableOpacity
                onPress={() => setShowSortModal(false)}
                className="text-gray-500"
              >
                <Text className="text-lg">×</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={["rating", "price", "distance", "experience"]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleSort(item)}
                  className={`w-full text-left py-3 px-4 rounded-lg ${
                    sortBy === item
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  <Text className="text-lg">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.toString()}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Shopping;
