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

import Icon from 'react-native-vector-icons/FontAwesome';

type LoginPageProps = NativeStackScreenProps<RootStackParamList, 'LoginPage'>;

const LoginPage = ({navigation}: LoginPageProps) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [number, setNumber] = useState();
  const handleNumberChange = (text) => {
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
    setLoading(true);
    try {
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/generateOTP/${number}`,
      );
      console.log(response.data);
      navigation.replace('OTPVerification', {Number: number});
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
                Enter Your Mobile Number
              </Text>
              <Text
                style={
                  theme === 'light'
                    ? {color: '#4d4d4d', fontSize: 17, marginBottom: 150}
                    : {color: '#bbb', fontSize: 17, marginBottom: 150}
                }>
                We will send you confirmation code...
              </Text>
            </View>
            {!isLoading ? (
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
                    placeholder="Enter Mobile number"
                    placeholderTextColor={
                      theme === 'light' ? '#003f5c' : '#ccc'
                    }
                    onChangeText={handleNumberChange}
                  />
                </View>
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? mainStyle.loginButton
                      : mainStyle.dLoginButton
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
                    GET OTP
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View
                    style={
                      theme === 'light'
                        ? {
                            height: 18,
                            width: 18,
                            backgroundColor: '#2196f3',
                            borderRadius: 50,
                            marginRight: 7,
                          }
                        : {
                            height: 18,
                            width: 18,
                            backgroundColor: '#98BAFC',
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
                            backgroundColor: '#FAFAFA',
                            borderRadius: 50,
                          }
                        : {
                            height: 18,
                            width: 18,
                            backgroundColor: '#23303C',
                            borderRadius: 50,
                          }
                    }></View>
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

export default LoginPage;
