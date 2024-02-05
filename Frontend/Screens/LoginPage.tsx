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
        <View style={theme === "light" ? mainStyle.container : mainStyle.dContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  dViewContainer: {
    backgroundColor: '#423f3e',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 'max-content',
    padding: 20,
    paddingTop: 35,
    paddingBottom: 35,
    borderRadius: 8,
  },
  dContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#615e5d',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 'max-content',
    padding: 20,
    paddingTop: 35,
    paddingBottom: 35,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#111',
    marginBottom: 40,
  },
  dTitle: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#ffffff',
    marginBottom: 40,
  },
  inputView: {
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 15,
  },
  dInputView: {
    width: '100%',
    backgroundColor: '#423f3e',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 15,
  },
  inputText: {
    height: 50,
    color: '#111',
  },
  dInputText: {
    height: 50,
    color: '#fff',
  },
  forgotAndSignUpText: {
    color: 'blue',
    fontSize: 14,
  },
  loginBtn: {
    // width: '35%',
    backgroundColor: '#2196f3',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
  },
  dLoginBtn: {
    // width: '35%',
    backgroundColor: '#bc93cf',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
  },
  loginText: {
    color: '#ddd',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dLoginText: {
    color: '#423f3e',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default LoginPage;
