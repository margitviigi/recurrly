import {View, Text } from "react-native";
import { Link } from "expo-router";

const SignIn = () => {
    return (
        <View>
            <Text>
                Sign In 
            </Text>
            <Link href="/sign-up" className="mt-4 px-4 py-2 bg-success text-white rounded">
                Create Account
            </Link>
        </View>
    );
}

export default SignIn;