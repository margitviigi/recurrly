import { View, Text } from "react-native";
import React from "react";

const UpcomingSubscriptionCard = ({ data : { name, price, daysLeft, icon }}: UpcomingSubscription) => {
    return (
        <View className="upcoming-subscription-card">
            <View className="upcoming-subscription-card-header">
                <Text className="upcoming-subscription-card-title">Upcoming Subscription</Text>
                <Text className="upcoming-subscription-card-date">Next Renewal: 12/12/2023</Text>
            </View>
            <View className="upcoming-subscription-card-body">
                <Text className="upcoming-subscription-card-name">Netflix</Text>
                <Text className="upcoming-subscription-card-amount">$15.99</Text>
            </View>
        </View>
    );
}

export default UpcomingSubscriptionCard;