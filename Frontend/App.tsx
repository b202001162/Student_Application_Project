import React, {useEffect, useState} from 'react';
import {StatusBar, Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// Screens
import AppPinLock from './Screens/AppPinLock.tsx';
import Assignments from './Screens/Assignments.tsx';
import AssignmentDetails from './Screens/AssignmentDetails.tsx';
import CourseRegistration2 from './Screens/CourseRegistration2.tsx';
import CurrentCourses from './Screens/CurrentCourses.tsx';
import Dashboard from './Screens/Dashboard.tsx';
import ForgotPin from './Screens/ForgotPin.tsx';
import LessonPlan from './Screens/LessonPlan.tsx';
import LessonPlansDetails from './Screens/LessonPlansDetails.tsx';
import LoginPage from './Screens/LoginPage.tsx';
import MyCourseDetails from './Screens/MyCourseDetails.tsx';
import MyCourses from './Screens/MyCourses.tsx';
import MyGradeCard from './Screens/MyGradeCard.tsx';
import MyGradeCardTerms from './Screens/MyGradeCardTerms.tsx';
import MyProfile from './Screens/MyProfile.tsx';
import MyTerms from './Screens/MyTerms.tsx';
import Notifications from './Screens/Notifications.tsx';
import OTPVerification from './Screens/OTPVerification.tsx';
import PaymentHistoryNew from './Screens/PaymentHistoryNew.tsx';
import PaymentToBePaid from './Screens/PaymentToBePaid.tsx';
import Results from './Screens/Results.tsx';
import Schedule from './Screens/Schedule.tsx';
import SwitchAccount from './Screens/SwitchAccount.tsx';
import VerifyPinLock from './Screens/VerifyPinLock.tsx';
import MyTotalDues from './Screens/MyTotalDues.tsx';

// Stack Navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Component from './components/Component';

// For parameter types in stack navigation
export type RootStackParamList = {
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
        backgroundColor={theme === 'light' ? '#fff' : '#0c1319'}
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
          <Stack.Screen
            name="SwitchAccount"
            component={SwitchAccount}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPin"
            component={ForgotPin}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
    // <FileInput/>
  );
};

export default App;
