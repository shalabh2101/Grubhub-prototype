import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Signupbuyer from './Signupbuyer/Signupbuyer';
import Signinbuyer from './Signinbuyer/Signinbuyer';
import Buyerhome from './Buyerhome/Buyerhome';
import Userprofile from './Userprofile/Userprofile';
import Search from './Search/Search'

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
                <Route path ="/userprofile" exact component={Userprofile}/>
                <Route path="/search/:food" exact component ={Search}/>
    
            </div>
        )
    }
}
//Export The Main Component
export default Main;