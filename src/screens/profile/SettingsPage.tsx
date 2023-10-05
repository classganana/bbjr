import React, { useEffect, useState } from 'react'
import { View, Text, Platform, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { IconButton } from '../../components/common/IconButtonComponent/IconButton'
import { defaultIconButton, EditIconButton } from '../../components/common/IconButtonComponent/iconButtonStyle'
import { AboutIcon, ArrowIcon, ArrowLeft, ConditionIcon, ContactIcon, CrossIcon, LeaderIcon, LogoutIcon, PencilIcon, PrivacyIcon, ScoreIcon } from '../../components/common/SvgComponent/SvgComponent'
import { Constants } from '../../constants/constants'
import { Colors } from '../../styles/colors'
import { httpClient } from '../../services/HttpServices'

export const SettingsPage = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
      httpClient.get('users/johndoe123').then((res) => {
          setUser(res.data);
      }).catch(() => {
        console.log("Something went wrong")
      })    
  },[])

  const labels = [
    { title: 'View leader board', leftSvg: <LeaderIcon height={'15'} width={'17'} fill={'black'} /> },
    { title: 'Previous Test Scores', leftSvg: <ScoreIcon height={'13'} width={'13'} fill={'black'} /> },
    { title: 'Help and Support', leftSvg: <ScoreIcon height={'13'} width={'13'} fill={'black'} /> },
    { title: 'Privacy', leftSvg: <PrivacyIcon height={'14'} width={'14'} fill={'black'} /> },
    { title: 'Terms and Condition', leftSvg: <ConditionIcon height={'14'} width={'11'} fill={'black'} /> },
    { title: 'About', leftSvg: <AboutIcon height={'14'} width={'5'} fill={'black'} /> },
    { title: 'Log Out', leftSvg: <LogoutIcon height={'15'} width={'14'} fill={'black'} /> },
  ]
  const [selectedButton, setSelectedButton] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.heading}>
          <View style={styles.backButton}>
            <ArrowLeft height={'25'} width={'25'} fill={'black'} />
          </View>

          <View>
            <Text style={styles.headingTitle}>Setting</Text>
          </View>
        </View>
      </View>
      <View style={styles.DetailContainer}>
        <View style={styles.ProfileImage}></View>
        <Text>{user && user.name}</Text>
        <View style={styles.block2}>
          <View style={styles.friend}>
            <ContactIcon height={'15'} width={'16'} fill={''} />
            <Text>Invite Friends</Text>
          </View>
          <View style={styles.button}>
            <IconButton onPress={function (): void {
              throw new Error('Function not implemented.')
            }} className={EditIconButton} icon={<PencilIcon height={'15'} width={'15'} fill={'#fff'} />} label={'Edit Profile'} pos={'right'} backgroundColor={'#006B7F'}></IconButton>
          </View>
        </View>
        {labels.map((buttonLabel, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedButton(index)} style={{ flexDirection: 'row', alignItems: 'center', gap: 20,position:'relative' }}>
            {buttonLabel.leftSvg}
            <Text>{buttonLabel.title}</Text>
            <View style={{position:'absolute', right:0}}>
              <ArrowIcon height={'5'} width={'10'} fill={'black'} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.primary,


  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,

  },
  heading: {
    // display: 'flex',
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
    height: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 32,

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
    // position: 'relative',
    paddingHorizontal: 20,

  },
  friend: {
    flexDirection: 'row',
    gap: 7,
    // position: 'relative',
    // borderBottomWidth: 1
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
  }
})