import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'

import { Table, Menu, Icon, Button } from 'semantic-ui-react';
import { isNull } from 'util';


class Restaurent extends Component {
    //constructor
    
        constructor(props){
            //Call the constrictor of Super class i.e The Component
            super(props);
            //maintain the state required for this component
    
    
            this.state = {
                
               errormessege:false,
               breakfast:[],
               lunch:[],
               dinner:[],
               breakfastcheck:false,
               lunchcheck:false,
               dinnercheck:false

             }
        
       // this.searchChangeHandler=this.searchChangeHandler.bind(this);
     //   this.searchHomeCheck=this.searchHomeCheck.bind(this);
           }
    
          
    

    componentWillMount=()=>{
        console.log("calling");
    
        const Restaurentid = this.props.match.params.id;
        console.log(Restaurentid);

        console.log("Inside the  Restaurent component did mount")
        const data1={
            id:Restaurentid,
            type: 'breakfast'
        }

        const data2={
            id:Restaurentid,
            type: 'lunch'
        }

        const data3={
            id:Restaurentid,
            type: 'dinner'
        }
        console.log("this is id",data1.id)
       
        axios.defaults.withCredentials = true;
        
        axios.post('http://localhost:3001/getrestaurentmenu/', data1)
        .then(response=>{
          
           console.log("response  ",response);
           console.log(response.data)
            if(response.status === 200 ){ 

                console.log("Updating fooditems state");
                if( isNull(response.data))
                   {console.log("breakfast is null")}
                this.setState({
                       breakfast:response.data,    
            })   }
            else
               {console.log("something not right")}
     })
        .catch(err=>{
            console.log('Restaurent  catch error:')
        console.log('err:', err)
        this.setState({
             errormessege:true
        })
        });


        axios.post('http://localhost:3001/getrestaurentmenu/', data2)
        .then(response=>{
          
           console.log("response  ",response);
           console.log(response.data)
            if(response.status === 200 ){ 

                console.log("Updating fooditems state");
                if( isNull(response.data))
                {console.log("lunch is null")}
                this.setState({
                      
                       lunch:response.data,
                     
                     
            })   }
            else
               {console.log("something not right")}
     })
        .catch(err=>{
            console.log('Restaurent  catch error:')
        console.log('err:', err)
        this.setState({
             errormessege:true
        })
        });
        
        

        axios.post('http://localhost:3001/getrestaurentmenu/', data3)
        .then(response=>{
          
           console.log("response  ",response);
           console.log(response.data)
            if(response.status === 200 ){ 

                console.log("Updating fooditems state");
                if( isNull(response.data))
                {console.log("dinner is null")}
                this.setState({
                      
                       dinner:response.data
                     
            })   }
            else
               {console.log("something not right")}
     })
        .catch(err=>{
            console.log('Restaurent  catch error:')
        console.log('err:', err)
        this.setState({
             errormessege:true
        })
        });
    
    }
    
     
    render()
    {
        

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

{/* //make objects from query */}
<h2>Breakfast</h2>

         {/* add image too */}
          <Table.Body>  
            {this.state.breakfast.map( (breakfast) =>
                
            
              (<Table.Row  key={breakfast.ItemId}>
                <Table.Cell>
                
                
                      {breakfast.name}
               
                </Table.Cell>
                <Table.Cell>{breakfast.price}</Table.Cell>
                
              </Table.Row>),
            )} 
          </Table.Body>


    <h2>Lunch</h2>      

    <Table.Body>  
            {this.state.lunch.map( (breakfast) =>
                
            
              (<Table.Row  key={breakfast.ItemId}>
                <Table.Cell>
                
                
                      {breakfast.name}
               
                </Table.Cell>
                <Table.Cell>{breakfast.price}</Table.Cell>
                
              </Table.Row>),
            )} 
          </Table.Body>
    <h2>Dinner</h2>

    <Table.Body>  
            {this.state.dinner.map( (breakfast) =>
                
            
              (<Table.Row  key={breakfast.ItemId}>
                <Table.Cell>
                
                
                      {breakfast.name}
               
                </Table.Cell>
                <Table.Cell>{breakfast.price}</Table.Cell>
                
              </Table.Row>),
            )} 
          </Table.Body>
                       
                        
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
    export default Restaurent;

    