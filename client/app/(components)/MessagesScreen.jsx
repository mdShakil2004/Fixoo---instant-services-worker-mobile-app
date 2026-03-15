import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Sample data remains unchanged
const carouselData = [
  {
    id: '1',
    image: 'https://www.clearchoiceuk.com/wp-content/uploads/2018/08/qualities-and-skills-of-a-commercial-cleaner.jpg',
    workerType: 'Cleaner',
    work: 'Deep Cleaning, Dusting, Vacuuming',
    charge: '₹300/hr',
    distance: '100 meters away',
  },
  {
    id: '2',
    image: 'https://img.freepik.com/free-photo/building-construction-worker-site_23-2149124283.jpg',
    workerType: 'General Worker',
    work: 'General Labor, Moving, Lifting, Cleaning',
    charge: '₹250/hr',
    distance: '150 meters away',
  },
  { id: "12",
    workerType: "Barber/Hairdresser", 
    work: "Haircut, Shaving, Styling, Hair Coloring",
  image: "https://assets.grok.com/users/726adaf9-f8cb-414d-9e4b-c0f43273ca61/generated/Gfi8SI0lb4enDUaA/image.jpg",
  charge: '₹300/hr', distance: '200 meters away',
  rating: 4.5,
  reviews: 50, },
  {
    id: '13',
    image: 'https://cdn.pixabay.com/photo/2015/09/10/20/13/child-labor-934900_640.jpg',
    workerType: 'Car Mechanics',
    work: 'General work, tyre repair,Oil Change, exchange tyre',
    charge: '₹250/hr',
    distance: '150 meters away',
  },
  {
    id: '3',
    image: 'https://media.istockphoto.com/id/1015387276/photo/man-in-a-working-overall.jpg?s=612x612&w=0&k=20&c=SiHLfl9X0lkncWAqyi8llAAG_dg4vk6mFn8JzaatQfk=',
    workerType: 'Painter',
    work: 'Wall Painting, Furniture Polishing,interior design ',
    charge: '₹400/hr',
    distance: '200 meters away',
  },
  {
    id: '4',
    image: 'https://onepullwire.com/wp-content/uploads/2022/02/10-Specializations-Comm-Electricians.jpeg',
    workerType: 'Electrician',
    work: 'Wiring, Repairs, Installations,general work',
    charge: '₹500/hr',
    distance: '250 meters away',
  },
  {
    id: '5',
    image: 'https://goodbeeplumbinganddrains.com/wp-content/uploads/2023/01/iStock-1341381755.jpg',
    workerType: 'Plumber',
    work: 'Pipe Repairs, Leak Fixing,pipe exchange',
    charge: '₹450/hr',
    distance: '300 meters away',
  },
  {
    id: "6",
    workerType: "Professional Plumbing Service",
    work: "Leasing, Fixing, Installation of Plumbing Systems",
    image:
      "https://public.readdy.ai/ai/img_res/3c1ab6aa4252984a14a6007a67179333.jpg",
      charge: '₹500/hr',
      distance: '250 meters away',
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "7",
    workerType: "Emergency Electrical Repair",
    work: "Fire Repairs, Electrical Faults, Troubleshooting",
    image:
      "https://public.readdy.ai/ai/img_res/72c0cc7c6d435ede315791a47a182810.jpg",
      charge: '₹500/hr',
      distance: '250 meters away',
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "8",
    workerType: "Deep House Cleaning",
    work: "Home Cleaning, Mopping, Vacuuming, Dusting",
    image:
      "https://public.readdy.ai/ai/img_res/2c9d2102535d98123c0e7f217e82e938.jpg",
      charge: '₹500/hr',
      distance: '250 meters away',
    rating: 4.7,
    reviews: 178,
  },
  {
    id: "9",
    workerType: "Custom Carpentry Work",
    work: "Furniture Making, Woodwork, Carpentry Services",
    image:
      "https://public.readdy.ai/ai/img_res/1d2d7cca3e703186936ffff7df902243.jpg",
      charge: '₹500/hr',
      distance: '250 meters away',
    rating: 4.9,
    reviews: 142,
  },
  {
    id: "10",
    workerType: "Custom Carpentry Work",
    work: "Furniture Making, Woodwork, Carpentry Services",
    image:
      "https://public.readdy.ai/ai/img_res/1d2d7cca3e703186936ffff7df902243.jpg",
      charge: '₹500/hr',
      distance: '250 meters away',
    rating: 4.9,
    reviews: 142,
  },
  {
    id: "11",
    workerType: "Custom Carpentry Work",
    work: "Furniture Making, Woodwork, Carpentry Services",
    image:
      "https://public.readdy.ai/ai/img_res/1d2d7cca3e703186936ffff7df902243.jpg",
      charge: '₹500/hr',
      distance: '250 meters away',
    rating: 4.9,
    reviews: 142,
  },
 
];

