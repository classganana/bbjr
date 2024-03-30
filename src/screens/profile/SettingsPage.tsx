import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Image } from 'react-native';
import {
  AboutIcon,
  ArrowIcon,
  ArrowLeft,
  ConditionIcon,
  ContactIcon,
  LeaderIcon,
  LogoutIcon,
  NewBackButton,
  PencilIcon,
  PrivacyIcon,
  ScoreIcon,
} from '../../components/common/SvgComponent/SvgComponent';
import { Colors } from '../../styles/colors';
import { httpClient } from '../../services/HttpServices';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircleInitials from '../../components/common/CircleInitials/CircleInitials';
import { Alert, Linking } from 'react-native';

export const SettingsPage = () => {
  // const [user, setUser] = useState<any>();
  const {user, setUser} = useUser()

  const privacyUrl = 'http://eduzy.in/privacyPolicy';

  const navigation = useNavigation();

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

  useEffect(() => {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.heading}>
           <TouchableOpacity onPress={() => onBack()} style={styles.backButton}>
            <NewBackButton height={14} width={14} fill={'black'} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headingTitle}>Settings</Text>
          </View>
        </View>
      </View>
      <View style={styles.DetailContainer}>
        <View style={styles.block1}>
          <Image source={require('../../../assets/users/f1.png')} />
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
            <ContactIcon height={15} width={16} fill={"#2947D4"} />
            <Text style={styles.friendText}>Invite Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.friend}>
            <ContactIcon height={15} width={16} fill={"#2947D4"} />
            <Text style={styles.friendText}>View Complete Profile</Text>
          </TouchableOpacity>


          {/* <TouchableOpacity onPress={moveToEditProfile} style={styles.editProfile}>
            <Text style={{color: 'white'}}>View Complete Profile</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.optionList}>
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
              }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 20, position: 'relative' }}>
              {buttonLabel.leftSvg}
              <Text>{buttonLabel.title}</Text>
              <View style={{ position: 'absolute', right: 0 }}>
                <ArrowIcon height={5} width={10} fill={'black'} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
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
  optionList : {
    backgroundColor: Colors.white,
    flex: 1,
    gap: 10

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

  backButton: {
    height: 25,
    width: 25,
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
    gap: 7,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16
  },
  friendText:{
    fontWeight: '600',
    color: "#2947D4"
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
    gap: 32,
  },
  block2: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: Colors.primary,
    alignItems: 'center',
    // justifyContent:'space-between',
    marginBottom: 10,
    justifyContent: 'center',
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
