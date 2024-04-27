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

import Icon from 'react-native-vector-icons/FontAwesome';
import Iconn from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { parse } from 'json'; // Assuming you have the 'json' package installed
import Timer from '../Components/Timer';

type SwitchAccountProps = NativeStackScreenProps<
  RootStackParamList,
  'SwitchAccount'
>;

const SwitchAccount = ({route}: SwitchAccountProps) => {
//   const {Number} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
  // const [state, setState] = useState({
  //   jwtToken: '',
  //   firstName: '',
  // });
  const [jwtToken, setJwtToken] = useState('');
  const [firstName, setFirstName] = useState('');
  const [otp, setOtp] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [optVerified, setOptVerified] = useState(false);


  React.useEffect(() => {
    retrievingData();
  }, []);

  const loginHandler = async userName => {
    await AsyncStorage.setItem('userName', await JSON.stringify(userName));
    setLoading(true); // Indicate loading state

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
      const jwtToken = await JSON.stringify(response1.data.jwtToken);
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
      const lastName = await JSON.stringify(
        response1.data.resData.user.lastName,
      );

      const fullName = await JSON.stringify(
        response1.data.resData.user.firstName +
          ' ' +
          response1.data.resData.user.lastName,
      );

      await AsyncStorage.setItem('jwtToken', jwtToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('admissionId', admissionId);
      // await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('userFullName', fullName);
      const Id = JSON.parse(await AsyncStorage.getItem('userId'));
      console.log(Id);

      const pinExists = await AsyncStorage.getItem(`pin${Id}`);
      if (pinExists === null) navigation.replace('AppPinLock');
      else {
        navigation.replace('VerifyPinLock');
      }
    } catch (error) {
      console.error('Login handler error: ', error);
      alert('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  

  const retrievingData = async () => {
    const usersData = await JSON.parse(await AsyncStorage.getItem('users'));
    console.log(usersData);
    
    if (usersData !== null) {
      setProfiles(usersData);
    }
  };

  

  const ProfileItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.myProfilesItemContainer
            : mainStyle.dMyProfilesItemContainer
        }>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => loginHandler(item.userName)}>
          <View style={{maxWidth: '85%'}}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myProfilesItemTitle
                  : mainStyle.dMyProfilesItemTitle
              }>
              {item.userName}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myProfilesItemDetails
                  : mainStyle.dMyProfilesItemDetails
              }>
              {`${item.firstName} ${item.lastName}`}
            </Text>
          </View>
          <Iconn
            style={(mainStyle.headerIcon, {position: 'absolute', right: 10})}
            name="circle-chevron-right"
            size={20}
            color={theme === 'light' ? '#3d3d3d' : '#ccc'}
          />
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
        <View
          style={
            theme === 'light' ? mainStyle.subContainer : mainStyle.dSubContainer
          }>
          {!isLoading ? (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: 20,
                }}>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.profileTitleText
                      : mainStyle.dProfileTitleText
                  }>
                  User Profiles
                </Text>
              </View>
              <FlatList
                data={profiles}
                renderItem={({item}) => <ProfileItem item={item} />}
                contentContainerStyle={mainStyle.flatListStyle}
                keyExtractor={item => item.appUserId} // Use unique IDs for performance
                ItemSeparatorComponent={() => (
                  <View style={mainStyle.separator} />
                )}
                // ListHeaderComponent={() => (
                //   <Text style={mainStyle.header}>Courses</Text>
                // )}
              />
            </View>
          ) : (
            <></>
          )}
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SwitchAccount;
