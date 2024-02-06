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

import Icon from 'react-native-vector-icons/FontAwesome';

type LoginPageProps = NativeStackScreenProps<RootStackParamList, 'LoginPage'>;

const LoginPage = (navigation: {LoginPageProps}) => {
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
  const [state, setState] = useState({
    email: '',
  });

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
            <View style={mainStyle.loginInputButtonContainer}>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.logintextInput
                    : mainStyle.dLoginTextInput
                }>
                <TextInput
                  style={
                    theme == 'light'
                      ? mainStyle.loginInputText
                      : mainStyle.dLoginInputText
                  }
                  placeholder="Enter Mobile number"
                  placeholderTextColor={theme === 'light' ? '#003f5c' : '#ccc'}
                  onChangeText={text => setState({email: text})}
                />
              </View>
              <TouchableOpacity
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
                  GET OTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{position: 'absolute', bottom: 125, flexDirection: 'row'}}>
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
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
