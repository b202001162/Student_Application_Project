import React, {useEffect, useState} from 'react';
import {StatusBar, Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// Screens
import Dashboard from './Screens/Dashboard';
import LoginPage from './Screens/LoginPage';
import OTPVerification from './Screens/OTPVerification';
import CourseRegistration2 from './Screens/CourseRegistration2';
import Notifications from './Screens/Notifications';
import MyTerms from './Screens/MyTerms';
import MyCourses from './Screens/MyCourses';
import MyCourseDetails from './Screens/MyCourseDetails';
import LessonPlan from './Screens/LessonPlan';
import Assignments from './Screens/Assignments';
import Results from './Screens/Results';
import AssignmentDetails from './Screens/AssignmentDetails';
import LessonPlansDetails from './Screens/LessonPlansDetails';
import MyTotalDues from './Screens/MyTotalDues';
import MyProfile from './Screens/MyProfile';
import PaymentHistoryNew from './Screens/PaymentHistoryNew';
import MyGradeCard from './Screens/MyGradeCard';
import MyGradeCardTerms from './Screens/MyGradeCardTerms';
import PaymentToBePaid from './Screens/PaymentToBePaid';
import Schedule from './Screens/Schedule';
import AppPinLock from './Screens/AppPinLock';
import VerifyPinLock from './Screens/VerifyPinLock';
import CurrentCourses from './Screens/CurrentCourses';

// Stack Navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Component from './components/Component';

// For parameter types in stack navigation
export type RootStackParamList = {
  Dashboard: {token: string; name: string};
  LoginPage: undefined;
  Notifications: undefined;
  OTPVerification: {Number: string};
  CourseRegistration2: undefined;
  MyTerms: undefined;
  MyCourses: undefined;
  MyCourseDetails: undefined;
  LessonPlan: undefined;
  Assignments: undefined;
  Results: undefined;
  AssignmentDetails: undefined;
  LessonPlansDetails: undefined;
  MyTotalDues: undefined;
  MyProfile: undefined;
  PaymentHistoryNew: undefined;
  MyGradeCard: undefined;
  MyGradeCardTerms: undefined;
  PaymentToBePaid: undefined;
  Schedule: undefined;
  AppPinLock: undefined;
  VerifyPinLock: undefined;
  CurrentCourses: undefined;
};

// Create stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    const colorTheme = Appearance.getColorScheme();
    console.log(colorTheme);
    if (theme === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={theme === 'light' ? '#DDDDDD' : '#0c1319'}
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer style={{fontFamily: 'arial'}}>
        <Stack.Navigator initialRouteName="VerifyPinLock">
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OTPVerification"
            component={OTPVerification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CourseRegistration2"
            component={CourseRegistration2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyTerms"
            component={MyTerms}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyCourses"
            component={MyCourses}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyCourseDetails"
            component={MyCourseDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LessonPlan"
            component={LessonPlan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Assignments"
            component={Assignments}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Results"
            component={Results}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AssignmentDetails"
            component={AssignmentDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LessonPlansDetails"
            component={LessonPlansDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyTotalDues"
            component={MyTotalDues}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentHistoryNew"
            component={PaymentHistoryNew}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyGradeCard"
            component={MyGradeCard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyGradeCardTerms"
            component={MyGradeCardTerms}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentToBePaid"
            component={PaymentToBePaid}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Schedule"
            component={Schedule}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AppPinLock"
            component={AppPinLock}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VerifyPinLock"
            component={VerifyPinLock}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CurrentCourses"
            component={CurrentCourses}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
    // <FileInput/>
  );
};

export default App;
