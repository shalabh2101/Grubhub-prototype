import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'
import { connect } from "react-redux";
import { checklogin } from "../../actions/index.js";


class Buyerhome extends Component{
//constructor

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component


        this.state = {
            
            name:"",
            search:""                ,
            searchsuccess:0,
            logout:false,
            email:this.props.emailfromstore,
            type:this.props.type
             }
    
    this.searchChangeHandler=this.searchChangeHandler.bind(this);
    this.searchHomeCheck=this.searchHomeCheck.bind(this);
       }



    searchChangeHandler=(e)=>{
 this.setState ({   
        search: e.target.value
        
})
}

componentDidMount=()=>{

    console.log("Inside the component did mount")
    const data={
        email:this.props.emailfromstore,
        type:'buyer'
    }
    console.log("this is email",data.email)
    console.log(this.props.emailfromstore)
    axios.defaults.withCredentials = true;
    
    axios.post('http://localhost:3001/getdata', data)
    .then(response=>{
       console.log("response.data.name ",response.data.Name);
       console.log("response  ",response);
       console.log("response.body", response.body)
        if(response.status === 200 ){ //why 202 and why 200 please check
            this.setState({
                   name:response.data.Name
        })  
        }
        else {
            this.setState({
               // errormessege:true,
     })  
       
        }
 })
    .catch(err=>{

        console.log('Search  exist in getting name:')
    console.log('err:', err)
    this.setState({
        searchcheck:2,
        errormessege:true
    })
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


render(){
    var url= "/search/" + this.state.search;
    return(
        <div>
            <br/>
            {this.state.logout && <Redirect to='/signinbuyer'/>}
           
               <div className="container">
            
                 {/* Search check */}
                    {/* {(this.state.searchcheck===2) && <p>No Search found</p>} */}

                    
                    <nav class="navbar navbar-expand-lg navbar-dark primary-color">

                         <a class="navbar-brand" href="#" style ={{color:'red'}}>GRUBHUB</a>
                         <NavLink to="/userprofile"  exact  class="navbar-brand" activeStyle={ {color:'red'}}> Profile:{this.state.name}</NavLink>
                       

                    </nav>

                    <div style={{width: '30%'}} className="form-group">
                        <input  onChange = {this.searchChangeHandler}  type="text" className="form-control" name="Search" placeholder="Search" value={this.state.search}></input>
                    </div>

                  
                    <div style={{width: '30%'}}>
                    
                    <Link to={url} >
                        <button className="btn btn-success"  >Search</button>
                        </Link>
                    </div>

                    <br/>
                    
                    <div style={{width: '30%'}}>
                        <button  className="btn btn-success"  >Log out</button>
                    </div>


                    <nav class="navbar navbar-expand-lg navbar-dark primary-color">


                    <nav class="navbar navbar-expand-lg navbar-dark primary-color">


<NavLink to="/pastorder"  exact  class="navbar-brand" activeStyle={ {color:'red'}}> Past Orders</NavLink>
<NavLink to="/upcomingorder"  exact  class="navbar-brand" activeStyle={ {color:'red'}}> Upcoming Orders</NavLink>


</nav>




</nav>

                    <label> </label>


                    <br/> 
                        
                    <br/> 
              </div>
        </div>
    )
}
}

export default Buyerhome;




// const mapStateToProps = state => {
//     return { emailfromstore: state.email };
//   };
  
//   const Reduxcomp = ({ listchecks }) => (
//      <p>authentication status{listchecks}</p>
//   );
  

//import Reduxcomponent from '../Reduxcomponent.js';



// function mapDispatchToProps(dispatch) {
//     return {
//         checklogin: data => dispatch(checklogin(data))
//     }
// }

//using redux
// logcheck=(e)=>{
//     e.preventDefault();

//     const data=" NO AUTHENTICATION ";
//     // const data={check:"okok"};
//     this.props.checklogin( data);
//     this.setState({
//         logout:true
//     })
// }


