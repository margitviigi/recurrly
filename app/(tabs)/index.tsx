import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
 
export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboarding" className="mt-4 px-4 py-2 bg-primary text-white rounded">
        Go to Onboarding
      </Link>

      <Link href="/(auth)/sign-in" className="mt-4 px-4 py-2 bg-primary text-white rounded">
        Sign In
      </Link>

      <Link href="/(auth)/sign-up" className="mt-4 px-4 py-2 bg-primary text-white rounded">
        Sign Up
      </Link>
      <Link href="/subscriptions/spotify" className="mt-4 px-4 py-2 bg-primary text-white rounded">Spotify Subscription</Link>
      <Link href={{ pathname: "/subscriptions/[id]", params: { id: "123" } }} className="mt-4 px-4 py-2 bg-primary text-white rounded">
        View Subscription 123
      </Link>
    </SafeAreaView>
  );
}