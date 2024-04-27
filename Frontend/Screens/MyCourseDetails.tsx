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
  var facultyId = '',
    batchId = '';
  const {code, name, credit, courseId, levelId} = route.params;
  const [modalVisible, setModalVisible] = useState(false);

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
    console.log('Stored Token', token);

    await setToken(token);
    await setAdmissionId(admissionId);
    console.log('Token', token);

    try {
      setLoading(true);
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyClassAttendancePercentage/${courseId}/${levelId}/${admissionId}`,
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
        onPress={() =>
          navigation.push('Assignments', {
            code: code,
            name: name,
            credit: credit,
            facultyId: faculty.id,
            batchId: faculty.batchId,
            lessonPlanId: item.id,
            plan: item.plan,
          })
        }
        style={
          theme === 'light'
            ? mainStyle.myCourseDetailsItemContainer
            : mainStyle.dMyCourseDetailsItemContainer
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
                Course details
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalContainerView}>
              <View
                style={
                  theme === 'light' ? styles.modalView : styles.dModalView
                }>
                <View style={{minWidth: '95%'}}>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myTermsItemDetails
                        : mainStyle.dMyTermsItemDetails
                    }>
                    Code: {code}
                  </Text>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myTermsItemDetails
                        : mainStyle.dMyTermsItemDetails
                    }>
                    Name: {name}
                  </Text>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myTermsItemDetails
                        : mainStyle.dMyTermsItemDetails
                    }>
                    Credit: {credit}
                  </Text>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myTermsItemDetails
                        : mainStyle.dMyTermsItemDetails
                    }>
                    Credit hours:
                  </Text>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myTermsItemDetails
                        : mainStyle.dMyTermsItemDetails
                    }>
                    Course Type:
                  </Text>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myTermsItemDetails
                        : mainStyle.dMyTermsItemDetails
                    }>
                    Faculty ID:
                  </Text>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myTermsItemDetails
                        : mainStyle.dMyTermsItemDetails
                    }>
                    Faculty Name:
                  </Text>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myTermsItemDetails
                        : mainStyle.dMyTermsItemDetails
                    }>
                    Faculty email:
                  </Text>
                </View>
                <Pressable
                  style={
                    theme === 'light'
                      ? [styles.button, styles.buttonClose]
                      : [styles.dButton, styles.dButtonClose]
                  }
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text
                    style={
                      theme === 'light' ? styles.textStyle : styles.dTextStyle
                    }>
                    Back
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
                  (theme === 'light'
                    ? styles.paymentHistoryStudentDetailsText
                    : styles.dPaymentHistoryStudentDetailsText)
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
                  (theme === 'light'
                    ? styles.paymentHistoryStudentDetailsText
                    : styles.dPaymentHistoryStudentDetailsText)
                }>
                <Text
                  style={
                    theme === 'light' ? styles.valueText : styles.dValueText
                  }>{`${name}`}</Text>
              </Text>
              <Text
                style={
                  (theme === 'light'
                    ? styles.paymentHistoryStudentDetailsText
                    : styles.dPaymentHistoryStudentDetailsText)
                }>
                credit{' '}
                <Text
                  style={
                    theme === 'light' ? styles.valueText : styles.dValueText
                  }>{`${credit}`}</Text>
              </Text>
              {/* <Text
                style={
                  theme === 'light'
                    ? mainStyle.myCourseItemDetails
                    : mainStyle.dMyCourseItemDetails
                }>
                Faculty ID: {faculty.id}
              </Text> */}
              {/* <Text
                style={
                  theme === 'light'
                    ? mainStyle.myCourseItemDetails
                    : mainStyle.dMyCourseItemDetails
                }>
                Batch ID: {faculty.batchId}
              </Text> */}
            </View>
            </View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={theme === 'light' ? '#272D7A' : '#98BAFC'}
            />
          ) : (
            <>
              <View
                style={{
                  width: '90%',
                  // paddingBottom: 100,
                  // paddingBottom: 250,
                  height: '70%',
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
});

export default MyCourseDetails;
