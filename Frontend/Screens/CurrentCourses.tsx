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

type CurrentCoursesProps = NativeStackScreenProps<
  RootStackParamList,
  'CurrentCourses'
>;

const CurrentCourses = ({route}: CurrentCoursesProps) => {
  // const {levelId} = route.params;
  // if(levelId === undefined){
  //     levelId = 8;
  // }
  //   const [tokenWithoutQuotes, setTokenWithoutQuotes] = useState();
  useEffect(() => {
    // setTokenWithoutQuotes(token.substring(1, token.length - 1));
    retrieveData();
  }, []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [courses, setCourses] = useState([]);
  const [filterStatus, setFilterStatus] = useState('today');
  const [token, setJwtToken] = useState('');
  const [admissionId, setAdmissionId] = useState('');
  const [userId, setUserId] = useState('');
  const [levelId, setLevelId] = useState('');
  const [baseURL, setBaseURL] = useState('');

  const [terms, setTerms] = useState([]);
  const retrieveData = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    const baseURL = JSON.parse(await AsyncStorage.getItem('baseURL'));
    await setJwtToken(token);
    await setUserId(userId);
    await setAdmissionId(admissionId);
    await setBaseURL(baseURL);
    

    console.log('Stored Token', token);

    setLoading(true); // Indicate loading state
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
      setTerms(response1.data.resData.levels);

      setFilterStatus(response1.data.resData.levels[response1.data.resData.levels.length - 1].code);
      setLevelId(response1.data.resData.levels[response1.data.resData.levels.length - 1].id);

      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyCourses/${admissionId}/${response1.data.resData.levels[response1.data.resData.levels.length - 1].id}`,
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

  const CourseItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.myTermsItemContainer
            : mainStyle.dMyTermsItemContainer
        }>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() =>
            navigation.push('MyCourseDetails', {
              code: item.code,
              name: item.name,
              credit: item.value,
              courseId: item.id,
              levelId: levelId,
            })
          }>
          <View style={{maxWidth: '85%'}}>
            <Text
              style={
                (theme === 'light'
                  ? mainStyle.paymentHistoryStudentDetailsText
                  : mainStyle.dPaymentHistoryStudentDetailsText,
                {fontSize: 17})
              }>
              Code:
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>
                {' '}
                {item.code}
              </Text>
            </Text>
            <Text
              style={
                (theme === 'light'
                  ? mainStyle.paymentHistoryStudentDetailsText
                  : mainStyle.dPaymentHistoryStudentDetailsText,
                {fontSize: 17})
              }>
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>{`${item.name}`}</Text>
            </Text>
            <Text
              style={
                (theme === 'light'
                  ? mainStyle.paymentHistoryStudentDetailsText
                  : mainStyle.dPaymentHistoryStudentDetailsText,
                {fontSize: 17})
              }>
              Credit:
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>
                {' '}
                {`${item.value}`}
              </Text>
            </Text>
          </View>
          <Icon
            style={(mainStyle.headerIcon, {position: 'absolute', right: 10})}
            name="circle-chevron-right"
            size={20}
            color={theme === 'light' ? '#3d3d3d' : '#ccc'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleFilterChange = async (
    code: string, id: string
  ) => {
    setFilterStatus(code);
    setLevelId(id);
    try {
      await setLoading(true);
      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyCourses/${admissionId}/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      

      if (response.data.sCode !== 1) {
        alert('Error fetching data');
        navigation.goBack();
      }
      await setCourses(response.data.resData.courses);
      if (courses == null) {
        alert('No courses found');
      }
    } catch (error) {
      console.log(error);
    } finally {
      await setLoading(false);
    }
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
              theme === 'light' ? styles.headerMain : styles.dHeaderMain
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
                <Icon3
                  name="bookshelf"
                  size={23}
                  color={theme === 'light' ? '#3d3d3d' : '#bbb'}
                />
                Current Courses
              </Text>
            </TouchableOpacity>
            <View style={styles.filterContainer}>
              {terms ? (
                <ScrollView horizontal={true} style={{}}>
                  <View style={{flexDirection: "row-reverse"}} >
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
                        handleFilterChange(term.code.toString(),term.id)
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
                  </View>
                </ScrollView>
              ) : null}
            </View>
          </View>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                marginTop: 110,
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
                  marginTop: 100,
                }}>
                {courses.length > 0 ? (
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
                )}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  width: '100%',
                  paddingHorizontal: 20,
                }}>
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  valueText: {
    color: '#1d1d1d',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dValueText: {
    color: '#eee',
    fontWeight: 'bold',
    fontSize: 18,
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


export default CurrentCourses;
