import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'

import { Table, Menu, Icon, Button } from 'semantic-ui-react';


class Search extends Component{
    //constructor
    
        constructor(props){
            //Call the constrictor of Super class i.e The Component
            super(props);
            //maintain the state required for this component
    
    
            this.state = {
                food:"",
                search:""    ,            
                searchsuccess:0,
                logout:false,
                fooditems:[],
                checkmounting:false
               
             }
        
           }
    
           searchChangeHandler=(e)=>{
           this.setState ({   
            search: e.target.value
            
    })
    }

    componentWillMount=()=>{
        console.log("calling");
    
        const food = this.props.match.params.food;
        console.log(food);

        console.log("Inside the  Search component did mount")
        const data={
            food:food,
           // type:this.state.type
        }
        console.log("this is food",data.food)
       
        axios.defaults.withCredentials = true;
        
        axios.post('http://localhost:3001/searchfood/', data)
        .then(response=>{
          
           console.log("response  ",response);
           console.log(response.data)
            if(response.status === 200 ){ 

                console.log("Updating fooditems state");
                this.setState({
                       fooditems:response.data,
                     
            })  


            }
            else {
                this.setState({
                    errormessege:true,
         })  
         console.log("fooditems");
           console.log(this.state.fooditems);
            }
     })
        .catch(err=>{
    
            console.log('Search  exist in getting name:')
        console.log('err:', err)
        this.setState({
            searchcheck:2,
            errormessege:true
        })
        });
    
    }
    
     
    render()
    {
        console.log("In render");
        console.log(this.state);
        const users=this.state.fooditems;
        console.log({users});

        return(
            <div>
                <br/>
                {this.state.logout && <Redirect to='/signinbuyer'/>}
               
                   <div className="container">
                
                     {/* Search check */}
                        {/* {(this.state.searchcheck===2) && <p>No Search found</p>} */}
    
                        
                        <nav class="navbar navbar-expand-lg navbar-dark primary-color">
    
                             <a class="navbar-brand" href="#" style ={{color:'red'}}>GRUBHUB</a>
                             <NavLink to="/userprofile"  exact  class="navbar-brand" activeStyle={ {color:'red'}}>{this.state.name}</NavLink>
                             <a class="navbar-brand"   style={{color:'blue'}} >{this.state.name}</a>
    
                        </nav>
                        {/* <Table.Row  key={fooditem.Id}>
                <Table.Cell to="/restaurent/${fooditems.Id}">
                
                
                {}
                
                </Table.Cell>
                <Table.Cell>{fooditem.Cuisine}</Table.Cell>
                
              </Table.Row>), */}

{/* add image too */}
          <Table.Body>  
            {this.state.fooditems.map( (fooditem) =>
                
              
                <tr key={fooditem.id}>
                
                   <Link to={`/restaurent/${fooditem.Id}` } className="Link" exact  class="navbar-brand" activeStyle={ {color:'red'}}>
                       <td > {fooditem.Id}</td>
                       <td>{fooditem.Cuisine}</td>  
                       <td>  {fooditem.resname}  </td>

                   </Link>
                </tr>
              
            )} 
          </Table.Body>
    
                        {/* <div style={{width: '30%'}} className="form-group">
                            <input  onChange = {this.searchChangeHandler}  type="text" className="form-control" name="Search" placeholder="Search" value={this.state.search}></input>
                        </div>
    
                        <div style={{width: '30%'}}>
                            <button Link to="/searchpage:param" className="btn btn-success" onClick= {this.searchHomeCheck} >Search</button>
                        </div>
                        
                        <br/> */}
                        
                        <div style={{width: '30%'}}>
                            <button  className="btn btn-success"  >Log out</button>
                        </div>
    
                       
    
    
                        <br/> 
                            
                        <br/> 
                  </div>
            </div>
        )
    }
    }
    
    export default Search;

    