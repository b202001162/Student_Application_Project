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
  const [feeData, setFeeData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isHandleRunning, setIsHandleRunning] = useState(false);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [bankRefNo, setBankRefNo] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [transactionNo, setTransactionNo] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState();
  const [totalFeesPaid, setTotalFeesPaid] = useState(0);

  const retrieveData = async () => {
    setLoading(true);
    const token = await JSON.parse(await AsyncStorage.getItem('jwtToken'));
    const userId = await JSON.parse(await AsyncStorage.getItem('userId'));
    const admissionId = await JSON.parse(
      await AsyncStorage.getItem('admissionId'),
    );
    const currencySymbol = await JSON.parse(
      await AsyncStorage.getItem('currencySymbol'),
    );
    const baseURL = await JSON.parse(await AsyncStorage.getItem('baseURL'));
    console.log('Stored Token', token);
    console.log('Stored Token', userId);
    await setCurrencySymbol(currencySymbol);

    try {
      const response = await axios.get(
        `${baseURL}/nure-student/v1/fetchMyFeePaidHistory/${admissionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Response', response.data);
      await setFeeData(response.data.resData.feeData);
      let total = 0;
      if (response.data.resData.feeData !== null)
        for (let i = 0; i < response.data.resData.feeData.length; i++) {
          total += response.data.resData.feeData[i].amount;
        }
      await setTotalFeesPaid(total);
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

  const handleDetailsPress = async (
    date,
    amount,
    status,
    paymentMode,
    bankRefNo,
    receiptNo,
    transactionNo,
  ) => {
    // console.log(date, amount, status, paymentMode, bankRefNo, receiptNo, transactionNo);
    await setIsHandleRunning(true);
    await setModalVisible(true);
    await setDate(date);
    await setAmount(amount);
    await setStatus(status);
    await setPaymentMode(paymentMode);
    await setBankRefNo(bankRefNo);
    await setReceiptNo(receiptNo);
    await setTransactionNo(transactionNo);
    await setIsHandleRunning(false);
  };

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
            {width: 80, justifyContent: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.remarks}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 60, justifyContent: 'center', alignItems: 'flex-end'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {currencySymbol}
            {item.amount}
          </Text>
        </View>
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
            {item.paymentMode}
          </Text>
        </View> */}
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
            {item.date}
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
                item.date,
                item.amount,
                item.status,
                item.paymentMode,
                item.bankRefNo,
                item.receiptNo,
                item.transactionNo,
              );
            }}
            style={
              theme === 'light'
                ? {
                    backgroundColor: 'transparent',
                    width: '100%',
                    paddingVertical: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    borderColor: '4d4d4d',
                    borderWidth: 1,
                  }
                : {
                    backgroundColor: 'transparent',
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
            {width: 90, justifyContent: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.bankRefNo}
          </Text>
        </View>
        <View
          style={
            (theme === 'light'
              ? mainStyle.courseRegistrationTableCell
              : mainStyle.dCourseRegistrationTableCell,
            {width: 90, justifyContent: 'center'})
          }>
          <Text
            style={
              theme === 'light'
                ? mainStyle.courseRegistrationTableText
                : mainStyle.dCourseRegistrationTableText
            }>
            {item.receiptNo}
          </Text>
        </View> */}
      </View>
    );
  };

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
                  Payment History
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
                            {width: 100})
                          }>
                          <Text
                            style={
                              theme === 'light'
                                ? mainStyle.courseRegistrationTableHeaderText
                                : mainStyle.dCourseRegistrationTableHeaderText
                            }>
                            Transaction no.
                          </Text>
                        </View> */}
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
                          Fee
                        </Text>
                      </View>
                      <View
                        style={
                          (theme === 'light'
                            ? mainStyle.courseRegistrationTableCell
                            : mainStyle.dCourseRegistrationTableCell,
                          {width: 60, alignItems: 'flex-end'})
                        }>
                        <Text
                          style={[
                            theme === 'light'
                              ? mainStyle.courseRegistrationTableHeaderText
                              : mainStyle.dCourseRegistrationTableHeaderText,
                          ]}>
                          Amount
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
                          Date
                        </Text>
                      </View>
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
                            Payment mode
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
                          More Details
                        </Text>
                      </View>
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
                      theme === 'light' ? styles.modalView : styles.dModalView
                    }>
                    <View style={{minWidth: '95%'}}>
                      <Text
                        style={
                          theme === 'light'
                            ? styles.detailsMainTexts
                            : styles.dDetailsMainTexts
                        }>
                        Date:{'\n'}
                        <Text
                          style={
                            theme === 'light'
                              ? styles.detailsTexts
                              : styles.dDetailsTexts
                          }>
                          {date === null || date === '' ? 'N/A' : date}
                        </Text>
                      </Text>
                      <Text
                        style={
                          theme === 'light'
                            ? styles.detailsMainTexts
                            : styles.dDetailsMainTexts
                        }>
                        Amount:{'\n'}
                        <Text
                          style={
                            theme === 'light'
                              ? styles.detailsTexts
                              : styles.dDetailsTexts
                          }>
                          {currencySymbol}
                          {amount === null || amount === '' ? 'N/A' : amount}
                        </Text>
                      </Text>
                      <Text
                        style={
                          theme === 'light'
                            ? styles.detailsMainTexts
                            : styles.dDetailsMainTexts
                        }>
                        Payment Mode:{'\n'}
                        <Text
                          style={
                            theme === 'light'
                              ? styles.detailsTexts
                              : styles.dDetailsTexts
                          }>
                          {paymentMode === null || paymentMode === ''
                            ? 'N/A'
                            : paymentMode}
                        </Text>
                      </Text>
                      <Text
                        style={
                          theme === 'light'
                            ? styles.detailsMainTexts
                            : styles.dDetailsMainTexts
                        }>
                        Reference no.:{'\n'}
                        <Text
                          style={
                            theme === 'light'
                              ? styles.detailsTexts
                              : styles.dDetailsTexts
                          }>
                          {bankRefNo === null || bankRefNo === ''
                            ? 'N/A'
                            : bankRefNo}
                        </Text>
                      </Text>
                      <Text
                        style={
                          theme === 'light'
                            ? styles.detailsMainTexts
                            : styles.dDetailsMainTexts
                        }>
                        Receipt no.:{'\n'}
                        <Text
                          style={
                            theme === 'light'
                              ? styles.detailsTexts
                              : styles.dDetailsTexts
                          }>
                          {receiptNo === '' || receiptNo === null
                            ? 'N/A'
                            : receiptNo}
                        </Text>
                      </Text>
                      <Text
                        style={
                          theme === 'light'
                            ? styles.detailsMainTexts
                            : styles.dDetailsMainTexts
                        }>
                        Transaction no.:{'\n'}
                        <Text
                          style={
                            theme === 'light'
                              ? styles.detailsTexts
                              : styles.dDetailsTexts
                          }>
                          {transactionNo === '' || transactionNo === null
                            ? 'N/A'
                            : transactionNo}
                        </Text>
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
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginTop: 20,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: theme === 'light' ? '#3d3d3d' : '#ccc',
                }}>
                Total Fee paid:{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: theme === 'light' ? '#1d1d1d' : '#eee',
                  }}>
                  {currencySymbol}
                  {totalFeesPaid}
                </Text>
              </Text>
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
    backgroundColor: 'transparent',
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
    fontSize: 18,
    fontWeight: 'regular',
  },

  dDetailsTexts: {color: '#CCC', fontSize: 19, fontWeight: 'regular'},

  detailsMainTexts: {
    color: '#1E63BB',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 1,
  },

  dDetailsMainTexts: {
    color: '#98BAFC',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 1,
  },
});

export default PaymentHistoryNew;
