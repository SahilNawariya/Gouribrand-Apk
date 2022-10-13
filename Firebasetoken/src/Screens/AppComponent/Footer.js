import React from "react";
import { View,Text,Image ,TouchableOpacity, SafeAreaView} from "react-native";
export default class header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <SafeAreaView style={{backgroundColor:'green',width:'100%',height:50,flexDirection:'row',position:'absolute',left:0,right:0,bottom:0}}>
            <TouchableOpacity onPress={()=>this.props.nav.navigate('Homescreen')}>
             <Image source={require('../../assets/ic_home_white.png')} style={{width:30,height:30,marginLeft:50,marginTop:10}}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>this.props.nav.navigate("Wallet")}>
             <Image source={require('../../assets/ic_wallet_white.png')} style={{width:30,height:30,marginLeft:80,marginTop:10}}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => this.props.nav.navigate('MyOrder')}>
             <Image source={require('../../assets/ic_order_white.png')} style={{width:30,height:30,marginLeft:90,marginTop:10}}/>
             </TouchableOpacity>
       </SafeAreaView> 
        )
    }
}