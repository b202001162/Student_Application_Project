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
  Image,
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
            <View>
              <Text
                style={
                  theme === 'light'
                    ? {color: '#1d1d1d', fontSize: 20, fontWeight: 'bold'}
                    : {color: '#eeeeee', fontSize: 20, fontWeight: 'bold'}
                }>
                {' '}
                Enter Your Mobile Number{' '}
              </Text>
              <Text
                style={
                  theme === 'light'
                    ? {color: '#1d1d1d', fontSize: 15}
                    : {color: '#eeeeee', fontSize: 15}
                }>
                {' '}
                We will send you confirmation code...{' '}
              </Text>
            </View>
            <View> </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default LoginPage;
