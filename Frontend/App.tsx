import React, {useEffect, useState} from 'react';
import {StatusBar, Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// Screens
import Dashboard from './Screens/Dashboard';
import LoginPage from './Screens/LoginPage';
import OTPVerification from './Screens/OTPVerification';
import CourseRegistration from './Screens/CourseRegistration';
import Notifications from './Screens/Notifications';
import MyTerms from './Screens/MyTerms';
import MyCourses from './Screens/MyCourses';
import MyCourseDetails from './Screens/MyCourseDetails';
import LessonPlan from './Screens/LessonPlan';
import Assignments from './Screens/Assignments';
import Results from './Screens/Results';
import PaymentHistory from './Screens/PaymentHistory';
import ResultTermWise from './Screens/ResultTermWise';
import Payment from './Screens/Payment';
import CourseFeedback from './Screens/CourseFeedback';
import AssignmentDetails from './Screens/AssignmentDetails';
import LessonPlansDetails from './Screens/LessonPlansDetails';
import NotificationSettings from './Screens/NotificationSettings';
import MyTotalDues from './Screens/MyTotalDues';
import MyProfile from './Screens/MyProfile';
import PaymentHistoryNew from './Screens/PaymentHistoryNew';

// Stack Navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Component from './components/Component';

// For parameter types in stack navigation
export type RootStackParamList = {
  Dashboard: {token: string; name: string};
  LoginPage: undefined;
  Notifications: undefined;
  OTPVerification: {Number: string};
  CourseRegistration: undefined;
  MyTerms: undefined;
  MyCourses: undefined;
  MyCourseDetails: undefined;
  LessonPlan: undefined;
  Assignments: undefined;
  Results: undefined;
  PaymentHistory: undefined;
  ResultTermWise: undefined;
  Payment: undefined;
  CourseFeedback: undefined;
  AssignmentDetails: undefined;
  LessonPlansDetails: undefined;
  NotificationSettings: undefined;
  MyTotalDues: undefined;
  MyProfile: undefined;
  PaymentHistoryNew: undefined;
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
        <Stack.Navigator initialRouteName="LoginPage">
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
            name="CourseRegistration"
            component={CourseRegistration}
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
            name="PaymentHistory"
            component={PaymentHistory}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResultTermWise"
            component={ResultTermWise}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CourseFeedback"
            component={CourseFeedback}
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
            name="NotificationSettings"
            component={NotificationSettings}
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
    // <FileInput/>
  );
};

export default App;
