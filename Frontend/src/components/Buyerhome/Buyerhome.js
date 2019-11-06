import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'
import { connect } from "react-redux";
import { checklogin } from "../../actions/index.js";
import Background from '../../images/new.jpeg';


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
            type:this.props.type,
            messeges:[]
            
        }
    
         this.searchChangeHandler=this.searchChangeHandler.bind(this);
         this.searchHomeCheck=this.searchHomeCheck.bind(this);
       }

     searchChangeHandler=(e)=>{
     this.setState ({   
        search: e.target.value
        
})
}


componentWillMount=()=>{

    console.log("Inside the component did mount")
    const data={
        email:window.localStorage.getItem('buyer_email'),
        type:'buyer'
    }
    console.log("this is email",data.email)
    
    axios.defaults.withCredentials = true;
    
    axios.post('http://localhost:3001/getdata', data)
    .then(response=>{
       console.log("response.data.name ",response.data.Name);
       console.log("response  ",response);
       console.log("response.body", response.body)
        if(response.status === 200 ){ 
            this.setState({
                   name:response.data.Name
        })  

        window.localStorage.setItem('name_buyer',response.data.Name);

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


   const data1={
       id: localStorage.getItem('buyer_id')
   }

    axios.post('http://localhost:3001/getMesseges', data1)
    .then(response=>{
       console.log("response.data.name ",response.data.Name);
       console.log("response  ",response);
       console.log("response.body", response.body)
        if(response.status === 200 ){ 
            this.setState({
                   messeges:response.data
        })  

      //  window.localStorage.setItem('name_buyer',response.data.Name);

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

     let messegelist;
    
    
       if(this.state.messeges.length !==0 &&  this.state.messeges!=="No data found")
       {
          messegelist=<table cellspacing="40">  
           
          {this.state.messeges.map( (fooditem) =>
              
              <tr key={fooditem._id}>
              

                    <td > --FROM---  </td>
                    <td >{fooditem.restname}</td>  
                 
                    <td > --messege---  </td>
                    <td > {fooditem.messege}  </td>

               
              </tr>
            
          )} 
        </table>

       }

    return(
        <div>
            <br/>
            {this.state.logout && <Redirect to='/signinbuyer'/>}
           
               <div className="container">
            
                 {/* Search check */}
                    {/* {(this.state.searchcheck===2) && <p>No Search found</p>} */}

                    
                    <nav class="navbar navbar-expand-lg navbar-dark primary-color">

                    <a class="navbar-brand" href="#" style ={{color:'red'}}>GRUBHUB</a>
                    <div style={{width: '30%'}}>
                        <button  className="btn btn-success"  >Log out</button>
                    </div>
                    </nav>


                    


<div style ={{backgroundImage: `url(${Background})`,
height: '300px'}}></div>


            
            <div className="container" style={{textAlign:'-webkit-center'}}> 
                <h2>User Dashboard </h2>
            </div>

                    <div style={{width: '30%'}} className="form-group">
                        <input  onChange = {this.searchChangeHandler}  type="text" className="form-control" name="Search" placeholder="Search" value={this.state.search}></input>
                    </div>

                  
                    <div style={{width: '30%'}}>
                    
                    <Link to={url} >
                        <button className="btn btn-success"  >Search</button>
                        </Link>
                    </div>

                    <br/>
                    
                    <nav class="navbar navbar-expand-lg navbar-dark primary-color">


                    <nav class="navbar navbar-expand-lg navbar-dark primary-color">


<NavLink to="/pastorder"  exact  class="navbar-brand" activeStyle={ {color:'red'}}> Past Orders</NavLink>
<NavLink to="/upcomingorder"  exact  class="navbar-brand" activeStyle={ {color:'red'}}> Upcoming Orders</NavLink>
<br></br>
<br></br>

<div className="container" > 
                <h3>Messeges </h3>
            </div>
   {messegelist}



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


