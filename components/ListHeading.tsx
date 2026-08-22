import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ListHeading = ({ title, onViewAllPress }: ListHeadingProps) => {
  return (
    <View className="list-head">
      <Text className="list-title">{title}</Text>
      {onViewAllPress && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`View all ${title.toLowerCase()}`}
          className="list-action"
          onPress={onViewAllPress}
        >
          <Text className="list-action-text">View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListHeading;
