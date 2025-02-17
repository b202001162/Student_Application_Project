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
  Pressable,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
  const [admissionId, setAdmissionId] = useState('');
  const [currentLevelId, setCurrentLevelId] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userName, setUserName] = useState('');
  const [baseURL, setBaseURL] = useState('');
  const [numOfNotifications, setNumOfNotifications] = useState(0);

  const retrieveData = async () => {
    setLoading(true); // Indicate loading state
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const refreshToken = JSON.parse(await AsyncStorage.getItem('refreshToken'));
    const baseURL = JSON.parse(await AsyncStorage.getItem('baseURL'));
    await AsyncStorage.setItem('isFirstTimePinSet', await JSON.stringify(false));
    if (token == null) {
      navigation.replace('LandingPage');
    }
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    const userFullName = (await AsyncStorage.getItem('userFullName')) || 'User';
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    const userName = JSON.parse(await AsyncStorage.getItem('userName'));
    await setJwtToken(token);
    await setUserId(userId);
    await setFirstName(userFullName);
    await setAdmissionId(admissionId);
    await setRefreshToken(refreshToken);
    await setUserName(userName);
    await setBaseURL(baseURL);

    console.log('UserId: ', userId, baseURL);

    try {
      await setLoading(true);
      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyAlertsAndNotices/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Token is still valid', response.data.resData.notifications);
      await setNumOfNotifications(
        response.data.resData.notifications.length || 0,
      );
      // console.log(await AsyncStorage.getItem('currentLevelId'));
    } catch (error) {
      // Error retrieving data
      // navigation.replace('LoginPage');
      console.log('Token Expired', baseURL, userName);

      await loginHandler(userName, baseURL);
      console.log('Error retrieving data in Dashboard', error);
    } finally {
      setLoading(false);
    }
  };

  const loginHandler = async (userName, baseURL) => {
    try {
      console.log(userName, baseURL);

      const response1 = await axios.post(`${baseURL}/nure-student/v1/signIn`, {
        username: `${userName}`,
        password: '',
        phoneNumber: ``,
        oneTimePassword: ``,
      });
      // const jwtToken = await JSON.stringify(response1.data.jwtToken);
      // await setState({ jwtToken : await JSON.stringify(response1.data.jwtToken), firstName : await JSON.stringify(response1.data.resData.user.firstName)});

      // setState({jwtToken: jwtToken, firstName: firstName});
      const token = await JSON.stringify(response1.data.jwtToken);
      const refreshToken = await JSON.stringify(response1.data.refreshToken);
      const userFullName =
        (await AsyncStorage.getItem('userFullName')) || 'User';
      const userId = await JSON.stringify(
        response1.data.resData.user.appUserId,
      );
      const admissionId = await JSON.stringify(
        response1.data.resData.user.admissionId,
      );

      await setJwtToken(response1.data.jwtToken);
      await setRefreshToken(response1.data.refreshToken);
      await setFirstName(userFullName);
      await setUserId(response1.data.resData.user.appUserId);
      await setAdmissionId(response1.data.resData.user.admissionId);

      await AsyncStorage.setItem('jwtToken', token);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('admissionId', admissionId);
    } catch (error) {
      console.log(error);
      await AsyncStorage.clear();
      navigation.replace('LandingPage');
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.clear();
    navigation.replace('LandingPage');
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

  const handleCourseRegistration = async () => {
    try {
      setLoading(true);
      console.log(admissionId);
      const token = await JSON.parse(await AsyncStorage.getItem('jwtToken'));

      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchTermsForCourseRegistration/${admissionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.resData.termsForRegistration[0].id !== null) {
        await AsyncStorage.setItem(
          'levelId',
          JSON.stringify(response.data.resData.termsForRegistration[0].id),
        );
        await AsyncStorage.setItem(
          'levelCode',
          JSON.stringify(response.data.resData.termsForRegistration[0].code),
        );
        navigation.push('CourseRegistration2');
      } else {
        alert('No terms available for registration');
        return;
      }
      console.log(response.data.resData.termsForRegistration[0].id);
    } catch (error) {
      console.log(error);
      alert('No terms available for registration');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentToBePaidPress = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyFeesToBePaid/${admissionId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      if (response.data.sCode === 2 || response.data === null) {
        alert('Not available');
        return;
      }
      navigation.push('PaymentToBePaid');
    } catch (error) {
      console.log(error);
      alert('Not available');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
        {
          isLoading ? (
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                zIndex: 1,
                backgroundColor: theme === 'light' ? '#00000095' : '#00000095',
              }}>
              <ActivityIndicator
                size="large"
                color={theme === 'light' ? '#272D7A' : '#98BAFC'}
              />
            </View>
          ) : null // Other code which you want to show when loading
        }
        <View
          style={
            theme === 'light'
              ? [mainStyle.subContainer, {width: '90%'}]
              : [mainStyle.dSubContainer, {width: '90%'}]
          }>
          <View style={mainStyle.header}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => navigation.navigate('Notifications')}
                style={{marginRight: 15}}>
                {/* badge on the bell icon */}
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    backgroundColor: 'red',
                    borderRadius: 50,
                    width: 15,
                    height: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                  }}>
                  <Text style={{color: 'white', fontSize: 10}}>
                    {numOfNotifications}
                  </Text>
                </View>

                <Icon4
                  name="bell"
                  size={25}
                  color={theme === 'light' ? '#1d1d1d' : '#eee'}
                />
              </Pressable>
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
              Hello, {firstName ? firstName.replace(/['"]+/g, '') : null}!
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
                onPress={() => {
                  handleCourseRegistration();
                }}
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
                    color={theme === 'light' ? '#272D7A' : '#98BAFC'}
                  />{' '}
                  Course Registration
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  color={theme === 'light' ? '#272D7A' : '#98BAFC'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePaymentToBePaidPress();
                }}
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
                    color={theme === 'light' ? '#272D7A' : '#98BAFC'}
                  />{' '}
                  Payment to be paid
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  color={theme === 'light' ? '#272D7A' : '#98BAFC'}
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
                    onPress={() => navigation.push('CurrentCourses')}
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
                    Current Courses
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={
                      theme === 'light'
                        ? mainStyle.academicsButtons
                        : mainStyle.dAcademicsButtons
                    }
                    onPress={() =>
                      navigation.push('Schedule', {levelId: currentLevelId})
                    }>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.academicsButtonsIcon
                          : mainStyle.dAcademicsButtonsIcon
                      }>
                      <Icon4
                        name="table"
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
                    Schedule
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
                    onPress={() => navigation.push('MyGradeCard')}
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
              <View style={{width: '100%', height: 20}}></View>
              {/* <TouchableOpacity
                onPress={() => logoutHandler()}
                style={
                  theme === 'light'
                    ? mainStyle.logoutHandlerButton
                    : mainStyle.dLogoutHandlerButton
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
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Dashboard;
