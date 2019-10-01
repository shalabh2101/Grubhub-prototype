import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Signupbuyer from './Signupbuyer/Signupbuyer';
import Signinbuyer from './Signinbuyer/Signinbuyer';
import Buyerhome from './Buyerhome/Buyerhome';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/signupbuyer"  exact component={Signupbuyer}/>
                <Route path="/signinbuyer" exact component={Signinbuyer}/>
                <Route path="/"  exact component={Signinbuyer}/>
                <Route path="/buyerhome"  exact component={Buyerhome}/>
    
            </div>
        )
    }
}
//Export The Main Component
export default Main;