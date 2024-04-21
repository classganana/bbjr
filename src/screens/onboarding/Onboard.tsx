import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../styles/colors";
import { ArrowLeft } from "../../components/common/SvgComponent/SvgComponent";
import { Button } from "../../components/common/ButttonComponent/Button";
import {
  FlatDefaultButton,
  PrimaryDefaultButton,
} from "../../components/common/ButttonComponent/ButtonStyles";
import { useNavigation } from "@react-navigation/native";

export const Onboard = () => {
  const navigation = useNavigation();
  const [slideWidth, setSlideWidth] = useState(Dimensions.get("window").width);
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    {
      image: require("../../../assets/gifs/quizzes.gif"),
      title: "Personalized Quizzes",
      info: "Combining the best of AI and language science, lessons are tailored to help you learn at just the right level and pace.",
    },
    {
      image: require("../../../assets/gifs/doubt.gif"),
      title: "The free, fun, and effective way to solve doubts!",
      info: "Learning with Eduzy is fun, and research shows that it works.",
    },
    {
      image: require("../../../assets/gifs/examprep.gif"),
      title: "Fun & Effective Exam Preparation",
      info: "Learning with Eduzy is fun, and research shows that it works.",
    },
  ];

  useEffect(() => {
    const handleLayout = () => {
      setSlideWidth(Dimensions.get("window").width);
    };
    const listenerSubscription = Dimensions.addEventListener(
      "change",
      handleLayout
    );
    return () => {
      listenerSubscription.remove();
    };
  }, []);

  const scrollViewRef = useRef<ScrollView>(null);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / slideWidth);
    setCurrentSlide(index);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: index * slideWidth, animated: true });
    setCurrentSlide(index);
  };
  const nextSlide = () => {
    scrollToIndex(currentSlide + 1);
  };

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.carouselScrollViewContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          ref={scrollViewRef}
          style={styles.carouselScrollView}
        >
          {data.map((slideData, index) => {
            return (
              <View
                style={[styles.slide, { width: slideWidth }]}
                key={slideData.title + index}
              >
                <View style={styles.slideImageContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.slideImage}
                    source={slideData.image}
                  />
                </View>
                <View style={styles.slideData}>
                  <Text style={styles.slideTitle}>{slideData.title}</Text>
                  <Text style={styles.slideDescription}>{slideData.info}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.carouselFooter}>
        <View style={styles.carouselProgressDots}>
          {Array.from({ length: data.length })
            .fill(0)
            .map((ele, index) => {
              return (
                <View
                  style={[
                    styles.carouselProgressDot,
                    index === currentSlide && styles.activeCarouselProgressDot,
                  ]}
                  key={"carouselDot" + index}
                ></View>
              );
            })}
        </View>
        <View style={styles.carouselActions}>
          {data.length - 1 !== currentSlide ? (
            <>
              <TouchableOpacity accessible={true}
                  accessibilityLabel="next" onPress={nextSlide} style={styles.carouselNext}>
                <ArrowLeft height={24} width={24} fill={"white"} />
              </TouchableOpacity>
              <Button
                label={"Skip"}
                disabled={false}
                onPress={function (): void {
                  navigation.navigate("Auth" as never);
                }}
                className={FlatDefaultButton}
                accessible={true}
                accessibilityLabel={"Skip Introduction"}
                accessibilityRole={"button"}
              />
            </>
          ) : (
            <Button
              label={"Let's Start"}
              disabled={false}
              onPress={function (): void {
                navigation.navigate("Auth" as never);
              }}
              className={PrimaryDefaultButton}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
    gap: 5,
  },
  carouselScrollViewContainer: {
    display: "flex",
    borderColor: Colors.primary,
    overflow: "hidden",
    width: "100%",
    alignItems: "center",
    flex: 3,
  },
  carouselFooter: {
    padding: 10,
    minHeight: "25%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 30,
    alignItems: "center",
    width: "100%",
  },
  carouselScrollView: {
    width: "100%",
  },
  carouselActions: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
  slide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 30,
    flex: 1,
  },
  slideImageContainer: {
    width: "100%",
    flex: 2,
  },
  slideImage: {
    width: "100%",
    height: "100%",
  },
  slideData: {
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  slideTitle: {
    color: Colors.black_08,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  slideDescription: {
    textAlign: "center",
    color: Colors.gray_18,
    lineHeight: 24,
    fontSize: 14,
  },

  carouselProgressDots: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  carouselProgressDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    opacity: 0.5,
  },
  activeCarouselProgressDot: {
    width: 27,
    opacity: 1,
  },
  carouselNext: {
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 56,
    transform: [{ rotate: "180deg" }],
  },
});
