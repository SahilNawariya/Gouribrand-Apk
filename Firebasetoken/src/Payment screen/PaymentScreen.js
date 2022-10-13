import React from "react";
import CheckBox from 'react-native-check-box';
import RadioForm from 'react-native-simple-radio-button';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import get from 'loadsh/get';
import {View, Alert, StyleSheet, Text, TouchableOpacity,Image,SafeAreaView} from 'react-native';
import { makeRequest } from "../ApiData/Api";
import RazorpayCheckout from 'react-native-razorpay';
const radio_props = [
    {label: 'डिलवरी पर नगद भुगतान', value: 'COD'},
    {label: 'ऑनलाइन भुगतान', value: 'Online'},
  ];
export default class PaymentScreen extends React.Component{
    constructor(props){
        super(props);
        const amountData = get(props.route, 'params');
        const { params}=amountData;
        const {amount,add,timeslots}=params;
        this.state={
           /*  ...amountData, */
            amount,
            paymentMode:'COD',
            add,
            timeslots,
            wallet:'', 
        }
    }
    componentDidMount(){
        this.handlewallet();
     }
     handlewallet = async()=>{
      try{
      let params=null;
        const res =await makeRequest('api/Mobile/walletIncome',params,true)
        const {wallet}=res;
        this.setState({wallet})
    }catch(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
    }
     
    placeOrder = async()=>{
        try{
          const {amount,
            add,
            timeslots,
            wallet,
            paymentMode }=this.state;
            const {address,address_type,latitude,longitude}=add;
            console.log('====================================');
            console.log("=====",address,address_type,latitude,longitude);
            console.log('====================================');
          let params={
            address_type:address_type,
            address:address,
            slotId:timeslots,
            paymentMode:paymentMode,
            delivery_date:'23-Oct',
            //wallet:
            //coupon:GET50%OFF
            latitude:latitude,
            longitude:longitude,
          }
        const res =await makeRequest('api/Mobile/orderCart',params,true)
        const {success, message} = res;
        this.props.navigation.navigate('MyOrder');

        console.log('====================================');
        console.log(res);
        console.log('====================================');

          if(success){
            const {output, orderPlaced, cartCount} = res;
            console.log('====================================');
            console.log("12345==",res);
            console.log('====================================');
           
        if (paymentMode === 'COD') {
          await this.props.cartUpdate(cartCount);
          //this.props.navigation.navigate('My Order');
          // navigation.jumpTo('My Order');
        } else if (paymentMode === 'Online') {
           console.log("payMod");
          this.handleOnlinePayment(output);
        }
        }else{
          Alert.alert('', message);
        }
          
    }catch(error){
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
    }

    handleOnlinePayment = async info =>{
      try{
        const {
          userId,
          orderId,
          onlineOrderId,
          onlineKeyId,
          orderAmount,
          currency,
          description,
          merchantLogo,
          merchantName,
        } = info;

        const option={
          key:onlineKeyId,
          amount:orderAmount,
          currency:currency,
          name:merchantName,
          order_id:onlineOrderId,
          description:description,
          image:merchantLogo,
          theme:{color:'#0b8457'}
        };

        const paymentGatewayResponse=await RazorpayCheckout.open(option);
        console.log('dev===')
        if(paymentGatewayResponse){

          const {
            razorpay_order_id: onlineOrderId,
            razorpay_payment_id: onlinePaymentId = null,
            razorpay_signature: onlineSignature = null,
          }=paymentGatewayResponse;


          const params={
            orderId,
            onlineOrderId,
            onlinePaymentId,
            onlineSignature,
          };
          console.log('dev===',params);
          await this.props.paymentVerify(params);
          if(this.props.isPaymentVerifySuccess){
            const {cartUpdate}=this.props.isPaymentVerifySuccess;
            await this.props.cartUpdate(cartCount);

            this.props.navigation.navigate('My Order');            
          }
        }
      }catch(error){
        console.log(error);
      }
    }    

    handleModeChange = data =>{
      this.state.paymentMode===data?this.setState({paymentMode:data}):this.setState({paymentMode:data})
    }

    handleSetDefault = () => {
      this.setState(prevState => ({
        isDefaultSelect: !prevState.isDefaultSelect,
      }));
    };

    render(){
            const {wallet,amount,to}=this.state;
            if(amount !==0 || amount!==null){
                if(wallet<amount){
                  var remainig= amount - wallet; 
                }else if(wallet>amount){
                  var remainig= wallet-amount;
                }else{
                  var remainig=0;
                }
            }
        return(
            <SafeAreaView style={{flex:1}}>
              <View style={{backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <Image style={{width:30,height:30,margin:10}} source={require('../assets/arrow.png')}/>
            </TouchableOpacity>
          </View>
        <View style={{}}>
          {this.state.isDefaultSelect ? (
            <View style={styles.payAmount}>
              <CheckBox
                isChecked={this.state.isDefaultSelect}
                onClick={this.handleSetDefault}
                // tintColors={{true: '#0b8457', false: '#000'}}
                checkBoxColor={'#0b8457'}
              />

              <Text style={styles.title}>वॉलेट राशि</Text>
              <Text style={styles.value}>₹ {wallet}</Text>
            </View>
          ) : (
            <View style={styles.payAmount}>
              <CheckBox
                isChecked={this.state.isDefaultSelect}
                onClick={this.handleSetDefault}
                // tintColors={{true: '#0b8457', false: '#000'}}
                checkBoxColor={'#0b8457'}
              />

              <Text style={styles.title}>वॉलेट राशि</Text>
              <Text style={styles.value}>₹ {wallet}</Text>
            </View>
          )}

          <View style={styles.payAmount}>
            <Text style={styles.title}>भुगतान योग्य राशि</Text>
            <Text style={styles.value}>₹ {amount}</Text>
          </View>
          {this.state.isDefaultSelect ? (
            <View style={styles.payAmount}>
              <Text style={styles.title}>वॉलेट से पैसे काटने के बाद</Text>
              <Text style={styles.value}>₹ {remainig}</Text>
            </View>
          ) : null}

          <View style={styles.paymentContainer}>
            <Text style={styles.optionHeading}>भुगतान विकल्प चुनें</Text>
            <RadioForm
              radio_props={radio_props}
              onPress={this.handleModeChange}
              formHorizontal={false}
              labelHorizontal={true}
              animation={true}
              buttonSize={12}
              buttonOuterSize={24}
              buttonColor={'#ccc'}
              selectedButtonColor={'#0b8457'}
              labelColor={'#ccc'}
              labelStyle={styles.radioButtonLabel}
              style={styles.radioButton}
            />
          </View>
        </View>

        <View style={styles.addCart}>
          <TouchableOpacity style={styles.cartButton} onPress={this.placeOrder}>
            <Text style={styles.cartText}>आर्डर करे</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  allCategoryContainer: {
    flex: 1,
  },
  separator: {
    height: wp(2),
  },
  listContainer: {
    padding: wp(2),
  },
  payAmount: {
    backgroundColor: '#fff',
    paddingVertical: wp(4),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(4),
    color: '#777',
    flex: 1,
  },
  radioButtonLabel: {
    fontSize: wp(3.5),
    color: '#777',
    flex: 1,
  },
  value: {
    fontSize: wp(4),
    color: '#0b8457',
    fontWeight: '700',
  },
  optionHeading: {
    fontSize: wp(4),
    fontWeight: '700',
    padding: wp(3),
    marginTop: wp(2),
  },
  option: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(3),
    height: hp(6),
    alignItems: 'center',
    marginBottom: 4,
    flexDirection: 'row',
  },
  radioButton: {
    backgroundColor: '#fff',
    paddingVertical: wp(3),
    height: hp(12),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 4,
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#ccc',
    marginRight: wp(3),
  },
  addCart: {
    backgroundColor: '#fff',
    padding: wp(4),
  },
  cartButton: {
    backgroundColor: 'green',
    flexDirection: 'row',
    padding: wp(2),
    height: hp(6),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(8),
  },
  cartText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
    // flex: 1,
  },
  addCartIcon: {
    backgroundColor: '#e6f2ee',
    padding: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    height: wp(4),
    aspectRatio: 1 / 1,
  },
});
