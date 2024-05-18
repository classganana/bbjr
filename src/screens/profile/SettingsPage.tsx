import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Image, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {
  AboutIcon,
  ConditionIcon,
  ContactIcon,
  EditProfilePicIcon,
  LogoutIcon,
  NewBackIcon,
  PencilIcon,
  PrivacyIcon,
  ScoreIcon,
  ShareIcon,
} from '../../components/common/SvgComponent/SvgComponent';
import { Colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Linking } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { StartButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';
import CircleInitials from '../../components/common/CircleInitials/CircleInitials';
import { httpClient } from '../../services/HttpServices';
import { ToastService } from '../../services/ToastService';

export const SettingsPage = () => {
  // const [user, setUser] = useState<any>();
  const {user, setUser} = useUser();
  console.log(user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dummyArray = [1, 2, 3, 4, 5, 6];
  const [selectedImage, setSelectedImage] = useState(1);

  const privacyUrl = 'http://eduzy.in/privacyPolicy';

  const navigation = useNavigation();

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const moveToEditProfile = () => {
      navigation.navigate('Profile' as never, { screen: 'EditProfile' } as never);
  };

  const moveToQuizHistory = () => {
    navigation.navigate('QuizHistory' as never);
  }

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Challenge yourself with this exciting quiz on Brain Booster Junior. Can you beat the top score? Let's grind it. Here's the app link: https://itoniclabs.in",
      });
            
      if (result.action === Share.sharedAction) {
        // Content was successfully shared

      } else if (result.action === Share.dismissedAction) {
        // Sharing was dismissed
      }
    } catch (error: any) {
      console.error('Error sharing content:', error.message);
    }
  };

  const moveToLeaderboard = () => {
    navigation.navigate('Leaderboard' as never);
  };

  const logout = () => {
    console.log("hihiih");
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: () => {
            AsyncStorage.clear();
            navigation.navigate('Auth' as never);
            setUser({});
            console.log("Loggin Out");
          }
        }
      ]
    );

  }

  const handleOpenBrowser = async () => {
    const url = 'http://eduzy.in/privacyPolicy'; // Replace this with your desired URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Don't know how to open URI: " + url);
    }
  };

  const handleTermsAndCondition = async () => {
    const url = 'http://eduzy.in/termsAndCondition'; // Replace this with your desired URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Don't know how to open URI: " + url);
    }
  };

  const handleSupportHelp = async () => {
    const url = 'http://eduzy.in/termsAndCondition'; // Replace this with your desired URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Don't know how to open URI: " + url);
    }
  };

  useEffect(() => {
    console.log(user);
  }, []);

  const labels = [
    // { title: 'View leaderboard', leftSvg: <LeaderIcon height={15} width={17} fill={'black'} /> },
    { title: 'Previous Test Scores', leftSvg: <ScoreIcon height={15} width={17} fill={'black'} /> },
    { title: 'Help and Support', leftSvg: <ContactIcon height={15} width={17} fill={'black'} /> },
    { title: 'Privacy', leftSvg: <PrivacyIcon height={15} width={17} fill={'black'} /> },
    { title: 'Terms and Conditions', leftSvg: <ConditionIcon height={15} width={17} fill={'black'} /> },
    { title: 'About', leftSvg: <AboutIcon height={15} width={17} fill={'black'} /> },
    { title: 'Log Out', leftSvg: <LogoutIcon height={15} width={17} fill={'black'} /> },
  ];

  const onBack = () => {
    navigation.navigate('DashboardNavigator' as never)
  }

  const toggleModal = (save?: boolean) => {
    setIsModalVisible(!isModalVisible);
    if (save) {
      const obj = {...user, avatarId: selectedImage.toString() };
      console.log(obj);
      setUser(obj);
      user?.userId && httpClient.patch(`users/${(user?.userId).toString()}`, {...obj})
      .then((data) => {
        if(data.status == 200) {
          setUser(obj);
          ToastService("User Avatar updated successfully");
        } else {
          ToastService("Something went wrong");
        }
      })
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.heading}>
           <TouchableOpacity onPress={() => onBack()} style={styles.backButton}>
            <NewBackIcon height={14} width={14} fill={'black'} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headingTitle}>Settings</Text>
          </View>
        </View>
      </View>
      <View style={styles.DetailContainer}>
        <View style={styles.block1}>
        {user && user?.avatarId ? <Image style={styles.avatarImage} source={{ uri: `https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f${user.avatarId}.png`}} />
                            : <CircleInitials name={user?.name} size={120} />}
          <TouchableOpacity onPress={() => toggleModal()} style={styles.editIconContainer}>
            <EditProfilePicIcon height={24} width={24} fill={'white'} />
          </TouchableOpacity>
         {/* <CircleInitials name={user?.name} size={100} /> b*/}
          {/* <View style={{ gap: 6 }}>
            <Text style={styles.name}>{user && user.name}</Text>
            <Text>{user && user.class} Class</Text>
            <Text>{user && user.school}</Text>
            <Text>{user && user.board} Board</Text>
          </View> */}
        </View>
        <View style={styles.block2}>
          <TouchableOpacity onPress={handleShare} style={styles.friend}>
            <ShareIcon height={16} width={16} fill={"#2947D4"} />
            <Text style={styles.friendText}>Invite Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={moveToEditProfile} style={styles.friend}>
            <ContactIcon height={20} width={16} fill={"#2947D4"} />
            <Text style={styles.friendText}>Edit Profile</Text>
          </TouchableOpacity>


          {/* <TouchableOpacity onPress={moveToEditProfile} style={styles.editProfile}>
            <Text style={{color: 'white'}}>View Complete Profile</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.optionList}>
        <View style={styles.optionHeading}>
          <Text style={styles.headingTitle}>Account</Text>
          <Text style={styles.headingInfo}>Your account and privacy details</Text>
        </View>
          {labels.map((buttonLabel, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (buttonLabel.title === 'View leaderboard') {
                  moveToLeaderboard();
                }
                if(buttonLabel.title === 'Log Out') {
                  logout();
                }
                if (buttonLabel.title === 'Previous Test Scores') {
                  moveToQuizHistory();
                }
                if (buttonLabel.title === 'Privacy') {
                  handleOpenBrowser();
                }
                if (buttonLabel.title === 'Terms and Conditions') {
                  handleTermsAndCondition();
                }
              }}
              style={styles.settionOptions}>
              {buttonLabel.leftSvg}
              <Text style={{fontSize: 16}} >{buttonLabel.title}</Text>
              <View style={{ position: 'absolute', right: 26, transform: [{ rotate: '180deg' }] }}>
                  <NewBackIcon accessible={true} accessibilityLabel={'Back Button'} height={14} width={14} fill={'black'} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => toggleModal()}
      >
        {/* source={{ uri: "https://d1n3r5qejwo9yi.cloudfront.net/assets/bot.gif" }} /> */}
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Choose your avatar</Text>
                <ScrollView contentContainerStyle={styles.avatarContainer}>
                  <TouchableOpacity onPress={() => handleImageClick(1)}>
                    <Image style={[styles.avatarImage, selectedImage === 1 && styles.selectedImage]} source={{uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f1.png'}}
                     />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleImageClick(2)}>
                    <Image style={[styles.avatarImage, selectedImage === 2 && styles.selectedImage]} source={{uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f2.png'}} />
                  </TouchableOpacity>                  
                  <TouchableOpacity onPress={() => handleImageClick(3)}>
                    <Image style={[styles.avatarImage, selectedImage === 3 && styles.selectedImage]} source={{uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f3.png'}} />
                  </TouchableOpacity>                  
                  <TouchableOpacity onPress={() => handleImageClick(4)}>
                    <Image style={[styles.avatarImage, selectedImage === 4 && styles.selectedImage]} source={{uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f4.png'}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleImageClick(5)}>
                    <Image style={[styles.avatarImage, selectedImage === 5 && styles.selectedImage]} source={{uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f5.png'}} />
                  </TouchableOpacity>                  
                  <TouchableOpacity onPress={() => handleImageClick(6)}>
                    <Image style={[styles.avatarImage, selectedImage === 6 && styles.selectedImage]} source={{uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f6.png'}} />
                  </TouchableOpacity>
                </ScrollView>
                <Button label={"Save"} disabled={!(selectedImage > 0 && selectedImage <= 6)} onPress={() => (toggleModal(true))}
              className={StartButton}
              ></Button>
            </View>
          </View>
      </Modal>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  selectedImage: {
    borderWidth: 2,
    borderColor: 'blue', // Add your desired border color here
  },
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: 60, // Make it circular
  },
  avatarContainer : {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    alignItems: 'center',
    height: "50%",
    justifyContent: 'center',

  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black', // Change the color if needed
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2947D4',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    display: 'flex',
    backgroundColor: Colors.settinBgColor,
    flex: 1,
  },
  header: {
    backgroundColor: Colors.settinBgColor,
    paddingHorizontal: 20,
    paddingVertical: 20,

  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  editIconContainer: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    position:"absolute", 
    left: "53%",
    top: "65%",
    padding: 6,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center'

  },
  optionList : {
    backgroundColor: Colors.white,
    flex: 1,
    gap: 10
  },
  optionHeading : {
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 26,
  },
  headingTitle: {
    color: Colors.black_05,
    fontWeight: "500",
    fontSize: 20
  },
  headingInfo: {
    fontWeight: '500',
  },
  DetailContainer: {
    backgroundColor: Colors.settinBgColor,
    // gap: 32,
    flex: 1,

  },
  settionOptions: {
     flexDirection: 'row',
     alignItems: 'center',
     gap: 20,
     marginHorizontal: 24,
     marginTop: 0,
     marginVertical: 5,
     borderWidth: 1,
     borderColor: Colors.gray_05,
     paddingVertical: 14,
     paddingHorizontal: 26,
     borderRadius: 14

  },

  backButton: {
    height: 48,
    width: 48,
    borderRadius: 25,
    // backgroundColor: Colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ProfileImage: {
    height: 125,
    width: 125,
    borderRadius: 100,
    backgroundColor: Colors.gray_05,
    paddingHorizontal: 20,

  },
  friend: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 16,
    alignItems: 'center',

  },
  friendText:{
    fontWeight: '600',
    color: "#2947D4",
    fontSize: 16
  },
  editProfile: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  block1: {
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
  },
  block2: {
    gap: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent:'space-around',
    // marginBottom: 15,
    marginVertical: 15
    // justifyContent: 'center',
  },
  button: {
    // width: '50%',
    // position: 'absolute',
    // right: 0,
  },
  name: {
    color: '#2C2C2C',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
  }
})

function moveToLeaderboard(): void {
  throw new Error('Function not implemented.')
}
