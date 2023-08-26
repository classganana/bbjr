import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { LoginButton, } from '../../components/common/ButttonComponent/ButtonStyles';
import { StackScreenProps } from '@react-navigation/stack';
import { Colors } from '../../styles/colors';

interface PasswordProps {
  onFieldChange: (text: string) => void;
}

const Password: React.FC<PasswordProps> = ({ onFieldChange }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleSend = () => {
    if (emailIsValid(email)) {
      navigation.navigate('OtpVerificationScreen' as never); // Navigate to "otb" stack screen
      console.log('Password Forgated');
    } else {
      setError(true);
    }
  };

  const emailIsValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 100,}}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.successText}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
      <TextInput
        style={{
          
          borderWidth: 1,
          //borderColor: Colors.dark_gray,
          borderStyle: "solid",
          width: "90%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: Colors.gray_01,
          padding: 18,
          gap: 10,
          borderRadius: 12,
          borderColor: error ? 'red' : 'gray',

        }}
        placeholder="Enter your email"
        key="inputKey"
        onChangeText={(text) => {
          setEmail(text);
          onFieldChange(text);
          setError(false); // Reset error when input changes
        }}
      />
      {error && <Text style={styles.title2}>Please provide a valid email address</Text>}
      <View style={styles.buttonContainer}>
      <TouchableOpacity>
        <Button
            onPress={handleSend}
            label={"Send Code"}
            className={LoginButton} disabled={false}          />
      </TouchableOpacity>
      </View>
    </View>
  );
};

 const PasswordScreen: React.FC<StackScreenProps<any, 'ForgotPassword'>> = ({ navigation }) => {
  const onFieldChange = (text: string) => {
    // Do something with the text value
  };

  return <Password onFieldChange={onFieldChange} />;
};
const styles = StyleSheet.create({
buttonContainer: {
   width: '90%',
  marginTop: 20,
},
title: {
  width: "90%",
  fontSize: 25,
  fontFamily: "Inter-ExtraBold",
  marginBottom:20
},
title2:{
  color: Colors.red,
  marginBottom:20,
  width:"90%" 
},
successText: {
  color: Colors.gray_02,
  display:"flex",
  fontFamily: "Inter-Regular",
  fontSize: 16,
  fontWeight: "500",
  marginBottom:32,
  width: "90%",
  flexDirection: "column",
  flexShrink: 0,
},

});
export default PasswordScreen;