const MessagesScreen = ({ selectedCategory }) => { 


  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current; // Dot scale
  const ringAnim = useRef(new Animated.Value(0)).current; // Ring scale and opacity

  // Pulse animation mimicking the CSS loader
  useEffect(() => {
    const pulse = () => {
      Animated.loop(
        Animated.parallel([
          // Dot pulse (slight scale change)
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.2, // Slight expansion
              duration: 750, // Half of 1.5s cycle
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1, // Back to original
              duration: 750,
              useNativeDriver: true,
            }),
          ]),
          // Ring pulse (expanding and fading)
          Animated.sequence([
            Animated.timing(ringAnim, {
              toValue: 1, // Full scale and opacity
              duration: 1500, // Full 1.5s cycle
              useNativeDriver: true,
            }),
            Animated.timing(ringAnim, {
              toValue: 0, // Reset to start
              duration: 0, // Instant reset
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };
    pulse();
  }, [pulseAnim, ringAnim]);

  // Filter carouselData based on selectedCategory
  const filteredData = selectedCategory === "All"
    ? carouselData
    : carouselData.filter(item => item.workerType.toLowerCase() === selectedCategory.toLowerCase());

  
  
  const renderItem = ({ item }) => (
    <View className="mx-[5px] w-[180px] border border-blue-500 rounded-md p-1">
      {/* Animated Loader (Dot + Ring) */}
      <View className="absolute z-10 top-2 left-2 ">
        {/* Expanding Ring */}
        <Animated.View
          className="absolute w-4 h-4 rounded-full bg-[#69ffa8] opacity-50"
          style={{
            transform: [{ scale: ringAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.5] }) }],
            opacity: ringAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] }),
          }}
        />
        {/* Pulsing Dot */}
        <Animated.View
          className="w-3 h-3 bg-[#69ffa8] rounded-full"
          style={{ transform: [{ scale: pulseAnim }] }}
        />
      </View>

      {/* Image */}
      <Image
        source={{ uri: item.image }}
        className="w-full h-[90px] rounded-md mt-[2px]"
        resizeMode="cover"
        onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
      />

      {/* Profession (workerType) */}
      <Text className="text-base font-bold text-gray-800 mt-2 text-center">
        {item.workerType} 
      </Text>

      {/* Work Description */}
      <Text className="text-xs text-gray-700 mt-1 text-center" numberOfLines={2}>
        {item.work}
      </Text>

      {/* Distance and Charge in a Row */}
      <View className="flex-row justify-between mt-1">
        <Text className="text-xs text-gray-500">{item.distance}</Text>
        <Text className="text-xs font-semibold text-blue-600">{item.charge}</Text>
      </View>

      {/* Book Now Button */}
      <TouchableOpacity
        onPress={() => console.log(`Booked ${item.workerType}`)}
        className="bg-blue-500 rounded-lg py-1 mt-2 border-2 border-blue-600 shadow-md"
      >
        <Text className="text-sm font-bold text-white text-center">Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / (SCREEN_WIDTH * 0.8));
    setActiveIndex(currentIndex);
  };

  return (
    <View className="flex-1 justify-center bg-gray-100">
      {/* Header */}
      <Text className="text-lg font-semibold text-gray-800 ml-4 mb-2">
        in your area
      </Text>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={filteredData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        // onScroll={onScroll}
        className="max-h-[260px]"
        snapToInterval={SCREEN_WIDTH * 0.8}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
};

export default MessagesScreen;