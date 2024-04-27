import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

export const mainStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    height: '100%',
    // paddingTop: 20,
  },
  dContainer: {
    backgroundColor: '#0c1319',
    alignItems: 'center',
    justifyContent: 'start',
    height: '100%',
    // paddingTop: 20,
  },

  subContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // height: '100%',
    width: '100%',
    // paddingHorizontal:10,
  },
  dSubContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // height: '100%',
    width: '100%',
    // paddingHorizontal: 10,
  },

  header: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  greetingTextContainer: {
    marginBottom: 20,
    width: '100%',
  },

  greetingText: {
    color: '#1F781D',
    fontSize: 30,
  },
  dGreetingText: {
    color: '#94CE9D',
    fontSize: 30,
  },

  ongoingEvents: {
    width: '100%',
    marginBottom: 30,
  },

  ongoingEventsText: {
    color: '#1d1d1d',
    fontSize: 20,
  },
  dOngoingEventsText: {
    color: '#eee',
    fontSize: 20,
  },

  ongoingEventsButtonsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 100,
  },

  ongoingEventsButtons: {
    backgroundColor: '#DDD',
    width: '90%',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dOngoingEventsButtons: {
    backgroundColor: '#23303C',
    width: '90%',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  courseDetailsButtons: {
    backgroundColor: '#EAEAEA',
    width: '90%',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dCourseDetailsButtons: {
    backgroundColor: '#23303C',
    width: '90%',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  courseDetailsButtonsText: {
    color: '#1d1d1d',
    fontSize: 18,
    textAlign: 'center',
  },
  dCourseDetailsButtonsText: {
    color: '#EAEAEA',
    fontSize: 18,
    textAlign: 'center',
  },

  ongoingEventsButtonsText: {
    color: '#272D7A',
    fontSize: 20,
    textAlign: 'center',
  },
  dOngoingEventsButtonsText: {
    color: '#98BAFC',
    fontSize: 20,
    textAlign: 'center',
  },

  academics: {
    width: '100%',
  },

  academicsText: {
    color: '#1d1d1d',
    fontSize: 20,
  },
  dAcademicsText: {
    color: '#eee',
    fontSize: 20,
  },

  academicsButtonsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  academicsButtons: {
    backgroundColor: '#DDD',
    // width: '47%',
    width: 150,
    height: 80,
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dAcademicsButtons: {
    backgroundColor: '#23303C',
    width: 150,
    height: 80,
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  academicsButtonsText: {
    color: '#1d1d1d',
    fontSize: 18,
    textAlign: 'center',
  },
  dAcademicsButtonsText: {
    color: '#eee',
    fontSize: 18,
    textAlign: 'center',
  },
  academicsButtonsIcon: {
    color: '#1d1d1d',
    textAlign: 'center',
  },
  dAcademicsButtonsIcon: {
    color: '#eee',
    textAlign: 'center',
  },

  loginMainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dLoginMainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginInputButtonContainer: {
    mariginTop: 100,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginTextInput: {
    width: '90%',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 15,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#1d1d1d',
  },
  dLoginTextInput: {
    width: '90%',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 15,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#777',
  },

  timeTablePageTextInput: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    // padding: 15,
    // borderWidth: 2,
    // borderColor: '#1d1d1d',
  },
  dTimeTablePageTextInput: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    // padding: 15,
    // borderWidth: 2,
    // borderColor: '#777',
  },

  timeTablePageButton: {
    backgroundColor: '#1E63BB',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  dTimeTablePageButton: {
    backgroundColor: '#98BAFC',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
  },


  loginInputText: {
    height: 50,
    fontSize: 20,
    color: '#3d3d3d',
  },
  dLoginInputText: {
    height: 50,
    fontSize: 20,
    color: '#bbb',
  },
  
  timeTablePageInputText: {
    fontSize: 20,
    color: '#3d3d3d',
    padding: 10,
    borderWidth: 1,
    borderColor: '#1d1d1d',
    borderRadius: 8,
  },
  dTimeTablePageInputText: {
    fontSize: 20,
    color: '#bbb',
    padding: 10,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
  },

  loginButton: {
    backgroundColor: '#272D7A',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
    width: '40%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
    marginBottom: 90,
  },
  dLoginButton: {
    backgroundColor: '#98BAFC',
    borderRadius: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
    width: '40%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
    marginBottom: 90,
  },

  loginButtonText: {
    color: '#EAEAEA',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dLoginButtonText: {
    color: '#23303C',
    fontSize: 15,
    fontWeight: 'bold',
  },

  headerMain: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'fixed',
    top: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation:4,
    backgroundColor: '#fefefe',
    borderBottomWidth: 1,
    borderBottomColor: '#1d1d1d',
    paddingHorizontal: 10,
  },
  dHeaderMain: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'fixed',
    top: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation:4,
    backgroundColor: '#0c1319',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingHorizontal: 10,
  },

  headerText: {
    color: '#1d1d1d',
    fontSize: 20,
  },
  dHeaderText: {
    color: '#eee',
    fontSize: 20,
  },

  headerIcon: {
    marginRight: 10,
    marginLeft: 5,
  },

  itemContainer: {
    backgroundColor: '#DDD',
    minWwidth: '95%',
    maxWidth: '95%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  dItemContainer: {
    backgroundColor: '#23303C',
    minWidth: '95%',
    maxWidth: '95%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  myProfilesItemContainer: {
    backgroundColor: '#DDD',
    minWidth: '95%',
    maxWidth: '95%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  dMyProfilesItemContainer: {
    backgroundColor: '#23303C',
    minWidth: '95%',
    maxWidth: '95%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  myTermsItemContainer: {
    backgroundColor: '#DDD',
    minWidth: '90%',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  dMyTermsItemContainer: {
    backgroundColor: '#23303C',
    minWidth: '90%',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  myCourseDetailsItemContainer: {
    backgroundColor: '#ddd',
    minWidth: '90%',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    color: '#1E63BB',
  },
  dMyCourseDetailsItemContainer: {
    backgroundColor: '#23303C',
    minWidth: '90%',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    color: '#98BAFC',
  },

  itemTitle: {
    color: '#1d1d1d',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dItemTitle: {
    color: '#eee',
    fontSize: 20,
    fontWeight: 'bold',
  },

  myProfilesItemTitle: {
    color: '#1d1d1d',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dMyProfilesItemTitle: {
    color: '#eee',
    fontSize: 20,
    fontWeight: 'bold',
  },

  myTermsItemTitle: {
    color: '#1E63BB',
    fontSize: 17,
    fontWeight: 'bold',
  },
  dMyTermsItemTitle: {
    color: '#98BAFC',
    fontSize: 17,
    fontWeight: 'bold',
  },

  myCoursesItemTitle: {
    color: '#1d1d1d',
    fontSize: 17,
    fontWeight: 'heavy',
  },
  dMyCoursesItemTitle: {
    color: '#eee',
    fontSize: 17,
    fontWeight: 'heavy',
  },

  itemDetails: {
    color: '#1d1d1d',
    fontSize: 15,
  },
  dItemDetails: {
    color: '#eee',
    fontSize: 15,
  },

  myProfilesItemDetails: {
    color: '#1d1d1d',
    fontSize: 15,
  },
  dMyProfilesItemDetails: {
    color: '#eee',
    fontSize: 15,
  },

  profileTitleText: {
    color: '#1d1d1d',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dProfileTitleText: {
    color: '#eee',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  myTermsItemDetails: {
    color: '#1d1d1d',
    fontSize: 17,
  },
  dMyTermsItemDetails: {
    color: '#eee',
    fontSize: 17,
  },

  myCourseItemDetails: {
    color: '#1E63BB',
    fontSize: 17,
  },
  dMyCourseItemDetails: {
    color: '#98BAFC',
    fontSize: 17,
  },

  flatListStyle: {
    width: '100%',
    // marginBottom: 200,
    // height: '90%',
    // justifyContent: 'center',
    // paddingVertical: 30,
    // height: '50%',
    // scrollEnabled: true,
    alignItems: 'center',
  },

  myCourseDetailsButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  myCourseDetailsButton: {
    backgroundColor: '#EAEAEA',
    width: '90%',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dMyCourseDetailsButton: {
    backgroundColor: '#23303C',
    width: '90%',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  myCourseDetailsButtonText: {
    color: '#1E63BB',
    fontSize: 17,
    textAlign: 'center',
  },
  dMyCourseDetailsButtonText: {
    color: '#98BAFC',
    fontSize: 17,
    textAlign: 'center',
  },

  lessonPlanTitle: {
    color: '#4d4d4d',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dLessonPlanTitle: {
    color: '#bbb',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  assignmentItemContainer: {
    backgroundColor: '#EAEAEA',
    minWidth: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    // height: 'auto',
  },
  dAssignmentItemContainer: {
    backgroundColor: '#23303C',
    minWidth: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 'auto',
  },

  resultContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
    minWidth: '95%',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  dResultContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#23303C',
    minWidth: '95%',
    padding: 15,
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 7,
  },

  resultPageText: {
    color: '#5d5d5d',
    fontSize: 17,
  },
  dResultPageText: {
    color: '#bbb',
    fontSize: 17,
  },

  paymentHistoryStudentDetailsText: {
    color: '#4d4d4d',
    fontSize: 15,
    fontWeight: 'semibold',
  },
  dPaymentHistoryStudentDetailsText: {
    color: '#ccc',
    fontSize: 15,
    fontWeight: 'semibold',
  },

  paymentHistoryTable: {
    width: '100%',
    marginTop: 40,
  },
  dPaymentHistoryTable: {
    width: '100%',
    marginTop: 40,
  },

  paymentHistoryTHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAEAEA',
    padding: 10,
    // borderRadius: 10,
  },
  dPaymentHistoryTHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#23303C',
    padding: 10,
    // borderRadius: 10,
  },

  paymentHistoryTHeadText: {
    color: '#1d1d1d',
    fontSize: 15,
  },
  dPaymentHistoryTHeadText: {
    color: '#eee',
    fontSize: 15,
  },

  paymentHistoryTData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
  },
  dPaymentHistoryTData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
  },

  paymentHistoryTBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ECECEC',
    padding: 10,
    // borderRadius: 10,
  },
  dPaymentHistoryTBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#22364f',
    padding: 10,
    // borderRadius: 10,
  },

  paymentHistoryTBodyText: {
    color: '#1d1d1d',
    fontSize: 15,
  },
  dPaymentHistoryTBodyText: {
    color: '#eee',
    fontSize: 15,
  },

  PaymentButtonsCont: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },

  PaymentButton: {
    backgroundColor: '#EAEAEA',
    width: '40%',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dPaymentButton: {
    backgroundColor: '#23303C',
    width: '40%',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  courseFeedbackTitle: {
    color: '#1E63BB',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dCourseFeedbackTitle: {
    color: '#98BAFC',
    fontSize: 20,
    fontWeight: 'bold',
  },

  myProfileDetailsText: {
    color: '#5d5d5d',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dMyProfileDetailsText: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  myProfileDivider: {
    width: '100%',
    // height: 1,
    backgroundColor: '#1d1d1d',
    marginVertical: 5,
  },
  dMyProfileDivider: {
    width: '100%',
    // height: 1,
    backgroundColor: '#777',
    marginVertical: 5,
  },

  courseFBInput: {
    width: '100%',
    borderRadius: 8,
    height: 250,
    marginBottom: 10,
    justifyContent: 'flex-start',
    padding: 15,
    borderWidth: 0,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#1E63BB',
  },
  dCourseFBInput: {
    width: '100%',
    borderRadius: 8,
    height: 250,
    marginBottom: 10,
    justifyContent: 'flex-start',
    padding: 15,
    borderWidth: 0,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#98BAFC',
  },

  courseFBBtnCont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dCourseFBBtnCont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  courseFBBtn: {
    backgroundColor: '#1E63BB',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
  },
  dCourseFBBtn: {
    backgroundColor: '#98BAFC',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
  },

  courseFBBtnText: {
    color: '#EAEAEA',
    fontSize: 13,
    fontWeight: 'bold',
  },
  dCourseFBBtnText: {
    color: '#23303C',
    fontSize: 13,
    fontWeight: 'bold',
  },

  courseRegistrationBtnCont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  courseRegistrationBtn: {
    backgroundColor: '#1E63BB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  dCourseRegistrationBtn: {
    backgroundColor: '#98BAFC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  courseRegistrationBtnOld: {
    backgroundColor: '#1E63BB',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  dCourseRegistrationBtnOld: {
    backgroundColor: '#98BAFC',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },

  courseRegistrationBtnText: {
    color: '#EAEAEA',
    fontSize: 13,
    fontWeight: 'bold',
  },
  dCourseRegistrationBtnText: {
    color: '#23303C',
    fontSize: 13,
    fontWeight: 'bold',
  },

  courseDeregistrationBtn: {
    backgroundColor: '#DB1313',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  dCourseDeregistrationBtn: {
    backgroundColor: '#DD696B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  courseDeregistrationBtnOld: {
    backgroundColor: '#DB1313',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  dCourseDeregistrationBtnOld: {
    backgroundColor: '#DD696B',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },

  courseDeregistrationBtnText: {
    color: '#EAEAEA',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dCourseDeregistrationBtnText: {
    color: '#23303C',
    fontSize: 15,
    fontWeight: 'bold',
  },
  

  AssignmentDetailsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  AssingmentTitle: {
    color: '#1E63BB',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  dAssingmentTitle: {
    color: '#98BAFC',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },

  AssingmentSubTitle: {
    color: '#1d1d1d',
    fontSize: 15,
    marginTop: 5,
  },
  dAssingmentSubTitle: {
    color: '#eee',
    fontSize: 15,
    marginTop: 5,
  },

  submissionDetails: {
    color: '#1d1d1d',
    fontSize: 15,
    marginTop: 10,
  },
  dSubmissionDetails: {
    color: '#eee',
    fontSize: 15,
    marginTop: 10,
  },

  AssignmentFileCont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  AssignmentFile: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    width: '80%',
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  dAssignmentFile: {
    backgroundColor: '#23303C',
    borderRadius: 10,
    width: '80%',
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },

  AssignmentFileText: {
    color: '#1E63BB',
    fontSize: 17,
    marginLeft: 20,
  },
  dAssignmentFileText: {
    color: '#98BAFC',
    fontSize: 17,
    marginLeft: 20,
  },

  uploadUrAssignmentCont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#1E63BB',
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingLeft: 15,
  },
  dUploadUrAssignmentCont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#98BAFC',
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingLeft: 15,
  },

  uploadBtnForAssignments: {
    backgroundColor: '#1E63BB',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
  },
  dUploadBtnForAssignments: {
    backgroundColor: '#98BAFC',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
  },

  uploadBtnForAssignmentsText: {
    color: '#EAEAEA',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dUploadBtnForAssignmentsText: {
    color: '#23303C',
    fontSize: 15,
    fontWeight: 'bold',
  },

  notificationSettingCont: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
    backgroundColor: '#EAEAEA',
    paddingTop: 10,
    paddingLeft: 15,
    borderRadius: 10,
  },
  dNotificationSettingCont: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
    backgroundColor: '#23303C',
    paddingTop: 10,
    paddingLeft: 15,
    borderRadius: 10,
  },

  myProfileDetailsCont: {
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    height: '100%',
    // marginBottom: 50,
    // paddingBottom: 50,
  },

  myProfileDetailsTitleText: {
    color: '#1E63BB',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 10,
  },
  dMyProfileDetailsTitleText: {
    color: '#98BAFC',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 10,
  },

  myProfileDetailsContContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 2,
    borderRadius: 8,
    paddingVertical: 10,
  },
  dMyProfileDetailsContContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20,
    backgroundColor: '#23303C',
    paddingHorizontal: 2,
    borderRadius: 8,
    paddingVertical: 10,
  },

  tableForPaymentHistory: {
    width: '100%',
    marginTop: 20,
  },

  tableHeadCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EAEAEA',
    padding: 10,
    // borderRadius: 10,
  },
  dTableHeadCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#23303C',
    padding: 10,
    // borderRadius: 10,
  },

  th: {
    color: '#1E63BB',
    fontSize: 15,
    width: '30%',
  },
  dTh: {
    color: '#98BAFC',
    fontSize: 15,
    width: '30%',
  },

  tableBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ECECEC',
    padding: 10,
    // borderRadius: 10,
  },
  dTableBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#22364f',
    padding: 10,
    // borderRadius: 10,
  },

  tb: {
    color: '#1E63BB',
    fontSize: 15,
    width: '30%',
  },
  dTb: {
    color: '#98BAFC',
    fontSize: 15,
    width: '30%',
  },

  logoutHandlerButton: {
    backgroundColor: '#DDD',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  dLogoutHandlerButton: {
    backgroundColor: '#23303C',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
  },

  myProfileLogoutText: {
    color: '#DB1313',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dMyProfileLogoutText: {
    color: '#DD696B',
    fontSize: 18,
    fontWeight: 'bold',
  },

  myProfileLogoutIcon: {
    transform: [{rotateY: '180deg'}],
  },

  courseRegistrationTable: {
    width: '100%',
    marginTop: 20,
  },
  dCourseRegistrationTable : {
    width: '100%',
    marginTop: 20,
  },

  resultCGPATableHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#EAEAEA',
    padding: 10,
    // borderRadius: 10,
  },
  dResultCGPATableHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#23303C',
    padding: 10,
    // borderRadius: 10,
  },
  courseRegistrationTableHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DADADA',
    padding: 10,
    // borderRadius: 10,
  },
  dCourseRegistrationTableHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#23303C',
    padding: 10,
    // borderRadius: 10,
  },

  courseRegistrationTableHeaderText: {
    color: '#1E63BB',
    fontSize: 15,
  },
  dCourseRegistrationTableHeaderText: {
    color: '#98BAFC',
    fontSize: 15,
  },

  courseRegistrationTableRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DDD',
    padding: 10,
    // borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },
  dCourseRegistrationTableRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#22364f',
    padding: 10,
    // borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },
  resultCGPATableRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    padding: 10,
    // borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },
  dResultCGPATableRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#22364f',
    padding: 10,
    // borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },

  courseRegistrationTableCell: {
    color: '#1E63BB',
    fontSize: 15,
    width: 110,
  },
  dCourseRegistrationTableCell: {
    color: '#98BAFC',
    fontSize: 15,
    width: 110,
  },

  moreInfoBtn: {
    backgroundColor: 'grey',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 7,
    paddingTop: 7,
  },
  dMoreInfoBtn: {
    backgroundColor: 'grey',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 7,
    paddingTop: 7,
  },

  moreInfoBtnText: {
    color: '#EAEAEA',
    fontSize: 13,
    fontWeight: 'bold',
  },
  dMoreInfoBtnText: {
    color: '#23303C',
    fontSize: 13,
    fontWeight: 'bold',
  },

  courseRegistrationTableText: {
    color: "#3d3d3d"
  },
  dCourseRegistrationTableText: {
    color: "#cdcdcd"
  },

});
