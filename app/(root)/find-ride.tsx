import { router } from "expo-router";
import { View, Text } from "react-native";

import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  const { push } = router;

  return (
    <RideLayout title={`Ride`}>
      <View className={`my-3`}>
        <Text className="text-lg font-JakartaSemiBold mb-3"> From</Text>
        <GoogleTextInput
          icon={icons.target}
          containerStyle={`bg-neutral-100`}
          initialLocation={userAddress!}
          textInputBackgroundColor={`#f5f5f5`}
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className={`my-3`}>
        <Text className="text-lg font-JakartaSemiBold mb-3"> To</Text>
        <GoogleTextInput
          icon={icons.map}
          containerStyle={`bg-neutral-100`}
          initialLocation={destinationAddress!}
          textInputBackgroundColor={`#f5f5f5`}
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <CustomButton
        title="Find Now"
        onPress={() => push(`/(root)/confirm-ride`)}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;
