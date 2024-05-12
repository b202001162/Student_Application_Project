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

  const retrieveData = async () => {
    setLoading(true); // Indicate loading state
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const refreshToken = JSON.parse(await AsyncStorage.getItem('refreshToken'));
    if (token == null) {
      navigation.replace('LoginPage');
    }
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    const firstName = JSON.parse(await AsyncStorage.getItem('firstName'));
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    const userName = JSON.parse(await AsyncStorage.getItem('userName'));
    await setJwtToken(token);
    await setUserId(userId);
    await setFirstName(firstName);
    await setAdmissionId(admissionId);
    await setRefreshToken(refreshToken);
    await setUserName(userName);
    console.log(refreshToken);

    if ((await AsyncStorage.getItem('currentLevelId')) !== null) {
      // await AsyncStorage.removeItem('currentLevelId');
      await setCurrentLevelId(await AsyncStorage.getItem('currentLevelId'));
      setLoading(false);

      // for checking the expiry of the token
      try {
        const response = await axios.get(
          `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchTermsForCourseRegistration/${admissionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.log('Token Expired');
        // console.log(refreshToken);
        await loginHandler(userName);
      }
      return;
    }
    try {
      const reponse = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchTermsForCourseRegistration/${admissionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(reponse.data.resData.termsForRegistration[0].id);
      await AsyncStorage.setItem(
        'currentLevelId',
        JSON.stringify(reponse.data.resData.termsForRegistration[0].id),
      );
      await setCurrentLevelId(reponse.data.resData.termsForRegistration[0].id);
      // console.log(await AsyncStorage.getItem('currentLevelId'));
    } catch (error) {
      // Error retrieving data
      // navigation.replace('LoginPage');
      await loginHandler(userName);
      console.log('Error retrieving data');
    } finally {
      setLoading(false);
    }
  };

  const loginHandler = async (userName) => {
    try {
      const response1 = await axios.post(
        'https://erp.campuslabs.in/TEST/api/nure-student/v1/signIn',
        {
          username: `${userName}`,
          password: '',
          phoneNumber: ``,
          oneTimePassword: ``,
        },
      );
      // const jwtToken = await JSON.stringify(response1.data.jwtToken);
      // await setState({ jwtToken : await JSON.stringify(response1.data.jwtToken), firstName : await JSON.stringify(response1.data.resData.user.firstName)});

      // setState({jwtToken: jwtToken, firstName: firstName});
      const token = await JSON.stringify(response1.data.jwtToken);
      const refreshToken = await JSON.stringify(response1.data.refreshToken);
      const firstName = await JSON.stringify(
        response1.data.resData.user.firstName,
      );
      const userId = await JSON.stringify(
        response1.data.resData.user.appUserId,
      );
      const admissionId = await JSON.stringify(
        response1.data.resData.user.admissionId,
      );

      await setJwtToken(token);
      await setRefreshToken(refreshToken);
      await setFirstName(firstName);
      await setUserId(userId);
      await setAdmissionId(admissionId);

      await AsyncStorage.setItem('jwtToken', token);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('admissionId', admissionId);
    } catch (error) {
      console.log(error);
      navigation.replace('LoginPage');
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.clear();
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

  const handleCourseRegistration = async () => {
    try {
      setLoading(true);
      console.log(admissionId);
      const token = await JSON.parse(await AsyncStorage.getItem('jwtToken'));

      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchTermsForCourseRegistration/${admissionId}`,
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

  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
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
                onPress={() => navigation.push('PaymentToBePaid')}
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
                    onPress={() =>
                      navigation.push('CurrentCourses', {
                        levelId: currentLevelId,
                      })
                    }
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
