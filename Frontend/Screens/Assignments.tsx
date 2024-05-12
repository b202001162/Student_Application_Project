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
  Animated,
  ScrollView,
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
  const {code, name, credit, facultyId, batchId, lessonPlanId, plan} =
    route.params;
  console.log(
    'Assignments',
    code,
    name,
    credit,
    facultyId,
    batchId,
    lessonPlanId,
    plan,
  );

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
        // onPress={() => navigation.push('AssignmentDetails')}
        style={
          theme === 'light'
            ? [mainStyle.assignmentItemContainer, {width: '80%'}]
            : [mainStyle.dAssignmentItemContainer, {width: '80%'}]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{maxWidth: '100%'}}>
            <Text
              style={
                theme === 'light'
                  ? styles.myCoursesItemTitle
                  : styles.dMyCoursesItemTitle
              }>
              Name:
              <Text
                style={
                  theme === 'light'
                    ? [{fontWeight: '500', color: '#1d1d1d'}]
                    : [{fontWeight: 'bold', color: '#eee'}]
                }>
                {' '}
                {item.assignmentName}
              </Text>
            </Text>
            <Text
              style={
                theme === 'light'
                  ? styles.myCoursesItemTitle
                  : styles.dMyCoursesItemTitle
              }>
              Plan:{' '}
              <Text
                style={
                  theme === 'light'
                    ? [{fontWeight: '500', color: '#1d1d1d'}]
                    : [{fontWeight: 'bold', color: '#eee'}]
                }>{`${plan}`}</Text>
            </Text>
            <Text
              style={
                theme === 'light'
                  ? styles.myTermsItemDetails
                  : styles.dMyTermsItemDetails
              }>
              Marks:
              <Text
                style={
                  theme === 'light'
                    ? [{fontWeight: '500', color: '#1d1d1d'}]
                    : [{fontWeight: 'bold', color: '#eee'}]
                }>
                {' '}
                {item.marks}
              </Text>
            </Text>
            <Text style={{color: '#E77C40', fontSize: 17}}>
              Due date:
              <Text style={{fontWeight: '600', color: '#E77C40'}}>
                {' '}{item.assignmentDueDate}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

  const [isLoading, setLoading] = useState(false);
  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
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
                    name="assignment"
                    size={23}
                    color={theme === 'light' ? '#1d1d1d' : '#eee'}></Icon2>
                  Assignments
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <ScrollView
            style={{width: '100%', paddingHorizontal: 5}}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 70,
              }}>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.myCourseDetailsItemContainer
                    : mainStyle.dMyCourseDetailsItemContainer
                }>
                <Text
                  style={
                    theme === 'light'
                      ? styles.paymentHistoryStudentDetailsText
                      : styles.dPaymentHistoryStudentDetailsText
                  }>
                  Code{' '}
                  <Text
                    style={
                      theme === 'light' ? styles.valueText : styles.dValueText
                    }>
                    {code}
                  </Text>
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? styles.paymentHistoryStudentDetailsText
                      : styles.dPaymentHistoryStudentDetailsText
                  }>
                  <Text
                    style={
                      theme === 'light' ? styles.valueText : styles.dValueText
                    }>{`${name}`}</Text>
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? styles.paymentHistoryStudentDetailsText
                      : styles.dPaymentHistoryStudentDetailsText
                  }>
                  Credit{' '}
                  <Text
                    style={
                      theme === 'light' ? styles.valueText : styles.dValueText
                    }>{`${credit}`}</Text>
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
                    width: '100%',
                    paddingHorizontal: 20,
                    // height: '70%',
                    justifyContent: 'center',
                    paddingTop: 20,
                  }}>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.lessonPlanTitle
                        : mainStyle.dLessonPlanTitle
                    }>
                    Assignments
                  </Text>
                  {assignments.length === 0 ? (
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.noDataText
                          : mainStyle.dNoDataText
                      }>
                      No Assignments available
                    </Text>
                  ) : (
                    <View
                      style={{
                        width: '100%',
                        // height: '100%',
                        // justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {assignments.map((item, index) => (
                        <AssignmentItem key={index} item={item} />
                      ))}
                    </View>
                  )}
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dModalView: {
    margin: 20,
    backgroundColor: '#1d1d1d',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dModalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#eee',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  dButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    backgroundColor: '#1d1d1d',
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#1E63BB',
    padding: 10,
    paddingHorizontal: 20,
  },
  dButtonClose: {
    backgroundColor: '#98BAFC',
    padding: 10,
    paddingHorizontal: 20,
  },

  textStyle: {
    color: '#EAEAEA',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dTextStyle: {
    color: '#23303C',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  valueText: {
    color: '#1d1d1d',
    fontWeight: 'bold',
    fontSize: 17,
  },
  dValueText: {
    color: '#ddd',
    fontWeight: 'bold',
    fontSize: 17,
  },

  paymentHistoryStudentDetailsText: {
    color: '#1d1d1d',
    fontSize: 15,
    fontWeight: 'medium',
    paddingLeft: 5,
  },
  dPaymentHistoryStudentDetailsText: {
    color: '#eee',
    fontSize: 15,
    fontWeight: 'semibold',
    paddingLeft: 5,
  },
  myCoursesItemTitle: {
    color: '#3d3d3d',
    fontSize: 17,
  },
  dMyCoursesItemTitle: {
    color: '#ccc',
    fontSize: 17,
  },
  myTermsItemDetails: {
    color: '#3d3d3d',
    fontSize: 17,
  },
  dMyTermsItemDetails: {
    color: '#ccc',
    fontSize: 17,
  },
});

export default Assignments;
