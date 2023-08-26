import React, { useRef, useState } from "react";
import { View } from "react-native";
import FeedBackCard from "../FeedbackCard/FeedbackCard";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import BottomDrawer from "react-native-animated-bottom-drawer/src/bottomDrawer";
import { BottomDrawerMethods } from "react-native-animated-bottom-drawer";
import { FeedbackCard } from "../FeedbackCard/FeedbackCard.Interface";

export const FeedbackList = ({ type }: any) => {
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const feedbackData = [
    {
      imageUrl: "https://placekitten.com/250/250",
      createdFor: "Kate Morrison",
      feedbackFor: "Student",
      createdBy: "Created By Teacher",
      secondImageUrl: "https://baconmockup.com/250/250/",
      studentId: "@vaibhav",
      feedbackMessage:
        "Your child has shown remarkable improvement and progress in their academic performance.",
      feedbackDate: "15 July,2023",
      Status: "Delivered, not seen yet",
    },

    {
      imageUrl: "https://placekitten.com/250/250",
      createdFor: "Jenni Morrison",
      feedbackFor: "Teacher",
      createdBy: "Created By Student",
      secondImageUrl: "https://baconmockup.com/250/250/",
      studentId: "@vaibhav",
      feedbackMessage:
        "Your child has shown remarkable improvement and progress in their academic performance.",
      feedbackDate: "15 July,2023",
      Status: " seen ",
    },

    {
      imageUrl: "https://placekitten.com/250/250",
      createdFor: "Kate Morrison",
      feedbackFor: "Student",
      createdBy: "Created By Teacher",
      secondImageUrl: "https://baconmockup.com/250/250/",
      studentId: "@vaibhav",
      feedbackMessage:
        "Your child has shown remarkable improvement and progress in their academic performance.",
      feedbackDate: "15 July,2023",
      Status: "Delivered, not seen yet",
    },

    {
      imageUrl: "https://placekitten.com/250/250",
      createdFor: "Kate Morrison",
      feedbackFor: "Teacher",
      createdBy: "Created By Student",
      secondImageUrl: "https://baconmockup.com/250/250/",
      studentId: "@vaibhav",
      feedbackMessage:
        "Your child has shown remarkable improvement and progress in their academic performance.",
      feedbackDate: "15 July,2023",
      Status: " seen ",
    },
  ];

  function onFeedbackCardClick(item: any) {
    bottomDrawerRef.current?.open();
    setSelectedFeedback(item);
    console.log(item);
  }

  return (
    <View style={{ flex: 1, top: 10 }}>
      <ScrollView
        contentContainerStyle={{ display: "flex", gap: 8, width: "auto" }}
      >
        {feedbackData.map((item: FeedbackCard, index: number) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onFeedbackCardClick(item)}
          >
            <FeedBackCard {...item} />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>

      <BottomDrawer ref={bottomDrawerRef} initialHeight={250}>
        {selectedFeedback ? (
          <FeedBackCard {...(selectedFeedback as FeedbackCard)} />
        ) : (
          ""
        )}
      </BottomDrawer>
    </View>
  );
};
