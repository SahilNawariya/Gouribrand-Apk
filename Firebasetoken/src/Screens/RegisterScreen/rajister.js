import React,{useState} from "react";
import {Text,TextInput,TouchableOpacity, View,ScrollView,Image } from 'react-native';
import { makeRequest,BASE_URL} from "../../ApiData/Api"; 

export default function register(){
    const[name,setname]=useState("");
    const[address,setaddress]=useState("");
    const[villageName,setvillageName]=useState("");
    const[mobile,setmobile]=useState("");
    const[animalCount,setanimalCount]=useState("");
    const[milkQuantity,setmilkQuantity]=useState("");
    const[email,setemail]=useState("");
    const[referralCode,setreferralCode]=useState("");

    function register(){

        /* console.log(name)
        console.log(address)
        console.log(villageName)
        console.log(mobile)
        console.log(animalCount)
        console.log(setmilkQuantity)        
        console.log(email)        
        console.log(referralCode)
        alert("register") */

        const params={
            name:name,
            address:address,
            villageName:villageName,
            mobile:mobile,
            animalCount:animalCount,
            milkQuantity:milkQuantity,
            email:email,
            referralCode:referralCode,
        }
      
        const res =makeRequest('api/mobile/registration',params);
        console.log("register =",res)
    }


    return(
    <View style={{backgroundColor:'#e6f2ee',flex:1,alignItems:'center'}}>
        <ScrollView>
            <Image source={require('../../assets/appIcon.png')}
            style={{height:100,width:'30%',margin:10,marginTop:30,marginLeft:'35%',alignContent:'center'}}
            />
            <Text style={{fontSize:20,color:'black',textAlign:'center'}}>रजिस्ट्रेशन फॉर्म</Text>
        <TextInput style={{width:320,height:40,borderRadius:10,backgroundColor:'white',marginTop:10,marginLeft:12,marginRight:10}}
            placeholder='नाम'
            value={name}
            onChangeText={(name)=>setname(name)}
            />
        <TextInput style={{width:320,height:40,borderRadius:10,backgroundColor:'white',marginTop:10,marginLeft:12,marginRight:10}}
            placeholder='जगह'
            value={address}
            onChangeText={(address)=>setaddress(address)}
            />
        <TextInput style={{width:320,height:40,borderRadius:10,backgroundColor:'white',marginTop:10,marginLeft:12,marginRight:10}}
            placeholder='ग्राम का नाम'
            value={villageName}
            onChangeText={(villageName)=>setvillageName(villageName)}
            />
        <TextInput style={{width:320,height:40,borderRadius:10,backgroundColor:'white',marginTop:10,marginLeft:12,marginRight:10}}
            placeholder='मोबाइल नंबर'
            value={mobile}  keyboardType="numeric"
            onChangeText={(mobile)=>setmobile(mobile)}
            />
        <TextInput style={{width:320,height:40,borderRadius:10,backgroundColor:'white',marginTop:10,marginLeft:12,marginRight:10}}
            placeholder='पशुओं की संख्या'
            value={animalCount}
            onChangeText={(animalCount)=>setanimalCount(animalCount)}
            />
        <TextInput style={{width:320,height:40,borderRadius:10,backgroundColor:'white',marginTop:10,marginLeft:12,marginRight:10}}
            placeholder='दूध की दैनिक मात्रा'
            value={milkQuantity}
            onChangeText={(milkQuantity)=>setmilkQuantity(milkQuantity)}
            />
            <TextInput  style={{width:320,height:40,borderRadius:10,backgroundColor:'white',marginTop:10,marginLeft:12,marginRight:10}}
            placeholder='Email' value={email} onChangeText={(email)=>setemail(email)} keyboardType="email-address"/>
        <TextInput style={{width:320,height:40,borderRadius:10,backgroundColor:'white',marginTop:10,marginLeft:12,marginRight:10}}
            placeholder='रेफरल कोड यदि आपके पास है तो'
            value={referralCode}
            onChangeText={(referralCode)=>setreferralCode(referralCode)}
            />
            
             <TouchableOpacity onPress={register}>
            <View style={{height:40,justifyContent:'center',backgroundColor:'lightgreen',margin:10,width:100,borderRadius:10,marginLeft:125}}>
                <Text style={{fontSize:20,textAlign:'center'}}>रजिस्टर करे</Text>
            </View>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}