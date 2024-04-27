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
import Iconn from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { parse } from 'json'; // Assuming you have the 'json' package installed
import Timer from '../Components/Timer';

type ForgotPinProps = NativeStackScreenProps<RootStackParamList, 'ForgotPin'>;

const ForgotPin = ({route}: ForgotPinProps) => {
  const {Number, user} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [time, setTime] = useState('00:60');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [otpBannedTime, setOtpBannedTime] = useState(null);
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

  React.useEffect(() => {
    generateOTP();
    retrievingData();
    const interval = setInterval(() => {
      setSeconds(seconds => {
        if (seconds === 0 && minutes === 0) return 0;
        if (seconds === 0) {
          setMinutes(minutes => minutes - 1);
          return 59;
        }
        return seconds - 1;
      });
    }, 1000);

    // stop timer
    if (minutes <= 0 && seconds <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, []);

  const verifyOpt = async () => {
    setLoading(true); // Indicate loading state

    try {
      const response = await axios.post(
        'https://erp.campuslabs.in/TEST/api/nure-student/v1/validateOTP',
        {
          username: '',
          password: '',
          phoneNumber: `${Number}`,
          oneTimePassword: `${otp}`,
        },
      );
      console.log(otp);

      console.log(response.data);

      if(response.data.sCode === 2) {
        alert('Invalid OTP');
        return;
      }

      navigation.replace('AppPinLock');

    } catch (error) {
      console.error('OTP veri error:', error);
      alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const retrievingData = async () => {
    try {
      const oldNumber = await JSON.parse(
        await AsyncStorage.getItem('MobileNumber'),
      );
      if (oldNumber !== null) console.log(oldNumber);
      if (oldNumber !== null && oldNumber !== Number) {
        await AsyncStorage.setItem('Number', JSON.stringify(0));
        await AsyncStorage.setItem('otpBannedTime', JSON.stringify(null));
        return;
      }
      const otpBannedTime = await JSON.parse(
        await AsyncStorage.getItem('otpBannedTime'),
      );

      console.log(otpBannedTime);
      if (otpBannedTime !== null) {
        const currentTime = new Date();
        const diff = Math.abs(currentTime - otpBannedTime);
        const diffMinutes = Math.floor(diff / 60000);
        if (diffMinutes < 60) {
          alert(
            'You have reached the maximum limit of OTP resend. Try again after 1 hour.',
          );
        } else {
          await AsyncStorage.setItem('otpBannedTime', JSON.stringify(null));
          await AsyncStorage.setItem('Number', JSON.stringify(0));
        }
      }
      await setOtpBannedTime(otpBannedTime);
      const numberOfTimeResendPressed = parseInt(
        await JSON.parse(await AsyncStorage.getItem('Number')),
      );
      if (numberOfTimeResendPressed !== null && oldNumber !== null) {
        if (Number !== oldNumber) {
          await AsyncStorage.setItem('Number', JSON.stringify(0));
        } else if (numberOfTimeResendPressed > 3) {
          if (otpBannedTime === null) {
            await AsyncStorage.setItem(
              'otpBannedTime',
              JSON.stringify(new Date()),
            );
          }
          alert(
            'You have reached the maximum limit of OTP resend. Try again after 1 hour.',
          );
        }
      }
      const value = await AsyncStorage.getItem('jwtToken');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  const loginHandler = async () => {
    const userName = await JSON.parse(await AsyncStorage.getItem('userName'));
    // await AsyncStorage.setItem('userName', await JSON.stringify(userName));
    setLoading(true); // Indicate loading state

    try {
      const response1 = await axios.post(
        'https://erp.campuslabs.in/TEST/api/nure-student/v1/signIn',
        {
          username: `${userName}`,
          password: '',
          phoneNumber: ``,
          oneTimePassword: ``,
        },
      );
      // const jwtToken = await JSON.stringify(response1.data.jwtToken);
      // await setState({ jwtToken : await JSON.stringify(response1.data.jwtToken), firstName : await JSON.stringify(response1.data.resData.user.firstName)});

      // setState({jwtToken: jwtToken, firstName: firstName});
      const jwtToken = await JSON.stringify(response1.data.jwtToken);
      const refreshToken = await JSON.stringify(response1.data.refreshToken);
      const firstName = await JSON.stringify(
        response1.data.resData.user.firstName,
      );
      const userId = await JSON.stringify(
        response1.data.resData.user.appUserId,
      );
      const admissionId = await JSON.stringify(
        response1.data.resData.user.admissionId,
      );
      const lastName = await JSON.stringify(
        response1.data.resData.user.lastName,
      );

      const fullName = await JSON.stringify(
        response1.data.resData.user.firstName +
          ' ' +
          response1.data.resData.user.lastName,
      );

      await AsyncStorage.setItem('jwtToken', jwtToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('admissionId', admissionId);
      // await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('userFullName', fullName);
      const Id = JSON.parse(await AsyncStorage.getItem('userId'));
      console.log(Id);
      const pinExists = await AsyncStorage.getItem(`pin${Id}`);
      if (pinExists === null) navigation.replace('AppPinLock');
      else {
        navigation.replace('VerifyPinLock');
      }
    } catch (error) {
      console.error('Login handler error: ', error);
      alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const [profiles, setProfiles] = useState([]);
  const [optVerified, setOptVerified] = useState(false);

  const ProfileItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.myProfilesItemContainer
            : mainStyle.dMyProfilesItemContainer
        }>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => loginHandler(item.userName)}>
          <View style={{maxWidth: '85%'}}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myProfilesItemTitle
                  : mainStyle.dMyProfilesItemTitle
              }>
              {item.userName}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myProfilesItemDetails
                  : mainStyle.dMyProfilesItemDetails
              }>
              {`${item.firstName} ${item.lastName}`}
            </Text>
          </View>
          <Iconn
            style={(mainStyle.headerIcon, {position: 'absolute', right: 10})}
            name="circle-chevron-right"
            size={20}
            color={theme === 'light' ? '#3d3d3d' : '#ccc'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const generateOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/generateOTP/${Number}`,
      );
      console.log(response.data);
    //   navigation.replace('OTPVerification', {Number: number});
    } catch (error) {
      console.error(error);
      alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const reSendOTP = async () => {
    setLoading(true);
    await AsyncStorage.setItem('MobileNumber', JSON.stringify(Number));
    let getNumberOfTimesResendPressed = await AsyncStorage.getItem('Number');
    console.log(getNumberOfTimesResendPressed);

    let numberOfTimeResendPressed = 0;
    if (getNumberOfTimesResendPressed !== null) {
      numberOfTimeResendPressed = parseInt(getNumberOfTimesResendPressed) + 1;
      await AsyncStorage.setItem(
        'Number',
        JSON.stringify(numberOfTimeResendPressed),
      );
    }
    console.log(numberOfTimeResendPressed);

    if (numberOfTimeResendPressed > 3) {
      alert(
        'You have reached the maximum limit of OTP resend. Please try again later.',
      );
      return;
    }
    try {
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/generateOTP/${Number}`,
      );
      console.log(response.data);
      // navigation.replace('ForgotPin', {Number: number});
    } catch (error) {
      console.error(error);
      alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
        <View
          style={
            theme === 'light' ? mainStyle.subContainer : mainStyle.dSubContainer
          }>
          {!optVerified ? (
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
                  Reset Pin for {user}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? {color: '#4d4d4d', fontSize: 17, marginBottom: 10, textAlign: 'center'}
                      : {color: '#bbb', fontSize: 17, marginBottom: 10, textAlign: 'center'}
                  }>
                  We have send 6 digit code to {'\n'} your registered mobile number...
                </Text>
              </View>
              <View
                style={[mainStyle.loginInputButtonContainer, {marginTop: 100}]}>
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
                    placeholderTextColor={
                      theme === 'light' ? '#003f5c' : '#ccc'
                    }
                    onChangeText={text => setOtp(text)}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  {otpBannedTime === null ? (
                    <>
                      {seconds === 0 && minutes === 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            setMinutes(0);
                            setSeconds(60);
                            reSendOTP();
                          }}
                          style={
                            theme === 'light'
                              ? [
                                  mainStyle.loginButton,
                                  {
                                    backgroundColor: 'transparent',
                                    borderColor: '#272D7A',
                                    borderWidth: 1.5,
                                    borderRadius: 5,
                                    width: 'auto',
                                    padding: 10,
                                    paddingHorizontal: 25,
                                  },
                                ]
                              : [
                                  mainStyle.dLoginButton,
                                  {
                                    backgroundColor: 'transparent',
                                    borderColor: '#98BAFC',
                                    borderWidth: 1.5,
                                    borderRadius: 5,
                                    width: 'auto',
                                    padding: 10,
                                    paddingHorizontal: 25,
                                  },
                                ]
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? [
                                    mainStyle.loginButtonText,
                                    {color: '#272D7A'},
                                  ]
                                : [
                                    mainStyle.dLoginButtonText,
                                    {color: '#98BAFC'},
                                  ]
                            }>
                            RESEND OTP
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <Text>
                          Resend button available in{' '}
                          <Text style={{fontWeight: 'bold'}}>
                            {minutes.toString().padStart(2, '0')}:
                            {seconds.toString().padStart(2, '0')}
                          </Text>
                        </Text>
                      )}
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
                    </>
                  ) : null}
                </View>
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
                            backgroundColor: '#272D7A',
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
            </View>
          ) : (
            <></>
          )}
          {optVerified && !isLoading ? (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: 20,
                }}>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.profileTitleText
                      : mainStyle.dProfileTitleText
                  }>
                  User Profiles
                </Text>
              </View>
              <FlatList
                data={profiles}
                renderItem={({item}) => <ProfileItem item={item} />}
                contentContainerStyle={mainStyle.flatListStyle}
                keyExtractor={item => item.appUserId} // Use unique IDs for performance
                ItemSeparatorComponent={() => (
                  <View style={mainStyle.separator} />
                )}
                // ListHeaderComponent={() => (
                //   <Text style={mainStyle.header}>Courses</Text>
                // )}
              />
            </View>
          ) : (
            <></>
          )}
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPin;
