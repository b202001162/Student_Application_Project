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

type LessonPlanProps = NativeStackScreenProps<RootStackParamList, 'LessonPlan'>;

const LessonPlan = ({route}: LessonPlanProps) => {
  const {code, name, credit, courseId, levelId, facultyId, batchId} =
    route.params;
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
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyLessonPlans/${facultyId}/${levelId}/${batchId}`,
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
      setLessons(response.data.resData.lessonPlans);
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
  //   const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);

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

  const LessonItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.myTermsItemContainer
            : mainStyle.dMyTermsItemContainer
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{maxWidth: '85%'}}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myCoursesItemTitle
                  : mainStyle.dMyCoursesItemTitle
              }>
              <Text style={{fontWeight: '600'}}>Topic:</Text> {item.topic}
              {'\n'}
              <Text style={{fontWeight: '500'}}>Session no.:</Text>{' '}
              {item.sessionNo}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              <Text style={{fontWeight: '600'}}>Plan:</Text> {`${item.plan}`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              <Text style={{fontWeight: '600'}}>Start date:</Text>{' '}
              {`${item.startDate}`} {'\n'}
              <Text style={{fontWeight: '600'}}>End date:</Text>{' '}
              {`${item.endDate}`}
            </Text>
          </View>
        </View>
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
                Lesson Plan
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
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.myTermsItemDetails
                    : mainStyle.dMyTermsItemDetails
                }>
                Faculty ID: {facultyId}
              </Text>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.myTermsItemDetails
                    : mainStyle.dMyTermsItemDetails
                }>
                Batch ID: {batchId}
              </Text>
            </View>
          </View>
          {isLoading ? (
              <ActivityIndicator
                size="large"
                color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
              />
            ) : (
              <View
                style={{
                  width: '90%',
                  // paddingBottom: 100,
                  // paddingBottom: 250,
                  height: '70%',
                  // paddingTop: 250,
                }}>
                <FlatList
                  data={lessons}
                  renderItem={({item}) => <LessonItem item={item} />}
                  contentContainerStyle={mainStyle.flatListStyle}
                  keyExtractor={item => item.id} // Use unique IDs for performance
                  ItemSeparatorComponent={() => (
                    <View style={mainStyle.separator} />
                  )}
                  // ListHeaderComponent={() => (
                  //   <Text style={mainStyle.header}>Courses</Text>
                  // )}
                />
              </View>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LessonPlan;
