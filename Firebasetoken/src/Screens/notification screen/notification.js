import React from "react";
import { View,Text,SafeAreaView,Image,FlatList,TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { makeRequest } from "../../ApiData/Api";
export default class Notification extends React.Component{
    constructor(){
        super();
        this.state={
            notifications:'',
        }
    }
     
    componentDidMount(){
        this.notification();
    }

    notification = async()=>{
        try{
        let params;
        params=null;
        const res =await makeRequest('api/Mobile/notifications',params,true)
        const {notifications}=res;
           this.setState({notifications})
    }catch(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
    }

    renderItem=({item,index})=>(
        <View style={{backgroundColor:'white',flexDirection:'column',margin:5}}>
          
                <Text style={{color:'green',margin:5}}>{item.title}</Text>
                <Text style={{color:'black',margin:5}}>{item.message}</Text>
                <View style={{width:'95%',marginLeft:9,height:1,backgroundColor:"#e6f2ee"}}></View>
                <Text style={{color:'orange',margin:5}}>{item.date}</Text>
        </View>
        
    )

    render(){
        return(
            
            <SafeAreaView>
            <View style={{backgroundColor:'white'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                  <Image style={{width:30,height:30,margin:10}} source={require('../../assets/arrow.png')}/>
                </TouchableOpacity>
              </View>
            <ScrollView>
            <View style={{backgroundColor:'#e6f2ee',flex:1}}>
                <FlatList
               data={this.state.notifications}
                renderItem={this.renderItem}
                keyExtractor={index=>index.id}/>
                <View style={{width:'100%',height:50}}></View>
            </View>
            </ScrollView>
            </SafeAreaView>
        )
    }
}