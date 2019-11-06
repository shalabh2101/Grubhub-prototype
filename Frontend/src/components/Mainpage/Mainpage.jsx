import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'
import Background from '../../images/new.jpeg';

class Mainpage extends Component{

//constructor
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
 }

render(){
    return(

<div>

<br/>
                <h2 style={{color: 'red',
    marginTop: '0%',
    marginLeft: '2%'}}>
                    GRUBHUB
                </h2>
                

        
<div style ={{backgroundImage: `url(${Background})`,
height: '400px'}}>


</div>

        <div >

         <div style={{width: '30%'}} class="form-group">
       <button>
              <NavLink to="/signupowner"  exact activeStyle={ {color:'red'}}> Restaurent Owner Sign Up</NavLink>
       </button>    
       </div>        

        <div style={{width: '30%'}} class="form-group">
       <button>
              <NavLink to="/signupbuyer"  exact activeStyle={ {color:'red'}}> User Sign Up</NavLink>
       </button>    
       </div>   

        <div style={{width: '30%'}} class="form-group">
       <button>
              <NavLink to="/signinowner"  exact activeStyle={ {color:'red'}}> Restaurent Owner Sign In</NavLink>
       </button>    
       </div>   

        <div style={{width: '30%'}} class="form-group">
       <button>
              <NavLink to="/signinbuyer"  exact activeStyle={ {color:'red'}}> User Sign In</NavLink>
       </button>    
       </div>      
                    
                   

               
            </div>

            </div>
        
    )
}





}

export default Mainpage;