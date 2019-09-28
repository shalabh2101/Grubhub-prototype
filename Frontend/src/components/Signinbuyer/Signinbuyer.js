import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'
import Reduxcomponent from '../Reduxcomponent';
import { connect } from "react-redux";
import { checklogin } from "../../actions/index.js";

function mapDispatchToProps(dispatch) {
    return {
        checklogin: data => dispatch(checklogin(data))
    }
}


class Signinbuyer1 extends Component{

   

//constructor
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            
                email: "",
                password:"",
                errormessege:false,
                shift:"",
                result:""
             }
    
 this.emailChangeHandler=this.emailChangeHandler.bind(this)
 this.passwordChangeHandler=this.passwordChangeHandler.bind(this)

       
    }


emailChangeHandler=(e)=>{
 this.setState ({   
        email: e.target.value
})
}

passwordChangeHandler=(e)=>{
    this.setState ({ 
            password: e.target.value
   })
   }

signInBuyerCheck=(e)=>{

    e.preventDefault();//
    const data = {
        email : this.state.email,
        password: this.state.password
        }
        console.log(data);

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/signinbuyer', data)
            .then(response => {
                console.log('response::', response);
                console.log("Status Code : ",response.status);
               // console.log('existssss:', this.exists)
                if(response.status === 202 ){
                    this.setState({
                        
                            email: "",
                            password:"",
                            errormessege:false,
                            result:response.data,
                            shift:true
                        


                })  
                const data=" AUTHENTICATION PASSED ";
                // const data={check:"okok"};
                this.props.checklogin( data);
                console.log("Correct Credentials",response.body)
                }
                // if(response.status === 401 )
                else {
                    this.setState({
                        
                            email: "",
                            password:"",
                            errormessege:true,
                            result:response.data

                            
                        

                })  
                const data=" AUTHENTICATION FAILED ";
                // const data={check:"okok"};
                this.props.checklogin( data);
                console.log("Incorrect Credentials",this.state)
                }
                // else
                // {
                //     console.log("SECOND Incorrect Credentials",response.body)
                // }
            }).catch(err => {
                console.log('existssss22:')
                console.log('err:', err)
                this.setState({
                   
                    errormessege:true
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
        {<Reduxcomponent/>}
              { this.state.shift && <Redirect to='/buyerhome'/>}
            <br/>
                <h2 style={{color: 'red',
    marginTop: '0%',
    marginLeft: '2%'}}>
                    GRUBHUB
                </h2>
                <div>
                    
                </div>
               <div className="container" style={{textAlign:'-webkit-center'}}> 
              {/* {this.state.errormessege && <p>Not able to sign in. Please check if your password or username are correct</p>} */}
              {/* onSubmit= {this.signInBuyerCheck} action="http://localhost:3001/signinbuyer" */}
                <form  onSubmit= {this.signInBuyerCheck} >
                   
                    { this.state.errormessege ? 
                        <p>Not able to sign in. Please check if your password or username are correct</p> 
                        : null}
                    
                    <div style={{width: '30%'}} className="form-group">
                        <input required onChange = {this.emailChangeHandler}  type="text" className="form-control" name="email" placeholder="Email" value={this.state.email}></input>
                    </div>
                    <br/>

                    <div style={{width: '30%'}} className="form-group">
                        <input required onChange = {this.passwordChangeHandler}  type="text" className="form-control" name="password" placeholder="Password" value={this.state.password} ></input>
                    </div>
                    <br/>

                    <div style={{width: '30%'}}>
                        <button  className="btn btn-success" onClick= {this.signInBuyerCheck} type="submit">Sign In</button>
                    </div>
                    <br/> 
                    
                    
                     <div style={{width: '30%'}}>
                        {/* <a href={<Redirect to ="/signupbuyer"/>}>Not a member?Click here for  Sign Up</a> */}
                        <NavLink to="/signupbuyer"  exact activeStyle={ {color:'red'}}>Not a member?Click here for  Sign Up</NavLink>
                    </div>
                    <br/> 
                   

                </form>
            </div>
        </div>
    )
}

}
const Signinbuyer = connect(null,mapDispatchToProps)(Signinbuyer1);

export default Signinbuyer;