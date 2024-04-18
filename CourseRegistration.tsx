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

type CourseRegistrationProps = NativeStackScreenProps<
  RootStackParamList,
  'CourseRegistration'
>;

const CourseRegistration = ({route}: CourseRegistrationProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);

  const retrieveData = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    console.log('Stored Token', token);
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
                Course Registration
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: 20,
            }}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.paymentHistoryStudentDetailsText
                  : mainStyle.dPaymentHistoryStudentDetailsText
              }>
              Semester : VI {`\n`}
              Name : Karan Padhiyar {`\n`}
              Roll no. : 202001162 {`\n`}
              Mobile no : 95******** {`\n`}
              Program : Computer Science
            </Text>
            <View style={mainStyle.paymentHistoryTable}>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.paymentHistoryTHead
                    : mainStyle.dPaymentHistoryTHead
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTHeadText
                      : mainStyle.dPaymentHistoryTHeadText
                  }>
                  Sr.no.
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTHeadText
                      : mainStyle.dPaymentHistoryTHeadText
                  }>
                  Course
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTHeadText
                      : mainStyle.dPaymentHistoryTHeadText
                  }>
                  Credits
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTHeadText
                      : mainStyle.dPaymentHistoryTHeadText
                  }>
                  Select
                </Text>
              </View>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.paymentHistoryTBody
                    : mainStyle.dPaymentHistoryTBody
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  1 {'          '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course {'       '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  x.x {'           '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  <Icon
                    onPress={() => {
                      if (icons.name1 === 'square') {
                        setIcons({...icons, name1: 'check-square'});
                      } else {
                        setIcons({...icons, name1: 'square'});
                      }
                    }}
                    style={mainStyle.headerIcon}
                    name={icons.name1}
                    size={20}
                    color={theme === 'light' ? '#1d1d1d' : '#eee'}
                  />
                </Text>
              </View>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.paymentHistoryTBody
                    : mainStyle.dPaymentHistoryTBody
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  2 {'          '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course {'       '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  x.x {'           '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  <Icon
                    onPress={() => {
                      if (icons.name2 === 'square') {
                        setIcons({...icons, name2: 'check-square'});
                      } else {
                        setIcons({...icons, name2: 'square'});
                      }
                    }}
                    style={mainStyle.headerIcon}
                    name={icons.name2}
                    size={20}
                    color={theme === 'light' ? '#1d1d1d' : '#eee'}
                  />
                </Text>
              </View>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.paymentHistoryTBody
                    : mainStyle.dPaymentHistoryTBody
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  3 {'          '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course {'       '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  x.x {'           '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  <Icon
                    onPress={() => {
                      if (icons.name3 === 'square') {
                        setIcons({...icons, name3: 'check-square'});
                      } else {
                        setIcons({...icons, name3: 'square'});
                      }
                    }}
                    style={mainStyle.headerIcon}
                    name={icons.name3}
                    size={20}
                    color={theme === 'light' ? '#1d1d1d' : '#eee'}
                  />
                </Text>
              </View>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.paymentHistoryTBody
                    : mainStyle.dPaymentHistoryTBody
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  4 {'          '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course {'       '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  x.x {'           '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  <Icon
                    onPress={() => {
                      if (icons.name4 === 'square') {
                        setIcons({...icons, name4: 'check-square'});
                      } else {
                        setIcons({...icons, name4: 'square'});
                      }
                    }}
                    style={mainStyle.headerIcon}
                    name={icons.name4}
                    size={20}
                    color={theme === 'light' ? '#1d1d1d' : '#eee'}
                  />
                </Text>
              </View>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.paymentHistoryTBody
                    : mainStyle.dPaymentHistoryTBody
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  5 {'          '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course {'       '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  x.x {'           '}
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  <Icon
                    onPress={() => {
                      if (icons.name5 === 'square') {
                        setIcons({...icons, name5: 'check-square'});
                      } else {
                        setIcons({...icons, name5: 'square'});
                      }
                    }}
                    style={mainStyle.headerIcon}
                    name={icons.name5}
                    size={20}
                    color={theme === 'light' ? '#1d1d1d' : '#eee'}
                  />
                </Text>
              </View>
            </View>
          </View>
          <View style={mainStyle.courseRegistrationBtnCont}>
            <TouchableOpacity
              style={
                theme === 'light'
                  ? mainStyle.courseRegistrationBtn
                  : mainStyle.dCourseRegistrationBtn
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
});

export default CourseRegistration;

// import React, {useState} from 'react';
// import {Button, TextInput, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// const CourseRegistration = () => {
//   const [studentName, setStudentName] = useState('');
//   const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

//   const handleCourseSelection = (course: string) => {
//     // Add or remove the course based on its current selection state
//     const index = selectedCourses.indexOf(course);
//     if (index === -1) {
//       setSelectedCourses([...selectedCourses, course]);
//     } else {
//       setSelectedCourses(selectedCourses.filter((c) => c !== course));
//     }
//   };

//   const handleRegistration = () => {
//     // Implement your registration logic here
//     console.log('Student Name:', studentName);
//     console.log('Selected Courses:', selectedCourses);
//     // You can send the registration data to your backend or perform any other necessary action
//   };

// interface Course {
//   index: number;
//   name: string;
//   credits: number;
//   selected: boolean;
// }

//   const [courses, setCourses] = useState<Course[]>([
//     { index: 1, name: 'Course A', credits: 3, selected: false },
//     { index: 2, name: 'Course B', credits: 4, selected: false },
//     { index: 3, name: 'Course C', credits: 3, selected: false },
//     { index: 4, name: 'Course D', credits: 4, selected: false },
//     { index: 5, name: 'Course E', credits: 3, selected: false },
//     { index: 6, name: 'Course F', credits: 4, selected: false },
//   ]);

//   const toggleSelection = (index: number) => {
//     setCourses((prevCourses) =>
//       prevCourses.map((course) =>
//         course.index === index ? { ...course, selected: !course.selected } : course
//       )
//     );
//   };

//   return (
//     <View style={styles.bigContainer}>
//       <View style={styles.container}>
//           <Text style={styles.heading}>Course Registration</Text>
//           <View style={styles.table}>
//               <Text style={styles.tableRow}><Text style={styles.cell1}>Semester:</Text>   VI</Text>
//               <Text style={styles.tableRow}><Text style={styles.cell1}>Name:</Text>         Karan Padhiyar</Text>
//               <Text style={styles.tableRow}><Text style={styles.cell1}>Roll No:</Text>       202001162</Text>
//               <Text style={styles.tableRow}><Text style={styles.cell1}>Mobile No:</Text>  92340-13422</Text>
//               <Text style={styles.tableRow}><Text style={styles.cell1}>Program:</Text>     Computer Science</Text>
//           </View>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           placeholderTextColor={'#717171'}
//           value={studentName}
//           onChangeText={(text) => setStudentName(text)}
//         />
//       </View>

//       <View style={styles.container2}>
//         <View style={styles.tableRow2}>
//           <Text style={styles.columnHeader}>Index</Text>
//           <Text style={styles.columnHeader}>Course Name</Text>
//           <Text style={styles.columnHeader}>CourseRegistrationedits</Text>
//           <Text style={styles.columnHeader}>Selected</Text>
//         </View>
//         {courses.map((course) => (
//           <View key={course.index} style={styles.tableRow2}>
//             <Text style={styles.cell}>{course.index}</Text>
//             <Text style={styles.cell}>{course.name}</Text>
//             <Text style={styles.cell}>{course.CourseRegistrationedits}</Text>
//             <TouchableOpacity
//               style={[styles.checkbox, { backgroundColor: course.selected ? 'green' : 'transparent' }]}
//               onPress={() => toggleSelection(course.index)}
//             />
//           </View>
//         ))}
//       </View>

//       <Text style={styles.subHeading}>Select Courses:</Text>
//       <View style={styles.courseList}>
//         <Button
//           title="Mathematics"
//           onPress={() => handleCourseSelection('Mathematics')}
//           color={selectedCourses.includes('Mathematics') ? '#007bff' : '#aaa'}
//         />
//         <Button
//           title="Physics"
//           onPress={() => handleCourseSelection('Physics')}
//           color={selectedCourses.includes('Physics') ? '#007bff' : '#aaa'}
//         />
//         <Button
//           title="Chemistry"
//           onPress={() => handleCourseSelection('Chemistry')}
//           color={selectedCourses.includes('Chemistry') ? '#007bff' : '#aaa'}
//         />
//       </View>

//       <Button
//         title="Register"
//         onPress={handleRegistration}
//         disabled={!studentName || selectedCourses.length === 0}
//       />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   bigContainer: {
//     flex: 1,
//     backgroundColor: '#F3F3F3',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   heading: {
//     flex: 1,
//     alignSelf: 'flex-start',
//     fontSize: 30,
//     marginTop: 20,
//     marginBottom: 20,
//     color: '#000000'
//   },
//   cell1: {
//     fontWeight: 'bold',
//     color: '#717171'
//   },
//   table: {
//     alignSelf: 'flex-start',
//     marginBottom: 20,
//   },
//   tableRow: {
//     fontSize: 12,
//     marginBottom: 5,
//     color: '#717171'
//   },
//   input: {
//     height: 40,
//     color: '#ffffff',
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10
//   },
//   subHeading: {
//     alignSelf: 'flex-start',
//     fontSize: 18,
//     marginBottom: 10,
//     marginTop: 20,
//     color: '#717171'
//   },
//   courseList: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     // alignItems: 'space-between',
//     marginBottom: 20,
//     // width: '100%',
//   },
//   container2: {
//     flex: 1,
//     padding: 10,
//   },
//   tableRow2: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   columnHeader: {
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//     color: '#454545'
//   },
//   cell: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#454545'
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderRadius: 4,
//     borderWidth: 1,
//   },
// });

// export default CourseRegistration;
