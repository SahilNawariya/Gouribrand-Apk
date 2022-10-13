import React from "react";
import { View,Text,TouchableOpacity,ScrollView, SafeAreaView } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {makeRequest,BASE_URL} from '../../ApiData/Api';
import {KEYS,storeData} from '../../ApiData/UserPreference'
import get from 'lodash/get';
export default class Otp2 extends React.Component{
    constructor(props){
        super(props);
           const mobile=get(props.route,'params.mobile')
           console.log("mobile===",mobile)
           this.state={
            otp:'',
           mobile:mobile,
           }
            
           
    }

    componentDidMount=async()=>{
       
    };
    handleotp=otp=>{
        this.setState({otp:otp});
    }
    handleverify=async()=>{
        const {mobile,otp}=this.state;
        const params={
            mobile,
            otp,
        };
        const res=await makeRequest('api/mobile/loginOtpVerify',params);

        const {success,message}=res;
        if (success) {
            const {userInfo} = res;
            storeData(KEYS.USER_INFO, userInfo);
      
            if (success) {
              this.props.navigation.navigate('Homescreen');
            }
          } else {
          }
    };
    handleResendOtp=async()=>{
        const params={mabile};
         await  this.props.resendOtp(params).then(()=>{
            const {success}=this.props.isOtpResendSuccess;
            if(success){
                const {message}=this.props.isOtpResendSuccess;
            }
        }); 
    };
   
    render(){
        return(
        <SafeAreaView>
            <OTPInputView
            
            inputStyles={{borderWidth:.2,height:60,width:50,textAlign:'center',margin:20,marginTop:150,borderRadius:5,color:'black',fontSize:20}}
            pinCount={4}
            autoFocusOnLoad
            placeholderCharacter="0"
            placeholderTextColor="green"
            keyboardType="number-pad"
            onCodeFilled={this.handleotp}
            codeInputFieldStyle={{color: 'black'}}
            style={{
              width: '80%',
              height: 100,
              marginTop: 120,marginLeft:35,
              paddingTop: 30,
              color: 'black',
            }}
          />
          <TouchableOpacity onPress={this.handleverify}>
          <View style={{height:60,justifyContent:'center',backgroundColor:'green',marginLeft:50,marginRight:50,borderRadius:10,marginTop:30}}>
                <Text style={{fontSize:30,textAlign:'center'}}>ओटीपी डालें</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleResendOtp}>
          <View style={{height:60,justifyContent:'center',backgroundColor:'green',marginLeft:50,marginRight:50,borderRadius:10,marginTop:30}}>
                <Text style={{fontSize:30,textAlign:'center'}}>ओटीपी पुनः भेजें</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
        )
    }
}
