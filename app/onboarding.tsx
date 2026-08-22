import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';

const Onboarding = () => {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return null;
    if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

    return (
        <View>
            <Text>
                Welcome to the Onboarding Screen!
            </Text>
        </View>
    );
}

export default Onboarding;
