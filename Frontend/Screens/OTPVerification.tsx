import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Appearance,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';

import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { parse } from 'json'; // Assuming you have the 'json' package installed

type OTPVerificationProps = NativeStackScreenProps<
  RootStackParamList,
  'OTPVerification'
>;

const OTPVerification = ({route}: OTPVerificationProps) => {
  const {Number} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    const colorTheme = Appearance.getColorScheme();
    console.log(colorTheme);
    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  // const [state, setState] = useState({
  //   jwtToken: '',
  //   firstName: '',
  // });
  const [jwtToken, setJwtToken] = useState('');
  const [firstName, setFirstName] = useState('');
  const [otp, setOtp] = useState('');

  const verifyOpt = async () => {
    setLoading(true); // Indicate loading state

    try {
      const response = await axios.post(
        "https://erp.campuslabs.in/TEST/api/nure-student/v1/validateOTP",
        {
          "username": "",
          "password": "",
          "phoneNumber": `${Number}`,
          "oneTimePassword": `${otp}`
        }
      );
      console.log(otp);
      
      console.log(response.data.sCode);
      
      if(response.data.sCode === 2) {
        alert('Invalid OTP');
        return;
      }
      // console.log('Name fatched successfully');
      // await loginHandler();

      const response1 = await axios.post(
        "https://erp.campuslabs.in/TEST/api/nure-student/v1/signIn",
        {
          "username": `pankaj@campuslabs.in`,
          "password": "",
          "phoneNumber": ``,
          "oneTimePassword": ``
        }
      );
      // const jwtToken = await JSON.stringify(response1.data.jwtToken);
      // await setState({ jwtToken : await JSON.stringify(response1.data.jwtToken), firstName : await JSON.stringify(response1.data.resData.user.firstName)});

      // setState({jwtToken: jwtToken, firstName: firstName});
      const jwtToken = await JSON.stringify(response1.data.jwtToken);
      const firstName = await JSON.stringify(response1.data.resData.user.firstName);
      const userId = await JSON.stringify(response1.data.resData.user.appUserId);

      await AsyncStorage.setItem('jwtToken', jwtToken);
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('userId', userId);
      const Id = JSON.parse(await AsyncStorage.getItem('userId'));
      console.log(Id);
      
      navigation.replace('Dashboard', {token: jwtToken, name: firstName});
      // console.log(jwtToken);
      // console.log(firstName);
      
    } catch (error) {
      console.error('OTP veri error:', error);
      alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const loginHandler = async () => {
    setLoading(true); // Indicate loading state

    try {
      const response = await axios.post(
        "https://erp.campuslabs.in/TEST/api/nure-student/v1/signIn",
        {
          "username": `pankaj@campuslabs.in`,
          "password": "",
          "phoneNumber": ``,
          "oneTimePassword": ``
        }
      );
      const jwtToken = await JSON.stringify(response.data.jwtToken);
      const firstName = await JSON.stringify(response.data.resData.user.firstName);
      setState({jwtToken: jwtToken, firstName: firstName});
      // console.log(firstName);
      // await AsyncStorage.setItem('jwtToken', jwtToken);
      // await AsyncStorage.setItem('firstName', firstName);
      // navigation.replace('Dashboard');
    } catch (error) {
      console.error('Login handler error: ', error);
      alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  }



  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
        <View
          style={
            theme === 'light' ? mainStyle.subContainer : mainStyle.dSubContainer
          }>
          {!isLoading ? (
            <View
            style={
              theme === 'light'
                ? mainStyle.loginMainContainer
                : mainStyle.dLoginMainContainer
            }>
            <View style={{alignItems: 'center'}}>
              <Text
                style={
                  theme === 'light'
                    ? {
                        color: '#1d1d1d',
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginBottom: 5,
                      }
                    : {
                        color: '#eeeeee',
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginBottom: 5,
                      }
                }>
                Enter Verification Code
              </Text>
              <Text
                style={
                  theme === 'light'
                    ? {color: '#4d4d4d', fontSize: 17, marginBottom: 10}
                    : {color: '#bbb', fontSize: 17, marginBottom: 10}
                }>
                We have send 6 digit code to your mobile number...
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // sendEmail(state.email);
                  navigation.replace('LoginPage');
                }}>
                <Text
                  style={
                    theme === 'light'
                      ? {color: '#2196f3', fontSize: 20, marginBottom: 130}
                      : {color: '#98BAFC', fontSize: 20, marginBottom: 130}
                  }>
                  {"+91 "}{Number} {'  '}
                  <Icon
                    name="edit"
                    size={20}
                    color={theme === 'light' ? '#2196f3' : '#98BAFC'}
                  />
                </Text>
              </TouchableOpacity>
            </View>
            <View style={mainStyle.loginInputButtonContainer}>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.loginTextInput
                    : mainStyle.dLoginTextInput
                }>
                <TextInput
                  style={
                    theme == 'light'
                      ? mainStyle.loginInputText
                      : mainStyle.dLoginInputText
                  }
                  keyboardType="numeric"
                  placeholder="Enter Verification Code"
                  placeholderTextColor={theme === 'light' ? '#003f5c' : '#ccc'}
                  onChangeText={text => setOtp(text)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  verifyOpt();
                }}
                style={
                  theme === 'light'
                    ? mainStyle.loginButton
                    : mainStyle.dLoginButton
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.loginButtonText
                      : mainStyle.dLoginButtonText
                  }>
                  VERIFY OTP
                </Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={
                    theme === 'light'
                      ? {
                          height: 18,
                          width: 18,
                          backgroundColor: '#FAFAFA',
                          borderRadius: 50,
                          marginRight: 7,
                        }
                      : {
                          height: 18,
                          width: 18,
                          backgroundColor: '#23303C',
                          borderRadius: 50,
                          marginRight: 7,
                        }
                  }></View>
                <View
                  style={
                    theme === 'light'
                      ? {
                          height: 18,
                          width: 18,
                          backgroundColor: '#2196f3',
                          borderRadius: 50,
                        }
                      : {
                          height: 18,
                          width: 18,
                          backgroundColor: '#98BAFC',
                          borderRadius: 50,
                        }
                  }></View>
              </View>
            </View>
          </View> ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerification;
