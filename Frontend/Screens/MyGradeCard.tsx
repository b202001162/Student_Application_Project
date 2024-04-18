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

type MyGradeCardProps = NativeStackScreenProps<
  RootStackParamList,
  'MyGradeCard'
>;

const MyGradeCard = ({route}: MyGradeCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {code, name, levelId} = route.params;
  console.log(code, name);

  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);
  const [jwtToken, setJwtToken] = useState('');
  const [userId, setUserId] = useState('');
  const [admissionId, setAdmissionId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gradeCardData, setGradeCardData] = useState([]);
  const [tgpaData, setTgpaData] = useState({});
  const [isLoading, setLoading] = useState(false);

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
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyGradeMarks/${admissionId}/${levelId}`,
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
                Result - {name}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: 15,
              marginTop: 50,
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
              {`\n`}
              Admission ID:{' '}
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>
                {admissionId}
              </Text>{' '}
              {`\n`}
              Mobile no :{' '}
              <Text
                style={
                  theme === 'light' ? styles.valueText : styles.dValueText
                }>
                9876543210
              </Text>
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
  },
  dValueText: {
    color: '#eee',
    fontWeight: 'bold',
  },
});

export default MyGradeCard;
