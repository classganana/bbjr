import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Back,
  BotIcon,
  ClockIcon,
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
import { useState } from "react";
import Student from "../StudentAiAssistant/subjectbuttons/Subject";

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
    alignItems: "center",
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
  setSubjectAndCloseModal,
  onSubjectChange,
}: {
  selectedSubject: any;
  onSubjectChange: (selectedOption: any) => void;
  setSubjectAndCloseModal: (item: any) => void;
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
    console.log(selectedSubject)
    if (selectedSubject) {
        setShowSelectedSubject(false);
        onSubjectChange(selectedSubject);
    }
  };

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
        {/* <View style={{backgroundColor: 'rgba(0, 0, 0,0.4)', flex: 1,}}></View> */}
        <View style={{ backgroundColor: "rgba(0, 0, 0,0.3)", flex: 1 }}>
          <View style={styles.bottomSheetContainer}>
            <Student
              themeColor={true}
              selectedSubject={(item: any) => setSubjectAndCloseModal(item)}
              subject={selectedSubject?.subjectName}
            />
            <View
              style={{
                height: 60,
                marginHorizontal: 10,
              }}
            >
              <Button
                label={"Continue"}
                disabled={!selectedSubject?.subjectName.length}
                className={EditButton}
                onPress={() => Continue()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "75%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'scroll',
    paddingBottom: 0
  },
});

export default BotIntro;
