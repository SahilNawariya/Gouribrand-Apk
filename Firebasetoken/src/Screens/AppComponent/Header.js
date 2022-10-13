import React from "react";
import { View,Text,Image ,TouchableOpacity, SafeAreaView} from "react-native";
import { clearData } from "../../ApiData/UserPreference";
export default class header extends React.Component{
    constructor(props){
        super(props);
    }
    logout=()=>{
        clearData();
        this.props.nav.navigate('home');
    }
    render(){
        return(
            <SafeAreaView style={{backgroundColor:'#fff',width:'100%',height:50,marginBottom:5,flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>this.props.nav.openDrawer()}>
            <Image source={require('../../assets/ic_menu.png')}
            style={{width:30,height:30,marginLeft:20,marginTop:10}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={this.logout} >
            <Image source={require('../../assets/ic_location.png')}
            style={{width:20,height:20,marginLeft:20,marginTop:15}}/>
            <Text style={{fontSize:15,color:'black',margin:5,marginTop:15}}>Rajastan 302003,India</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.nav.navigate('Notification')}>
            <Image source={require('../../assets/ic_notification.png')} style={{width:30,height:30,marginLeft:30,marginTop:10}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.nav.navigate('Cart')}>
            <Image source={require('../../assets/ic_cart.png')} style={{width:30,height:30,marginLeft:10,marginTop:10}}/>
            </TouchableOpacity>
          </SafeAreaView> 
        )
    }
}