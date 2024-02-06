import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

export const mainStyle = StyleSheet.create({
  container: {
    backgroundColor: '#F3f3f3',
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
    justifyContent: 'center',
    // height: '100%',
    width: '90%',
  },
  dSubContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#FAFAFA',
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
    backgroundColor: '#FAFAFA',
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
    justifyContent : 'center',
    alignItems : 'center',
  },

  logintextInput : {
    width: '90%',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 15,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor : '#1d1d1d',
  },
  dLoginTextInput : {
    width: '90%',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 15,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor : '#777',
  },

  loginInputText : {
    height : 50,
    color : '#3d33d',
  },
  dLoginInputText : {
    height : 50,
    color : '#bbb'
  },

  loginButton : {
    backgroundColor: '#2196f3',
    borderRadius: 7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
    width : '40%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
    marginBottom : 100,
  },
  dLoginButton : {
    backgroundColor: '#98BAFC',
    borderRadius: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
    width : '40%',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
    marginBottom : 100,
  },

  loginButtonText : {
    color: '#FAFAFA',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dLoginButtonText : {
    color: '#23303C',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
