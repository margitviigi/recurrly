import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

const SignIn = () => {
    const router = useRouter();
    const { signIn, fetchStatus } = useSignIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const loading = fetchStatus === "fetching";

    const validate = () => {
        if (!email.includes("@")) return "Please enter a valid email.";
        if (password.length < 8) return "Password must be at least 8 characters.";
        return null;
    };

    const onSubmit = async () => {
        setError(null);
        const v = validate();
        if (v) return setError(v);
        if (!signIn) return setError("Auth is not ready. Try again.");

        try {
            const result = await signIn.password({ emailAddress: email.trim(), password });
            if (result.error) {
                setError(result.error.longMessage ?? "Sign in failed. Please try again.");
                return;
            }

            if (signIn.status === "complete") {
                const { error: finalizeError } = await signIn.finalize();
                if (finalizeError) {
                    setError(finalizeError.longMessage ?? "Could not start your session.");
                    return;
                }
                router.replace("/(tabs)");
                return;
            }

            setError("This account requires an additional verification step that is not available on this screen yet.");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Sign in failed. Please try again.");
        }
    };

    return (
        <View className="auth-safe-area auth-screen">
            <View className="auth-content">
                <View className="auth-brand-block">
                    <View className="auth-logo-wrap">
                        <View className="auth-logo-mark">
                            <Text className="auth-logo-mark-text">R</Text>
                        </View>
                        <Text className="auth-wordmark">Recurrly</Text>
                    </View>
                    <Text className="auth-subtitle">Sign in to manage your subscriptions and never miss a renewal.</Text>
                </View>

                <View className="auth-card">
                    <View className="auth-form">
                        <View className="auth-field">
                            <Text className="auth-label">Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="you@company.com"
                                className="auth-input"
                            />
                        </View>

                        <View className="auth-field">
                            <Text className="auth-label">Password</Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholder="••••••••"
                                className="auth-input"
                            />
                        </View>

                        {error && <Text className="auth-error">{error}</Text>}

                        <Pressable
                            onPress={onSubmit}
                            disabled={loading}
                            className={`auth-button ${loading ? 'auth-button-disabled' : ''}`}
                        >
                            {loading ? <ActivityIndicator color="#081126" /> : <Text className="auth-button-text">Sign in</Text>}
                        </Pressable>

                        <View className="auth-link-row">
                            <Text className="auth-link-copy">New here?</Text>
                            <Link href="/(auth)/sign-up" className="auth-link">Create an account</Link>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SignIn;
