import React from 'react'
import {connect} from 'react-redux'
import * as action from '../../redux/home/actions';
import {Text} from 'react-native'
class ReduxScreen extends React.Component{

constructor(props){
super(props)
console.log('====================================');
console.log("props",this.props);
console.log('====================================');


this.state={
    name:''
}
}


componentDidMount=()=>{
    this.home();
}


home=()=>{

    const name="hanu1";
    this.props.LoginUser(name);
    const res=this.props.Data;
    console.log('====================================');
    console.log("reso=",res.user);
    console.log('====================================');

    this.setState({name:res.user})

}


    render(){


        const {name}=this.state
        return(

<Text>rotu=={name}</Text>
        )
    }
}


const mapStateToProps=state=>({
  
        Data:state.home.getUser,
    })


const mapDispatchToProps=dispatch=>({
    
        LoginUser:name=>dispatch(action.Login(name))
    
})



export default connect(mapStateToProps,mapDispatchToProps)(ReduxScreen)