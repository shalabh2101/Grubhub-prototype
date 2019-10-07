import React, {Component} from 'react';
import axios from 'axios';
import { Redirect ,Link, NavLink} from 'react-router-dom'

import { Table, Menu, Icon, Button } from 'semantic-ui-react';
import { isNull } from 'util';
import { compose } from '../../../../../../../Library/Caches/typescript/3.5/node_modules/redux';


class Restaurent extends Component {
    //constructor
    
        constructor(props){
            //Call the constrictor of Super class i.e The Component
            super(props);
            //maintain the state required for this component
            var  lunchquantity=[];
    
            this.state = {
                
               errormessege:false,
               breakfast:[],
               lunch:[],
               dinner:[],
               breakfastcheck:false,
               lunchcheck:false,
               dinnercheck:false,
               cartcheck:false,
               quan:[]
               
             }

            
             this.luuchqucntitycheck=this.luuchqucntitycheck.bind(this);
            this.findindex=this.findindex.bind(this);
       // this.searchChangeHandler=this.searchChangeHandler.bind(this);
     //   this.searchHomeCheck=this.searchHomeCheck.bind(this);
           }
    
          
    

    componentWillMount=()=>{
        console.log("calling");
var i;
        for(i=0;i<1000;i++)
        this.state.quan[i]=0;
        console.log(this.state.quan);

        
    
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
            console.log('Restaurent  catch error: 1')
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
                     
                       
                    // lunch:JSON.parse(JSON.stringify(response.data))
                     
            })  
          }
            else
               {console.log("something not right")}
     })
        .catch(err=>{
            console.log('Restaurent  catch error:2')
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
            console.log('Restaurent  catch error:3')
        console.log('err:', err)
        this.setState({
             errormessege:true
        })
        });
    
    }
    
     
Cartdisplay=(e,val)=>
{
  this.state.quan[val]=this.state.quan[val]+1;
  console.log("vaaaaaaaaaa")
 console.log(val);
}

findindex=(data,index)=>{
    console.log("inside find index");
    console.log(data);
    var mainindex=-1
    let num=-1;
    num= data.find(function(item, i){
         console.log("inside find")
         console.log("item id", item.ItemId,"  item index",index)
       
         console.log("i",i)
        if(item.ItemId === index){
           mainindex=i;
             return i;}
            

      });

      console.log("num  ",num)
      return mainindex;
}

luuchqucntitycheck=(val1)=>
{  
  var twan=this.state.quan;
  twan[val1]=twan[val1]+1;
  console.log(val1);
  this.setState({
    quan:twan
  });
 
  console.log("checking handler");
  console.log(val1);
  //console.log(val2);
 console.log(this.state.quan[val1]);
}


// addhandler=(val1,val2,val3)=>
// {

//     console.log("inside add handler")
//     console.log(val1);
//     console.log(val2);
//     console.log(val3);
//      if(val2==='breakfast')
//          {
//            var index=this.findindex(this.state.breakfast,val1);
//         //    if(i!==undefined)
//         //    {
//         //     console.log("caught undefined")
//         //    var index=i.ItemId;
           
//         //     console.log("result from findindex   oooo",i);
//             console.log(index);
//             if(index>=0)
//              { console.log("hiiiii",index)
//                  if(this.state.breakfast[index].quantity !==0)
             
//              { console.log("oooooooo")
//                    let newbreakfast= JSON.parse(JSON.stringify(this.state.breakfast))
//                    console.log(newbreakfast);
//                    newbreakfast[index].quantity=parseInt(newbreakfast[index].quantity)+val3;
                 
//                 this.setState({
//                     breakfast:newbreakfast
//                })
//              }
            
//             }
//          }
//          else if(val2==='lunch')
//          {
//            var index=this.findindex(this.state.lunch,val1);
//         //    if(i!==undefined)
//         //    {
//         //     console.log("caught undefined")
//         //    var index=i.ItemId;
           
//         //     console.log("result from findindex   oooo",i);
//             console.log(index);
//             if(index>=0)
//              { console.log("hiiiii",index)
//                  if(this.state.lunch[index].quantity !==0)
             
//              { console.log("oooooooo")
             
//              console.log(this.state.lunchquantity);
//              var newlunchquantity=this.state.lunchquantity;
//              newlunchquantity[index]= newlunchquantity[index]+1;

//              console.log(newlunchquantity);
//                   //  let newlunch= JSON.parse(JSON.stringify(this.state.lunch))
//                   //  console.log(newlunch);
//                   //  newlunch[index].quantity=parseInt(newlunch[index].quantity)+val3;
//                   // console.log(" newlunch[index].quantity", newlunch[index].quantity)
//                 this.setState({
//                     lunchquantity:newlunchquantity
//                });
//                console.log(this.state);
//              }
            
//             }
//          }
// }




    render()
    {
      
             
        
        
       const Squar = ({ number }) => <p>{number +" done"}</p>;
       const Rect=({number})=>  <p>{number +'okok'}</p>;
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
          {/* <Table.Body>   */}
            {this.state.breakfast.map( (breakfast) =>
              (<Table.Row  key={breakfast.ItemId}>
               
               {/* <Squar key={breakfast.ItemId} number={breakfast.name } />
               <Table.Cell>
               <Rect key={breakfast.ItemId} number={breakfast.name}/>,
               </Table.Cell>
                */}
               
             
               <Table.Cell>
                     {breakfast.name}
               </Table.Cell>
               <Table.Cell>{breakfast.price}</Table.Cell>

               {/* <Table.Cell>     <button onClick={this.addhandler} >Add</button></Table.Cell> */}
               
               {/* <Table.Cell>     <input  placeholder="Quantity" inputname="quan" > </input></Table.Cell> */}
               <Table.Cell>    <button>Delete</button> </Table.Cell>
               {/* <input onChange={this.luuchqucntitycheck(breakfast.ItemId)}  placeholder="Quantity" name="quan" value=''/>  */}
               <button onclick={this.luuchqucntitycheck(breakfast.ItemId)}>Add</button>
               <Table.Cell>    {this.quan[breakfast.ItemId]}</Table.Cell>
               
             </Table.Row>),


            )} 
          {/* </Table.Body> */}


    <h2>Lunch</h2>      

    <Table.Body>  
            {this.state.lunch.map( (breakfast) =>
                
            
              (<Table.Row  key={breakfast.ItemId}>
               
                 <Table.Cell>
                      {breakfast.name}
                </Table.Cell>
                <Table.Cell>{breakfast.price}</Table.Cell>

                {/* <Table.Cell> <button onClick={this.addhandler(breakfast.ItemId,"lunch",1)} >Add</button></Table.Cell> */}
                <Table.Cell>    <button>Delete</button> </Table.Cell>
                
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
                <button>Add</button>
                <button>Delete</button>

              </Table.Row>),
            )} 
          </Table.Body>
                       


             <div>
               <h2>Cart</h2>
        {!this.state.cartcheck && <p>Your cart is empty</p>}
             { this.state.cartcheck && this.Cartdisplay}
                 



             </div>          
                        
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

    