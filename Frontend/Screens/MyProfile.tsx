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
import Icon2 from 'react-native-vector-icons/FontAwesome';

type MyProfileProps = NativeStackScreenProps<RootStackParamList, 'MyProfile'>;

const MyProfile = ({route}: MyProfileProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);
  const [data, setData] = useState([]);

  const retrieveData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    console.log('Stored Token', token);
    console.log('Stored Token', userId);

    try {
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchProfileDeatils/8`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data.resData);
      await setData(response.data.resData);
    } catch (error) {
      console.error(error);
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

  const [isLoading, setLoading] = useState(true);
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
                  <Icon2
                  name="user-circle-o"
                  size={25}
                  color={theme === 'light' ? '#1d1d1d' : '#eee'}
                /> {" "}
                Profile
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: 20,
              paddingHorizontal: 10,
            }}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ScrollView style={mainStyle.myProfileDetailsCont}>
                <>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myProfileDetailsTitleText
                        : mainStyle.dMyProfileDetailsTitleText
                    }>
                    Personal details
                  </Text>
                  <View
                    style={
                      theme === 'light'
                        ? mainStyle.myProfileDetailsContContainer
                        : mainStyle.dMyProfileDetailsContContainer
                    }>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      StudentID: {data.profileData.studentId}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }></View>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Stdent name: {data.profileData.studentName}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }></View>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Father name: {data.profileData.fatherName}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }></View>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Mother name: {data.profileData.motherName}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }></View>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Student Email: {data.profileData.emailId}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }></View>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Student Mobile: {data.profileData.phoneNo}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }></View>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Student Address: {data.profileData.studentAddress}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }></View>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Student DOB: {data.profileData.studentDOB}
                    </Text>
                  </View>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.myProfileDetailsTitleText
                        : mainStyle.dMyProfileDetailsTitleText
                    }>
                    Academics details
                  </Text>
                  <View
                    style={
                      theme === 'light'
                        ? mainStyle.myProfileDetailsContContainer
                        : mainStyle.dMyProfileDetailsContContainer
                    }>
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      AdmissionId: {data.profileData.admissionId}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Admission No. : {data.profileData.admissionNo}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      TGPA: {data.profileData.tgpa}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      CGPA : {data.profileData.cgpa}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Credit Attempted : {data.profileData.creditAttempted}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Current Term ID: {data.profileData.currentTermId}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Degree Id: {data.profileData.degreeId}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Degree name: {data.profileData.degreeName}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Program Id: {data.profileData.programId}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Program Name: {data.profileData.programName}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Level Name: {data.profileData.levelName}{' '}
                    </Text>
                    <View
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDivider
                          : mainStyle.dMyProfileDivider
                      }
                    />
                    <Text
                      style={
                        theme === 'light'
                          ? mainStyle.myProfileDetailsText
                          : mainStyle.dMyProfileDetailsText
                      }>
                      Fee Pattern name: {data.profileData.feePatterName}
                    </Text>
                  </View>
                </>
              </ScrollView>
            )}
            {/* <TextInput
              style={
                theme === 'light'
                  ? mainStyle.courseFBInput
                  : mainStyle.dCourseFBInput
              }
              placeholder="Enter Feedback Here"
              placeholderTextColor={theme === 'light' ? '#003f5c' : '#ccc'}
            /> */}
            {/* <View
              style={
                theme === 'light'
                  ? mainStyle.courseFBBtnCont
                  : mainStyle.dCourseFBBtnCont
              }>
              <TouchableOpacity
                style={
                  theme === 'light'
                    ? mainStyle.courseFBBtn
                    : mainStyle.dCourseFBBtn
                }>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.courseFBBtnText
                      : mainStyle.dCourseFBBtnText
                  }>
                  Submit
                </Text>
              </TouchableOpacity>
            </View> */}
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

export default MyProfile;
