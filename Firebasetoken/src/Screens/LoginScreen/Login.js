import React,{useState} from "react";
import {View,Text,TouchableOpacity,TextInput, SafeAreaView} from "react-native";
import { makeRequest,BASE_URL } from "../../ApiData/Api";
import {clearData} from '../../ApiData/UserPreference'
export default function Login({navigation}){
    const[mobile,setmobile]=useState("");

Loginuser=async()=>{

    try{
   
        const params={
            mobile:mobile
        }
        const res =await makeRequest(BASE_URL+'api/mobile/login',params);
        console.log("phone =",res)
        
            const {success} =res;
    
            if(success){
                
                navigation.navigate('otp2',{mobile})
            }
            else{
                alert("Please Rejister")
            }
       
    }catch{
        console.log("error")
        return null;
    }
}
        return(
            
        <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
            <Text style={{color:'black',fontSize:25,margin:10,marginTop:150}}>हम इस नंबर पर एक पुष्टिकरण कोड के साथ एक एसएमएस भेजेंगे</Text>
            <View style={{backgroundColor:'green'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'white',fontSize:25,margin:20}}>+91</Text>
           
                    <TextInput style={{width:250,margin:5,fontSize:25,borderBottomWidth:1,color:'white'}} placeholder="फ़ोन नंबर डालें" value={mobile}  keyboardType="numeric" onChangeText={(mobile)=>setmobile(mobile)}/>
                </View>
                <TouchableOpacity onPress={Loginuser}>
                <View style={{height:60,justifyContent:'center',backgroundColor:'#fff',margin:10,marginTop:40,borderRadius:20}}>
                    <Text style={{fontSize:25,color:'black',textAlign:'center'}}>लॉगिन करें</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('rajister')}>
                    <View style={{marginTop:30}}>
                        <Text style={{fontSize:25,color:'white',textAlign:'center'}}>रजिस्टर करें</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        ) 
    }
