import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BotIcon,
  ClockIcon,
  CrossIcon,
  NewBackIcon,
} from "../common/SvgComponent/SvgComponent";
import { Colors } from "../../styles/colors";
import { Constants } from "../../constants/constants";
import { navigateTo } from "../../utils/navigation.utils";
import { useNavigation } from "@react-navigation/native";
import { IconText } from "../common/IconText/IconText";
import { Button } from "../common/ButttonComponent/Button";
import {
  EditButton,
  PrimaryDefaultButton,
} from "../common/ButttonComponent/ButtonStyles";
import { useEffect, useState } from "react";
import Student from "../StudentAiAssistant/subjectbuttons/Subject";
import { TextStyles } from "../../styles/texts";

const BotIntroBody = () => {
  return (
    <>
      <View style={botIntroBodyStyles.container}>
        <View style={botIntroBodyStyles.bodyTitleContainer}>
          <Text style={botIntroBodyStyles.bodyTitle}>Welcome to the Ezy!</Text>
          <Text>
            Unlock the Power of AI to Find Solutions Tailored to Your Study
            Needs.
          </Text>
        </View>
        <View style={botIntroBodyStyles.highlightPoints}>
          <View style={botIntroBodyStyles.highlightPoint}>
            <IconText
              icon={<ClockIcon width={47} height={47} fill={Colors.primary} />}
              text="Great choice! You've selected Class III. 📚"
            />
          </View>
          <View style={botIntroBodyStyles.highlightPoint}>
            <IconText
              icon={<ClockIcon width={47} height={47} fill={Colors.primary} />}
              text="From now on, our answers and assistance will be tailored to Class III subjects and topics."
            />
          </View>
          <View style={botIntroBodyStyles.highlightPoint}>
            <IconText
              icon={<ClockIcon width={47} height={47} fill={Colors.primary} />}
              text="Feel free to ask questions related to your Class III curriculum, and we'll provide you with accurate and helpful information."
            />
          </View>
          <View style={botIntroBodyStyles.highlightPoint}>
            <IconText
              icon={<ClockIcon width={47} height={47} fill={Colors.primary} />}
              text="We're here to support your learning journey in Class III. Ask away!"
            />
          </View>
        </View>
      </View>
    </>
  );
};
const botIntroBodyStyles = StyleSheet.create({
  container: {
    display: "flex",
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  highlightPoints: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginVertical: 10,
  },
  highlightPoint: {
    display: "flex",
    flexDirection: "row",
    fontWeight: "400",
  },
  bodyTitleContainer: {
    marginVertical: 30,
    display: "flex",
    gap: 10,
  },
  bodyTitle: {
    fontSize: 18,
  },
});

const botIntroFooterStyles = StyleSheet.create({});

const Screen = ({ footer }: { footer: JSX.Element }) => {
  const navigation = useNavigation();
  const headerTitleText = Constants.BrandName;
  const headerTitleIcon = (
    <BotIcon width={26} height={26} fill={Colors.primary} />
  );
  const headerPrefixIcon = (
    <NewBackIcon
      accessible={true}
      accessibilityLabel={"Back Button"}
      width={15}
      height={15}
      fill={Colors.primary}
    />
  );
  const body = <BotIntroBody />;

  return (
    <View style={screenStyles.mainContainer}>
      <View style={screenStyles.header}>
        <TouchableOpacity onPress={navigateTo(navigation).navigateBack}>
          <View style={screenStyles.headerPrefixIcon}>{headerPrefixIcon}</View>
        </TouchableOpacity>
        <View style={screenStyles.headerTitleContainer}>
          <View style={screenStyles.headerTitleIcon}>{headerTitleIcon}</View>
          <Text style={screenStyles.headerTitleText}>{headerTitleText}</Text>
        </View>
      </View>
      <View style={screenStyles.body}>{body}</View>
      <View style={screenStyles.footer}>{footer}</View>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    paddingVertical: 30,
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  headerPrefixIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.primaryBackground,
    shadowColor: "#000000",
    shadowRadius: 2,
    borderRadius: 50,
  },
  headerTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  headerTitleIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleText: {
    fontSize: 18,
    lineHeight: 21.78,
    color: Colors.primary,
    fontWeight: "600",
  },
  body: {
    display: "flex",
    flexGrow: 1,
  },
  footer: {
    display: "flex",
  },
});

const BotIntro = ({
  selectedSubject,
  setSelectedSubjectAndMarkUser,
  onSubjectChange,
}: {
  selectedSubject: any;
  onSubjectChange: (selectedOption: any) => void;
  setSelectedSubjectAndMarkUser: (item: any) => void;
}) => {
  const [showSubjectSheet, setShowSelectedSubject] = useState(false);

  const BotIntroFooter = () => {
    return (
      <>
        <Button
          label={"Continue"}
          disabled={false}
          onPress={()=>setShowSelectedSubject(true)}
          className={PrimaryDefaultButton}
        />
      </>
    );
  };

  const Continue = () => {
    console.log(pressedSubject)
    if (pressedSubject) {
        setSelectedSubjectAndMarkUser(pressedSubject);
        setShowSelectedSubject(false);
        onSubjectChange(pressedSubject);
    }
  };

  const [pressedSubject, setPressedSubject] = useState<Record<string, any>>({})

  return (
    <View>
      <Screen footer={BotIntroFooter()} />
      <Modal
      style={{ borderRadius: 300 }}
      animationType="fade"
      transparent={true}
      visible={showSubjectSheet}
      onRequestClose={() => setShowSelectedSubject(false)}
    >
      <View style={{ backgroundColor: "rgba(0, 0, 0,0.3)", flex: 1}}>
        <View style={styles.bottomSheetContainer}>
          <Pressable
                accessibilityLabel={"Close Icon"}
                style={styles.crossCloseIcon}
                onPress={() => setShowSelectedSubject(false)}
              >
            <CrossIcon height={25} width={25} fill={"black"} />
          </Pressable>
          <View style={[styles.bottomSheet]}>
            <View
              style={{
                position: "relative",
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View>
                <View style={{ display: "flex" }}>
                  <Text style={TextStyles.heading}>Subject</Text>
                  <Text style={TextStyles.subText}>
                    Select a subject to proceed
                  </Text>
                </View>
                <View
                  style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: Colors.light_gray_05,
                  }}
                >
                  <Student
                    themeColor={true}
                    selectedSubject={setPressedSubject}
                    subject={selectedSubject?.subjectName}
                    scrollable={true}
                  />
                </View>
              </View>
              <View
                style={{
                  height: 60,
                  marginHorizontal: 10,
                }}
              >
                <Button
                  label={"Continue"}
                  disabled={!pressedSubject?.subjectName?.length}
                  className={EditButton}
                  onPress={() => Continue()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'scroll',
    paddingBottom: 0,
    padding: 20,
    display: "flex",
    flex: 1,
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    height: "60%",
    width: "100%",
  },
  crossCloseIcon: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "auto",
    marginRight: "auto",
    bottom: 0,
    margin: 10,
  }
});

export default BotIntro;
