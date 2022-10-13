import React from "react";
import { View,Text,Image,FlatList ,TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import { makeRequest } from "../../ApiData/Api";
export default class Cart extends React.Component{
    constructor(){
        super();
        this.state={
            productInfo: '',
      totalQuantity: '',
      totalAmount: '',
      message: '',
      subtotal: '',
      discount: '',
      deliveryCharges: '',
      walletAmount: '',
      coupons: [],
      count:1,
      qty:''
        }
    }
    componentDidMount=async()=>{
      this.cart(); 
}
cart=async()=>{
    try{
        let params;
    params = {Coupon: ''};
    const res =await makeRequest('api/Mobile/viewCart',params,true);
    const {message,success}=res;
    if(success){
        const {cartDetail,walletAmount}=res;
       const {
        productInfo,
       totalQuantity,
       totalAmount,
       subtotal,
       discount,
       deliveryCharges,
       }=cartDetail;
console.log('====================================');
console.log("cartDetail",cartDetail);
console.log('====================================');
       const {quantity}=productInfo
       this.setState({
        productInfo,
          totalQuantity,
          totalAmount,
          subtotal,
          discount,
          deliveryCharges,
          walletAmount, qty:quantity
       })
       
    }else{
        this.setState({
            productInfo: '',
            totalQuantity: '',
            totalAmount: '',
            message,
            subtotal: '',
            discount: '',
            deliveryCharges: '',
    })
    }
    }catch(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

total=()=>{
 this.setState({total:this.state.totalAmount+this.state.addOnprice})
}

handlplus=()=>{
  this.setState({count:this.state.count+1})
  }
handlminus=()=>{
      if(this.state.count>1)
      this.setState({count:this.state.count-1})
  }
renderItem=({item})=>
    (
        <View style={{flexDirection:'row',backgroundColor:'white',width:'95%',margin:10,borderRadius:10}}>
        <Image
                source={{
                  uri: item.featuredImage,
                }}
                style={{
                  height: 100,
                  width: 90,
                  borderRadius: 10,margin:10
                }}/>
                <View style={{flexDirection:'column',margin:10}}>
        <Text style={{margin:5}}>{item.name}</Text>
        <Text style={{margin:5}}>{item.addOnprice*this.state.count}</Text>
        
        <Text style={{margin:5}}>{item.addOnWeight}KG</Text>
        </View>
        <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'flex-end',marginRight:20}}>
           <TouchableOpacity onPress={this.handlminus} >
              <View style={{borderWidth:.5,width:17,height:17}}>
                <Text style={{color:'black',textAlign:'center'}}>-</Text>
              </View>
              </TouchableOpacity>
              <Text style={{color:'black',fontSize:12,margin:10,}}>{item.quantity}</Text>
               <TouchableOpacity onPress={this.handlplus} >
                <View style={{borderWidth:.5,width:17,height:17}}>
                  <Text style={{color:'black',textAlign:'center'}}>+</Text>
                </View>
              </TouchableOpacity>

        </View> 

      </View>
    )
    
render(){
  console.log('====================================');
  console.log("this=====",this.state.productInfo);
  console.log('====================================');
        return(
         <SafeAreaView style={{flex:1}}>
          
          <View style={{backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <Image style={{width:30,height:30,margin:10}} source={require('../../assets/arrow.png')}/>
            </TouchableOpacity>
          </View>
           <ScrollView>
               <FlatList
                data={this.state.productInfo}
                renderItem={this.renderItem}
               keyExtractor={index=>index.id}
                />  
                
               
               <View style={{flex:1}}>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'700'}}>{this.state.discount}</Text> 
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'700'}}>{this.state.subtotal}</Text> 
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'700'}}>{this.state.totalAmount}</Text> 
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'700'}}>{this.state.deliveryCharges}</Text> 
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'700'}}>{this.state.totalQuantity}</Text>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'700'}}>{this.state.walletAmount}</Text>  
                </View> 
                </ScrollView>
                <TouchableOpacity onPress={() =>this.props.navigation.navigate('Slotscreen',{amount:this.state.totalAmount})}>
                  <View style={{flexDirection:'row',backgroundColor:'green',height:60,margin:10,borderRadius:50}}>
                    <Text style={{margin:10,color:"white",padding:10}}>Order Now</Text>
                    <Text style={{margin:10,height:30,backgroundColor:'white',padding:5,borderRadius:10,marginLeft:170,color:"black"}}>{this.state.totalAmount}</Text>
                  </View>
                </TouchableOpacity>
         </SafeAreaView>   
        )
    }
}