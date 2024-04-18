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
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import Icon from 'react-native-vector-icons/FontAwesome';

type VerifyPinLockProps = NativeStackScreenProps<
  RootStackParamList,
  'VerifyPinLock'
>;

const VerifyPinLock = ({navigation}: VerifyPinLockProps) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [number, setNumber] = useState();
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

  // generate api call
  const generateOTP = async () => {
    if (number.length !== 4) {
      alert('Please enter a 4 digit pin');
      return;
    }
    setLoading(true);
    try {
      //   await AsyncStorage.setItem('pin', number);
      const pin = await AsyncStorage.getItem('pin');
      if (pin === number) {
        navigation.replace('Dashboard', {name: 'User', token: 'token'});
      } else {
        alert('Invalid Pin, try again!');
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
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('currentLevelId');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('admissionId');
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
                Verify Pin {'(4 digit)'}
              </Text>
            </View>
            {!isLoading ? (
              <View style={mainStyle.loginInputButtonContainer}>
                <View
                  style={
                    theme === 'light'
                      ? mainStyle.loginTextInput
                      : {
                          height: 50,
                          width: '50%',
                          borderColor: '#ccc',
                          borderWidth: 1,
                          borderRadius: 5,
                          marginBottom: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingHorizontal: 5,
                          marginBottom: 60,
                        }
                  }>
                  <TextInput
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
                  />
                </View>
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? {
                          backgroundColor: '#2196f3',
                          borderRadius: 7,
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // padding: 20,
                          width: '35%',
                          paddingBottom: 10,
                          paddingTop: 10,
                          marginTop: 20,
                          marginBottom: 10,
                        }
                      : {
                          backgroundColor: '#98BAFC',
                          borderRadius: 50,
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // padding: 20,
                          width: '35%',
                          paddingBottom: 10,
                          paddingTop: 10,
                          marginTop: 20,
                          marginBottom: 10,
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
                    Verify
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => logoutHandler()}
                  style={
                    theme === 'light'
                      ? {
                          backgroundColor: '#EAEAEA',
                          borderRadius: 7,
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35%',
                          paddingBottom: 10,
                          paddingTop: 10,
                          marginTop: 5,
                        //   paddingLeft: 20,
                          flexDirection: 'row',
                        }
                      : {
                          backgroundColor: '#23303C',
                          borderRadius: 7,
                          height: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '35%',
                          paddingBottom: 10,
                          paddingTop: 10,
                          marginTop: 5,
                        //   paddingLeft: 20,
                          flexDirection: 'row',
                        }
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myProfileLogoutText
                        : mainStyle.dMyProfileLogoutText
                    }>
                    <Icon5
                      style={mainStyle.myProfileLogoutIcon}
                      name="sign-out-alt"
                      size={22}
                      color={theme === 'light' ? '#DB1313' : '#DD696B'}
                    />
                  </Text>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myProfileLogoutText
                        : mainStyle.dMyProfileLogoutText
                    }>
                    {' '}
                    LOGOUT
                  </Text>
                </TouchableOpacity>
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
