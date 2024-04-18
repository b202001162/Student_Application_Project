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

type NotificationsProps = NativeStackScreenProps<
  RootStackParamList,
  'Notifications'
>;

const Notifications = ({route}: NotificationsProps) => {
  // const [tokenWithoutQuotes, setTokenWithoutQuotes] = useState();
  useEffect(() => {
    retrieveData();
  }, []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [notifications, setNotifications] = useState([]);
  const retrieveData = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    console.log('Stored Token', token);

    setLoading(true); // Indicate loading state
    try {
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyAlertsAndNotices/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.sCode !== 1) {
        alert('Error fetching data');
        navigation.goBack();
      }

      for (let i = 0; i < response.data.resData.notifications.length; i++) {
        response.data.resData.notifications[i].data = separateNotificationData(
          response.data.resData.notifications[i].name,
        );
      }
      console.log(response.data.resData.notifications);
      await setNotifications(response.data.resData.notifications);
    } catch (error) {
      // Error retrieving data
      console.log('Error notification retrieving data' + error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // _retrieveData();
    const colorTheme = Appearance.getColorScheme();
    console.log(colorTheme);
    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  const NotificationItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light' ? mainStyle.itemContainer : mainStyle.dItemContainer
        }>
        {item.data.date !== null || item.data.dueDate !== null ? (
          <View style={{width: '100%', flexDirection: "row" , justifyContent: 'space-between'}}>
            <Text
              style={
                (theme === 'light'
                  ? {color: "#1d1d1d", fontSize: 12}
                  : {color: "#eee", fontSize: 12})
              }>
              {item.data.date}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? {color: "#FFAB00", fontSize: 15}
                  : {color: "#FF7C44", fontSize: 15}
              }>
              Due date: {item.data.dueDate}
            </Text>
          </View>
        ) : null}
        <Text
          style={
            theme === 'light' ? mainStyle.itemDetails : mainStyle.dItemDetails
          }>
          {item.data.notificationData}
        </Text>
      </View>
    );
  };

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

  const separateNotificationData = notificationString => {
    // Split the string by '|' delimiter, handling cases with less than 3 parts
    const parts = notificationString.split('|').slice(0, 3);

    if (parts.length < 3) {
      return {
        date: null,
        notificationData: notificationString,
        dueDate: null,
      };
    }

    const date = parts[0].trim(); // Extract and trim the date
    const notificationData = parts[1].trim(); // Extract and trim the notification data

    // Due date might be after "Due Date:" or at the end (handle both)
    const dueDateParts = parts[2].split(':').slice(1);
    const dueDate =
      dueDateParts.length > 0 ? dueDateParts.join('').trim() : parts[2].trim();

    return {date, notificationData, dueDate};
  };

  const [isLoading, setLoading] = useState(false);
  return (
    <SafeAreaView style={{fontFamily: 'Poppins'}}>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
        <View
          style={
            theme === 'light' ? mainStyle.subContainer : mainStyle.dSubContainer
          }>
          <View style={{width: '100%', justifyContent: 'center'}}>
            <Animated.View
              style={{
                transform: [{translateY: translateY}],
                elevation: 4,
                zIndex: 100,
              }}>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.headerMain
                    : mainStyle.dHeaderMain
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
                    <Icon
                      name="bell"
                      size={25}
                      color={theme === 'light' ? '#1d1d1d' : '#eee'}
                      onPress={() => navigation.navigate('Notifications')}
                    />{' '}
                    Notifications
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
          <ScrollView
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 70,
                }}>
                {notifications.length === 0 ? (
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.noDataText
                        : mainStyle.dNoDataText
                    }>
                    No Notifications available
                  </Text>
                ) : (
                  <>
                    {notifications.map((item, index) => {
                      return <NotificationItem key={index} item={item} />;
                    })}
                  </>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
