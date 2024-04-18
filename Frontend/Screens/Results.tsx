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
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome6';

type ResultsProps = NativeStackScreenProps<RootStackParamList, 'Results'>;

const Results = ({route}: ResultsProps) => {
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
                Results
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
            onPress={() => navigation.navigate('MyGradeCard')}
              style={
                theme === 'light'
                  ? mainStyle.resultContainer
                  : mainStyle.dResultContainer
              }>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.resultPageText
                    : mainStyle.dResultPageText
                }>
                Term 1
              </Text>
              <Icon
                style={
                  (mainStyle.headerIcon, {position: 'absolute', right: 10})
                }
                name="circle-chevron-right"
                size={20}
                color={theme === 'light' ? '#3d3d3d' : '#ccc'}
              />
            </TouchableOpacity>
            <View
              style={
                theme === 'light'
                  ? mainStyle.resultContainer
                  : mainStyle.dResultContainer
              }>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.resultPageText
                    : mainStyle.dResultPageText
                }>
                Term 2
              </Text>
              <Icon
                style={
                  (mainStyle.headerIcon, {position: 'absolute', right: 10})
                }
                name="circle-chevron-right"
                size={20}
                color={theme === 'light' ? '#3d3d3d' : '#ccc'}
              />
            </View>
            <View
              style={
                theme === 'light'
                  ? mainStyle.resultContainer
                  : mainStyle.dResultContainer
              }>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.resultPageText
                    : mainStyle.dResultPageText
                }>
                Term 3
              </Text>
              <Icon
                style={
                  (mainStyle.headerIcon, {position: 'absolute', right: 10})
                }
                name="circle-chevron-right"
                size={20}
                color={theme === 'light' ? '#3d3d3d' : '#ccc'}
              />
            </View>
            <View
              style={
                theme === 'light'
                  ? mainStyle.resultContainer
                  : mainStyle.dResultContainer
              }>
              <Text
                style={
                  theme === 'light'
                    ? mainStyle.resultPageText
                    : mainStyle.dResultPageText
                }>
                Term 4
              </Text>
              <Icon
                style={
                  (mainStyle.headerIcon, {position: 'absolute', right: 10})
                }
                name="circle-chevron-right"
                size={20}
                color={theme === 'light' ? '#3d3d3d' : '#ccc'}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Results;
