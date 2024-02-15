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
        backgroundColor={theme === 'light' ? '#F3f3f3' : '#0c1319'}
      />
      <NavigationContainer>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
    // <FileInput/>
  );
};

export default App;
