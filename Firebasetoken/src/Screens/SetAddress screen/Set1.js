import React from "react";
import { View,Text } from "react-native";

import MapView from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
export default class Set1 extends React.Component{

    constructor(props){
        super(props)
        this.state={
            lat: '',
            lang: '',
        }
        this.checkPermission();
    }

    checkPermission = async () => {
        try {
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
            .then(location => {
              console.log(location);
              this.setState({
                lat: location.latitude,
                lang: location.longitude,
              });
            })
            .catch(error => {
              const {code, message} = error;
              console.warn(code, message);
            });
        }catch(e){

            console.log('====================================');
            console.log(e);
            console.log('====================================');
        }
    }
    render(){
        const {lat,lang} =this.state
        console.log('====================================');
        console.log(this.state);
        console.log('====================================');
        return(
            <View style={{flex:1}}>
           <MapView
            style={{ width: '100%',
            height: 300,}}
            showsUserLocation={false}
            zoomEnabled={true}
            zoomControlEnabled={true}
            initialRegion={{
              latitude: 26.9519,
              longitude: 75.77821,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: this.state.lat,
                longitude: this.state.lang,
              }}
              title={'hanu'}
              description={'Java Training Institute'}
            />
          </MapView>
 
          {/* 
        <GooglePlacesAutocomplete
          placeholder={'currentLocationAddress'}
          placeholderTextColor="#333"
          onPress={(data, details) => this.handleAddressChange(data, details)}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              fontWeight: '700',
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              fontFamily: 'OpenSans-Regular',
              height: 30,
              color: '#333',
              fontSize: 20,
              backgroundColor: 'transparent',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          query={{
            key: 'AIzaSyBb3j8Aiv60CadZ_wJS_5wg2KBO6081a_k',
            language: 'en',
            components: 'country:Ind',
            fields: 'geometry',
          }}
          // currentLocation={true}
          // currentLocationLabel="Current location"
          enableHighAccuracyLocation={true}
          GooglePlacesDetailsQuery={{
            fields: ['formatted_address', 'geometry'],
          }}
        /> */}
            </View>
        )
    }
}