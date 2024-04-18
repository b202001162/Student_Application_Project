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
  VirtualizedList,
  Animated,
  Modal,
  Pressable,
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

type PaymentToBePaidProps = NativeStackScreenProps<
  RootStackParamList,
  'PaymentToBePaid'
>;

const PaymentToBePaid = ({route}: PaymentToBePaidProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [terms, setTerms] = useState([]);
  const [data, setData] = useState([]);
  const [headData, setHeadData] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [extraData, setExtraData] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [amountToPaid, setAmountToPaid] = useState('');
  const [dateOfFine, setDateOfFine] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [demandCode, setDemandCode] = useState('');
  const [status, setStatus] = useState('');
  const [revokeStatus, setRevokeStatus] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isHandleRunning, setIsHandleRunning] = useState(false);

  const TermItem = ({item}) => {
    return (
      <View
        style={
          theme === 'light'
            ? mainStyle.myTermsItemContainer
            : mainStyle.dMyTermsItemContainer
        }>
        <View
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
        </View>
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
        <View
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
        </View>
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
    const admissionId = JSON.parse(await AsyncStorage.getItem('admissionId'));
    console.log('Stored Token', token);
    console.log('Stored Token', userId);

    try {
      const response = await axios.get(
        `https://erp.campuslabs.in/TEST/api/nure-student/v1/fetchMyFeesToBePaid/${admissionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Response', response.data.resData.feeExtraColl);
      await setAmountToPaid(response.data.resData.totalDue);
      await setFeeData(response.data.resData.feeExtraColl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // setExtraData([
    //   {
    //     id: 1,
    //     feeName: 'LIBRARY FEE',
    //     amount: 5000,
    //     fineCode: 'Extra Demand',
    //     dateOfFine: '2026-03-02',
    //     dateOfPay: '2024-02-22',
    //   },
    // ]);
    // setTerms([
    //   {
    //     id: 6,
    //     feeDate: '2023-11-29',
    //     amountDue: 150,
    //     reciptNo: '16',
    //     lateFeeAmount: 0,
    //     paidAmount: 150,
    //     staus: '0',
    //   },
    //   {
    //     id: 9,
    //     feeDate: '2024-02-22',
    //     amountDue: 50000,
    //     reciptNo: '1',
    //     lateFeeAmount: 0,
    //     paidAmount: 50000,
    //     staus: '1',
    //   },
    //   {
    //     id: 10,
    //     feeDate: '2024-02-22',
    //     amountDue: 50000,
    //     reciptNo: '1',
    //     lateFeeAmount: 0,
    //     paidAmount: 50000,
    //     staus: '1',
    //   },
    // ]);
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
        {/* <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 50, justifyContent: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {index}
          </Text>
        </View> */}
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 90})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {formatDate(item.dateOfFine)}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 85})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.feeMaster.name}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 80, justifyContent: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.amount}
          </Text>
        </View>

        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 90, justifyContent: 'center'})
          }>
          <TouchableOpacity
            onPress={() => {
              handleDetailsPress(
                formatDate(item.dateOfFine),
                item.amount,
                item.feeMaster.name,
                item.demandCode,
                item.status,
                item.revokeStatus,
                item.refundAmount,
              );
            }}
            style={
              theme === 'light'
                ? {
                    backgroundColor: '#1E63BB',
                    width: '100%',
                    paddingVertical: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    borderColor: '4d4d4d',
                    borderWidth: 1,
                  }
                : {
                    backgroundColor: '#23303C',
                    width: '100%',
                    paddingVertical: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    borderColor: '#ccc',
                    borderWidth: 1,
                  }
            }>
            <Text
              style={
                theme === 'light'
                  ? {
                      color: '#4d4d4d',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }
                  : {
                      color: '#ccc',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }
              }>
              Details
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 120, justifyContent: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.demandCode}
          </Text>
        </View> */}
        {/* <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 100, justifyContent: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.status}
          </Text>
        </View> */}
        {/* <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 110, justifyContent: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.revokeStatus}
          </Text>
        </View> */}
        {/* <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 110, justifyContent: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.refundAmount}
          </Text>
        </View> */}
      </View>
    );
  };

  const handleDetailsPress = async (
    dateOfFine,
    amount,
    name,
    demandCode,
    status,
    revokeStatus,
    refundAmount,
  ) => {
    console.log('presees');
    await setIsHandleRunning(true);
    await setModalVisible(true);
    await setDateOfFine(dateOfFine);
    await setAmount(amount);
    await setName(name);
    await setDemandCode(demandCode);
    await setStatus(status);
    await setRevokeStatus(revokeStatus);
    await setRefundAmount(refundAmount);
    await setIsHandleRunning(false);
  };

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

  const formatDate = dateString => {
    const date = new Date(dateString); // Create a Date object from the string
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad month for single digits (01-12)
    const day = date.getDate().toString().padStart(2, '0'); // Pad day for single digits (01-31)

    const newDate = `${day}-${month}-${year}`;
    return newDate;
  };

  const [isLoading, setLoading] = useState(true);
  return (
    <SafeAreaView>
      <View
        style={theme === 'light' ? mainStyle.container : mainStyle.dContainer}>
        <View
          style={
            theme === 'light' ? mainStyle.subContainer : mainStyle.dSubContainer
          }>
          <Animated.View
            style={{
              transform: [{translateY: translateY}],
              elevation: 4,
              width: 100 + '%',
              zIndex: 100,
            }}>
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
                  Payment to be paid
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          {/* <FeeDataTable feeData={apiResponse.resData.feeData} /> */}
          <ScrollView
            style={mainStyle.myProfileDetailsCont}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 20,
                paddingHorizontal: 5,
                marginTop: 50,
              }}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: theme === 'light' ? '#3d3d3d' : '#ccc',
                      }}>
                      Amount to be paid:{' '}
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: theme === 'light' ? '#1d1d1d' : '#eee',
                        }}>
                        {amountToPaid}
                      </Text>
                    </Text>
                  </View>
                  <ScrollView horizontal={true}>
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
                        {/* <View
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
                            Sr no.
                          </Text>
                        </View> */}
                        <View
                          style={
                            (theme === 'light'
                              ? mainStyle.courseRegistrationTableCell
                              : mainStyle.dCourseRegistrationTableCell,
                            {width: 90})
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? mainStyle.courseRegistrationTableHeaderText
                                : mainStyle.dCourseRegistrationTableHeaderText
                            }>
                            Date of fine
                          </Text>
                        </View>
                        <View
                          style={
                            (theme === 'light'
                              ? mainStyle.courseRegistrationTableCell
                              : mainStyle.dCourseRegistrationTableCell,
                            {width: 85})
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? mainStyle.courseRegistrationTableHeaderText
                                : mainStyle.dCourseRegistrationTableHeaderText
                            }>
                            Fee name
                          </Text>
                        </View>
                        <View
                          style={
                            (theme === 'light'
                              ? mainStyle.courseRegistrationTableCell
                              : mainStyle.dCourseRegistrationTableCell,
                            {width: 80})
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? mainStyle.courseRegistrationTableHeaderText
                                : mainStyle.dCourseRegistrationTableHeaderText
                            }>
                            Amount
                          </Text>
                        </View>
                        <View
                          style={
                            (theme === 'light'
                              ? mainStyle.courseRegistrationTableCell
                              : mainStyle.dCourseRegistrationTableCell,
                            {width: 90})
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? mainStyle.courseRegistrationTableHeaderText
                                : mainStyle.dCourseRegistrationTableHeaderText
                            }>
                            Details
                          </Text>
                        </View>
                        {/* <View
                          style={
                            (theme === 'light'
                              ? mainStyle.courseRegistrationTableCell
                              : mainStyle.dCourseRegistrationTableCell,
                            {width: 120})
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? mainStyle.courseRegistrationTableHeaderText
                                : mainStyle.dCourseRegistrationTableHeaderText
                            }>
                            Demand code
                          </Text>
                        </View> */}
                        {/* <View
                          style={
                            (theme === 'light'
                              ? mainStyle.courseRegistrationTableCell
                              : mainStyle.dCourseRegistrationTableCell,
                            {width: 100})
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? mainStyle.courseRegistrationTableHeaderText
                                : mainStyle.dCourseRegistrationTableHeaderText
                            }>
                            Status
                          </Text>
                        </View> */}
                        {/* <View
                          style={
                            (theme === 'light'
                              ? mainStyle.courseRegistrationTableCell
                              : mainStyle.dCourseRegistrationTableCell,
                            {width: 110})
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? mainStyle.courseRegistrationTableHeaderText
                                : mainStyle.dCourseRegistrationTableHeaderText
                            }>
                            Revoke Status
                          </Text>
                        </View> */}
                        {/* <View
                          style={
                            (theme === 'light'
                              ? mainStyle.courseRegistrationTableCell
                              : mainStyle.dCourseRegistrationTableCell,
                            {width: 110})
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? mainStyle.courseRegistrationTableHeaderText
                                : mainStyle.dCourseRegistrationTableHeaderText
                            }>
                            Refund amount
                          </Text>
                        </View> */}
                      </View>
                      {isLoading ? (
                        <ActivityIndicator size="large" color="#1E63BB" />
                      ) : (
                        <>
                          {feeData.map((item, index) => (
                            <ResultItem
                              item={item}
                              index={index + 1}
                              key={index}
                            />
                          ))}
                        </>
                      )}
                    </View>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <View style={styles.modalContainerView}>
                        {isHandleRunning ? (
                          <ActivityIndicator size="large" color="#1E63BB" />
                        ) : (
                          <View
                            style={
                              theme === 'light'
                                ? styles.modalView
                                : styles.dModalView
                            }>
                            <View style={{minWidth: '95%'}}>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsMainTexts
                                    : styles.dDetailsMainTexts
                                }>
                                Date of Fine
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsTexts
                                    : styles.dDetailsTexts
                                }>
                                {dateOfFine}
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsMainTexts
                                    : styles.dDetailsMainTexts
                                }>
                                Amount
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsTexts
                                    : styles.dDetailsTexts
                                }>
                                {amount}
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsMainTexts
                                    : styles.dDetailsMainTexts
                                }>
                                Status
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsTexts
                                    : styles.dDetailsTexts
                                }>
                                {status}
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsMainTexts
                                    : styles.dDetailsMainTexts
                                }>
                                Fine name
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsTexts
                                    : styles.dDetailsTexts
                                }>
                                {name}
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsMainTexts
                                    : styles.dDetailsMainTexts
                                }>
                                Demand code
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsTexts
                                    : styles.dDetailsTexts
                                }>
                                {demandCode}
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsMainTexts
                                    : styles.dDetailsMainTexts
                                }>
                                Revoke Status
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsTexts
                                    : styles.dDetailsTexts
                                }>
                                {revokeStatus}
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsMainTexts
                                    : styles.dDetailsMainTexts
                                }>
                                Refund amount
                              </Text>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.detailsTexts
                                    : styles.dDetailsTexts
                                }>
                                {refundAmount}
                              </Text>
                            </View>
                            <Pressable
                              style={
                                theme === 'light'
                                  ? [styles.button, styles.buttonClose]
                                  : [styles.dButton, styles.dButtonClose]
                              }
                              onPress={() => setModalVisible(!modalVisible)}>
                              <Text
                                style={
                                  theme === 'light'
                                    ? styles.textStyle
                                    : styles.dTextStyle
                                }>
                                Back
                              </Text>
                            </Pressable>
                          </View>
                        )}
                      </View>
                    </Modal>
                  </ScrollView>
                </>
              )}
            </View>
          </ScrollView>
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
  modalContainerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dModalView: {
    margin: 20,
    backgroundColor: '#23303C',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dModalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#eee',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  dButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },

  buttonOpen: {
    backgroundColor: 'transparent',
  },
  buttonClose: {
    borderColor: '#1E63BB',
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  dButtonClose: {
    borderColor: '#98BAFC',
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },

  textStyle: {
    color: '#1E63BB',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dTextStyle: {
    color: '#98BAFC',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  detailsTexts: {
    color: '#3d3d3d',
    fontSize: 19,
    fontWeight: 'regular',
    paddingLeft: 7,
    marginBottom: 10,
  },

  dDetailsTexts: {
    color: '#CCC',
    fontSize: 19,
    fontWeight: 'regular',
    paddingLeft: 7,
    marginBottom: 10,
  },

  detailsMainTexts: {
    color: '#1E63BB',
    fontSize: 15,
    fontWeight: 'bold',
  },

  dDetailsMainTexts: {
    color: '#98BAFC',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default PaymentToBePaid;
