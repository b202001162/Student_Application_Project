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
  Button,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

type MyCoursesProps = NativeStackScreenProps<RootStackParamList, 'MyCourses'>;

const MyCourses = ({route}: MyCoursesProps) => {
  const {levelId} = route.params;
  // if(levelId === undefined){
  //     levelId = 8;
  // }
  //   const [tokenWithoutQuotes, setTokenWithoutQuotes] = useState();
  useEffect(() => {
    // setTokenWithoutQuotes(token.substring(1, token.length - 1));
    retrieveData();
  }, []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [courses, setCourses] = useState([]);
  const retrieveData = async () => {
    const token = await JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = await JSON.parse(await AsyncStorage.getItem('userId'));
    const admissionId = await JSON.parse(
      await AsyncStorage.getItem('admissionId'),
    );
    const baseURL = await JSON.parse(await AsyncStorage.getItem('baseURL'));
    console.log('Stored Token', token);

    setLoading(true); // Indicate loading state
    try {
      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyCourses/${admissionId}/${levelId}`,
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
      await setCourses(response.data.resData.courses);
      if (courses == null) {
        alert('No courses found');
      }
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

  const CourseItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.myTermsItemContainer
            : mainStyle.dMyTermsItemContainer
        }>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() =>
            navigation.push('MyCourseDetails', {
              code: item.code,
              name: item.name,
              credit: item.value,
              courseId: item.id,
              levelId: levelId,
            })
          }>
          <View style={{maxWidth: '85%'}}>
            <Text
              style={
                (theme === 'light'
                  ? mainStyle.paymentHistoryStudentDetailsText
                  : mainStyle.dPaymentHistoryStudentDetailsText,
                {fontSize: 15})
              }>
              Course Code:{' '}
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>
                {item.code}
              </Text>
            </Text>
            <Text
              style={
                (theme === 'light'
                  ? mainStyle.paymentHistoryStudentDetailsText
                  : mainStyle.dPaymentHistoryStudentDetailsText,
                {fontSize: 15})
              }>
              Name:{' '}
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>{`${item.name}`}</Text>
            </Text>
            <Text
              style={
                (theme === 'light'
                  ? mainStyle.paymentHistoryStudentDetailsText
                  : mainStyle.dPaymentHistoryStudentDetailsText,
                {fontSize: 15})
              }>
              Credit:
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>
                {' '}
                {`${item.value}`}
              </Text>
            </Text>
          </View>
          <Icon
            style={(mainStyle.headerIcon, {position: 'absolute', right: 10})}
            name="circle-chevron-right"
            size={20}
            color={theme === 'light' ? '#3d3d3d' : '#ccc'}
          />
        </TouchableOpacity>
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
                <Icon3
                  name="bookshelf"
                  size={23}
                  color={theme === 'light' ? '#3d3d3d' : '#bbb'}
                />
                My Courses
              </Text>
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}>
              <ActivityIndicator
                size="large"
                color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
              />
            </View>
          ) : (
            <>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 70,
                }}>
                {courses.length > 0 ? (
                  <FlatList
                    data={courses}
                    renderItem={({item}) => <CourseItem item={item} />}
                    contentContainerStyle={mainStyle.flatListStyle}
                    keyExtractor={item => item.id} // Use unique IDs for performance
                    ItemSeparatorComponent={() => (
                      <View style={mainStyle.separator} />
                    )}
                    // ListHeaderComponent={() => (
                    //   <Text style={mainStyle.header}>Courses</Text>
                    // )}
                  />
                ) : (
                  <Text>No courses found</Text>
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  valueText: {
    color: '#1d1d1d',
    fontWeight: 'bold',
    fontSize: 17,
  },
  dValueText: {
    color: '#eee',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default MyCourses;
