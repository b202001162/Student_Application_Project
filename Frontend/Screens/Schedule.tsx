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
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

type ScheduleProps = NativeStackScreenProps<RootStackParamList, 'Schedule'>;

const Schedule = ({route}: ScheduleProps) => {
  // const {levelId} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [courses, setCourses] = useState([]);
  const [todaysSchedule, setTodaysSchedule] = useState([]); // [course1, course2, course3, ...
  const [tomorrowsSchedule, setTomorrowsSchedule] = useState([]); // [course1, course2, course3, ...
  const [nextsevensdaysSchedule, setNextsevensdaysSchedule] = useState([]); // [course1, course2, course3, ...
  const [filterStatus, setFilterStatus] = useState('today');
  const [timeTableData, setTimeTableData] = useState([]);
  const [todayDate, setTodayDate] = useState(new Date());
  const [tomorrowDate, setTomorrowDate] = useState();
  const [baseURL, setBaseURL] = useState();
  const [levelId, setLevelId] = useState();
  const [isLoading, setLoading] = useState(false);

  const retrieveData = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    const baseURL = JSON.parse(await AsyncStorage.getItem('baseURL'));
    console.log('Stored Token', token);

    await setLoading(true); // Indicate loading state
    let levelID = await JSON.parse(await AsyncStorage.getItem('levelId'));
    if (levelID == null) {
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
        console.log(
          'levelID:',
          response1.data.resData.levels[
            response1.data.resData.levels.length - 1
          ].id,
        );
        await setLevelId(
          response1.data.resData.levels[
            response1.data.resData.levels.length - 1
          ].id,
        );
        levelID =
          response1.data.resData.levels[
            response1.data.resData.levels.length - 1
          ].id;
      } catch (error) {
        console.log('Error retrieving data' + error);
      }
    }
    try {
      const today = new Date();
      const tomorrow = new Date(today.setDate(today.getDate() + 1));
      await setTomorrowDate(tomorrow);
      console.log('levelID:', levelID, admissionId, baseURL);

      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyCourses/${admissionId}/${levelID}`,
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
      console.log(response.data.resData.courses);

      let todaySche = [];
      let tomorrowSche = [];
      let nextsevendaysSche = [];
      for (let i = 0; i < response.data.resData.courses.length; i++) {
        console.log(response.data.resData.courses[i].id);
        try {
          const res = await axios.get(
            `${baseURL}/nure-student/v1/fetchMyClassTimeTable/${response.data.resData.courses[i].id}/${levelID}/${admissionId}/0`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (res.data.sCode === 1) {
            // console.log(res.data.resData.timeTableData);
            for (let j = 0; j < res.data.resData.timeTableData.length; j++) {
              todaySche.push(res.data.resData.timeTableData[j]);
              todaySche[todaySche.length - 1].courseName =
                response.data.resData.courses[i].name;
              todaySche[todaySche.length - 1].date = formatDateOnly(
                todaySche[todaySche.length - 1].fromDate,
              );
              console.log(res.data.resData.timeTableData[j]);
            }
          }
        } catch (error) {
          // Error retrieving data
          console.log('Error notification retrieving data' + error);
        }
        await setTodaysSchedule(todaySche);
        await setTimeTableData(todaySche);
        try {
          const res = await axios.get(
            `${baseURL}/nure-student/v1/fetchMyClassTimeTable/${response.data.resData.courses[i].id}/${levelID}/${admissionId}/1`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (res.data.sCode === 1) {
            // console.log(res.data.resData.timeTableData);
            for (let j = 0; j < res.data.resData.timeTableData.length; j++) {
              await tomorrowSche.push(res.data.resData.timeTableData[j]);
              tomorrowSche[tomorrowSche.length - 1].courseName =
                response.data.resData.courses[i].name;
              tomorrowSche[tomorrowSche.length - 1].date = formatDateOnly(
                tomorrowSche[tomorrowSche.length - 1].fromDate,
              );
              console.log('New Sche', tommorowSche[tomorrowSche.length - 1]);
            }
          }
        } catch (error) {
          // Error retrieving data
          console.log('Error notification retrieving data' + error);
        }
        await setTomorrowsSchedule(tomorrowSche);
        console.log('Tomorrow Schedule', tomorrowSche);

        try {
          const res3 = await axios.get(
            `${baseURL}/nure-student/v1/fetchMyClassTimeTable/${response.data.resData.courses[i].id}/${levelID}/${admissionId}/7`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (res3.data.sCode === 1) {
            // console.log(res.data.resData.timeTableData);
            for (let j = 0; j < res3.data.resData.timeTableData.length; j++) {
              nextsevendaysSche.push(res3.data.resData.timeTableData[j]);
              nextsevendaysSche[nextsevendaysSche.length - 1].courseName =
                response.data.resData.courses[i].name;
              nextsevendaysSche[nextsevendaysSche.length - 1].date =
                formatDateOnly(
                  nextsevendaysSche[nextsevendaysSche.length - 1].fromDate,
                );
              console.log(res3.data.resData.timeTableData[j]);
            }
          }
        } catch (error) {
          // Error retrieving data
          console.log('Error notification retrieving data' + error);
        }
        // reverse the nextsevendaysSche function
        let temp = [];
        for (let i = 0; i < nextsevendaysSche.length; i++) {
          temp.push(nextsevendaysSche[nextsevendaysSche.length - i - 1]);
        }
        console.log('Next 7 days Schedule new', temp);
        await setNextsevensdaysSchedule(temp);

        // console.log('Today Schedule', todaySche);
      }
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
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

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

  const formatTimeOnly = timeString => {
    const date = new Date(timeString); // Create a Date object from the string

    const hours = date.getHours(); // Get the hours (0-23)
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get padded minutes (00-59)
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
    const newHours = hours % 12 || 12; // Convert hours to 12-hour format (1-12)

    const formattedTime = `${newHours}:${minutes} ${ampm}`;

    return formattedTime;
  };

  const formatDateOnly = timeString => {
    const date = new Date(timeString); // Create a Date object from the string

    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`;

    return formattedDate;
  };

  const handleFilterChange = async (value: string) => {
    if (value === 'today') {
      await setTimeTableData(todaysSchedule);
    } else if (value === 'tomorrow') {
      await setTimeTableData(tomorrowsSchedule);
    } else if (value === 'nextsevendays') {
      await setTimeTableData(nextsevensdaysSchedule);
    }
    setFilterStatus(value);
  };

  useEffect(() => {
    // _retrieveData();
    retrieveData();
    const colorTheme = Appearance.getColorScheme();
    console.log(colorTheme);
    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  const ScheduleItem = ({item, index}) => {
    return (
      <View
        style={theme === 'light' ? styles.scheduleCard : styles.dScheduleCard}>
        <View
          style={
            theme === 'light'
              ? {
                  alignItems: 'flex-start',
                  borderRightWidth: 1,
                  borderColor: '#3d3d3d',
                  marginRight: 10,
                  paddingRight: 10,
                }
              : {
                  alignItems: 'flex-start',
                  borderRightWidth: 1,
                  borderColor: '#eee',
                  marginRight: 10,
                  paddingRight: 10,
                }
          }>
          {item.date === formatDateOnly(todayDate) ? (
            <Text style={{color: 'yellow'}}>Today</Text>
          ) : item.date === formatDateOnly(tomorrowDate) ? (
            <Text style={{color: theme === 'light' ? 'green' : '#0EED82'}}>
              Tomorrow
            </Text>
          ) : (
            <Text>{item.date}</Text>
          )}
          <Text
            style={{
              textAlign: 'center',
              color: theme === 'light' ? '#1d1d1d' : '#F4FFA1',
              marginTop: 5,
            }}>
            {formatTimeOnly(item.fromDate)}
            {'\n'}to{'\n'}
            {formatTimeOnly(item.toDate)}
          </Text>
        </View>
        <View>
          <Text
            style={
              theme === 'light'
                ? {fontSize: 18, fontWeight: 'bold', color: '#1E63BB'}
                : {fontSize: 18, fontWeight: 'bold', color: '#98BAFC'}
            }>
            {item.courseName}
          </Text>
          <Text
            style={
              theme === 'light'
                ? {fontSize: 16, fontWeight: 'regular', color: '#2d2d2d'}
                : {fontSize: 16, fontWeight: 'regular', color: '#eaeaea'}
            }>
            {item.venueName}
          </Text>
          <Text
            style={
              theme === 'light'
                ? {fontSize: 14, fontWeight: 'semibold', color: '#2d2d2d'}
                : {fontSize: 14, fontWeight: 'semibold', color: '#eaeaea'}
            }>
            {item.facultyName}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
        {isLoading ? (
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              zIndex: 10,
              backgroundColor: theme === 'light' ? '#00000095' : '#00000095',
            }}>
            <ActivityIndicator
              size="large"
              color={theme === 'light' ? '#272D7A' : '#98BAFC'}
            />
            <Text
              style={{
                color: theme === 'light' ? '#272D7A' : '#98BAFC',
                marginTop: 10,
              }}>
              Loading...
            </Text>
          </View>
        ) : (
          <View
            style={
              theme === 'light'
                ? mainStyle.subContainer
                : mainStyle.dSubContainer
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
                    theme === 'light' ? styles.headerMain : styles.dHeaderMain
                  }>
                  <View>
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
                        Schedule
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.filterContainer}>
                    <TouchableOpacity
                      style={[
                        theme === 'light'
                          ? styles.filterButton
                          : styles.dFilterButton,
                        filterStatus === 'today' &&
                          (theme === 'light'
                            ? styles.activeFilterButton
                            : styles.dActiveFilterButton),
                        {marginLeft: 10},
                      ]}
                      onPress={() => handleFilterChange('today')}>
                      <Text
                        style={
                          filterStatus === 'today'
                            ? theme === 'light'
                              ? styles.activeFilterText
                              : styles.dActiveFilteText
                            : theme === 'light'
                            ? styles.filterButtonText
                            : styles.dFilterButtonText
                        }>
                        Today's
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        theme === 'light'
                          ? styles.filterButton
                          : styles.dFilterButton,
                        filterStatus === 'tomorrow' &&
                          (theme === 'light'
                            ? styles.activeFilterButton
                            : styles.dActiveFilterButton),
                      ]}
                      onPress={() => handleFilterChange('tomorrow')}>
                      <Text
                        style={
                          filterStatus === 'tomorrow'
                            ? theme === 'light'
                              ? styles.activeFilterText
                              : styles.dActiveFilteText
                            : theme === 'light'
                            ? styles.filterButtonText
                            : styles.dFilterButtonText
                        }>
                        Tomorrow's
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        theme === 'light'
                          ? styles.filterButton
                          : styles.dFilterButton,
                        filterStatus === 'nextsevendays' &&
                          (theme === 'light'
                            ? styles.activeFilterButton
                            : styles.dActiveFilterButton),
                      ]}
                      onPress={() => handleFilterChange('nextsevendays')}>
                      <Text
                        style={
                          filterStatus === 'nextsevendays'
                            ? theme === 'light'
                              ? styles.activeFilterText
                              : styles.dActiveFilteText
                            : theme === 'light'
                            ? styles.filterButtonText
                            : styles.dFilterButtonText
                        }>
                        Next 7 Days'
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </View>
            {isLoading ? (
              <View
                style={{
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: 500,
                  zIndex: 10,
                  marginTop: 120,
                  backgroundColor:
                    theme === 'light' ? '#00000095' : '#00000095',
                }}>
                <ActivityIndicator
                  size="large"
                  color={theme === 'light' ? '#272D7A' : '#98BAFC'}
                />
              </View>
            ) : (
              <ScrollView
                onScroll={e => {
                  scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}>
                {isLoading ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 500,
                      width: '100%',
                      marginTop: 120,
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
                        marginTop: 120,
                      }}>
                      {/* {courses.length > 0 ? (
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
                )} */}
                      {isLoading ? (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 500,
                            width: '100%',
                            marginTop: 120,
                          }}>
                          <ActivityIndicator
                            size="large"
                            color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                          />
                        </View>
                      ) : (
                        <>
                          {timeTableData.length > 0 ? (
                            <View style={styles.scheduleCardContainer}>
                              {timeTableData.map((item, index) => (
                                <ScheduleItem
                                  item={item}
                                  index={index}
                                  keyExtractor={item.id}
                                  key={item.id}
                                />
                              ))}
                            </View>
                          ) : (
                            <Text>No Schedule found</Text>
                          )}
                        </>
                      )}
                    </View>
                  </>
                )}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
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
    color: 'black',
    fontWeight: 'bold',
  },
  dFilterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
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

export default Schedule;
