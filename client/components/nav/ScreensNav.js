import React,{useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup from '../../screens/Signup';
import Signin from '../../screens/Signin';
import Home from '../../screens/Home';
import {AuthContext} from '../../context/auth';
import HeaderTabs from '../../components/nav/HeaderTabs';
import Account from '../../screens/Account';
import Search from '../../screens/Search';
import Upload from '../../screens/Upload';

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
    const [state,setState] = useContext(AuthContext);

    const authenticated = state && state.token !== "" && state.user !== null ;
  return(
    <Stack.Navigator 
    initialRouteName="Home"
    // screenOptions={{headerShown: false}}
    >
        {authenticated ? (
        <>
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
            title:"Data Management",
            headerRight: () => <HeaderTabs/>
        }}/>
        <Stack.Screen 
        name="Search" 
        component={Search} 
        />
         <Stack.Screen 
        name="Upload" 
        component={Upload} 
        />
         <Stack.Screen 
        name="Account" 
        component={Account} 
        />
        </>
        ):(
        <>
        <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
        </>
       )}
    </Stack.Navigator>

)}

