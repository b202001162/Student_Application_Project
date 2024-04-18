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
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome6';

type MyTimeTableCourseWiseProps = NativeStackScreenProps<
  RootStackParamList,
  'MyTimeTableCourseWise'
>;

const MyTimeTableCourseWise = ({route}: MyTimeTableCourseWiseProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {code, name, credit, courseId, levelId} = route.params;
  console.log(courseId, levelId);

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [courses, setCourses] = useState([]);
  const [terms, setTerms] = useState([]);
  const [jwtToken, setJwtToken] = useState('');
  const [userId, setUserId] = useState('');
  const [admissionId, setAdmissionId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gradeCardData, setGradeCardData] = useState([]);
  const [tgpaData, setTgpaData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [studentAttandanceData, setStudentAttandanceData] = useState({});
  const [timeTableData, setTimeTableData] = useState([]);
  const [facultName, setFacultyName] = useState('');
  const [batchName, setBatchName] = useState('');
  const [days, setDays] = useState();

  const retrieveData = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    console.log('Stored Token', token);
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    const firstName = JSON.parse(await AsyncStorage.getItem('firstName'));

    await setJwtToken(token);
    await setUserId(userId);
    await setAdmissionId(admissionId);
    await setFirstName(firstName);

    // try {
    //   //   const response = await axios.get(
    //   //     `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyGradeMarks/${admissionId}/${levelId}`,
    //   //     {
    //   //       headers: {
    //   //         'Content-Type': 'application/json',
    //   //         Authorization: `Bearer ${token}`,
    //   //       },
    //   //     },
    //   //   );
    //   //   console.log(response.data.resData);
    //   //   await setGradeCardData(response.data.resData.gradeCard);
    //   //   await setTgpaData(response.data.resData.tgpaSgpa);

    //   //   const response = await axios.get(
    //   //     `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyClassAttendancePercentage/${courseId}/${levelId}/${admissionId}`,
    //   //     {
    //   //       headers: {
    //   //         'Content-Type': 'application/json',
    //   //         Authorization: `Bearer ${token}`,
    //   //       },
    //   //     },
    //   //   );

    //   const response = await axios.get(
    //     `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyClassTimeTable/${courseId}/${levelId}/${admissionId}/7`,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );
    //   if (response.data.sCode !== 1) {
    //     alert('Error fetching data');
    //     navigation.goBack();
    //   }
    //   console.log(response.data.resData.timeTableData);
    //   await setTimeTableData(response.data.resData.timeTableData);
    //   if (
    //     response.data.resData.timeTableData !== null &&
    //     response.data.resData.timeTableData.length > 0
    //   )
    //     await setFacultyName(
    //       response.data.resData.timeTableData[0].facultyName,
    //     );
    //   await setBatchName(response.data.resData.timeTableData[0].batchName);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
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

  //   const item = ({item}) => (
  //     <View style={{flexDirection: 'row'}}>
  //       <View style={{width: 50, backgroundColor: 'lightyellow'}}>
  //         <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
  //           {item.id}
  //         </Text>
  //       </View>
  //       <View style={{width: 400, backgroundColor: 'lightpink'}}>
  //         <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
  //           {item.name}
  //         </Text>
  //       </View>
  //       <View style={{width: 400, backgroundColor: 'lavender'}}>
  //         <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
  //           {item.email}
  //         </Text>
  //       </View>
  //     </View>
  //   );

  //   const data = [
  //     {id: 1, name: 'John', email: 'john@gmail.com'},
  //     {id: 2, name: 'Bob', email: 'bob@gmail.com'},
  //     {id: 3, name: 'Mei', email: 'mei@gmail.com'},
  //     {id: 4, name: 'Steve', email: 'steve@gmail.com'},
  //   ];

  const formatTime = timeString => {
    const date = new Date(timeString); // Create a Date object from the string

    const hours = date.getHours(); // Get the hours (0-23)
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get padded minutes (00-59)
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
    const newHours = hours % 12 || 12; // Convert hours to 12-hour format (1-12)

    const formattedTime = `${newHours}:${minutes} ${ampm}`;
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`;

    return `${formattedTime} ${formattedDate}`;
  };

  const ResultItem = ({item, index}) => {
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
            {width: 30, justifyContent: 'center', alignItems: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {index}
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
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.venueName == null || item.venueName === ''
              ? 'NA'
              : item.venueName}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 80, justifyContent: 'center', alignItems: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.fromDate == null ? 'NA' : formatTime(item.fromDate)}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 80, justifyContent: 'center', alignItems: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.toDate == null || item.toDate === ''
              ? 'NA'
              : formatTime(item.toDate)}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 60, justifyContent: 'center', alignItems: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.sessionTime == null || item.sessionTime === ''
              ? 'NA'
              : item.sessionTime}{' '}
            {'hr'}
          </Text>
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

  const handleGetTimeTable = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyClassTimeTable/${courseId}/${levelId}/${admissionId}/${days}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      if (response.data.sCode !== 1) {
        alert('Error fetching data');
        navigation.goBack();
      }
      console.log(response.data.resData.timeTableData);
      await setTimeTableData(response.data.resData.timeTableData);
      if (
        response.data.resData.timeTableData !== null &&
        response.data.resData.timeTableData.length > 0
      )
        await setFacultyName(
          response.data.resData.timeTableData[0].facultyName,
        );
      await setBatchName(response.data.resData.timeTableData[0].batchName);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNumberChange = async text => {
    const cleanNumber = text.replace(/[^0-9]/g, '');
    await setDays(cleanNumber);
  };

  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
        <View
          style={
            theme === 'light' ? mainStyle.subContainer : mainStyle.dSubContainer
          }>
          <View style={{width: '100%', justifyContent: 'center'}}>
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
                    Timetable for {name}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>

          <ScrollView
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 70,
                paddingTop: 10,
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
                      ? mainStyle.myTermsItemTitle
                      : mainStyle.dMyTermsItemTitle
                  }>
                  Course Code: {code}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.myCourseItemDetails
                      : mainStyle.dMyCourseItemDetails
                  }>
                  Name: {`${name}`}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.myCourseItemDetails
                      : mainStyle.dMyCourseItemDetails
                  }>
                  Course credit: {`${credit}`}
                </Text>
                {!isLoading && timeTableData !== null ? (
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myCourseItemDetails
                        : mainStyle.dMyCourseItemDetails
                    }>
                    Faculty name: {`${facultName}`}
                  </Text>
                ) : null}
                {!isLoading && timeTableData !== null ? (
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myCourseItemDetails
                        : mainStyle.dMyCourseItemDetails
                    }>
                    Batch name: {`${batchName}`}
                  </Text>
                ) : null}
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

            <View
              style={
                theme === 'light'
                  ? mainStyle.timeTablePageTextInput
                  : mainStyle.dTimeTablePageTextInput
              }>
              <TextInput
                style={
                  theme == 'light'
                    ? mainStyle.timeTablePageInputText
                    : mainStyle.dTimeTablePageInputText
                }
                keyboardType="numeric"
                placeholder="Enter Days"
                placeholderTextColor={theme === 'light' ? '#003f5c' : '#ccc'}
                onChangeText={handleNumberChange}
              />
              <TouchableOpacity
                onPress={() => {
                  console.log(days);
                  if (days === '' || days === null) {
                    alert('Please enter days');
                    return;
                  }
                  handleGetTimeTable();
                }}
                style={
                  theme === 'light'
                    ? mainStyle.timeTablePageButton
                    : mainStyle.dTimeTablePageButton
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.loginButtonText
                      : mainStyle.dLoginButtonText
                  }>
                  Get Timetable
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
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 10,
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                }}>
                {timeTableData !== null ? ( // <FlatList
                  //   data={courses}
                  //   renderItem={({item}) => <CourseItem item={item} />}
                  //   contentContainerStyle={mainStyle.flatListStyle}
                  //   keyExtractor={item => item.id} // Use unique IDs for performance
                  //   ItemSeparatorComponent={() => (
                  //     <View style={mainStyle.separator} />
                  //   )}
                  //   // ListHeaderComponent={() => (
                  //   //   <Text style={mainStyle.header}>Courses</Text>
                  //   // )}
                  // />
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
                          {width: 30})
                        }>
                        <Text
                          style={
                            theme === 'light'
                              ? mainStyle.courseRegistrationTableHeaderText
                              : mainStyle.dCourseRegistrationTableHeaderText
                          }>
                          Sr no.
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
                          Venue
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
                          Start time
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
                          End time
                        </Text>
                      </View>
                      <View
                        style={
                          (theme === 'light'
                            ? mainStyle.courseRegistrationTableCell
                            : mainStyle.dCourseRegistrationTableCell,
                          {width: 60})
                        }>
                        <Text
                          style={
                            theme === 'light'
                              ? mainStyle.courseRegistrationTableHeaderText
                              : mainStyle.dCourseRegistrationTableHeaderText
                          }>
                          Session duration
                        </Text>
                      </View>
                    </View>
                    {isLoading ? (
                      <ActivityIndicator size="large" color="#1E63BB" />
                    ) : (
                      <>
                        {timeTableData.map((item, index) => (
                          <ResultItem
                            item={item}
                            index={index + 1}
                            key={index}
                          />
                        ))}
                      </>
                    )}
                  </View>
                ) : (
                  <Text>No Timetable details found</Text>
                )}
              </View>
            )}
          </ScrollView>
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

export default MyTimeTableCourseWise;
