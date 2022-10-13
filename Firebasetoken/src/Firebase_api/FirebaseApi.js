import DeviceInfo, {getUniqueId, getDeviceId} from 'react-native-device-info';

import messaging from '@react-native-firebase/messaging';
import {makeRequest, BASE_URL} from '../api/Api';

const FilebaseApi = async () => {
  try {
    let UniqueId = '';
    DeviceInfo.getUniqueId().then(uniqueId => {
      UniqueId = uniqueId;
      console.log('====================================');
      console.log(uniqueId);
      console.log('====================================');
    });

    const enabled = await messaging().hasPermission();
    if (enabled) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('4');
        console.log('fcmToken=', fcmToken);
        // this.showAlert('Your Firebase Token is:', fcmToken);

       
      } else {
        this.showAlert('Failed', 'No token received');
      }
    } else {
      await messaging().requestPermission();
    }
  } catch (error) {
    console.log('====================================');
    console.log('ErrFirebase=', error);
    console.log('====================================');
  }
};

export default FilebaseApi;
