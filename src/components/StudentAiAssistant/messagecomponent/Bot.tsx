import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../../styles/colors";
import * as Speech from 'expo-speech';
import { CopyIcon, Speaker, ThumsDown, ThumsUp } from "../../common/SvgComponent/SvgComponent";
import * as Clipboard from 'expo-clipboard';
import { ToastService } from "../../../services/ToastService";

function StreamingText({ text, streamDone }: any) {
  const [streamedText, setStreamedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setStreamedText((prevText: string) => prevText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(interval);
      }
      if (currentIndex >= text.length) {
        clearInterval(interval);
        streamDone(true);
      }
    }, 0); // Adjust the interval as needed (e.g., for faster or slower text rendering).

    return () => {
      clearInterval(interval);
    };
  }, [text, currentIndex]);

  return <>{streamedText}</>;
}

type BotProps = {
  text: string;
  stream: boolean | undefined;
  feedback: (message: any) => void;
  streamDone: (done: boolean) => void;
};

export const Bot: React.FC<BotProps> = ({ text, stream, feedback, streamDone }) => {
  // const [copiedText, setCopiedText] = React.useState('');

  const [copyButtonColor, setCopyButtonColor] = useState("#969696");
  const [likeButtonColor, setLikeButtonColor] = useState("#969696");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
    ToastService("Answer Copied.")
  };


  const readTheMessage = async () => {
    const thingToSay = text;
    if (await Speech.isSpeakingAsync()) {
      await Speech.stop();
    } else {
      Speech.speak(thingToSay);
    }
  }

  const setCopyButtonDark = () => {
    setCopyButtonColor(Colors.black_01);
    setTimeout(() => {
      setCopyButtonColor("#969696");
    }, 1500)
  }

  const setLikeButtonDark = () => {
    setLikeButtonColor(Colors.black_01);
    setTimeout(() => {
      setLikeButtonColor("#969696");
    }, 1500)
  }


  return (
    <>
      {text == 'typing' ?
        <Image style={{ height: 60, width: 60 }} source={require('../../../../assets/gifs/typing.gif')} /> :
        <>
          <View style={styles.rectangle}>
            <View style={styles.msg}>
              <TouchableOpacity onPress={readTheMessage} style={styles.speaker}>
                <Speaker height={20} width={20} fill={Colors.black_01} />
              </TouchableOpacity>
              <Text style={styles.text}>
                {stream ? <StreamingText streamDone={() => {streamDone(true)}} text={text} /> :
                  <Text>{text}</Text>
                }
              </Text>
            </View>
          </View>
          <View style={styles.feedbackSection} >
            <TouchableOpacity onPress={() => {
              feedback({BotAnswer: text,feedback: 'positive'});
              setLikeButtonDark();
              }}>
              <ThumsUp height={"20"} width={"20"} fill={likeButtonColor} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>{ 
              feedback({BotAnswer: text,feedback: 'negative'})
              }}>
              <ThumsDown height={"20"} width={"20"} fill={"#969696"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              copyToClipboard();
              setCopyButtonDark();
              }}>
              <CopyIcon height={"20"} width={"20"} fill={copyButtonColor} />
            </TouchableOpacity>
          </View>
        </>

      }
    </>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  msg: {
    position: 'relative',
    padding: 16,
    paddingRight: 40,
    paddingTop: 20,
    maxWidth: "80%",
    minWidth: "20%",
    backgroundColor: Colors.bot_message_bg,
    //   borderWidth: 1,
    //   borderColor: Colors.blue_01,
    borderBottomLeftRadius: 0,
    borderRadius: 19,
    // justifyContent:"center",
  },
  text: {
    color: Colors.black_05,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "400",
  },
  speaker: {
    position: "absolute",
    height: 24,
    width: 24,
    top: 10,
    right: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    padding: 3,
  },
  feedbackSection: {
    marginTop: 4,
    flexDirection: 'row',
    gap: 12
  }
});
