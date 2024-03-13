import React, {useEffect, useState} from 'react';
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

type PaymentHistoryNewProps = NativeStackScreenProps<
  RootStackParamList,
  'PaymentHistoryNew'
>;

const PaymentHistoryNew = ({route}: PaymentHistoryNewProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);
  const [data, setData] = useState([]);
  const [headData, setHeadData] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [extraData, setExtraData] = useState([]);

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

  const apiResponse = {
    timestamp: '2024-02-28T10:40:28.142625Z',
    sCode: 1,
    code: null,
    message: 'Data fetched successfully.',
    resData: {
      feeData: [
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
      ],
    },
    jwtToken: null,
    refreshToken: null,
  };

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
    setExtraData([
      {
        id: 1,
        feeName: 'LIBRARY FEE',
        amount: 5000,
        fineCode: 'Extra Demand',
        dateOfFine: '2026-03-02',
        dateOfPay: '2024-02-22',
      },
    ]);
    setTerms([
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
                Payment History
              </Text>
            </TouchableOpacity>
          </View>
          {/* <FeeDataTable feeData={apiResponse.resData.feeData} /> */}
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
              <>
                <Text>Regular Payment history:</Text>
                <FlatList
                  data={terms}
                  renderItem={({item}) => <TermItem item={item} />}
                  contentContainerStyle={mainStyle.flatListStyle}
                  keyExtractor={item => item.id} // Use unique IDs for performance
                  ItemSeparatorComponent={() => (
                    <View style={mainStyle.separator} />
                  )}
                  // ListHeaderComponent={() => (
                  //   <Text style={mainStyle.header}>Courses</Text>
                  // )}
                />
                <Text>Extra Payment history:</Text>
                <FlatList
                  data={extraData}
                  renderItem={({item}) => <ExtraItem item={item} />}
                  contentContainerStyle={mainStyle.flatListStyle}
                  keyExtractor={item => item.id} // Use unique IDs for performance
                  ItemSeparatorComponent={() => (
                    <View style={mainStyle.separator} />
                  )}
                />
              </>
              //   <ScrollView style={mainStyle.myProfileDetailsCont}>
              //     <>
              //       <Text
              //         style={
              //           theme === 'light'
              //             ? mainStyle.myProfileDetailsTitleText
              //             : mainStyle.dMyProfileDetailsTitleText
              //         }>

              //       </Text>
              //       <View
              //         style={
              //           theme === 'light'
              //             ? mainStyle.myProfileDetailsContContainer
              //             : mainStyle.dMyProfileDetailsContContainer
              //         }>
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           StudentID: {data.profileData.studentId}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }></View>
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Stdent name: {data.profileData.studentName}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }></View>
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Father name: {data.profileData.fatherName}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }></View>
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Mother name: {data.profileData.motherName}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }></View>
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Student Email: {data.profileData.emailId}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }></View>
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Student Mobile: {data.profileData.phoneNo}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }></View>
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Student Address: {data.profileData.studentAddress}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }></View>
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Student DOB: {data.profileData.studentDOB}
              //         </Text>
              //       </View>
              //       <Text
              //         style={
              //           theme === 'light'
              //             ? mainStyle.myProfileDetailsTitleText
              //             : mainStyle.dMyProfileDetailsTitleText
              //         }>
              //         Academics details
              //       </Text>
              //       <View
              //         style={
              //           theme === 'light'
              //             ? mainStyle.myProfileDetailsContContainer
              //             : mainStyle.dMyProfileDetailsContContainer
              //         }>
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           AddmissionId: {data.profileData.admissionId}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Addmission No. : {data.profileData.admissionNo}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           TGPA: {data.profileData.tgpa}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           CGPA : {data.profileData.cgpa}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Creadit Attampted : {data.profileData.creditAttempted}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Current Term ID: {data.profileData.currentTermId}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Degree Id: {data.profileData.degreeId}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Degree name: {data.profileData.degreeName}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Program Id: {data.profileData.programId}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Program Name: {data.profileData.programName}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Level Name: {data.profileData.levelName}{' '}
              //         </Text>
              //         <View
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDivider
              //               : mainStyle.dMyProfileDivider
              //           }
              //         />
              //         <Text
              //           style={
              //             theme === 'light'
              //               ? mainStyle.myProfileDetailsText
              //               : mainStyle.dMyProfileDetailsText
              //           }>
              //           Fee Pattern name: {data.profileData.feePatterName}
              //         </Text>
              //       </View>
              //     </>
              //   </ScrollView>
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

export default PaymentHistoryNew;
