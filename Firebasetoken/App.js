import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Route from './src/Routs/Route';
import ReduxScreen from './src/Screens/ReduxScreen/ReduxScreen';
import Mac from './src/Screens/Mac/Mac';
import Set1 from './src/Screens/SetAddress screen/Set1';
import LogIn from './src/Routs/Login';
const Drawer=createDrawerNavigator();

export default function app(){
    return(

        <Provider store={store}>
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='route' component={LogIn}/>
                <Drawer.Screen name='Mac' component={Mac}/>
                <Drawer.Screen name='google' component={Set1}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </Provider>
    )
}