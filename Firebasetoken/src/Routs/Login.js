import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "../Screens/Home/Homescreen";
import productScreen from "../Screens/ProductScreen/productScreen";
import Login from "../Screens/LoginScreen/Login";
import rajister from "../Screens/RegisterScreen/rajister";
import Otp2 from '../Screens/OTPScreen/Otp2'
import ReduxScreen from "../Screens/ReduxScreen/ReduxScreen";
import Cart from '../Screens/CartScreen/Cart';
import Slotscreen from '../Screens/Home/Slotscreen';
import Footer from '../Screens/AppComponent/Footer';
import Header from '../Screens/AppComponent/Header';
import ViewAddress from "../Screens/Address Screen/ViewAddress";
import Notification from "../Screens/notification screen/notification";
import Wallet from "../Screens/Wallet screen/Wallet";
import SetAddress from "../Screens/SetAddress screen/SetAddress";
import PaymentScreen from "../Payment screen/PaymentScreen";
import MyOrder from "../Screens/MyOrderScreen/MyOrder";


const StackNav=createStackNavigator();

export default function LogIn(){
    return(
        <StackNav.Navigator
        screenOptions={{headerShown:false}}  
        >
   {/*  <StackNav.Screen name="redux" component={ReduxScreen}/>  */}
            <StackNav.Screen name="Homescreen" component={Homescreen}/>
            <StackNav.Screen name="productScreen" component={productScreen}/>
            <StackNav.Screen name="Cart" component={Cart}/>
            <StackNav.Screen name="Login" component={Login}/>
           <StackNav.Screen name="rajister" component={rajister}/>
           <StackNav.Screen name="otp2" component={Otp2}/>
           <StackNav.Screen name="Slotscreen" component={Slotscreen}/>
           
           <StackNav.Screen name="Footer" component={Footer}/>
           <StackNav.Screen name="Header" component={Header}/>
           <StackNav.Screen name="ViewAddress" component={ViewAddress}/>
           <StackNav.Screen name="Notification" component={Notification}/>
           <StackNav.Screen name="Wallet" component={Wallet}/>
           <StackNav.Screen name="SetAddress" component={SetAddress}/>
           <StackNav.Screen name="MyOrder" component={MyOrder}/>
           
           <StackNav.Screen name="PaymentScreen" component={PaymentScreen}/>

        </StackNav.Navigator>
    )
}