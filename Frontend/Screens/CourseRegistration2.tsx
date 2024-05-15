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
  ScrollView,
  Animated,
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

type CourseRegistration2Props = NativeStackScreenProps<
  RootStackParamList,
  'CourseRegistration2'
>;

const CourseRegistration2 = ({route}: CourseRegistration2Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);
  const [jwtToken, setJwtToken] = useState('');
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [admissionId, setAdmissionId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [levelCode, setLevelCode] = useState('');
  const [offeredCourses, setOfferedCourses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [credit, setCredit] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [courseType, setCourseType] = useState('');
  const [baseURL, setBaseURL] = useState();

  const retrieveData = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    console.log('Stored Token', token);
    const firstName = JSON.parse(await AsyncStorage.getItem('firstName'));
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    const levelId = JSON.parse(await AsyncStorage.getItem('levelId'));
    const levelCode = JSON.parse(await AsyncStorage.getItem('levelCode'));
    const baseURL = JSON.parse(await AsyncStorage.getItem('baseURL'));

    await setJwtToken(token);
    await setUserId(userId);
    await setFirstName(firstName);
    await setAdmissionId(admissionId);
    await setLevelId(levelId);
    await setLevelCode(levelCode);
    await setBaseURL(baseURL);

    const response = await axios.get(
      `${baseURL}/nure-student/v1/fetchOfferedCourses/${admissionId}/${levelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('Response', response.data.resData);

    if (response.data.resData.offeredCourses !== null) {
      setOfferedCourses(response.data.resData.offeredCourses);
    }
  };
  useEffect(() => {
    retrieveData();
    const colorTheme = Appearance.getColorScheme();
    console.log(colorTheme);
    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  const item = ({item}) => (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: 50, backgroundColor: 'lightyellow'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
          {item.id}
        </Text>
      </View>
      <View style={{width: 400, backgroundColor: 'lightpink'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
          {item.name}
        </Text>
      </View>
      <View style={{width: 400, backgroundColor: 'lavender'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
          {item.email}
        </Text>
      </View>
    </View>
  );

  const data = [
    {id: 1, name: 'John', email: 'john@gmail.com'},
    {id: 2, name: 'Bob', email: 'bob@gmail.com'},
    {id: 3, name: 'Mei', email: 'mei@gmail.com'},
    {id: 4, name: 'Steve', email: 'steve@gmail.com'},
  ];

  const [icons, setIcons] = useState({
    name1: 'square',
    name2: 'square',
    name3: 'square',
    name4: 'square',
    name5: 'square',
  });

  const handleCourseRegistrationBtn = async syllabusCourseId => {
    console.log('Course Registration');
    try {
      const response = await axios.post(
        `${baseURL}/nure-student/v1/courseEnrolment`,
        {
          id: admissionId,
          levelId: levelId,
          syllabusCourseId: syllabusCourseId,
          sbcId: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      if (response.data.message !== null) {
        alert(response.data.message);
      }
      navigation.replace('CourseRegistration2');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleCourseDeregistrationBtn = async (syllabusCourseId, sbcId) => {
    console.log('Course Deregistration');
    try {
      const response = await axios.post(
        `${baseURL}/nure-student/v1/cancelCourseEnrolment`,
        {
          id: admissionId,
          levelId: levelId,
          syllabusCourseId: syllabusCourseId,
          sbcId: sbcId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      if (response.data.message !== null) {
        alert(response.data.message);
      }
      navigation.replace('CourseRegistration2');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleMoreInfoBtn = async (
    courseCode,
    courseName,
    courseCredit,
    courseCreditHours,
    facultyId,
    facultyName,
    facultyEmail,
    courseType,
  ) => {
    console.log('More info');
    await setCode(courseCode);
    await setName(courseName);
    await setCredit(courseCredit);
    await setCreditHours(courseCreditHours);
    await setFacultyId(facultyId);
    await setFacultyName(facultyName);
    await setFacultyEmail(facultyEmail);
    await setCourseType(courseType);
    await setModalVisible(true);
  };

  const NewTermItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.courseRegistrationTableRow
            : mainStyle.dCourseRegistrationTableRow
        }>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 50})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.courseCode}
          </Text>
        </View>
        <View
          style={
            theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.courseName}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 70})
          }>
          <TouchableOpacity
            onPress={() =>
              handleMoreInfoBtn(
                item.courseCode,
                item.courseName,
                item.courseCredit,
                item.courseCreditHours,
                item.facultyId,
                item.facultyName,
                item.facultyEmail,
                item.courseTypeName,
              )
            }
            style={
              theme === 'light'
                ? {
                    backgroundColor: 'transparent',
                    width: '100%',
                    paddingVertical: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    borderColor: '4d4d4d',
                    borderWidth: 1,
                  }
                : {
                    backgroundColor: 'transparent',
                    width: '100%',
                    paddingVertical: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    borderColor: '#ccc',
                    borderWidth: 1,
                  }
            }>
            <Text
              style={
                theme === 'light'
                  ? {
                      color: '#4d4d4d',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }
                  : {
                      color: '#ccc',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }
              }>
              Details
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 80})
          }>
          {item.sbcId != 0 ? (
            <TouchableOpacity
              style={
                theme === 'light'
                  ? {
                      backgroundColor: 'transparent',
                      width: '100%',
                      paddingVertical: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderColor: '#DB1313',
                      borderWidth: 1,
                    }
                  : {
                      backgroundColor: 'transparent',
                      width: '100%',
                      paddingVertical: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderColor: '#DD696B',
                      borderWidth: 1,
                    }
              }
              onPress={() =>
                handleCourseDeregistrationBtn(item.syllabusCourseId, item.sbcId)
              }>
              <Text
                style={
                  theme === 'light'
                    ? {
                        color: '#DB1313',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }
                    : {
                        color: '#DD696B',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }
                }>
                Deregister
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={
                theme === 'light'
                  ? {
                      backgroundColor: 'transparent',
                      width: '100%',
                      paddingVertical: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderColor: '#1E63BB',
                      borderWidth: 1,
                    }
                  : {
                      backgroundColor: 'transparent',
                      width: '100%',
                      paddingVertical: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      borderColor: '#98BAFC',
                      borderWidth: 1,
                    }
              }
              onPress={() =>
                handleCourseRegistrationBtn(item.syllabusCourseId)
              }>
              <Text
                style={
                  theme === 'light'
                    ? {
                        color: '#1E63BB',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }
                    : {
                        color: '#98BAFC',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }
                }>
                Register
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const TermItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.myTermsItemContainer
            : mainStyle.dMyTermsItemContainer
        }>
        <View
          style={{flexDirection: 'row', alignItems: 'center'}}
          //   onPress={() => navigation.push('MyCourses', {levelId: item.id})}
        >
          <View style={{minWidth: '95%'}}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Code: {item.courseCode}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Name: {item.courseName}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Credit: {item.courseCredit}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Credit hours: {item.courseCreditHours}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Course type: {item.courseTypeName}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Faculty Name: {item.facultyName}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Faculty email: {item.facultyEmail}
            </Text>
            <View style={{width: '100%', alignItems: 'center'}}>
              {item.sbcId != 0 ? (
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? mainStyle.courseDeregistrationBtnOld
                      : mainStyle.dCourseDeregistrationBtnOld
                  }
                  onPress={() =>
                    handleCourseDeregistrationBtn(
                      item.syllabusCourseId,
                      item.sbcId,
                    )
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.courseRegistrationBtnText
                        : mainStyle.dCourseRegistrationBtnText
                    }>
                    Deregister
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={
                    theme === 'light'
                      ? mainStyle.courseRegistrationBtnOld
                      : mainStyle.dCourseRegistrationBtnOld
                  }
                  onPress={() =>
                    handleCourseRegistrationBtn(item.syllabusCourseId)
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.courseRegistrationBtnText
                        : mainStyle.dCourseRegistrationBtnText
                    }>
                    Register
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
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
          <View
            style={{width: '100%', height: '100%', justifyContent: 'center'}}>
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
                    Course Registration
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            <ScrollView
              onScroll={e => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  padding: 20,
                  paddingTop: 70,
                }}>
                <Text
                  style={
                    (theme === 'light'
                      ? [mainStyle.paymentHistoryStudentDetailsText, {fontSize: 13}]
                      : [mainStyle.dPaymentHistoryStudentDetailsText, {fontSize: 13}])
                  }>
                  Level Code
                </Text>
                <Text
                  style={[
                    theme === 'light' ? styles.valueText : styles.dValueText
                  ]}>
                  {levelCode}
                </Text>
                <Text
                  style={
                    (theme === 'light'
                      ? [mainStyle.paymentHistoryStudentDetailsText, {fontSize: 13}]
                      : [mainStyle.dPaymentHistoryStudentDetailsText, {fontSize: 13}])
                  }>
                  Name
                </Text>
                <Text
                  style={
                    theme === 'light' ? styles.valueText : styles.dValueText
                  }>
                  {firstName}
                </Text>
                <View style={{width: '100%'}}>
                  <View
                    style={
                      theme === 'light'
                        ? mainStyle.courseRegistrationTable
                        : mainStyle.courseRegistrationTable
                    }>
                    <View
                      style={
                        theme == 'light'
                          ? mainStyle.courseRegistrationTableHeader
                          : mainStyle.dCourseRegistrationTableHeader
                      }>
                      <View
                        style={
                          (theme === 'light'
                            ? mainStyle.courseRegistrationTableCell
                            : mainStyle.dCourseRegistrationTableCell,
                          {width: 50})
                        }>
                        <Text
                          style={
                            theme === 'light'
                              ? mainStyle.courseRegistrationTableHeaderText
                              : mainStyle.dCourseRegistrationTableHeaderText
                          }>
                          Course Code
                        </Text>
                      </View>
                      <View
                        style={
                          theme === 'light'
                            ? mainStyle.courseRegistrationTableCell
                            : mainStyle.dCourseRegistrationTableCell
                        }>
                        <Text
                          style={
                            theme === 'light'
                              ? mainStyle.courseRegistrationTableHeaderText
                              : mainStyle.dCourseRegistrationTableHeaderText
                          }>
                          Course Name
                        </Text>
                      </View>
                      <View
                        style={
                          (theme === 'light'
                            ? mainStyle.courseRegistrationTableCell
                            : mainStyle.dCourseRegistrationTableCell,
                          {width: 70})
                        }>
                        <Text
                          style={
                            theme === 'light'
                              ? mainStyle.courseRegistrationTableHeaderText
                              : mainStyle.dCourseRegistrationTableHeaderText
                          }>
                          More info
                        </Text>
                      </View>
                      <View
                        style={
                          (theme === 'light'
                            ? mainStyle.courseRegistrationTableCell
                            : mainStyle.dCourseRegistrationTableCell,
                          {width: 80})
                        }>
                        <Text
                          style={
                            theme === 'light'
                              ? mainStyle.courseRegistrationTableHeaderText
                              : mainStyle.dCourseRegistrationTableHeaderText
                          }>
                          Action
                        </Text>
                      </View>
                    </View>
                    {offeredCourses.map((item, index) => {
                      return <NewTermItem key={index} item={item} />;
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>
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
                        (theme === 'light'
                          ? mainStyle.paymentHistoryStudentDetailsText
                          : mainStyle.dPaymentHistoryStudentDetailsText)
                      }>
                      Code
                    </Text>
                    <Text
                      style={[
                        theme === 'light'
                          ? styles.valueText
                          : styles.dValueText
                      ]}>
                      {code}
                    </Text>
                    <Text
                      style={
                        (theme === 'light'
                          ? mainStyle.paymentHistoryStudentDetailsText
                          : mainStyle.dPaymentHistoryStudentDetailsText)
                      }>
                      Name
                    </Text>
                    <Text
                      style={[
                        theme === 'light'
                          ? styles.valueText
                          : styles.dValueText
                      ]}>
                      {name}
                    </Text>
                    <Text
                      style={
                        (theme === 'light'
                          ? mainStyle.paymentHistoryStudentDetailsText
                          : mainStyle.dPaymentHistoryStudentDetailsText)
                      }>
                      Credit
                    </Text>
                    <Text
                      style={[
                        theme === 'light'
                          ? styles.valueText
                          : styles.dValueText
                      ]}>
                      {credit}
                    </Text>
                    <Text
                      style={
                        (theme === 'light'
                          ? mainStyle.paymentHistoryStudentDetailsText
                          : mainStyle.dPaymentHistoryStudentDetailsText)
                      }>
                      Credit hours
                    </Text>
                    <Text
                      style={[
                        theme === 'light'
                          ? styles.valueText
                          : styles.dValueText
                      ]}>
                      {creditHours}
                    </Text>
                    <Text
                      style={
                        (theme === 'light'
                          ? mainStyle.paymentHistoryStudentDetailsText
                          : mainStyle.dPaymentHistoryStudentDetailsText)
                      }>
                      Course Type
                    </Text>
                    <Text
                      style={
                        [theme === 'light' ? styles.valueText : styles.dValueText]
                      }>
                      {courseType}
                    </Text>
                    <Text
                      style={
                        (theme === 'light'
                          ? mainStyle.paymentHistoryStudentDetailsText
                          : mainStyle.dPaymentHistoryStudentDetailsText)
                      }>
                      Faculty ID
                    </Text>
                    <Text
                        style={
                          [theme === 'light'
                            ? styles.valueText
                            : styles.dValueText]
                        }>
                        {facultyId}
                      </Text>
                    <Text
                      style={
                        (theme === 'light'
                          ? mainStyle.paymentHistoryStudentDetailsText
                          : mainStyle.dPaymentHistoryStudentDetailsText)
                      }>
                      Faculty Name
                    </Text>
                    <Text
                        style={
                          [theme === 'light'
                            ? styles.valueText
                            : styles.dValueText]
                        }>
                        {facultyName}
                      </Text>
                    <Text
                      style={
                        (theme === 'light'
                          ? mainStyle.paymentHistoryStudentDetailsText
                          : mainStyle.dPaymentHistoryStudentDetailsText)
                      }>
                      Faculty email
                    </Text>
                    <Text
                        style={
                          [theme === 'light'
                            ? styles.valueText
                            : styles.dValueText]
                        }>
                        {facultyEmail}
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
    fontSize: 16,
    paddingBottom: 10,
  },
  dValueText: {
    color: '#eee',
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10,
  },
});

export default CourseRegistration2;
