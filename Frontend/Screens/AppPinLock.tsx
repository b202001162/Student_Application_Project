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
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';

import {OtpInput} from 'react-native-otp-entry';
import OTPTextInput from 'react-native-otp-textinput';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

type AppPinLockProps = NativeStackScreenProps<RootStackParamList, 'AppPinLock'>;

const AppPinLock = ({navigation}: AppPinLockProps) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [number, setNumber] = useState();
  const [fullName, setFullName] = useState();
  const handleNumberChange = text => {
    // Regex to ensure only numbers are entered
    const cleanNumber = text.replace(/[^0-9]/g, '');

    // Limit number length to 10
    if (cleanNumber.length > 10) {
      alert('Number cannot exceed 10 digits');
      return; // Prevent further changes if max length is exceeded
    }

    setNumber(cleanNumber);
  };
  useEffect(() => {
    retrieveData();
    // requestStoragePermission();
    const colorTheme = Appearance.getColorScheme();
    console.log(colorTheme);
    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });
  const [isLoading, setLoading] = useState(false);

  const retrieveData = async () => {
    try {
      const value = await JSON.parse(
        await AsyncStorage.getItem('userFullName'),
      );
      if (value !== null) {
        setFullName(value);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong, please try again later.');
    }
  };

  // generate api call
  const generateOTP = async () => {
    if (number.length !== 4) {
      alert('Please enter a 4 digit pin');
      return;
    }
    setLoading(true);
    try {
      const Id = await JSON.parse(await AsyncStorage.getItem('userId'));
      await AsyncStorage.setItem(`pin${Id}`, number);
      navigation.replace('VerifyPinLock');
    } catch (error) {
      console.error(error);
      //   alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.clear();
    navigation.replace('LoginPage');
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
                      }
                    : {
                        color: '#eeeeee',
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginBottom: 150,
                      }
                }>
                Set Pin {'(4 digit)'} for {fullName}
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
                          marginBottom: 60,
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
                          marginBottom: 60,
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
                  <OTPTextInput
                    tintColor={theme === 'light' ? '#272D7A' : '#98BAFC'}
                    offTintColor={theme === 'light' ? '#6d6d6d' : '#aaa'}
                    inputCount={4}
                    handleTextChange={text => {
                      handleNumberChange(text);
                      console.log(text);
                    }}
                    handleCellTextChange={text => console.log(text)}
                    containerStyle={{
                      width: '100%',
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    textInputStyle={
                      theme === 'light'
                        ? {
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: '#272D7A',
                            height: 60,
                            width: 50,
                            textAlign: 'center',
                            color: '#1d1d1d',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }
                        : {
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: '#98BAFC',
                            height: 60,
                            width: 50,
                            textAlign: 'center',
                            color: '#eee',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }
                    }
                    autoFocus={true}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}>
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
                      generateOTP();
                    }}>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.loginButtonText
                          : mainStyle.dLoginButtonText
                      }>
                      SET PIN
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

export default AppPinLock;
