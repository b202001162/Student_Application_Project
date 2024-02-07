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
        width: '45%',
        padding: 10,
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


    loginMainContainer : {
      width: '100%',
      height : '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dLoginMainContainer : {
      width: '100%',
      height : '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }


});
