import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
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
  ScrollView,
  Animated,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome5';

type MyProfileProps = NativeStackScreenProps<RootStackParamList, 'MyProfile'>;

const MyProfile = ({route}: MyProfileProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);
  const [data, setData] = useState([]);

  const retrieveData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    const refreshToken = JSON.parse(await AsyncStorage.getItem('refreshToken'));
    console.log('Stored Token', token);
    console.log('Stored Token', userId);

    try {
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchStudentProfile/${admissionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data.resData);
      await setData(response.data.resData);
    } catch (error) {
      console.log(error);
      if (
        error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 404
      ) {
        console.log('Token Expired');
        try {
          const response = await axios.post(
            `https://erp.campuslabs.in/TEST/api/nure-student/v1/refreshToken`,
            {
              refreshToken: refreshToken,
            },
          );
          console.log(response.data.resData.jwtToken);
          await AsyncStorage.setItem(
            'jwtToken',
            JSON.stringify(response.data.jwtToken),
          );
          // await setJwtToken(response.data.jwtToken);
          await AsyncStorage.setItem(
            'refreshToken',
            JSON.stringify(response.data.refreshToken),
          );
          retrieveData();
          // await setRefreshToken(response.data.refreshToken);
        } catch (error) {
          console.log('Error in refreshing token');
          await logoutHandler();
          navigation.replace('LoginPage');
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const logoutHandler = async () => {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('admissionId');
    await AsyncStorage.removeItem('currentLevelId');
    navigation.replace('LoginPage');
  };
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

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

  const [isLoading, setLoading] = useState(true);
  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? [mainStyle.container, {paddingHorizontal: 0}] : [mainStyle.dContainer, {paddingHorizontal: 0}]}>
        <View
          style={
            theme === 'light' ? mainStyle.subContainer : mainStyle.dSubContainer
          }>
          <Animated.View
            style={{
              transform: [{translateY: translateY}],
              elevation: 4,
              width: 100 + '%',
              zIndex: 100,
            }}>
            <View
              style={
                theme === 'light' ? mainStyle.headerMain : mainStyle.dHeaderMain
              }>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  style={mainStyle.headerIcon}
                  name="arrow-left-long"
                  size={20}
                  color={theme === 'light' ? '#1d1d1d' : '#eee'}
                />
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.headerText
                      : mainStyle.dHeaderText
                  }>
                  <Icon2
                    name="user-circle-o"
                    size={25}
                    color={theme === 'light' ? '#1d1d1d' : '#eee'}
                  />{' '}
                  Profile
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <ScrollView
            style={{width: "100%", paddingHorizontal: 15}}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: 2,
                paddingHorizontal: 2,
                marginTop: 60,
                marginBottom: 20,
              }}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                  <Text
                    style={
                      theme === 'light'
                        ? [mainStyle.myProfileDetailsTitleText, {marginTop: 20}]
                        : [mainStyle.dMyProfileDetailsTitleText, {marginTop: 20}]
                    }>
                    Personal details
                  </Text>
                  {data.profileData !== null ? (
                    <View
                      style={
                        theme === 'light'
                          ? [mainStyle.myProfileDetailsContContainer, {backgroundColor: "transparent", marginTop: 0}]
                          : [mainStyle.dMyProfileDetailsContContainer, {backgroundColor: "transparent", marginTop: 0}]
                      }>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Name:{' '}
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: '#1d1d1d', fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                            {'\n'}
                          {data.profileData.studentName}{' '}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }></View>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Father name
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.fatherName === null ? "N/A" :  data.profileData.fatherName}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }></View>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Mother name
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.motherName  === null ? "N/A" : data.profileData.motherName }{' '}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }></View>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Email
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.emailId}{' '}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }></View>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Mobile
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.phoneNo}{' '}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }></View>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Address
                        <Text
                          style={
                            theme === 'light'
                              ?[styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.studentAddress  === null ? "N/A" : data.profileData.studentAddress }{' '}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }></View>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Date of Birth
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.studentDOB  === null ? "N/A" :  data.profileData.studentDOB}{' '}
                        </Text>
                      </Text>
                    </View>
                  ) : null}
                  <Text
                    style={
                      theme === 'light'
                        ? [mainStyle.myProfileDetailsTitleText, {marginTop: 30}]
                        : [mainStyle.dMyProfileDetailsTitleText, {marginTop: 30}]
                    }>
                    Academics details
                  </Text>
                  {data.profileData !== null ? (
                    <View
                      style={
                        theme === 'light'
                          ?[mainStyle.myProfileDetailsContContainer, {backgroundColor: "transparent", padding: 0, marginTop: 0}]
                          : [mainStyle.dMyProfileDetailsContContainer, {backgroundColor: "transparent", padding: 0, marginTop: 0}]
                      }>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Admission No.
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.admissionNo}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }
                      />
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        TGPA
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.tgpa === null ? "N/A" : data.profileData.tgpa}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }
                      />
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        CGPA
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.cgpa}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }
                      />
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Credit Attempted
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.creditAttempted}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }
                      />
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Degree name
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.degreeName}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }
                      />
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Program Name
                        <Text
                          style={
                            theme === 'light'
                              ?[styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.programName}{' '}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }
                      />
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Level Name
                        <Text
                          style={
                            theme === 'light'
                              ? [styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.levelName}{' '}
                        </Text>
                      </Text>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDivider
                            : mainStyle.dMyProfileDivider
                        }
                      />
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.myProfileDetailsText
                            : mainStyle.dMyProfileDetailsText
                        }>
                        Fee Pattern name
                        <Text
                          style={
                            theme === 'light'
                              ?[styles.valueText, {color: "#1d1d1d", fontSize: 20}]
                              : [styles.valueText, {color: '#eee', fontSize: 20}]
                          }>
                          {'\n'}{data.profileData.feePatterName === null ? "N/A" : data.profileData.feePatterName}{' '}
                        </Text>
                      </Text>
                    </View>
                  ) : null}
                  <TouchableOpacity
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
                      <Icon4
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
                </>
              )}
              {/* <TextInput
              style={
                theme === 'light'
                  ? mainStyle.courseFBInput
                  : mainStyle.dCourseFBInput
              }
              placeholder="Enter Feedback Here"
              placeholderTextColor={theme === 'light' ? '#003f5c' : '#ccc'}
            /> */}
              {/* <View
              style={
                theme === 'light'
                  ? mainStyle.courseFBBtnCont
                  : mainStyle.dCourseFBBtnCont
              }>
              <TouchableOpacity
                style={
                  theme === 'light'
                    ? mainStyle.courseFBBtn
                    : mainStyle.dCourseFBBtn
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.courseFBBtnText
                      : mainStyle.dCourseFBBtnText
                  }>
                  Submit
                </Text>
              </TouchableOpacity>
            </View> */}
            </View>
          </ScrollView>
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
  valueText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1d1d1d',
  },
});

export default MyProfile;
