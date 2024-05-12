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

import {OtpInput} from 'react-native-otp-entry';
import OTPTextInput from 'react-native-otp-textinput';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import Icon from 'react-native-vector-icons/FontAwesome';

type VerifyPinLockProps = NativeStackScreenProps<
  RootStackParamList,
  'VerifyPinLock'
>;

const VerifyPinLock = ({navigation}: VerifyPinLockProps) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [number, setNumber] = useState();
  const [userFullName, setUserFullName] = useState('');
  const handleNumberChange = text => {
    // Regex to ensure only numbers are entered
    const cleanNumber = text.replace(/[^0-9]/g, '');

    // Limit number length to 10
    if (cleanNumber.length > 4) {
      alert('Number cannot exceed 10 digits');
      return; // Prevent further changes if max length is exceeded
    }

    setNumber(cleanNumber);
  };
  useEffect(() => {
    // requestStoragePermission();
    // retriveData();
    const colorTheme = Appearance.getColorScheme();
    console.log(colorTheme);
    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);
  const [isLoading, setLoading] = useState(false);

  // generate api call
  const verifyPin = async () => {
    if (number.length !== 4) {
      alert('Please enter a 4 digit pin');
      return;
    }
    setLoading(true);
    try {
      //   await AsyncStorage.setItem('pin', number);
      const Id = await AsyncStorage.getItem('userId');
      const pin = await AsyncStorage.getItem(`pin${Id}`);
      if (pin === number) {
        navigation.replace('Dashboard', {name: 'User', token: 'token'});
      } else {
        alert('Invalid Pin, try again!');
        let numberOfAttempts = await JSON.parse(
          await AsyncStorage.getItem(`numberOfAttempts${Id}`),
        );
        if (numberOfAttempts === null) {
          numberOfAttempts = 1;
          await AsyncStorage.setItem(
            `numberOfAttempts${Id}`,
            JSON.stringify(numberOfAttempts),
          );
        } else {
          numberOfAttempts += 1;
          await AsyncStorage.setItem(
            `numberOfAttempts${Id}`,
            JSON.stringify(numberOfAttempts),
          );
          if (numberOfAttempts >= 5) {
            alert(
              'You have reached maximum attempts, please try again 1 hour later.',
            );
            await AsyncStorage.setItem(
              `numberOfAttemptsBanned${Id}`,
              JSON.stringify(true),
            );
            let bannedDate = await JSON.parse(
              await AsyncStorage.getItem(`numberOfAttemptsBannedTime${Id}`),
            );
            if (bannedDate === null) {
              await AsyncStorage.setItem(
                `numberOfAttemptsBannedTime${Id}`,
                JSON.stringify(new Date()),
              );
            } else {
              bannedDate = new Date(bannedDate);
              const currentDate = new Date();
              const difference = currentDate - bannedDate;
              if (difference > 60000) {
                await AsyncStorage.removeItem(`numberOfAttemptsBanned${Id}`);
                await AsyncStorage.removeItem(
                  `numberOfAttemptsBannedTime${Id}`,
                );
                await AsyncStorage.removeItem(`numberOfAttempts${Id}`);
              }
            }
            // await AsyncStorage.clear();
            // navigation.replace('LoginPage');
          }
        }
        return;
      }
    } catch (error) {
      console.error(error);
      //   alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    // await AsyncStorage.clear();
    // navigation.replace('LoginPage');
    navigation.replace('SwitchAccount');
  };

  React.useEffect(() => {
    retriveData();
  }, []);

  const retriveData = async () => {
    setLoading(true);
    try {
      const Id = await JSON.parse(await AsyncStorage.getItem('userId'));
      const numberOfAttemptsBanned = await JSON.parse(
        await AsyncStorage.getItem(`numberOfAttemptsBanned${Id}`),
      );
      if (numberOfAttemptsBanned) {
        alert(
          'You have reached maximum attempts, please try again 1 hour later.',
        );
        let bannedDate = await JSON.parse(
          await AsyncStorage.getItem(`numberOfAttemptsBannedTime${Id}`),
        );
        if (bannedDate === null) {
          await AsyncStorage.setItem(
            `numberOfAttemptsBannedTime${Id}`,
            JSON.stringify(new Date()),
          );
        } else {
          bannedDate = new Date(bannedDate);
          const currentDate = new Date();
          const difference = currentDate - bannedDate;
          if (difference > 60000) {
            await AsyncStorage.removeItem(`numberOfAttemptsBanned${Id}`);
            await AsyncStorage.removeItem(`numberOfAttemptsBannedTime${Id}`);
            await AsyncStorage.removeItem(`numberOfAttempts${Id}`);
          }
        }
        // await AsyncStorage.clear();
        // navigation.replace('LoginPage');
      }
      if (Id === null) {
        await AsyncStorage.clear();
        navigation.replace('LoginPage');
      }
      const pin = await JSON.parse(await AsyncStorage.getItem(`pin${Id}`));
      if (pin === null) {
        await AsyncStorage.clear();
        navigation.replace('LoginPage');
      }
      const userFullName =
        (await AsyncStorage.getItem('userFullName')) || 'User';
      await setUserFullName(userFullName);
    } catch (e) {
      console.log('Error retrieving data' + e);
    } finally {
      setLoading(false);
    }
  };

  const forgotPinHandler = async () => {
    setLoading(true);
    try {
      const mobileNumber = await JSON.parse(
        await AsyncStorage.getItem('mobileNumber'),
      );
      console.log(mobileNumber);

      navigation.replace('ForgotPin', {
        Number: mobileNumber,
        user: userFullName,
      });
      // await AsyncStorage.removeItem(`pin${Id}`);
      // navigation.replace('AppPinLock');
    } catch (error) {
      console.error(error);
      //   alert('Something went wrong, please try again later.');
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
                        marginBottom: 150,
                        textAlign: 'center',
                      }
                    : {
                        color: '#eeeeee',
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginBottom: 150,
                        textAlign: 'center',
                      }
                }>
                {!isLoading ? <Text>{userFullName}</Text> : null}
                {'\n'}Verify Pin {'(4 digit)'}
              </Text>
            </View>
            {!isLoading ? (
              <View style={mainStyle.loginInputButtonContainer}>
                <View
                  style={
                    theme === 'light'
                      ? {
                          height: 50,
                          width: '70%',
                          borderRadius: 5,
                          marginBottom: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingHorizontal: 5,
                          marginBottom: 20,
                        }
                      : {
                          height: 50,
                          width: '70%',
                          borderRadius: 5,
                          marginBottom: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingHorizontal: 5,
                          marginBottom: 20,
                        }
                  }>
                  {/* <TextInput
                    style={
                      theme == 'light'
                        ? {
                            ...mainStyle.loginInputText,
                            width: '50%',
                          }
                        : {
                            ...mainStyle.dLoginInputText,
                            width: '50%',
                          }
                    }
                    keyboardType="numeric"
                    placeholder="Enter Pin"
                    placeholderTextColor={
                      theme === 'light' ? '#003f5c' : '#ccc'
                    }
                    onChangeText={handleNumberChange}
                  /> */}
                  {/* <OtpInput
                    onPress={() => {
                      navigation.replace('VerifyPinLock');
                    }}
                    numberOfDigits={4}
                    focusColor="green"
                    // focusStickBlinkingDuration={500}
                    onTextChange={text => handleNumberChange(text)}
                    // onFilled={text => verifyOpt()}
                    textInputProps={{
                      accessibilityLabel: 'Pin Input',
                    }}
                    focusStickBlinkingDuration={500}
                    theme={{
                      containerStyle: {
                        width: '100%',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                      pinCodeContainerStyle: {
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'gray',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 5,
                      },
                      pinCodeTextStyle: {
                        fontSize: 20,
                        color: 'black',
                      },
                      focusStickStyle: {
                        width: 2,
                        height: 20,
                        backgroundColor: 'black',
                      },
                      focusedPinCodeContainerStyle: {
                        borderColor: 'green',
                      },
                    }}
                    autoFocus
                  /> */}
                  <OTPTextInput 
                  tintColor={theme === 'light' ? '#272D7A' : '#98BAFC'}
                  offTintColor={theme === 'light' ? '#6d6d6d' : '#aaa'}
                  inputCount={4}
                  handleTextChange={text =>{ handleNumberChange(text); console.log(text)}}
                  handleCellTextChange={text => console.log(text)}
                  containerStyle={{width: '100%', justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center'}}
                  textInputStyle={theme === 'light' ? {borderWidth: 1, borderRadius: 10, borderColor: '#272D7A', height: 60, width: 50, textAlign: 'center', color: "#1d1d1d", fontSize: 20, fontWeight: 'bold'} : {borderWidth: 1, borderRadius: 10, borderColor: '#98BAFC', height: 60, width: 50, textAlign: 'center', color: "#eee", fontSize: 20, fontWeight: 'bold'}}
                  autoFocus={true}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    forgotPinHandler();
                  }}>
                  <Text
                    style={
                      theme === 'light'
                        ? {
                            color: '#272D7A',
                            fontSize: 20,
                            fontWeight: 'semibold',
                            // marginLeft: 10,
                            marginBottom: 50,
                          }
                        : {
                            color: '#98BAFC',
                            fontSize: 20,
                            fontWeight: 'semibold',
                            // marginLeft: 10,
                            marginBottom: 50,
                          }
                    }>
                    Forgot Pin?
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                    onPress={() => logoutHandler()}
                    style={
                      theme === 'light'
                        ? {
                            backgroundColor: 'transparent',
                            borderRadius: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // width: '35%',
                            paddingBottom: 10,
                            paddingTop: 10,
                            marginTop: 5,
                            //   paddingLeft: 20,
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            borderColor: '#272D7A',
                            borderWidth: 1.5,
                          }
                        : {
                            backgroundColor: 'transparent',
                            borderRadius: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // width: 's',
                            paddingBottom: 10,
                            paddingTop: 10,
                            marginTop: 5,
                            //   paddingLeft: 20,
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            borderColor: '#98BAFC',
                            borderWidth: 1.5,
                          }
                    }>
                    <Text
                      style={
                        theme === 'light'
                          ? [
                              mainStyle.myProfileLogoutText,
                              {
                                color: '#272D7A',
                              },
                            ]
                          : [
                              mainStyle.dMyProfileLogoutText,
                              {
                                color: '#98BAFC',
                              },
                            ]
                      }>
                      Switch Account?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      theme === 'light'
                        ? {
                            backgroundColor: '#272D7A',
                            borderRadius: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // padding: 20,
                            // width: '35%',
                            paddingBottom: 10,
                            paddingTop: 10,
                            marginTop: 20,
                            marginBottom: 10,
                            paddingHorizontal: 35,
                          }
                        : {
                            backgroundColor: '#98BAFC',
                            borderRadius: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // padding: 20,
                            // width: '35%',
                            paddingBottom: 10,
                            paddingTop: 10,
                            marginTop: 20,
                            marginBottom: 10,
                            paddingHorizontal: 35,
                          }
                    }
                    onPress={() => {
                      verifyPin();
                    }}>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.loginButtonText
                          : mainStyle.dLoginButtonText
                      }>
                      Verify
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <ActivityIndicator size="large" color="#2196f3" />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyPinLock;
