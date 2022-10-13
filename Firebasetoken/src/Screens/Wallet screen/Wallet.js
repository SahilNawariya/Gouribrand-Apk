import React from "react";
import { View,Text,SafeAreaView,Image,FlatList,TouchableOpacity } from "react-native";
import { makeRequest } from "../../ApiData/Api";
export default class Wallet extends React.Component{
    constructor(){
        super();
        this.state={
            wallet:'',
        }
    }
     
    componentDidMount(){
        this.handlewallet();
    }

    handlewallet = async()=>{
        try{
        let params=null;
        const res =await makeRequest('api/Mobile/walletIncome',params,true)
        console.log('====================================');
        console.log("res==",res);
        console.log('====================================');
        const {wallet}=res;
        this.setState({wallet})
    }catch(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
    }

    render(){
        return(
        <SafeAreaView>
            <View style={{backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <Image style={{width:30,height:30,margin:10}} source={require('../../assets/arrow.png')}/>
            </TouchableOpacity>
          </View>
            <View style={{width:'95%',height:'50%',backgroundColor:'green',margin:10,borderRadius:30}}>
                <Image style={{height:150,width:150,marginLeft:95,margin:10}} source={require('../../assets/ic_wallet_white.png')}/>
                <Text style={{color:"black",fontSize:40,fontWeight:'700',textAlign:'center',margin:5,marginTop:-10}}>{this.state.wallet}</Text>
            </View>
            </SafeAreaView>
        )
    }
}