import { combineReducers } from 'redux'
import * as type from './types'
const init ={
    user:''
}


const reducer = (state=init,action)=>{
    switch(action.type){
        case type.user_login:
            return{
                ...state,
                user:action.payload
            }
        default : return state
    }
}



const root = combineReducers({getUser:reducer});

export default root;