import { useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

const SignUp = () => {
    const router = useRouter();
    const { signUp, fetchStatus } = useSignUp();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const loading = fetchStatus === "fetching";

    const validate = () => {
        if (!email.includes("@")) return "Please enter a valid email.";
        if (password.length < 8) return "Password must be at least 8 characters.";
        if (firstName.trim().length === 0) return "Please tell us your first name.";
        return null;
    };

    const onSubmit = async () => {
        setError(null);
        const v = validate();
        if (v) return setError(v);
        if (!signUp) return setError("Auth is not ready. Try again.");

        try {
            const result = await signUp.password({ emailAddress: email.trim(), password, firstName: firstName.trim() });
            if (result.error) {
                setError(result.error.longMessage ?? "Sign up failed. Please try again.");
                return;
            }

            if (signUp.status === "complete") {
                await finishSignUp();
                return;
            }

            if (signUp.unverifiedFields.includes("email_address")) {
                const verification = await signUp.verifications.sendEmailCode();
                if (verification.error) {
                    setError(verification.error.longMessage ?? "Could not send the verification code.");
                    return;
                }
                setIsVerifying(true);
                return;
            }

            setError("Your account needs additional information before it can be created.");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Sign up failed. Please try again.");
        }
    };

    const finishSignUp = async () => {
        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) {
            setError(finalizeError.longMessage ?? "Could not start your session.");
            return;
        }
        router.replace("/(tabs)");
    };

    const onVerify = async () => {
        setError(null);
        if (code.trim().length === 0) {
            setError("Enter the verification code from your email.");
            return;
        }

        const result = await signUp.verifications.verifyEmailCode({ code: code.trim() });
        if (result.error) {
            setError(result.error.longMessage ?? "That verification code is invalid.");
            return;
        }

        if (signUp.status === "complete") {
            await finishSignUp();
        } else {
            setError("Your account still has incomplete requirements.");
        }
    };

    const resendCode = async () => {
        setError(null);
        const result = await signUp.verifications.sendEmailCode();
        if (result.error) {
            setError(result.error.longMessage ?? "Could not resend the verification code.");
        }
    };

    const restartSignUp = () => {
        signUp.reset();
        setCode("");
        setError(null);
        setIsVerifying(false);
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
                    <Text className="auth-subtitle">Create your account and get started tracking subscriptions in seconds.</Text>
                </View>

                <View className="auth-card">
                    <View className="auth-form">
                        {isVerifying ? (
                            <View className="auth-field">
                                <Text className="auth-label">Verification code</Text>
                                <TextInput value={code} onChangeText={setCode} keyboardType="number-pad" autoCapitalize="none" autoComplete="one-time-code" placeholder="123456" className="auth-input" />
                                <Text className="auth-helper">Enter the code sent to {email.trim()}.</Text>
                                <View className="auth-link-row">
                                    <Pressable accessibilityRole="button" onPress={resendCode} disabled={loading}>
                                        <Text className="auth-link">Resend code</Text>
                                    </Pressable>
                                    <Pressable accessibilityRole="button" onPress={restartSignUp} disabled={loading}>
                                        <Text className="auth-link">Use another email</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ) : (
                            <>
                                <View className="auth-field">
                                    <Text className="auth-label">First name</Text>
                                    <TextInput value={firstName} onChangeText={setFirstName} autoComplete="given-name" placeholder="Jane" className="auth-input" />
                                </View>

                                <View className="auth-field">
                            <Text className="auth-label">Email</Text>
                            <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="you@company.com" className="auth-input" />
                                </View>

                                <View className="auth-field">
                            <Text className="auth-label">Password</Text>
                            <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Create a password" className="auth-input" />
                                </View>
                            </>
                        )}

                        <View nativeID="clerk-captcha" />

                        {error && <Text className="auth-error">{error}</Text>}

                        <Pressable onPress={isVerifying ? onVerify : onSubmit} disabled={loading} className={`auth-button ${loading ? 'auth-button-disabled' : ''}`}>
                            {loading ? <ActivityIndicator color="#081126" /> : <Text className="auth-button-text">{isVerifying ? "Verify email" : "Create account"}</Text>}
                        </Pressable>

                        <View className="auth-link-row">
                            <Text className="auth-link-copy">Already have an account?</Text>
                            <Link href="/(auth)/sign-in" className="auth-link">Sign in</Link>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SignUp;
