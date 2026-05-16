import {View, Text} from "react-native";import { Link } from "expo-router";
import SignIn from "./sign-in";

const SignUp = () => {
    return (
        <View>
            <Text>
                Sign Up 
            </Text>
            <Link href="/(auth)/sign-up" className="mt-4 px-4 py-2 bg-success text-white rounded">
                Sign In
            </Link>
        </View>
    );
}

export default SignUp;