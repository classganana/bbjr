import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { IconButton } from '../../components/common/IconButtonComponent/IconButton';
import { EditIconButton } from '../../components/common/IconButtonComponent/iconButtonStyle';
import {
  AboutIcon,
  ArrowIcon,
  ArrowLeft,
  ConditionIcon,
  ContactIcon,
  LeaderIcon,
  LogoutIcon,
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


export const SettingsPage = () => {
  // const [user, setUser] = useState<any>();
  const {user, setUser} = useUser()

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
    AsyncStorage.clear();
    navigation.navigate('Auth' as never);
    setUser({});
    console.log("Loggin Out");

  }

  useEffect(() => {
  }, []);

  const labels = [
    { title: 'View leaderboard', leftSvg: <LeaderIcon height={15} width={17} fill={'black'} /> },
    { title: 'Previous Test Scores', leftSvg: <ScoreIcon height={13} width={13} fill={'black'} /> },
    { title: 'Help and Support', leftSvg: <ContactIcon height={13} width={13} fill={'black'} /> },
    { title: 'Privacy', leftSvg: <PrivacyIcon height={14} width={14} fill={'black'} /> },
    { title: 'Terms and Conditions', leftSvg: <ConditionIcon height={14} width={11} fill={'black'} /> },
    { title: 'About', leftSvg: <AboutIcon height={14} width={5} fill={'black'} /> },
    { title: 'Log Out', leftSvg: <LogoutIcon height={15} width={14} fill={'black'} /> },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.heading}>
          <View style={styles.backButton}>
            <ArrowLeft height={25} width={25} fill={'black'} />
          </View>
          <View>
            <Text style={styles.headingTitle}>Settings</Text>
          </View>
        </View>
      </View>
      <View style={styles.DetailContainer}>
        <View style={styles.block1}>  
         <CircleInitials name={user?.name} size={100} />
          <View style={{ gap: 6 }}>
            <Text style={styles.name}>{user && user.name}</Text>
            <Text>{user && user.class} Class</Text>
            <Text>{user && user.school}</Text>
            <Text>{user && user.board} Board</Text>
          </View>
        </View>
        <View style={styles.block2}>
          <TouchableOpacity onPress={handleShare} style={styles.friend}>
            <ContactIcon height={15} width={16} fill={'black'} />
            <Text>Invite Friends</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <IconButton
              onPress={moveToEditProfile}
              className={EditIconButton}
              icon={<PencilIcon height={15} width={15} fill={'#fff'} />}
              label={'Edit Profile'}
              pos={'right'}
            />
          </View>
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
  );
};


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.primary,
    flex: 1,

  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,

  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20

  },
  headingTitle: {
    color: Colors.white,
    fontWeight: "500",
    fontSize: 14,
  },
  headingInfo: {
    fontWeight: '500',
  },
  DetailContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 32,
    flex: 1,

  },

  backButton: {
    height: 40,
    width: 40,
    borderRadius: 45,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  block1: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    gap: 32,
  },
  block2: {
    position: 'relative',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 40,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  button: {
    width: '50%',
    position: 'absolute',
    right: 0,
  },
  name: {
    color: '#2C2C2C',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 19.764,
  }
})

function moveToLeaderboard(): void {
  throw new Error('Function not implemented.')
}
