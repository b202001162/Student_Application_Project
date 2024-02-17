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
      setNotifications(response.data.resData.notifications);
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
        <Text
          style={
            theme === 'light' ? mainStyle.itemTitle : mainStyle.dItemTitle
          }>
          {item.code}
        </Text>
        <Text
          style={
            theme === 'light' ? mainStyle.itemDetails : mainStyle.dItemDetails
          }>
          {`${item.name}`}
        </Text>
      </View>
    );
  };

  const [isLoading, setLoading] = useState(false);
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
                Notifications
              </Text>
            </TouchableOpacity>
          </View>
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
                <FlatList
                  data={notifications}
                  contentContainerStyle={mainStyle.flatListStyle}
                  renderItem={({item}) => <NotificationItem item={item} />}
                  keyExtractor={item => item.code + item.name} // Use unique IDs for performance
                  ItemSeparatorComponent={() => (
                    <View style={mainStyle.separator} />
                  )}
                  // ListHeaderComponent={() => (
                  //   <Text style={mainStyle.header}>Notifications</Text>
                  // )}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
