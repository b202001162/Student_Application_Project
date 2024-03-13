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
  Switch
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome6';

type NotificationSettingsProps = NativeStackScreenProps<
  RootStackParamList,
  'NotificationSettings'
>;

const NotificationSettings = ({route}: NotificationSettingsProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);

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


  const data = [
    {id: 1, name: 'John', email: 'john@gmail.com'},
    {id: 2, name: 'Bob', email: 'bob@gmail.com'},
    {id: 3, name: 'Mei', email: 'mei@gmail.com'},
    {id: 4, name: 'Steve', email: 'steve@gmail.com'},
  ];

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
              //   onPress={() => navigation.goBack()}
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
                Notification settings
              </Text>
            </TouchableOpacity>
          </View>
          <View style={theme==='light' ? mainStyle.notificationSettingCont : mainStyle.dNotificationSettingCont}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "100%", marginBottom: 10}}>
                <Text>
                General Notifications
                </Text>
                <Switch style={{position: "absolute", right: 10}} />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "100%", marginBottom: 10}}>
                <Text>
                Assignment Notifications
                </Text>
                <Switch style={{position: "absolute", right: 10}} />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "100%", marginBottom: 10}}>
                <Text>
                Lesson Plans Notifications
                </Text>
                <Switch style={{position: "absolute", right: 10}} />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "100%", marginBottom: 10}}>
                <Text>
                Due / Event Notifications
                </Text>
                <Switch style={{position: "absolute", right: 10}} />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "100%", marginBottom: 10}}>
                <Text>
                Message / Chat Notifications
                </Text>
                <Switch style={{position: "absolute", right: 10}} />
            </View>
          </View>
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
});

export default NotificationSettings;
