import * as type from './types'
export const Login = data =>{
    return{
        type:type.user_login,
        payload:data
    }
}