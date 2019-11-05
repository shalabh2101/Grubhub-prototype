import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'


class Signupbuyer extends Component{

//constructor
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            email: "",
            password:"",
            check:false
        }

 this.nameChangeHandler=this.nameChangeHandler.bind(this)
 this.emailChangeHandler=this.emailChangeHandler.bind(this)
 this.passwordChangeHandler=this.passwordChangeHandler.bind(this)

       
    }




emailChangeHandler=(e)=>{
 this.setState ({
email: e.target.value
})
}

nameChangeHandler=(e)=>{
    this.setState ({
   name: e.target.value
   })
   }

passwordChangeHandler=(e)=>{
    this.setState ({
   password: e.target.value
   })
   }

signUpBuyerCheck=(e)=>{

    e.preventDefault();//
    const data = {
        name : this.state.name,
        email : this.state.email,
        password: this.state.password,
        type:'buyer'
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/signupbuyer', data)
            .then(response => {
                console.log('response::', response);
                console.log("Status Code : ",response.status);
               // console.log('existssss:', this.exists)
                if(response.status === 200 ){
                    this.setState({
                        result : response.data,
                        check:true
                })  
                console.log("chekcing the data",response.body)
                }
            }).catch(err => {
                console.log('existssss22:')
                console.log('err:', err)
                this.setState({
                    check : true,
                    result:'no cal'
                })
            })

}

//functions for connecting backend
//password
//a new second field of password can be made, in which chek can be applied of password matchjng, then the condition of alpha numeric and more

//render the functionality
render(){
    return(
        <div>
            <br/>
            <div class="container">
                <form onSubmit= {this.signUpBuyerCheck}>
                   
                    <div style={{width: '30%'}} class="form-group">
                        <input required onChange = {this.nameChangeHandler}  type="text" class="form-control" name="name" placeholder="Name"/>
                    </div>
                    <br/>

                    <div style={{width: '30%'}} class="form-group">
                        <input required onChange = {this.emailChangeHandler}  type="text" class="form-control" name="email" placeholder="Email"/>
                    </div>
                    <br/>

                    <div style={{width: '30%'}} class="form-group">
                        <input required onChange = {this.passwordChangeHandler}  type="text" class="form-control" name="password" placeholder="Password"/>
                    </div>
                    <br/>

                    <div style={{width: '30%'}}>
                        <button  class="btn btn-success" type="submit">Sign Up</button>
                    </div>
                    <br/> 
                    
                 {  this.state.check && <p> Successfully signed up. Click Sign in to Continue </p>}

                    <div style={{width: '30%'}}>
                        {/* <a href={<Redirect to ="/signupbuyer"/>}>Not a member?Click here for  Sign Up</a> */}
                        <NavLink to="/signinbuyer"  exact activeStyle={ {color:'red'}}>Not a member?Click here for  Sign In</NavLink>
                    </div>
                    <br/> 
                   

                </form>
            </div>
        </div>
    )
}





}

export default Signupbuyer;