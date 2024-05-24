import React, {useEffect, useState, useRef} from 'react';
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
  Image,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import Logo from '../Logo/Logo.png';

import Icon from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
import {CountryPicker} from 'react-native-country-codes-picker';

type LoginPageProps = NativeStackScreenProps<RootStackParamList, 'LoginPage'>;

const LoginPage = ({navigation}: LoginPageProps) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [number, setNumber] = useState();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [baseURL, setBaseURL] = useState();
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

  const retrievingData = async () => {
    const baseURL = await JSON.parse(await AsyncStorage.getItem('baseURL'));
    console.log(baseURL);
    
    if (baseURL === null) {
      navigation.replace('LandingPage');
    } else {
      await setBaseURL(baseURL);
    }
  };

  useEffect(() => {
    retrievingData();
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
    if (number.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }
    setLoading(true);
    let url = baseURL + `/nure-student/v1/generateOTP/${number}`;
    console.log(url);
    try {
      const response = await axios.get(
        `${url}`,
      );
      console.log(response.data);
      navigation.replace('OTPVerification', {
        Number: number,
        countryCode: countryCode,
      });
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
            <View style={{alignItems: 'center', marginBottom: 50}}>
              <Image source={Logo} style={mainStyle.logo} />
            </View>
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
                    ? {color: '#4d4d4d', fontSize: 17, marginBottom: 10}
                    : {color: '#bbb', fontSize: 17, marginBottom: 10}
                }>
                We will send you confirmation code...
              </Text>
              <TouchableOpacity
                style={{
                  marginBottom: 120,
                }}
                onPress={() => {
                  // sendEmail(state.email);
                  navigation.replace('LandingPage');
                }}>
                <Text
                  style={
                    theme === 'light'
                      ? {color: '#272D7A', fontSize: 20}
                      : {color: '#98BAFC', fontSize: 20}
                  }>
                  Edit the Institute Base URL {'  '}
                  <Icon
                    name="edit"
                    size={20}
                    color={theme === 'light' ? '#272D7A' : '#98BAFC'}
                  />
                </Text>
              </TouchableOpacity>
            </View>
            {!isLoading ? (
              <View style={mainStyle.loginInputButtonContainer}>
                <View
                  style={
                    theme === 'light'
                      ? mainStyle.loginTextInput
                      : mainStyle.dLoginTextInput
                  }>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="IN"
                    layout="first"
                    onChangeText={text => {
                      handleNumberChange(text);
                      console.log(number);
                    }}
                    // onChangeFormattedText={text => {
                    //   setFormattedValue(text);
                    // }}
                    withDarkTheme
                    withShadow
                    autoFocus
                    placeholder="Enter Mobile number"
                    containerStyle={{
                      width: '100%',
                      height: 50,
                      borderRadius: 10,
                      backgroundColor:
                        theme === 'light' ? '#FAFAFA' : '#23303C',
                      color: theme === 'light' ? '#003f5c' : '#ccc',
                    }}
                    textContainerStyle={{
                      height: 50,
                      borderRadius: 10,
                      backgroundColor:
                        theme === 'light' ? '#FAFAFA' : '#23303C',
                      color: theme === 'light' ? '#003f5c' : '#ccc',
                    }}
                    textInputStyle={{
                      height: 50,
                      borderRadius: 10,
                      backgroundColor:
                        theme === 'light' ? '#FAFAFA' : '#23303C',
                      color: theme === 'light' ? '#003f5c' : '#eee',
                    }}
                    codeTextStyle={{
                      color: theme === 'light' ? '#003f5c' : '#ccc',
                    }}
                    textInputProps={{
                      placeholder: 'Enter Mobile number',
                      placeholderTextColor:
                        theme === 'light' ? '#003f5c' : '#ccc',
                    }}
                    onChangeCountry={country => {
                      setCountryCode('+' + country.callingCode);
                    }}
                  />
                  {/* <TextInput
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
                  /> */}
                </View>
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? mainStyle.loginButton
                      : mainStyle.dLoginButton
                  }
                  onPress={() => {
                    // console.log(countryCode + number);
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
                            backgroundColor: '#272D7A',
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
