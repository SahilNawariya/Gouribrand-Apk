import React from "react";
import { View,Text,Image ,TouchableOpacity, SafeAreaView} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { makeRequest } from "../../ApiData/Api";
export default class MyOrder extends React.Component{
    constructor(props){
        super(props);{
            this.state={
                Orders:'',
                product:'',
            }
        }
    }
    componentDidMount= async()=>{
        let params=null;
        const res=await makeRequest('api/Mobile/orderDetail',params,true)
        const {Orders}=res;
        const {product}=Orders;
        this.setState({
            Orders,
            product,
        })
    }
    renderItem=({item,index})=>(
        <View>
            <Text style={{color:'black'}}>{item.product}</Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
        </View>
    )
    render(){
        const {Orders,product}=this.state;
        console.log('====================================');
        console.log(product);
        console.log('====================================');
        return(
            <SafeAreaView>
                <FlatList 
                data={Orders}
                renderItem={this.renderItem}
                keyExtractor={index=>index.id}
                />
            </SafeAreaView>
        )
    }
}

   