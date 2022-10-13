import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import {KEYS, getData} from '../ApiData/UserPreference';
import Login from './Login';
import Logout from './Logout';
import {NavigationContainer} from '@react-navigation/native';
export default class Route extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: '',
    };
  }

  componentDidMount = async () => {
    try {
      const userInfo = await getData(KEYS.USER_INFO);

      if (userInfo !== null) {
        this.setState({userData: userInfo});
      } else {
        this.setState({userData: ''});
      }
    } catch (error) {
      console.log('====================================');
      console.log('error=', error);
      console.log('====================================');
    }
  };

  user = userData => {
    if (userData !== 'true') {
      return <Login />;
    } else {
      return <Logout />;
    }
  };

  render() {
    const {userData} = this.state;
    return <NavigationContainer>{this.user(userData)}</NavigationContainer>;
  }
}
