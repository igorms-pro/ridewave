import { View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

console.log("✅ Loaded Google API Key:", googlePlacesApiKey);

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      {googlePlacesApiKey ? (
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Where are you headed at?"
          debounce={200}
          styles={{
            textInputContainer: {
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              marginHorizontal: 20,
              position: "relative",
              shadowColor: "#d4d4d4",
            },
            textInput: {
              backgroundColor: textInputBackgroundColor
                ? textInputBackgroundColor
                : "white",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 5,
              width: "100%",
              borderRadius: 200,
            },
            listView: {
              backgroundColor: textInputBackgroundColor
                ? textInputBackgroundColor
                : "white",
              position: "relative",
              top: 0,
              width: "100%",
              borderRadius: 10,
              shadowColor: "#d4d4d4",
              zIndex: 99,
            },
          }}
          onPress={(data, details = null) => {
            console.log("📍 Selected Place:", data.description);
            console.log("🌍 Latitude:", details?.geometry.location.lat);
            console.log("🌍 Longitude:", details?.geometry.location.lng);

            if (details) {
              handlePress({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: data.description,
              });
            } else {
              console.warn("⚠️ No details returned from API!");
            }
          }}
          query={{
            key: googlePlacesApiKey,
            language: "en",
          }}
          onFail={(error) => console.error("❌ Google API Error:", error)}
          renderLeftButton={() => (
            <View className="justify-center items-center w-6 h-6">
              <Image
                source={icon ? icon : icons.search}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
          )}
          textInputProps={{
            placeholderTextColor: "gray",
            placeholder: initialLocation ?? "Where are you headed at?",
          }}
        />
      ) : (
        <View>
          <Text className="text-red-500">⚠️ Google API Key is missing!</Text>
        </View>
      )}
    </View>
  );
};

export default GoogleTextInput;
