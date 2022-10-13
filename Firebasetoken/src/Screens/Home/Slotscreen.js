import React from "react";
import { View,Text,FlatList,SafeAreaView,Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { makeRequest } from "../../ApiData/Api";
import get from 'loadsh/get';
export default class Slotscreen extends React.Component{
    constructor(props){
        super(props);
       // const Address = get(props.route, 'params.Address');
        const amount = get(props.route, 'params.amount');
        
        console.log('====================================');
        console.log("52466",amount);
        console.log('====================================');
        this.state={
           add:'',
            amount,
           slots:'',
           slotDetails1:[],
           slotDetails:'',
           isSlotdetals:false,
           timeslots:'',
        }
       
    }

    componentDidMount=async()=>{
        const Address = get(this.props.route, 'params.Address');
        this.setState({add:Address})
        this.slot();
    }

    slot=async()=>{
 
        try{
            let params;
            params={params:''};
            const res=await makeRequest('api/Mobile/slots',params,true)
            const {success}=res;
            if(success){
            const {slots}=res;
            this.setState({
                slots,
            })
        }
        }catch(error){
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    handleTimeSlots(item){
        this.setState({slotDetails1:item,isSlotdetals:true})

    }
    renderItem=({item,index})=>(
        <TouchableOpacity onPress={()=>this.handleTimeSlots(item)}>
        <View style={{backgroundColor:'green',margin:7,marginRight:-0.5,flexDirection:'column'}}>
            <View style={{margin:5}}>
                <Text style={{color:'black',textAlign:'center'}}>{item.day}</Text>
                <Text style={{color:'black',textAlign:'center'}}>{item.date}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
    payment=()=>{
        
     const {add,amount,timeslots}=this.state;
        const params={add, timeslots,amount};
        this.props.navigation.push('PaymentScreen',{params})
    }
    timeslots=(slots)=>{
        console.log('====================================');
        console.log(slots.slotdetail_id);
        console.log('====================================');
        this.setState({timeslots:slots.slotdetail_id})
    }


    viewAddress=()=>{
       
        const Address = get(this.props.route, 'params.Address');
        console.log('====================================');
        console.log("addd===",Address);
        console.log('====================================');
        this.props.navigation.push('ViewAddress')
        this.setState({add:Address})
    }
    render(){
                const {add,amount}=this.state;
                console.log('====================================');
                console.log(amount);
                console.log('====================================');

        return(

           
            <SafeAreaView style={{flex:1,backgroundColor:'#e6f2ee'}}>
                <View style={{backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <Image style={{width:30,height:30,margin:10}} source={require('../../assets/arrow.png')}/>
            </TouchableOpacity>
          </View>
            
                <View style={{backgroundColor:'white',margin:5}}>
                    <TouchableOpacity onPress={()=>this.viewAddress()} style={{flexDirection:'row'}}>
                      {add!==undefined?<Text style={{padding:15}}>{add.address}</Text>:<></> }
                        <View style={{width:80,backgroundColor:'white',borderRadius:10,borderWidth:2,padding:5,margin:10,borderColor:'gray'}}>
                              <Text style={{color:'black',textAlign:'center'}}>change</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{margin:5,color:'black'}}>इस पते के लिए डिलीवरी का समय चुनें</Text>
                <View>
                <FlatList
                data={this.state.slots}
                renderItem={this.renderItem}
                keyExtractor={index=>index.id}
                horizontal
                />
                </View>
               {this.state.isSlotdetals&&<View style={{flex:1}}>
                    {this.state.slotDetails1.slotDetails.map((slot)=>(
                        <TouchableOpacity onPress={()=>this.timeslots(slot)}>
                        <View style={{backgroundColor:'gray',margin:5}}>
                        <Text style={{color:'white',margin:7}}>{slot.slotdetail}</Text>
                        </View>
                        </TouchableOpacity>
                    ))}
                    </View>}
                <TouchableOpacity onPress={()=>this.payment()} style={{backgroundColor:"green",padding:10,margin:10,justifyContent:'flex-end'}}>
                    <Text style={{color:'white',textAlign:"center"}}>Payment Methods</Text>

                </TouchableOpacity>
            </SafeAreaView>
           
        )
    }
}