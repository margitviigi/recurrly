import { Text, Pressable, ActivityIndicator, View } from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/expo";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    const { signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignOut = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Could not sign out. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <View className="mb-6">
                <Text className="text-xl font-semibold text-primary">Settings</Text>
            </View>

            <View className="mt-4">
                {error && <Text className="auth-error">{error}</Text>}
                <Pressable
                    onPress={handleSignOut}
                    className={`auth-button ${loading ? 'auth-button-disabled' : ''}`}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#081126" />
                    ) : (
                        <Text className="auth-button-text">Sign out</Text>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default Settings;
