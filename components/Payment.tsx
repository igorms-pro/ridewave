import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";

import CustomButton from "@/components/CustomButton";

const openPaymentSheet = () => {};

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [publishableKey, setPublishableKey] = useState("");

  const fetchPublishableKey = async () => {
    // const key = await fetchKey();
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(`${API_URL}/payment-sheet`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const { paymentIntent, ephemeralKey, customer } = await response.json();
  //
  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   };
  // };

  const initializePaymentSheet = async () => {
    // const { paymentIntent, ephemeralKey, customer } =
    //   await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      // customerId: customer,
      // customerEphemeralKeySecret: ephemeralKey,
      // paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
      setSuccess(true);
    }
  };

  return (
    <>
      <CustomButton
        title={`Confirme Ride`}
        className={`my-10`}
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
