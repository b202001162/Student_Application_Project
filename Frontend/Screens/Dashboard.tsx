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
    if(token == null){ 
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
                <Icon
                  name="bell-o"
                  size={25}
                  color={theme === 'light' ? '#1d1d1d' : '#eee'}
                  onPress={() => navigation.navigate('Notifications')}
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
              Good moring, {!isLoading ? firstName : <ActivityIndicator />}!
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
                    My Courses
                  </Text>
                </TouchableOpacity>
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
                        ? mainStyle.academicsButtonsText
                        : mainStyle.dAcademicsButtonsText
                    }>
                    My Terms
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
                  onPress = {() => logoutHandler()}
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
                    LOGOUT
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
export default Dashboard;
