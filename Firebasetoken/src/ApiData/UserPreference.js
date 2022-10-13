import AsyncStorage from "@react-native-async-storage/async-storage";

//user Preferences keys
export const KEYS ={
    USER_INFO:'userinfo',
    DEVICE_UNIQUE_ID:'deviceid',
};

export const storeData=async(key,data)=>{
    try{
        const info=JSON.stringify(data);
        console.log('info==',info);

        await AsyncStorage.setItem(key,info);
    }catch(error){
        console.log(error.message);
    }
};

export const getData=async key=>{
    try{
        const rawData=await AsyncStorage.getItem(key);
        if(!rawData){
            return null;
        }
        
        const info=JSON.parse(rawData);
        return info;
    }catch(error){
        console.log(error.message);
        return null;
    }
};

export const clearData=async()=>{
    alert('logout');
    try{
        await AsyncStorage.clear();
    }catch (error) {
        console.log(error.message);
      }
};