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

type ResultTermWiseProps = NativeStackScreenProps<
  RootStackParamList,
  'ResultTermWise'
>;

const ResultTermWise = ({route}: ResultTermWiseProps) => {
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
                Result -> Term 1
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
              Semester : <Text
                    style={
                      theme === 'light' ? styles.valueText : styles.dValueText
                    }>I</Text> {`\n`}
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
                  Sr. no.
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
                    Earned {'\n'} Grade
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
                  1
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course1
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  4.5
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  XX{"      "}
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
                  2 
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course2
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  3
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  XX{"      "}
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
                  3 
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course3
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  4
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  XX{"      "}
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
                  4 
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course4
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  3.5
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  XX{"      "}
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
                  5 
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  Course5
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  3
                </Text>
                <Text
                  style={
                    theme === 'light'
                      ? mainStyle.paymentHistoryTBodyText
                      : mainStyle.dPaymentHistoryTBodyText
                  }>
                  XX{"      "}
                </Text>
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
  valueText: {
    color: '#1d1d1d',
    fontWeight: 'bold',
  },
  dValueText: {
    color: '#eee',
    fontWeight: 'bold',
  },
});

export default ResultTermWise;
