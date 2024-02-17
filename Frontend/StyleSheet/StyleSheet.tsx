import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

export const mainStyle = StyleSheet.create({
  container: {
    backgroundColor: '#DDDDDD',
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
    width: '90%',
  },
  dSubContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // height: '100%',
    width: '90%',
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
  },

  ongoingEventsButtons: {
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

  ongoingEventsButtonsText: {
    color: '#1E63BB',
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
    backgroundColor: '#EAEAEA',
    width: '47%',
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dAcademicsButtons: {
    backgroundColor: '#23303C',
    width: '47%',
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  academicsButtonsText: {
    color: '#1d1d1d',
    fontSize: 17,
    textAlign: 'center',
  },
  dAcademicsButtonsText: {
    color: '#eee',
    fontSize: 17,
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

  loginButton: {
    backgroundColor: '#2196f3',
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
  },
  dHeaderMain: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'fixed',
    top: 0,
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
    backgroundColor: '#EAEAEA',
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

  myProfilesItemContainer : {
    backgroundColor: '#EAEAEA',
    minWidth: '95%',
    maxWidth: '95%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  dMyProfilesItemContainer : {
    backgroundColor: '#23303C',
    minWidth: '95%',
    maxWidth: '95%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  myTermsItemContainer: {
    backgroundColor: '#EAEAEA',
    minWidth: '90%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  dMyTermsItemContainer: {
    backgroundColor: '#23303C',
    minWidth: '90%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  myCourseDetailsItemContainer: {
    backgroundColor: '#EAEAEA',
    minWidth: '90%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: '#1E63BB'
  },
  dMyCourseDetailsItemContainer: {
    backgroundColor: '#23303C',
    minWidth: '90%',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    color: '#98BAFC'
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

  myProfilesItemDetails : {
    color: '#1d1d1d',
    fontSize: 15,
  },
  dMyProfilesItemDetails : {
    color: '#eee',
    fontSize: 15,
  },

  profileTitleText : {
    color: '#1d1d1d',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dProfileTitleText : {
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
    marginTop: 20
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

  lessonPlanTitle : {
    color: '#4d4d4d',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dLessonPlanTitle : {
    color: '#bbb',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  assignmentItemContainer: {
    backgroundColor: '#EAEAEA',
    minWidth: '95%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 'auto',
  },
  dAssignmentItemContainer: {
    backgroundColor: '#23303C',
    minWidth: '95%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 'auto',
  },
});
