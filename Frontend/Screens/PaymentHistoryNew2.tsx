import React, {useEffect, useState} from 'react';
// import {Picker} from '@react-native-picker/picker';
// import {DataTable} from 'react-native-paper';
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
  VirtualizedList,
  Animated,
} from 'react-native';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeStackNavigationProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {mainStyle} from '../StyleSheet/StyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome6';

type PaymentHistoryNew2Props = NativeStackScreenProps<
  RootStackParamList,
  'PaymentHistoryNew2'
>;

const PaymentHistoryNew2 = ({route}: PaymentHistoryNew2Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);
  const [data, setData] = useState([]);
  const [headData, setHeadData] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [extraData, setExtraData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredData1, setFilteredData1] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);

  //   const FeeDataTable = ({feeData}) => {
  //     return (
  //       <SafeAreaView>
  //         <View style={{paddingHorizontal: 16, paddingTop: 16}}>
  //           <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
  //             Fee Data Table
  //           </Text>
  //           <DataTable>
  //             <DataTable.Header>
  //               <DataTable.Title>Date</DataTable.Title>
  //               <DataTable.Title>Amount Due</DataTable.Title>
  //               <DataTable.Title>Receipt No</DataTable.Title>
  //               <DataTable.Title>Paid Amount</DataTable.Title>
  //               <DataTable.Title>Status</DataTable.Title>
  //             </DataTable.Header>

  //             {feeData.map(data => (
  //               <DataTable.Row key={data.id}>
  //                 <DataTable.Cell>{data.feeDate}</DataTable.Cell>
  //                 <DataTable.Cell>{data.amountDue}</DataTable.Cell>
  //                 <DataTable.Cell>{data.reciptNo}</DataTable.Cell>
  //                 <DataTable.Cell>{data.paidAmount}</DataTable.Cell>
  //                 <DataTable.Cell>
  //                   {data.staus === '1' ? 'Paid' : 'Unpaid'}
  //                 </DataTable.Cell>
  //               </DataTable.Row>
  //             ))}
  //           </DataTable>
  //         </View>
  //       </SafeAreaView>
  //     );
  //   };

  const handleFilterChange = async (value: string) => {
    if (value === 'all') {
      await setFilteredData1([
        {
          id: 6,
          feeDate: '2023-11-29',
          amountDue: 150,
          reciptNo: '16',
          lateFeeAmount: 0,
          paidAmount: 150,
          staus: '0',
        },
        {
          id: 9,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
        {
          id: 10,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '0',
        },
        {
          id: 7,
          feeDate: '2023-11-29',
          amountDue: 150,
          reciptNo: '16',
          lateFeeAmount: 0,
          paidAmount: 150,
          staus: '0',
        },
        {
          id: 8,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
        {
          id: 11,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
        {
          id: 12,
          feeDate: '2023-11-29',
          amountDue: 150,
          reciptNo: '16',
          lateFeeAmount: 0,
          paidAmount: 150,
          staus: '0',
        },
        {
          id: 13,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '0',
        },
        {
          id: 14,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
        {
          id: 15,
          feeDate: '2023-11-29',
          amountDue: 150,
          reciptNo: '16',
          lateFeeAmount: 0,
          paidAmount: 150,
          staus: '0',
        },
        {
          id: 16,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
        {
          id: 17,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
      ]);
    } else if (value === '0') {
      await setFilteredData1([
        {
          id: 6,
          feeDate: '2023-11-29',
          amountDue: 150,
          reciptNo: '16',
          lateFeeAmount: 0,
          paidAmount: 150,
          staus: '0',
        },
        {
          id: 10,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '0',
        },
        {
          id: 7,
          feeDate: '2023-11-29',
          amountDue: 150,
          reciptNo: '16',
          lateFeeAmount: 0,
          paidAmount: 150,
          staus: '0',
        },
        {
          id: 12,
          feeDate: '2023-11-29',
          amountDue: 150,
          reciptNo: '16',
          lateFeeAmount: 0,
          paidAmount: 150,
          staus: '0',
        },
        {
          id: 13,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '0',
        },
        {
          id: 15,
          feeDate: '2023-11-29',
          amountDue: 150,
          reciptNo: '16',
          lateFeeAmount: 0,
          paidAmount: 150,
          staus: '0',
        },
      ]);
    } else if (value === '1') {
      await setFilteredData1([
        {
          id: 8,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
        {
          id: 11,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
        {
          id: 14,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
        {
          id: 16,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
        {
          id: 17,
          feeDate: '2024-02-22',
          amountDue: 50000,
          reciptNo: '1',
          lateFeeAmount: 0,
          paidAmount: 50000,
          staus: '1',
        },
      ]);
    }
    setFilterStatus(value);
  };

  const TermItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.myTermsItemContainer
            : mainStyle.dMyTermsItemContainer
        }>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          //   onPress={() => navigation.push('MyCourses', {levelId: item.id})}
        >
          <View style={{maxWidth: '85%'}}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemTitle
                  : mainStyle.dMyTermsItemTitle
              }>
              Id: {item.id}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Fee date: {`${item.feeDate}`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Receipt no.: {`${item.reciptNo}`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Amount Due: {`${item.amountDue} INR`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Late fee amount: {`${item.lateFeeAmount} INR`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Paid amount: {`${item.paidAmount} INR`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Status: {`${item.staus}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const ExtraItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.myTermsItemContainer
            : mainStyle.dMyTermsItemContainer
        }>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          //   onPress={() => navigation.push('MyCourses', {levelId: item.id})}
        >
          <View style={{maxWidth: '85%'}}>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemTitle
                  : mainStyle.dMyTermsItemTitle
              }>
              Id: {item.id}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Fee name: {`${item.feeName}`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Amount: {`${item.amount} INR`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Fine code: {`${item.fineCode}`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Date of Time: {`${item.dateOfFine}`}
            </Text>
            <Text
              style={
                theme === 'light'
                  ? mainStyle.myTermsItemDetails
                  : mainStyle.dMyTermsItemDetails
              }>
              Date of pay: {`${item.dateOfPay}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const retrieveData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = JSON.parse(await AsyncStorage.getItem('userId'));
    console.log('Stored Token', token);
    console.log('Stored Token', userId);

    try {
      // const response = await axios.get(
      //   `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchProfileDeatils/8`,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
      // console.log(response.data.resData);
      // await setData(response.data.resData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setFilteredData2([
      {
        id: 1,
        feeName: 'LIBRARY FEE',
        amount: 5000,
        fineCode: 'Extra Demand',
        dateOfFine: '2026-03-02',
        dateOfPay: '2024-02-22',
      },
      {
        id: 2,
        feeName: 'LIBRARY FEE',
        amount: 5000,
        fineCode: 'Extra Demand',
        dateOfFine: '2026-03-02',
        dateOfPay: '2024-02-22',
      },
      {
        id: 3,
        feeName: 'LIBRARY FEE',
        amount: 5000,
        fineCode: 'Extra Demand',
        dateOfFine: '2026-03-02',
        dateOfPay: '2024-02-22',
      },
    ]);
    setFilteredData1([
      {
        id: 6,
        feeDate: '2023-11-29',
        amountDue: 150,
        reciptNo: '16',
        lateFeeAmount: 0,
        paidAmount: 150,
        staus: '0',
      },
      {
        id: 9,
        feeDate: '2024-02-22',
        amountDue: 50000,
        reciptNo: '1',
        lateFeeAmount: 0,
        paidAmount: 50000,
        staus: '1',
      },
      {
        id: 10,
        feeDate: '2024-02-22',
        amountDue: 50000,
        reciptNo: '1',
        lateFeeAmount: 0,
        paidAmount: 50000,
        staus: '0',
      },
      {
        id: 7,
        feeDate: '2023-11-29',
        amountDue: 150,
        reciptNo: '16',
        lateFeeAmount: 0,
        paidAmount: 150,
        staus: '0',
      },
      {
        id: 8,
        feeDate: '2024-02-22',
        amountDue: 50000,
        reciptNo: '1',
        lateFeeAmount: 0,
        paidAmount: 50000,
        staus: '1',
      },
      {
        id: 11,
        feeDate: '2024-02-22',
        amountDue: 50000,
        reciptNo: '1',
        lateFeeAmount: 0,
        paidAmount: 50000,
        staus: '1',
      },
      {
        id: 12,
        feeDate: '2023-11-29',
        amountDue: 150,
        reciptNo: '16',
        lateFeeAmount: 0,
        paidAmount: 150,
        staus: '0',
      },
      {
        id: 13,
        feeDate: '2024-02-22',
        amountDue: 50000,
        reciptNo: '1',
        lateFeeAmount: 0,
        paidAmount: 50000,
        staus: '0',
      },
      {
        id: 14,
        feeDate: '2024-02-22',
        amountDue: 50000,
        reciptNo: '1',
        lateFeeAmount: 0,
        paidAmount: 50000,
        staus: '1',
      },
      {
        id: 15,
        feeDate: '2023-11-29',
        amountDue: 150,
        reciptNo: '16',
        lateFeeAmount: 0,
        paidAmount: 150,
        staus: '0',
      },
      {
        id: 16,
        feeDate: '2024-02-22',
        amountDue: 50000,
        reciptNo: '1',
        lateFeeAmount: 0,
        paidAmount: 50000,
        staus: '1',
      },
      {
        id: 17,
        feeDate: '2024-02-22',
        amountDue: 50000,
        reciptNo: '1',
        lateFeeAmount: 0,
        paidAmount: 50000,
        staus: '1',
      },
    ]);
    retrieveData();
    const colorTheme = Appearance.getColorScheme();
    console.log(colorTheme);
    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

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
            style={{width: '100%', height: '100%', justifyContent: 'center'}}>
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
                      Payment History
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.filterContainer}>
                  <TouchableOpacity
                    style={[
                      theme === 'light'
                        ? styles.filterButton
                        : styles.dFilterButton,
                      filterStatus === 'all' &&
                        (theme === 'light'
                          ? styles.activeFilterButton
                          : styles.dActiveFilterButton),
                    ]}
                    onPress={() => handleFilterChange('all')}>
                    <Text
                      style={
                        (theme === 'light'
                          ? styles.filterButtonText
                          : styles.dFilterButtonText,
                        filterStatus === 'all' &&
                          (theme === 'light'
                            ? styles.activeFilterText
                            : styles.dActiveFilteText))
                      }>
                      All
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      theme === 'light'
                        ? styles.filterButton
                        : styles.dFilterButton,
                      filterStatus === '0' &&
                        (theme === 'light'
                          ? styles.activeFilterButton
                          : styles.dActiveFilterButton),
                    ]}
                    onPress={() => handleFilterChange('0')}>
                    <Text
                      style={
                        (theme === 'light'
                          ? styles.filterButtonText
                          : styles.dFilterButtonText,
                        filterStatus === '0' &&
                          (theme === 'light'
                            ? styles.activeFilterText
                            : styles.dActiveFilteText))
                      }>
                      Status 0
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      theme === 'light'
                        ? styles.filterButton
                        : styles.dFilterButton,
                      filterStatus === '1' &&
                        (theme === 'light'
                          ? styles.activeFilterButton
                          : styles.dActiveFilterButton),
                    ]}
                    onPress={() => handleFilterChange('1')}>
                    <Text
                      style={
                        (theme === 'light'
                          ? styles.filterButtonText
                          : styles.dFilterButtonText,
                        filterStatus === '1' &&
                          (theme === 'light'
                            ? styles.activeFilterText
                            : styles.dActiveFilteText))
                      }>
                      Status 1
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
            <ScrollView
              style={mainStyle.myProfileDetailsCont}
              onScroll={e => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}>
              {/* <FeeDataTable feeData={apiResponse.resData.feeData} /> */}
              <View
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  padding: 20,
                  paddingHorizontal: 5,
                  paddingTop: 100,
                }}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <>
                    <Text>Regular Payment history:</Text>
                    {/* <FlatList
                      data={filteredData1}
                      renderItem={({item}) => <TermItem item={item} />}
                      contentContainerStyle={mainStyle.flatListStyle}
                      keyExtractor={item => item.id} // Use unique IDs for performance
                      ItemSeparatorComponent={() => (
                        <View style={mainStyle.separator} />
                      )}
                      // ListHeaderComponent={() => (
                      //   <Text style={mainStyle.header}>Courses</Text>
                      // )}
                    /> */}
                    {filteredData1.map((item, index) => (
                      <TermItem key={index} item={item} />
                    ))}
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
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
    backgroundColor: '#DDD',
    borderBottomWidth: 1,
    borderBottomColor: '#1d1d1d',
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
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    marginTop: 10,
  },
  activeFilterButton: {
    backgroundColor: '1E63BB', // Change color as desired
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
  },
  dFilterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default PaymentHistoryNew2;
