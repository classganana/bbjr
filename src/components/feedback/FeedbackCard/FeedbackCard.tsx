import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./FeedbackCardStyles";

interface itemProps {
  imageUrl: string;
  secondImageUrl: string;
  createdFor: string;
  feedbackFor: string;
  createdBy: string;
  studentId: string;
  feedbackDate: string;
  Status: string;
  feedbackMessage: string;
}

export const FeedBackCard: React.FC<itemProps> = ({
  imageUrl,
  secondImageUrl,
  createdFor,
  feedbackFor,
  createdBy,
  studentId,
  feedbackDate,
  Status,
  feedbackMessage,
}) => {
  return (
    <View style={styles.rectangle}>
      <View style={styles.image}>
        <View style={styles.container}>
          <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
          <Text style={styles.text}>{createdFor}</Text>
          <DotSeparator />
          <Text style={styles.role}>{feedbackFor}</Text>
        </View>
        <Text style={styles.text1}>{createdBy}</Text>
      </View>
      {/* <View style={styles.imageContainer}>
          <Image source={{ uri: secondImageUrl }} style={styles.imageStyle} />
          <Text style={styles.secondProfileName}>{studentId}</Text>
        </View> */}
      <View>
        <View style={styles.Feedback}>
          <Text>{feedbackMessage}</Text>
          <Image
            style={{ width: 30, height: 25, top: 8 }}
            source={require("../../../../assets/png/Silver.png")}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.date}>{feedbackDate}</Text>
        <Text style={styles.status}>{Status}</Text>
      </View>
    </View>
  );
};

const DotSeparator: React.FC = () => {
  return (
    <View style={styles.dotSeparator}>
      <View style={styles.dot} />
    </View>
  );
};

export default FeedBackCard;
