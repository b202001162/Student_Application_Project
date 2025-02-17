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

type LandingPageProps = NativeStackScreenProps<
  RootStackParamList,
  'LandingPage'
>;

const LandingPage = ({navigation}: LandingPageProps) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [baseURL, setBaseURL] = useState();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const handleTextChange = text => {
    //remove space from text
    const cleanText = text.replace(/\s/g, '');

    setBaseURL(cleanText);
  };

  const retrieveData = async () => {
    let tempInstituteURL = await JSON.parse(
      await AsyncStorage.getItem('baseURL'),
    );
    console.log("BaseURL: ", tempInstituteURL);
    if (tempInstituteURL !== null) {
      await setBaseURL(tempInstituteURL);
    }
    // empty all the navigation stack
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'LoginPage'}],
    // });
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
    retrieveData();
  }, []);
  const [isLoading, setLoading] = useState(false);

  // generate api call
  const action = async () => {
    if (baseURL === undefined || baseURL === '') {
      alert('Please enter the base URL.');
      return;
    }
    // There must be some validation, such as starting with http or https, and ending with /api, etc.
    let temp = baseURL;
    // check whether the base URL ends with /api
    if (temp.endsWith('/api')) {
      temp = temp.slice(0, -4);
    } else {
      alert('Please enter a valid base URL. Must end with /api');
      return;
    }
    // start with http or https
    if (!temp.startsWith('http://') && !temp.startsWith('https://')) {
      alert(
        'Please enter a valid base URL. Must start with http:// or https://',
      );
      return;
    }
    setLoading(true);
    try {
      await AsyncStorage.setItem('baseURL', await JSON.stringify(baseURL));
      navigation.push('LoginPage');
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
                        marginBottom: 85,
                      }
                    : {
                        color: '#eeeeee',
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginBottom: 85,
                      }
                }>
                Institute Base URL
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
                        ? styles.loginInputText
                        : styles.dLoginInputText
                    }
                    placeholder="Enter Institute Base URL"
                    placeholderTextColor={
                      theme === 'light' ? '#003f5c' : '#ccc'
                    }
                    value={baseURL}
                    onChangeText={handleTextChange}
                  />
                </View>
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? mainStyle.loginButton
                      : mainStyle.dLoginButton
                  }
                  onPress={() => {
                    console.log(baseURL);
                    action();
                  }}>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.loginButtonText
                        : mainStyle.dLoginButtonText
                    }>
                    ADD
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  head: {height: 44, backgroundColor: 'lavender'},
  row: {height: 40, backgroundColor: 'lightyellow'},

  loginInputText: {
    height: 50,
    fontSize: 20,
    color: '#3d3d3d',
    borderWidth: 1,
    borderColor: '#003f5c',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dLoginInputText: {
    height: 50,
    fontSize: 20,
    color: '#bbb',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default LandingPage;
