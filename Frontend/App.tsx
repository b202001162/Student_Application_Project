import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Screens
import Dashboard from './Screens/Dashboard';
import LoginPage from './Screens/LoginPage';
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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Component from './components/Component';

// For parameter types in stack navigation
export type RootStackParamList = {
  Dashboard: undefined;
  LoginPage: undefined;
  CourseRegistration: undefined;
};

// Create stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false,}}/>
        <Stack.Screen name="LoginPage" component={LoginPage} options={{headerShown: false,}}/>
        <Stack.Screen name="CourseRegistration" component={CourseRegistration} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <FileInput/>
  );
};

export default App;
