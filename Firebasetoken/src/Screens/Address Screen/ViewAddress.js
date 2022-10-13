import React from "react";
import { View,Text,FlatList,SafeAreaView,Image,TouchableOpacity,Alert} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { makeRequest } from "../../ApiData/Api";
export default class ViewAddress extends React.Component{
    constructor(props){
        super(props);
        this.state={
            useraddress:'',
        }
    }

    componentDidMount(){
        this.handleUserAddress();
    }

    handleUserAddress = async () => {
        try {
          const params = null;
          const res = await makeRequest('api/mobile/viewAddress', params, true);
          const {success, message} = res;
          if(success){
            const {useraddress} =res;
            this.setState({
                useraddress,
            })
          } else{
            this.setState({
                useraddress:'',
            })
          }
        } catch (error) { 
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
      };
      handlDeleteAddress = async (id) => {
             const params={id} ;
          const res = await makeRequest('api/mobile/deleteAddress', params, true);
          const {success, message} = res;
          if (success) {
            this.handleUserAddress();
            Alert.alert('', message);
          } else {
            Alert.alert('', message);
        }
      };

      Address= (item)=>{
        this.props.navigation.navigate('Slotscreen',{Address:item});
      }

      renderItem=({item,index})=>(
        <TouchableOpacity onPress={()=>this.Address(item)} >
        <View style={{flex:1,backgroundColor:'white',flexDirection:'row',margin:5}}>
            <View style={{margin:5}}>
                <Text style={{color:'black',margin:5}}>{item.address_type}</Text>
                <Text style={{color:'black',margin:5}}>{item.name}</Text>
                <Text style={{color:'black',margin:5}}>{item.address}</Text>
            </View>
            
            <View style={{ justifyContent: 'center',alignItems:'flex-end',marginLeft:100}}>
            <TouchableOpacity onPress={()=>this.handlDeleteAddress(item.id)}>
            <Image style={{width:25,height:25,}} source={require('../../assets/ic_delete.png')}/>
            </TouchableOpacity>
            </View>
           
        </View>
        </TouchableOpacity>
    )

        render(){
            return(
                <SafeAreaView>
                <View style={{backgroundColor:'white'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                  <Image style={{width:30,height:30,margin:10}} source={require('../../assets/arrow.png')}/>
                </TouchableOpacity>
              </View>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('SetAddress')}>
        <View style={{flexDirection:'row',margin:1}}>
                <Text style={{color:'black',margin:5,fontSize:20}}>+</Text>
                <Text style={{color:'black',margin:5,fontSize:20}}>Change Address</Text>
        </View>
        </TouchableOpacity>
        <ScrollView>
        <View>
               <FlatList
               data={this.state.useraddress}
                renderItem={this.renderItem}
                keyExtractor={index=>index.id}
                /* horizontal *//>
        </View>
        
                <View style={{width:'100%',height:90,}}></View></ScrollView>
                </SafeAreaView>
            )
        }
    }