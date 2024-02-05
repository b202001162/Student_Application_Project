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
          <View style={mainStyle.header}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{marginRight: 15}}>
                <Icon
                  name="bell-o"
                  size={25}
                  color={theme === 'light' ? '#1d1d1d' : '#eee'}
                />
              </View>
              <View style={{marginRight: 5}}>
                <Icon
                  name="user-circle-o"
                  size={25}
                  color={theme === 'light' ? '#1d1d1d' : '#eee'}
                />
              </View>
            </View>
          </View>
          <View style={mainStyle.greetingTextContainer}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.greetingText
                  : mainStyle.dGreetingText
              }>
              Good moring, [Name]!
            </Text>
          </View>
          <View style={mainStyle.ongoingEvents}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.ongoingEventsText
                  : mainStyle.dOngoingEventsText
              }>
              Ongoing events
            </Text>
            <View style={mainStyle.ongoingEventsButtonsContainer}>
              <TouchableOpacity
                style={
                  theme === 'light'
                    ? mainStyle.ongoingEventsButtons
                    : mainStyle.dOngoingEventsButtons
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.ongoingEventsButtonsText
                      : mainStyle.dOngoingEventsButtonsText
                  }>
                  Course Registration
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  theme === 'light'
                    ? mainStyle.ongoingEventsButtons
                    : mainStyle.dOngoingEventsButtons
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.ongoingEventsButtonsText
                      : mainStyle.dOngoingEventsButtonsText
                  }>
                  Fee Payment
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={mainStyle.academics}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.ongoingEventsText
                  : mainStyle.dOngoingEventsText
              }>
              Academics
            </Text>
            <View style={mainStyle.academicsButtonsContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? mainStyle.academicsButtons
                      : mainStyle.dAcademicsButtons
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtonsText
                        : mainStyle.dAcademicsButtonsText
                    }>
                    Courses
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? mainStyle.academicsButtons
                      : mainStyle.dAcademicsButtons
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtonsText
                        : mainStyle.dAcademicsButtonsText
                    }>
                    Fee Structure
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? mainStyle.academicsButtons
                      : mainStyle.dAcademicsButtons
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtonsText
                        : mainStyle.dAcademicsButtonsText
                    }>
                    Payment History
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? mainStyle.academicsButtons
                      : mainStyle.dAcademicsButtons
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtonsText
                        : mainStyle.dAcademicsButtonsText
                    }>
                    Results
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
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
