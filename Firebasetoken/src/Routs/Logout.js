import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "../Screens/Home/Homescreen";
import productScreen from "../Screens/ProductScreen/productScreen";
import SelectSlotScreen from '../Screens/Home/Slotscreen';
import CartScreen from '../Screens/CartScreen/Cart';
const StackNav = createStackNavigator();
export default function Logout() {
    return (
      <StackNav.Navigator>
        <StackNav.Screen name="home" component={Homescreen} />
        <StackNav.Screen name="productscreen" component={productScreen} />
        <StackNav.Screen name="Cart" component={CartScreen} />
        <StackNav.Screen name="Select Slot" component={SelectSlotScreen} />
      </StackNav.Navigator>
    );
  }