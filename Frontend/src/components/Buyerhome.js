import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'
import { connect } from "react-redux";
import { checklogin } from "../actions/index.js";
import Reduxcomponent from './Reduxcomponent.js';



function mapDispatchToProps(dispatch) {
    return {
        checklogin: data => dispatch(checklogin(data))
    }
}



class Buyerhome1 extends Component{
//constructor

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            
            name:"",
             search:""                ,
             searchsuccess:0,
           logout:false

             }
    
 this.searchChangeHandler=this.searchChangeHandler.bind(this);
 this.searchHomeCheck=this.searchHomeCheck.bind(this);
 this.logcheck=this.logcheck.bind(this);

       }


    searchChangeHandler=(e)=>{
 this.setState ({   
        search: e.target.value
})
}

//using redux
logcheck=(e)=>{
    e.preventDefault();

    const data=" NO AUTHENTICATION ";
    // const data={check:"okok"};
    this.props.checklogin( data);
    this.setState({
        logout:true
    })
}

   searchHomeCheck=(e)=>{

    e.preventDefault();//
    const data = {
        search : this.state.search,
    }
        console.log(data);

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/Buyerhome', data)
            .then(response => {
                console.log('response::', response);
                console.log("Status Code : ",response.status);
               // console.log('existssss:', this.exists)
                if(response.status === 202 ){
                    this.setState({
                        
                            searchcheck:1,
                            errormessege:false,
                            name:response.data.name
                        

                })  
                console.log("Correct Searching",response.data)
                }
                // if(response.status === 401 )
                else {
                    this.setState({
                        
                        searchcheck:2,
                            errormessege:true,
                            result:response.data
                        

                })  
                console.log("Incorrect Searching",this.state)
                }
                // else
                // {
                //     console.log("SECOND Incorrect Credentials",response.body)
                // }
            }).catch(err => {
                console.log('Search  existssss22:')
                console.log('err:', err)
                this.setState({
                    searchcheck:2,
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
            <br/>
            {this.state.logout && <Redirect to='/signinbuyer'/>}
            {<Reduxcomponent/>}
            {/* {!this.state.authenticated && 
            <p>You are not login</p>
            <Redirect to ="/signinbuyer"/>} */}
               <div className="container">
              {/* {this.state.errormessege && <p>Not able to sign in. Please check if your password or username are correct</p>} */}
              {/* onSubmit= {this.signInBuyerCheck} action="http://localhost:3001/signinbuyer" */}
                
                   {/* //call redux header component */}
                 
                    {(this.state.searchcheck===2) && <p>No Search found</p>}

                    <h2>PROFILE PAGE</h2>

                    <div style={{width: '30%'}} className="form-group">
                        <input  onChange = {this.searchChangeHandler}  type="text" className="form-control" name="Search" placeholder="Search" value={this.state.search}></input>
                    </div>

                    <div style={{width: '30%'}}>
                        <button  className="btn btn-success" onClick= {this.searchHomeCheck} >Search</button>
                    </div>

                    <br/>
                    
                    <div style={{width: '30%'}}>
                        <button  className="btn btn-success" onClick= {this.logcheck} >Log out</button>
                    </div>

                    <label> </label>


                    <br/> 
                        
                    <br/> 
                   

                
            </div>
        </div>
    )
}

}



  const Buyerhome = connect(null,mapDispatchToProps)(Buyerhome1);

export default Buyerhome;

