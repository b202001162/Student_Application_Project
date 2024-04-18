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
import Icon2 from 'react-native-vector-icons/MaterialIcons';

type AssignmentsProps = NativeStackScreenProps<
  RootStackParamList,
  'Assignments'
>;

const Assignments = ({route}: AssignmentsProps) => {
  const {code, name, credit, facultyId, batchId, lessonPlanId, plan} = route.params;
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
        console.log(lessonPlanId, facultyId);
        
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyAssignments/${lessonPlanId}/${facultyId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      //   console.log(response.data);

      if (response.data.sCode !== 1) {
        alert('Error fetching data');
        navigation.goBack();
      }
      await setAssignments(response.data.resData.assignments);
      setLoading(true); // Indicate loading state
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
  const [faculty, setFaculty] = useState([]);
  const [assignments, setAssignments] = useState([]);

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

  const AssignmentItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('AssignmentDetails')}
        style={
          theme === 'light'
            ? mainStyle.assignmentItemContainer
            : mainStyle.dAssignmentItemContainer
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{maxWidth: '85%'}}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myCoursesItemTitle
                  : mainStyle.dMyCoursesItemTitle
              }>
              <Text style={{fontWeight: '600'}}>Assignment name:</Text>{' '}
              {item.assignmentName}
              {'\n'}
              <Text style={{fontWeight: '600'}}>Plan:</Text> {`${plan}`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              <Text style={{fontWeight: '600'}}>Marks:</Text>
              {' '}
              {item.marks} {'\n'}
              <Text style={{color: '#E77C40'}}>
                <Text style={{fontWeight: '600', color: '#E77C40'}}>
                  Due date:
                </Text>{' '}
                {item.assignmentDueDate}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
                  <Icon2 name="assignment" size={23} color={theme==='light' ? "#1d1d1d" : "#eee"} >

                  </Icon2>
                Assignments
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
                Faculty ID: {faculty.id}
              </Text>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.myTermsItemDetails
                    : mainStyle.dMyTermsItemDetails
                }>
                Batch ID: {faculty.batchId}
              </Text>
            </View>
          </View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
            />
          ) : (
            <>
              <View
                style={{
                  width: '90%',
                  height: '70%',
                }}>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.lessonPlanTitle
                      : mainStyle.dLessonPlanTitle
                  }>
                  Assignments
                </Text>
                {
                  assignments.length === 0 ? (
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.noDataText
                          : mainStyle.dNoDataText
                      }>
                      No Assignments available
                    </Text>
                  ) : (
                    <FlatList
                  data={assignments}
                  renderItem={({item}) => <AssignmentItem item={item} />}
                  contentContainerStyle={mainStyle.flatListStyle}
                  keyExtractor={item => item.id} // Use unique IDs for performance
                  ItemSeparatorComponent={() => (
                    <View style={mainStyle.separator} />
                  )}
                  // ListHeaderComponent={() => (
                  //   <Text style={mainStyle.header}>Courses</Text>
                  // )}
                />
                  )
                }
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Assignments;
