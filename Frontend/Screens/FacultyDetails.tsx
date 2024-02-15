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

type FacultyDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'FacultyDetails'
>;

const FacultyDetails = ({route}: FacultyDetailsProps) => {
  const {code, name, credit} = route.params;
  //   console.log(code + ' ' + name + ' ' + credit);

  // if(levelId === undefined){
  //     levelId = 8;
  // }
  //   const [tokenWithoutQuotes, setTokenWithoutQuotes] = useState();
  useEffect(() => {
    // setTokenWithoutQuotes(token.substring(1, token.length - 1));
    retrieveData();
  }, []);
  const retrieveData = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    console.log('Stored Token', token);

    setLoading(true); // Indicate loading state
    try {
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyCourseFaculty/14/8/8`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      

      if (response.data.sCode !== 1) {
        alert('Error fetching data');
        navigation.goBack();
      }

      //   console.log(response.data);

      if (response.data.sCode !== 1) {
        alert('Error fetching data');
        navigation.goBack();
      }
      setCourses(response.data.resData.courses);
    } catch (error) {
      // Error retrieving data
      console.log('Error notification retrieving data' + error);
    } finally {
      setLoading(false);
    }
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [courses, setCourses] = useState([]);

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
                FacultyDetails
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemContainer
                  : mainStyle.dMyTermsItemContainer
              }>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.myTermsItemTitle
                    : mainStyle.dMyTermsItemTitle
                }>
                Course Code: {code}
              </Text>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.myTermsItemDetails
                    : mainStyle.dMyTermsItemDetails
                }>
                Course name: {`${name}`}
              </Text>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.myTermsItemDetails
                    : mainStyle.dMyTermsItemDetails
                }>
                Course credit: {`${credit}`}
              </Text>
            </View>
          </View>
          <View style={mainStyle.myCourseDetailsButtonContainer}>
            <TouchableOpacity
              style={
                theme === 'light'
                  ? mainStyle.myCourseDetailsButton
                  : mainStyle.dMyCourseDetailsButton
              }>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.myCourseDetailsButtonText
                    : mainStyle.dMyCourseDetailsButtonText
                }>
                Lesson plans
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
                  ? mainStyle.myCourseDetailsButton
                  : mainStyle.dMyCourseDetailsButton
              }>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.myCourseDetailsButtonText
                    : mainStyle.dMyCourseDetailsButtonText
                }>
                Assignments
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
                  ? mainStyle.myCourseDetailsButton
                  : mainStyle.dMyCourseDetailsButton
              }>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.myCourseDetailsButtonText
                    : mainStyle.dMyCourseDetailsButtonText
                }>
                Faculty details
              </Text>
              <Icon
                name="chevron-right"
                size={18}
                color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FacultyDetails;
