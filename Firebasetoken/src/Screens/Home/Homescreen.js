import React from "react";
import { View,Text,Image,TouchableOpacity,FlatList,SafeAreaView} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ImageSlider } from "react-native-image-slider-banner";
import { SliderBox } from "react-native-image-slider-box";
import {makeRequest} from '../../ApiData/Api';
import Header from "../AppComponent/Header";
import Footer from "../AppComponent/Footer"
export default class HomeScreen extends React.Component{
  constructor(){
    super();
    this.state={
        product:'',
        sliders:'',
        images:[],
    }
  };
  componentDidMount=async()=>{
    this.Home();
  };
  Home=async()=>{
    try{
         const res=await makeRequest('api/mobile/home');
         const {product,sliders,details,success}=res;
         if(success){
          this.setState({
            product,
            sliders,
            images:sliders
          });
         }
         else{
          this.setState({
            product:'',
            sliders:''
          });
         }
      }catch(error){
        console.log(error)
      }

  }

  componentWillUnmount=()=>{};
  renderitem=({item})=>{
    return(
      <TouchableOpacity onPress={() => this.props.navigation.navigate('productScreen',item)}>
      <View style={{backgroundColor:'white',width:110,margin:5,height:160,borderRadius:10}}>
        <Image
                source={{
                  uri: item.featuredImage,
                }}
                style={{
                  height: 100,
                  width: 90,
                  borderRadius: 10,margin:10
                }}/>
        <Text style={{textAlign:'center',marginTop:-5,margin:5}}>{item.name}</Text>
      </View>
      </TouchableOpacity>
    )
  }
  
  render(){
    const {product,sliders,images}=this.state;
    let image=[];
    let nimage=[];
    //const {images}=this.state.sliders;

    if(images!== undefined){
      images.forEach(img=>{
        image.push(Object.values(img));
      });
      image.forEach(ig=>{
        ig.map(val=>{
          nimage.push(val);
        });
      });
    }


    return(
      <SafeAreaView style={{backgroundColor:'#e6f2ee',flex:1}}>
        <Header nav={this.props.navigation}/>
          {/* <View style={{backgroundColor:'#fff',width:'100%',height:50,marginBottom:5,flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
          <Image source={require('../../assets/ic_menu.png')}
          style={{width:30,height:30,marginLeft:20,marginTop:10}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row'}}>
          <Image source={require('../../assets/ic_location.png')}
          style={{width:20,height:20,marginLeft:20,marginTop:15}}/>
          <Text style={{fontSize:15,color:'black',margin:5,marginTop:15}}>Rajastan 302003,India</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image source={require('../../assets/ic_notification.png')} style={{width:30,height:30,marginLeft:70,marginTop:10}}/>
          </TouchableOpacity>
        </View>  */}
          <View style ={{flex:1}}>
       
        
                <SliderBox 
                images={nimage} 
                autoplay={true}  
                sliderBoxHeight={200}
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                ImageComponentStyle={{
                  borderRadius: 15,
                  width: '95%',
                  marginTop: 0,
                }}
                dotColor="green"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'rgba(128, 128, 128, 0.92)',
                }}
                imageLoadingColor="#2196F3"/> 
            <View style={{height:50,backgroundColor:'white',margin:5,borderRadius:10}}>
              <Text style={{fontSize:25,textAlign:'left',margin:5,marginTop:10}}>इकाईया :-</Text>
            </View>
         
                <FlatList
                data={product}
                renderItem={this.renderitem}
                keyExtractor={index=>index.id}
                numColumns={3}
                /* horizontal= slide appp in left fight */
                />
               
              
        </View>
     
        <View style={{height:50}}></View>

                <Footer nav={this.props.navigation}/>
       {/*  <View style={{backgroundColor:'green',width:'100%',height:50,flexDirection:'row',position:'absolute',left:0,right:0,bottom:0}}>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('HomeScreen')}>
              <Image source={require('../../assets/ic_home_white.png')} style={{width:30,height:30,marginLeft:50,marginTop:10}}/>
              </TouchableOpacity>
              <TouchableOpacity>
              <Image source={require('../../assets/ic_wallet_white.png')} style={{width:30,height:30,marginLeft:80,marginTop:10}}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
              <Image source={require('../../assets/ic_order_white.png')} style={{width:30,height:30,marginLeft:90,marginTop:10}}/>
              </TouchableOpacity>
        </View>  */}
        
      </SafeAreaView>
    )
  }
}