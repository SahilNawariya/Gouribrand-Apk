import React from "react";
import { View,Text,TouchableOpacity,ScrollView,Image, Alert } from "react-native";
import {SliderBox} from 'react-native-image-slider-box';
import {makeRequest,BASE_URL} from '../../ApiData/Api';
import {KEYS,getData} from '../../ApiData/UserPreference'

export default class productScreen extends React.Component{
  constructor(props){
    super(props);
    const Data=this.props.route.params;
    this.state={
      nav:this.props.navigation,
      ...Data,
      price:'',
      count:1,
      increPrice:'',
      pId:'',
      slIndex:0
    };
  }

 

  handlplus=()=>{
        this.setState({count:this.state.count+1})
        }
 handlminus=()=>{
            if(this.state.count>1)
            this.setState({count:this.state.count-1})
        }
        handlUnit=(d,index)=>{
console.log('====================================');
console.log("price",d);
console.log("index",index);
console.log('====================================');
this.setState({
  price:d.price,
  increPrice:d.price,
  pId:d.id,
});
    }
        AddtoCart=async()=>{
          const userInfo =await getData(KEYS.USER_INFO);
          if(userInfo !== null){
            const params={
              productId:this.state.id,
              quantity:this.state.count,
              addonId:this.state.pId,
            };
            const res =await makeRequest('api/mobile/addtocart',params,true);
             const {success,message}=res;
            if(success){
              alert(message);
              this.props.navigation.navigate('Cart');
            } else {
              alert(message);
            }
            }else{
              Alert.alert(
                '',
                'आप ऐप में लॉगइन नहीं हैं, कृपया लॉगइन करें',
                [
                  {text: 'NO', style: 'cancel'},
                  {text: 'LOGIN', onPress: this.handleLogin},
                ],
                {
                  cancelable: false,
                },
              );
            }
          };
          handleLogin = async () => {
            this.props.navigation.navigate('Login');
          };

  render(){
   
      return(
        <View style={{flex:1,backgroundColor:"#e6f2ee"}}>
          
          <View style={{backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <Image style={{width:30,height:30,margin:10}} source={require('../../assets/arrow.png')}/>
            </TouchableOpacity>
          </View>
<ScrollView>
            <View style={{flex:1,backgroundColor:'white',marginTop:5,borderBottomRightRadius:20,borderBottomLeftRadius:20}}>
              <SliderBox
                images={this.state.productImage}  
                autoplay={true}        
              />
                <Text style={{fontSize:20,color:'black',textAlign:'center',fontWeight: '700',margin:5}}>{this.state.name}</Text>
                <Text style={{fontSize:20,color:'black',textAlign:'center',fontWeight: '700'}}>{this.state.brandName}</Text>
                 
                
                                <Text style={{textAlign:'center',fontSize:15,fontWeight: '700',color:'black',margin:5}}>
                                  {this.state.price*this.state.count}
                                </Text>
                <View style={{flexDirection:'row',borderRadius:10,height:50}}>
                          <Text style={{flex:1,color:'black',fontSize:15,margin:10,marginLeft:15}}>मात्रा</Text>
                          <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'flex-end',marginRight:20}}>
                          <TouchableOpacity onPress={this.handlminus} >
                              <View style={{borderWidth:.5,width:17,height:17}}>
                                  <Text style={{color:'black',textAlign:'center'}}>-</Text>
                                  </View>
                              </TouchableOpacity>
                              
                              <Text style={{color:'black',fontSize:12,margin:10,}}>{this.state.count}</Text>
                              
                              <TouchableOpacity onPress={this.handlplus} >
                              <View style={{borderWidth:.5,width:17,height:17}}>
                                  <Text style={{color:'black',textAlign:'center'}}>+</Text>
                                  </View>

                              </TouchableOpacity>
                          </View>
                      </View>
              </View>
              <View style={{flexDirection:'column',backgroundColor:"white",margin:5,borderRadius:10,marginTop:10}}>
              <Text style={{fontSize:15,color:'black',margin:5,marginLeft:15}}>इकाई</Text>
              <View style={{flexDirection:'row',marginLeft:10}}>
                         
            { 
                this.state.productAddons.map((d,index)=>{
                    return(
                      <TouchableOpacity onPress={()=>this.handlUnit(d,index)} >
                      
                                <Text style={{color:'white',fontSize:12,padding:5,margin:5,backgroundColor:'green'}}>{d.name}</Text>
                                </TouchableOpacity>
                      
                        )
                })
               
            }
            </View>
            </View>
              <View style={{flexDirection:'column',backgroundColor:"white",margin:5,borderRadius:10,height:100}}>
            <ScrollView>
                    <Text style={{color:'black',fontSize:20,margin:5}}>उत्पादक के बारे में:- </Text>
                
                    <Text style={{color:'black',fontSize:18,margin:5,marginTop:-5}}> {this.state.description}</Text>
                </ScrollView>
            </View>
            <TouchableOpacity onPress={this.AddtoCart}>
            <View  style={{flexDirection:'row',backgroundColor:"green",margin:5,marginTop:10,borderRadius:50}}>
            
                <Text style={{color:'white',fontSize:20,marginLeft:20,padding:7}}>कार्ट में जोड़ें</Text>
            <Image source={require('../../assets/ic_cart_white.png')} style={{width:30,height:30,margin:6,marginLeft:185,}}/> 
            
            </View>
            </TouchableOpacity>
            </ScrollView>
          </View>
      )
  }
}