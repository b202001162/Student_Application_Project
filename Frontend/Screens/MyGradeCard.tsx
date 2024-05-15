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
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome6';

type MyGradeCardProps = NativeStackScreenProps<
  RootStackParamList,
  'MyGradeCard'
>;

const MyGradeCard = ({route}: MyGradeCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const {} = route.params;
  // console.log(code, name);

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);
  const [jwtToken, setJwtToken] = useState('');
  const [userId, setUserId] = useState('');
  const [admissionId, setAdmissionId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gradeCardData, setGradeCardData] = useState([]);
  const [tgpaData, setTgpaData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [todaysSchedule, setTodaysSchedule] = useState([]); // [course1, course2, course3, ...
  const [tomorrowsSchedule, setTomorrowsSchedule] = useState([]); // [course1, course2, course3, ...
  const [nextsevensdaysSchedule, setNextsevensdaysSchedule] = useState([]); // [course1, course2, course3, ...
  const [filterStatus, setFilterStatus] = useState('today');
  const [timeTableData, setTimeTableData] = useState([]);
  const [todayDate, setTodayDate] = useState(new Date());
  const [tomorrowDate, setTomorrowDate] = useState();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [baseURL, setBaseURL] = useState();

  const retrieveData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    console.log('Stored Token', token);
    const admissionId = await JSON.parse(await AsyncStorage.getItem('admissionId'));
    const firstName = await JSON.parse(await AsyncStorage.getItem('firstName'));
    const baseURL = await JSON.parse(await AsyncStorage.getItem('baseURL'));

    await setJwtToken(token);
    await setUserId(userId);
    await setAdmissionId(admissionId);
    await setFirstName(firstName);
    await setBaseURL(baseURL);

    try {
      const response1 = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyTerms/${admissionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response1.data.sCode !== 1) {
        alert('Error fetching data');
        navigation.goBack();
      }

      //   console.log(response.data);

      if (response1.data.sCode !== 1) {
        alert('Error fetching data');
        navigation.goBack();
      }
      console.log(response1.data.resData.levels);

      await setTerms(response1.data.resData.levels);
      await setFilterStatus(response1.data.resData.levels[0].code);
      await setCode(response1.data.resData.levels[0].code);
      await setName(response1.data.resData.levels[0].name);
      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyGradeMarks/${admissionId}/${response1.data.resData.levels[0].id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data.resData);
      await setGradeCardData(response.data.resData.gradeCard);
      await setTgpaData(response.data.resData.tgpaSgpa);
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
            {width: 45, justifyContent: 'center', alignItems: 'center'})
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
            {item.item1}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 55, justifyContent: 'center', alignItems: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.value1 == null ? 'NA' : item.value1}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 55, justifyContent: 'center', alignItems: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.item2 == null || item.item2 === '' ? 'NA' : item.item2}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 50, justifyContent: 'center', alignItems: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.value2 == null || item.value2 === '' ? 'NA' : item.value2}
          </Text>
        </View>
        {/* <View
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
                  ? mainStyle.courseDeregistrationBtn
                  : mainStyle.dCourseDeregistrationBtn
              }
              onPress={() =>
                handleCourseDeregistrationBtn(item.syllabusCourseId, item.sbcId)
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
                  ? mainStyle.courseRegistrationBtn
                  : mainStyle.dCourseRegistrationBtn
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
        </View> */}
      </View>
    );
  };

  const handleFilterChange = async (
    value: string,
    id: string,
    name: string,
  ) => {
    try {
      await setLoading(true);
      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyGradeMarks/${admissionId}/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      console.log(response.data.resData);
      await setCode(value);
      await setName(name);
      await setGradeCardData(response.data.resData.gradeCard);
      await setTgpaData(response.data.resData.tgpaSgpa);
      await setFilterStatus(value);
    } catch (error) {
      console.log(error);
    } finally {
      await setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
        <View
          style={
            theme === 'light' ? mainStyle.subContainer : mainStyle.dSubContainer
          }>
          <View
            style={theme === 'light' ? styles.headerMain : styles.dHeaderMain}>
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
                Result - {name}
              </Text>
            </TouchableOpacity>
            <View style={styles.filterContainer}>
              {terms ? (
                <ScrollView horizontal={true}>
                  {terms.map((term, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        theme === 'light'
                          ? styles.filterButton
                          : styles.dFilterButton,
                        filterStatus === term.code &&
                          (theme === 'light'
                            ? styles.activeFilterButton
                            : styles.dActiveFilterButton),
                        {marginLeft: 10},
                      ]}
                      onPress={() =>
                        handleFilterChange(term.code, term.id, term.name)
                      }>
                      <Text
                        style={
                          filterStatus === term.code
                            ? theme === 'light'
                              ? styles.activeFilterText
                              : styles.dActiveFilteText
                            : theme === 'light'
                            ? styles.filterButtonText
                            : styles.dFilterButtonText
                        }>
                        {term.code}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : null}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: 15,
              marginTop: 100,
            }}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.paymentHistoryStudentDetailsText
                  : mainStyle.dPaymentHistoryStudentDetailsText
              }>
              Term:{' '}
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>
                {name}
              </Text>{' '}
              {`\n`}
              Term code:{' '}
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>
                {code}
              </Text>{' '}
              {`\n`}
              Name:{' '}
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>
                {firstName}
              </Text>{' '}
            </Text>
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
                    {width: 45})
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
                    {width: 55})
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.courseRegistrationTableHeaderText
                        : mainStyle.dCourseRegistrationTableHeaderText
                    }>
                    Credits
                  </Text>
                </View>
                <View
                  style={
                    (theme === 'light'
                      ? mainStyle.courseRegistrationTableCell
                      : mainStyle.dCourseRegistrationTableCell,
                    {width: 55})
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.courseRegistrationTableHeaderText
                        : mainStyle.dCourseRegistrationTableHeaderText
                    }>
                    Grades
                  </Text>
                </View>
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
                    Earned credits
                  </Text>
                </View>
              </View>
              {isLoading ? (
                <ActivityIndicator size="large" color="#1E63BB" />
              ) : (
                <FlatList
                  data={gradeCardData}
                  renderItem={({item, index}) => (
                    <ResultItem
                      item={item}
                      index={index + 1}
                      key={item.item1}
                    />
                  )}
                  keyExtractor={item => item.item1}
                  ItemSeparatorComponent={() => (
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.separator
                          : mainStyle.dSeparator
                      }
                    />
                  )}
                />
              )}
            </View>

            <View
              style={
                theme === 'light'
                  ? mainStyle.courseRegistrationTable
                  : mainStyle.courseRegistrationTable
              }>
              <View
                style={
                  theme == 'light'
                    ? mainStyle.resultCGPATableHeader
                    : mainStyle.dResultCGPATableHeader
                }>
                <View
                  style={
                    (theme === 'light'
                      ? mainStyle.courseRegistrationTableCell
                      : mainStyle.dCourseRegistrationTableCell,
                    {width: 70, justifyContent: 'center', alignItems: 'center'})
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.courseRegistrationTableHeaderText
                        : mainStyle.dCourseRegistrationTableHeaderText
                    }>
                    TGPA
                  </Text>
                </View>
                <View
                  style={
                    (theme === 'light'
                      ? mainStyle.courseRegistrationTableCell
                      : mainStyle.dCourseRegistrationTableCell,
                    {width: 70, justifyContent: 'center', alignItems: 'center'})
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.courseRegistrationTableHeaderText
                        : mainStyle.dCourseRegistrationTableHeaderText
                    }>
                    CGPA
                  </Text>
                </View>
              </View>
              {isLoading ? (
                <ActivityIndicator size="large" color="#1E63BB" />
              ) : (
                <>
                  <View
                    style={
                      theme === 'light'
                        ? mainStyle.resultCGPATableRow
                        : mainStyle.dResultCGPATableRow
                    }>
                    <View
                      style={
                        (theme === 'light'
                          ? mainStyle.courseRegistrationTableCell
                          : mainStyle.dCourseRegistrationTableCell,
                        {
                          width: 70,
                          justifyContent: 'center',
                          alignItems: 'center',
                        })
                      }>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.courseRegistrationTableText
                            : mainStyle.dCourseRegistrationTableText
                        }>
                        {tgpaData.TGPA}
                      </Text>
                    </View>
                    <View
                      style={
                        (theme === 'light'
                          ? mainStyle.courseRegistrationTableCell
                          : mainStyle.dCourseRegistrationTableCell,
                        {
                          width: 70,
                          justifyContent: 'center',
                          alignItems: 'center',
                        })
                      }>
                      <Text
                        style={
                          theme === 'light'
                            ? mainStyle.courseRegistrationTableText
                            : mainStyle.dCourseRegistrationTableText
                        }>
                        {tgpaData.CGPA}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  valueText: {
    color: '#1d1d1d',
    fontWeight: 'bold',
  },
  dValueText: {
    color: '#eeeeee',
    fontWeight: 'bold',
  },
  headerMain: {
    width: '100%',
    paddingTop: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 4,
    backgroundColor: '#fefefe',
    borderBottomWidth: 1,
    borderBottomColor: '#1d1d1d',
    paddingHorizontal: 15,
  },
  dHeaderMain: {
    width: '100%',
    // paddingVertical: 15,
    paddingTop: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 4,
    backgroundColor: '#0c1319',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingHorizontal: 15,
  },
  dFilterButtonText: {
    color: '#EAEAEA',
    borderColor: '#EAEAEA',
  },
  activeFilterText: {
    color: '#EAEAEA',
    borderColor: 'transparent',
  },
  dActiveFilteText: {
    color: '#23303C',
    borderColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  head: {height: 44, backgroundColor: 'lavender'},
  row: {height: 40, backgroundColor: 'lightyellow'},
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    // marginHorizontal: 5,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#DDD',
  },
  activeFilterButton: {
    backgroundColor: '#272D7A', // Change color as desired
    marginHorizontal: 10,
    marginTop: 10,
    borderColor: 'transparent',
  },
  dActiveFilterButton: {
    backgroundColor: '#98BAFC',
    marginHorizontal: 10,
    marginTop: 10,
    borderColor: 'transparent',
  },
  filterButtonText: {
    color: '#272D7A',
    fontWeight: 'bold',
  },
  dFilterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    // marginHorizontal: 5,
    marginTop: 10,
    backgroundColor: '#23303C',
  },

  scheduleCardContainer: {
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#EAEAEA',
  },

  scheduleCard: {
    minWidth: '95%',
    backgroundColor: '#DDD',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  dScheduleCard: {
    minWidth: '95%',
    backgroundColor: '#23303C',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});

export default MyGradeCard;
