import React, {useEffect, useState} from 'react';
import {StatusBar, Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// Screens
import Dashboard from './Screens/Dashboard';
import LoginPage from './Screens/LoginPage';
import OTPVerification from './Screens/OTPVerification';
import CourseRegistration from './Screens/CourseRegistration';
// import Welcome from './components/Welcome';
// import CourseRegistration from './components/CourseRegistration';
// import LoginDemo from './components/LoginDemo';
// import Notifications from './components/Notifications';
// import GradeCard from './components/GradeCard';
// import MyComp from './components/MyComp';
// import APICheck from './components/APICheck';
// import RegisteredCourses from './components/RegisteredCourses';
// import FileInput from './components/FileInput';
// import OTPVerification from './components/OTPVerification';
// For stack navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Component from './components/Component';

// For parameter types in stack navigation
export type RootStackParamList = {
  Dashboard: {token: string; name: string};
  LoginPage: undefined;
  OTPVerification: {Number: string};
  CourseRegistration: undefined;
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
    // <FileInput/>
  );
};

export default App;
