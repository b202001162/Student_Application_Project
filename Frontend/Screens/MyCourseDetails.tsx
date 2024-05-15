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
  Modal,
  Pressable,
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

type MyCourseDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'MyCourseDetails'
>;

const MyCourseDetails = ({route}: MyCourseDetailsProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  //   const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [studentAttandanceData, setStudentAttandanceData] = useState({});
  const [token, setToken] = useState('');
  const [admissionId, setAdmissionId] = useState('');
    const [facultyId, setFacultyId] = useState();
    const [batchId, setBatchId] = useState();
  const {code, name, credit, courseId, levelId} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [baseURL, setBaseURL] = useState();

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
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    const baseURL = JSON.parse(await AsyncStorage.getItem('baseURL'));
    console.log('Stored Token', token);

    await setToken(token);
    await setAdmissionId(admissionId);
    await setBaseURL(baseURL);
    console.log('Token', token);

    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyClassAttendancePercentage/${courseId}/${levelId}/${admissionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.sCode !== 1) {
        console.log('Attandance data error');
        // navigation.goBack();
      }
      console.log(response.data.resData.studentAttandanceData);
      await setStudentAttandanceData(
        response.data.resData.studentAttandanceData,
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    let response1 = null;
    try {
      setLoading(true);
      console.log(courseId, levelId, admissionId);

      response1 = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyCourseFaculty/${courseId}/${levelId}/${admissionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Lessons', response1.data.resData);
      await setFacultyId(response1.data.resData.faculty.id);
      await setBatchId(response1.data.resData.faculty.batchId);
    } catch (e) {
      console.log('Lessons: ', e);
    } finally {
      setLoading(false);
    }

    try {
      setLoading(true);
      console.log(facultyId, levelId, batchId);

      const reponse2 = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyLessonPlans/${response1.data.resData.faculty.id}/${levelId}/${response1.data.resData.faculty.batchId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(reponse2.data.resData);
      await setLessons(reponse2.data.resData.lessonPlans);
    } catch (e) {
      console.log(e);
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

  const LessonItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>{
          navigation.push('Assignments', {
            code: code,
            name: name,
            credit: credit,
            facultyId: facultyId,
            batchId: batchId,
            lessonPlanId: item.id,
            plan: item.plan,
          });
        }
        }
        style={
          theme === 'light'
            ? [mainStyle.myCourseDetailsItemContainer, {width: '95%'}]
            : [mainStyle.dMyCourseDetailsItemContainer, {width: '95%'}]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{maxWidth: '90%'}}>
            <Text
              style={
                theme === 'light'
                  ? styles.myCoursesItemTitle
                  : styles.dMyCoursesItemTitle
              }>
              Topic:{' '}
              <Text
                style={
                  theme === 'light'
                    ? [{fontWeight: '500', color: '#1d1d1d'}]
                    : [{fontWeight: 'bold', color: '#eee'}]
                }>
                {item.topic}
              </Text>
            </Text>
            <Text
              style={
                theme === 'light'
                  ? styles.myCoursesItemTitle
                  : styles.dMyCoursesItemTitle
              }>
              Session no.:{' '}
              <Text
                style={
                  theme === 'light'
                    ? [{fontWeight: '500', color: '#1d1d1d'}]
                    : [{fontWeight: 'bold', color: '#eee'}]
                }>
                {item.sessionNo}
              </Text>
            </Text>
            <Text
              style={
                theme === 'light'
                  ? styles.myTermsItemDetails
                  : styles.dMyTermsItemDetails
              }>
              <Text
                style={
                  theme === 'light'
                    ? [{fontWeight: '500', color: '#1d1d1d'}]
                    : [{fontWeight: 'bold', color: '#eee'}]
                }>
                {`${item.startDate}`}
              </Text>{' '}
              to{' '}
              <Text
                style={
                  theme === 'light'
                    ? [{fontWeight: '500', color: '#1d1d1d'}]
                    : [{fontWeight: 'bold', color: '#eee'}]
                }>
                {`${item.endDate}`}
              </Text>
            </Text>
          </View>
          <Icon
            style={(mainStyle.headerIcon, {position: 'absolute', right: 10})}
            name="circle-chevron-right"
            size={20}
            color={theme === 'light' ? '#3d3d3d' : '#ccc'}
          />
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
                  Course details
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
                marginTop: 70,
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
            <View
              style={{
                // justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
                paddingBottom: 20,
                width: '95%',
              }}>
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={theme === 'light' ? '#272D7A' : '#98BAFC'}
                />
              ) : (
                <>
                  <View
                    style={{
                      width: '100%',
                      paddingHorizontal: 20,
                      // paddingBottom: 100,
                      // paddingBottom: 250,
                      // paddingTop: 250,
                    }}>
                    <View
                      style={
                        (mainStyle.ongoingEventsButtonsContainer,
                        {justifyContent: 'flex-start'})
                      }>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.lessonPlanTitle
                            : mainStyle.dLessonPlanTitle
                        }>
                        Attendance:
                      </Text>
                      {isLoading ? (
                        <ActivityIndicator
                          size="large"
                          color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                        />
                      ) : (
                        <>
                          <Text
                            style={
                              theme === 'light'
                                ? styles.paymentHistoryStudentDetailsText
                                : [styles.dPaymentHistoryStudentDetailsText]
                            }>
                            Classes Scheduled:{' '}
                            {studentAttandanceData ? (
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.valueText
                                    : styles.dValueText
                                }>
                                {studentAttandanceData.itemScheduled}
                              </Text>
                            ) : null}
                            {'\n'}
                            Classes Completed:{' '}
                            {studentAttandanceData ? (
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.valueText
                                    : styles.dValueText
                                }>
                                {studentAttandanceData.itemCompleted}
                              </Text>
                            ) : null}
                            {'\n'}
                            Classes Attended:{' '}
                            {studentAttandanceData ? (
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.valueText
                                    : styles.dValueText
                                }>
                                {studentAttandanceData.itemPresent}{' '}
                              </Text>
                            ) : null}
                            {'\n'}
                            Attendance Percentage:{' '}
                            {studentAttandanceData ? (
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.valueText
                                    : styles.dValueText
                                }>
                                {studentAttandanceData.attandancePerc}
                                {'%'}
                              </Text>
                            ) : null}
                          </Text>
                        </>
                      )}
                    </View>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.lessonPlanTitle
                          : mainStyle.dLessonPlanTitle
                      }>
                      {'\n'}
                      Lesson Plans
                    </Text>
                    {lessons.length === 0 ? (
                      <Text
                        style={
                          theme === 'light'
                            ? styles.paymentHistoryStudentDetailsText
                            : styles.dPaymentHistoryStudentDetailsText
                        }>
                        No lesson plans available
                      </Text>
                    ) : (
                      <View
                        style={{
                          // justifyContent: 'center',
                          alignItems: 'center',
                          // marginLeft: 10,
                          // paddingTop: 20,
                          // paddingBottom: 20,
                          width: '100%',
                        }}>
                        {lessons ? (
                          <>
                            {lessons.map(item => (
                              <LessonItem item={item} key={item.id} />
                            ))}
                          </>
                        ) : (
                          <ActivityIndicator
                            size="large"
                            color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                          />
                        )}
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>
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

export default MyCourseDetails;
