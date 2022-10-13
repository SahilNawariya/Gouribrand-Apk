import React from "react";
import { View,Text,Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import WebView from 'react-native-webview'
import { makeRequest } from "../../ApiData/Api";
export default class Mac extends React.Component{

    constructor(){
        super()
        this.state={
            url:''
        }
    }
    componentDidMount(){
        this.notification();
    }

    notification = async()=>{
        try{
        let params;
        params=null;
        const res =await makeRequest('api/Mobile/privacyPolicy',params,true)
        console.log('====================================');
        console.log("====",res);

        console.log('====================================');
    

this.setState({url:res.description})

    }catch(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
    }


    render(){
        return(
<>
            <View style={{backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <Image style={{width:30,height:30,margin:10}} source={require('../../assets/arrow.png')}/>
            </TouchableOpacity>
          </View>
            <WebView
            source={{
                html: this.state.url
            }}
          />
  </>
            )
    }
}