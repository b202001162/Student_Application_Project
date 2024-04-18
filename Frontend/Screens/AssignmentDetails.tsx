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

type AssignmentDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'AssignmentDetails'
>;

const AssignmentDetails = ({route}: AssignmentDetailsProps) => {
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
                Assignment Details
              </Text>
            </TouchableOpacity>
          </View>
          <View style={mainStyle.AssignmentDetailsContainer}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.AssingmentTitle
                  : mainStyle.dAssingmentTitle
              }>
              Assignment 2 : Linux System Calls
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.AssingmentSubTitle
                  : mainStyle.dAssingmentSubTitle
              }>
              Posted By : Prof. or TA on 20 Jan, 24 Topics : File System, IO
              Systems
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.submissionDetails
                  : mainStyle.dSubmissionDetails
              }>
              Submission Details : Lorem ipsum dolor sit amet consectetur
              adipiscing elit Ut et massa mi.
            </Text>
            <View style={mainStyle.AssignmentFileCont}>
              <View
                style={
                  theme === 'light'
                    ? mainStyle.AssignmentFile
                    : mainStyle.dAssignmentFile
                }>
                <Icon
                  style={mainStyle.headerIcon}
                  name="file-pdf"
                  size={20}
                  color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                />
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.AssignmentFileText
                      : mainStyle.dAssignmentFileText
                  }>
                  Assignment 2.pdf
                </Text>
              </View>
            </View>
            <View
              style={
                theme === 'light'
                  ? mainStyle.uploadUrAssignmentCont
                  : mainStyle.dUploadUrAssignmentCont
              }>
              <Text style={{marginBottom: 10}}>Upload your Assignment</Text>
              <View style={{width: '100%', alignItems: 'center'}}>
                <View
                  style={
                    theme === 'light'
                      ? mainStyle.AssignmentFile
                      : mainStyle.dAssignmentFile
                  }>
                  <Icon
                    style={mainStyle.headerIcon}
                    name="file-circle-plus"
                    size={20}
                    color={theme === 'light' ? '#1E63BB' : '#98BAFC'}
                  />
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.AssignmentFileText
                        : mainStyle.dAssignmentFileText
                    }>
                    {' '}
                    Add your submission
                  </Text>
                </View>
                <View
                  style={
                    theme === 'light'
                      ? mainStyle.uploadBtnForAssignments
                      : mainStyle.dUploadBtnForAssignments
                  }>
                  <Text
                    style={
                      theme === 'light'
                        ? mainStyle.uploadBtnForAssignmentsText
                        : mainStyle.dUploadBtnForAssignmentsText
                    }>
                    Submit Assignment
                  </Text>
                </View>
              </View>
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
});

export default AssignmentDetails;
