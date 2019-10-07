import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'


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
              <NavLink to="/signinowner"  exact activeStyle={ {color:'red'}}> Restaurent Owner Sign Ip</NavLink>
       </button>    
       </div>   

        <div style={{width: '30%'}} class="form-group">
       <button>
              <NavLink to="/signinbuyer"  exact activeStyle={ {color:'red'}}> User Sign In</NavLink>
       </button>    
       </div>      
                    
                   

               
            </div>
        
    )
}





}

export default Mainpage;