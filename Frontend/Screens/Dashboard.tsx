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
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard = ({route}: DashboardProps) => {
  // const {token, name} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [firstName, setFirstName] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [userId, setUserId] = useState('');

  const retrieveData = async () => {
    setLoading(true); // Indicate loading state
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    if (token == null) {
      navigation.replace('LoginPage');
    }
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    const firstName = JSON.parse(await AsyncStorage.getItem('firstName'));
    setJwtToken(token);
    setUserId(userId);
    setFirstName(firstName);
    try {
    } catch (error) {
      // Error retrieving data
      navigation.replace('LoginPage');
      console.log('Error retrieving data');
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('firstName');
    navigation.replace('LoginPage');
  };

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    retrieveData();
    const colorTheme = Appearance.getColorScheme();
    console.log(colorTheme);
    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();

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
                <Icon4
                  name="bell"
                  size={25}
                  color={theme === 'light' ? '#1d1d1d' : '#eee'}
                  onPress={() => navigation.navigate('Notifications')}
                />
              </View>
              <View style={{marginRight: 5}}>
                <Icon
                  onPress={() => navigation.push('MyProfile')}
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
              Hello, {!isLoading ? firstName : <ActivityIndicator />}!
            </Text>
          </View>
          <View style={mainStyle.ongoingEvents}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.ongoingEventsText
                  : mainStyle.dOngoingEventsText
              }>
              <Icon
                name="bars"
                size={23}
                color={theme === 'light' ? '#1d1d1d' : '#eee'}
                style={{marginRight: 10}}
              />{' '}
              Ongoing events
            </Text>
            <View style={mainStyle.ongoingEventsButtonsContainer}>
              <TouchableOpacity
                onPress={() => navigation.push('CourseRegistration')}
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
                  <Icon4
                    name="school-circle-check"
                    size={25}
                    color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                  />{' '}
                  Course Registration
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('Payment')}
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
                  <Icon2
                    name="payment"
                    size={25}
                    color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                  />{' '}
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
              <Icon
                name="graduation-cap"
                size={23}
                color={theme === 'light' ? '#3d3d3d' : '#ccc'}
              />{' '}
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
                <View>
                  <TouchableOpacity
                    // onPress={() => navigation.push('MyCourses')}
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
                      <Icon3
                        name="bookshelf"
                        size={50}
                        color={theme === 'light' ? '#3d3d3d' : '#bbb'}
                      />
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtonsText
                        : mainStyle.dAcademicsButtonsText
                    }>
                    {' '}
                    My Courses
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtons
                        : mainStyle.dAcademicsButtons
                    }
                    onPress={() => navigation.push('MyTerms')}>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.academicsButtonsIcon
                          : mainStyle.dAcademicsButtonsIcon
                      }>
                      <Icon3
                        name="file-document-outline"
                        size={50}
                        color={theme === 'light' ? '#3d3d3d' : '#bbb'}
                      />
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtonsText
                        : mainStyle.dAcademicsButtonsText
                    }>
                    My Terms
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.push('PaymentHistoryNew')}
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
                      <Icon3
                        name="account-cash"
                        size={50}
                        color={theme === 'light' ? '#3d3d3d' : '#bbb'}
                      />
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtonsText
                        : mainStyle.dAcademicsButtonsText
                    }>
                    Payment History
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    // onPress = {() => logoutHandler()}
                    onPress={() => navigation.push('Results')}
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
                      <Icon3
                        name="file-certificate-outline"
                        size={50}
                        color={theme === 'light' ? '#3d3d3d' : '#bbb'}
                      />
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtonsText
                        : mainStyle.dAcademicsButtonsText
                    }>
                    Results
                  </Text>
                </View>
              </View>
              <View style={{width: "100%", height: 20}}></View>
              <TouchableOpacity
                onPress={() => logoutHandler()}
                style={
                  theme === 'light'
                    ? mainStyle.logoutHandlerButton
                    : mainStyle.dLogoutHandlerButton }>
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Dashboard;
