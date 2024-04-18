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
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome6';

type MyAttendanceCourseWiseProps = NativeStackScreenProps<
  RootStackParamList,
  'MyAttendanceCourseWise'
>;

const MyAttendanceCourseWise = ({route}: MyAttendanceCourseWiseProps) => {
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

  const retrieveData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    console.log('Stored Token', token);
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    const firstName = JSON.parse(await AsyncStorage.getItem('firstName'));

    await setJwtToken(token);
    await setUserId(userId);
    await setAdmissionId(admissionId);
    await setFirstName(firstName);

    try {
      //   const response = await axios.get(
      //     `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyGradeMarks/${admissionId}/${levelId}`,
      //     {
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: `Bearer ${token}`,
      //       },
      //     },
      //   );
      //   console.log(response.data.resData);
      //   await setGradeCardData(response.data.resData.gradeCard);
      //   await setTgpaData(response.data.resData.tgpaSgpa);

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
        alert('Error fetching data');
        navigation.goBack();
      }
      console.log(response.data.resData.studentAttandanceData);
      await setStudentAttandanceData(
        response.data.resData.studentAttandanceData,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
                Attendance - course wise
              </Text>
            </TouchableOpacity>
          </View>
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
              }}>
              {studentAttandanceData !== null ? ( // <FlatList
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
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryStudentDetailsText
                      : mainStyle.dPaymentHistoryStudentDetailsText
                  }>
                  Classes Scheduled: <Text style={
                          theme === 'light'
                            ? styles.valueText
                            : styles.dValueText
                        }>{studentAttandanceData.itemScheduled}</Text> {"\n"}
                  Classes Completed: <Text style={
                          theme === 'light'
                            ? styles.valueText
                            : styles.dValueText
                        }>{studentAttandanceData.itemCompleted}</Text> {"\n"}
                  Classes Attended: <Text style={
                          theme === 'light'
                            ? styles.valueText
                            : styles.dValueText
                        }>{studentAttandanceData.itemPresent} </Text>{"\n"}
                  Attendance Percentage: <Text style={
                          theme === 'light'
                            ? styles.valueText
                            : styles.dValueText
                        }>{studentAttandanceData.attandancePerc}{"%"}</Text>
                </Text>
              ) : (
                <Text>No Attandance details found</Text>
              )}
            </View>
          )}
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


export default MyAttendanceCourseWise;
