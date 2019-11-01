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
            var  lunchquantity=[];
    
            this.state = {
                
              ordersuccess:false,
               errormessege:false,
               breakfast:{},
               lunch:[],
               dinner:[],
               breakfastcheck:false,
               lunchcheck:false,
               dinnercheck:false,
               cartcheck:false,
               quan:[],
               total:[],
               cart:[],
               globaltotal:0,
               cartvalue:"",
               Items:{}

               
             }

            
             
      
        this.addquantitycheck=this.addquantitycheck.bind(this);
        this.deletequantitycheck=this.deletequantitycheck.bind(this);
        this.checkouthandler=this.checkouthandler.bind(this);
      
      
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
        const data={
            id:Restaurentid,
            type: 'buyer'
        }

        console.log("this is id",data.id)
       
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/getrestaurentmenu/', data)
        .then(response=>{
          
           console.log("response  ",response);
           console.log(response.data)
            if(response.status === 200 ){ 

                console.log("Updating fooditems state");
                if( isNull(response.data))
                   {console.log("breakfast is null")}
                this.setState({
                  Items:response.data,    
            })   
            console.log(response.data)
          
          }
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

    

    }
    
     
cartcheck=(val1,val2,val3,val4)=>
{
 
var v1=parseInt(val3);
var v2=parseInt(val4);
var v3=v1*v2;


  if(val4 !==0)
  {
const data={
  
  ItemId:val1,
   name : val2,
   price: val3,
   quantity:val4,
   total:v3


}
console.log("val1")

var newcart=this.state.cart;
newcart.push(data)
var temp= this.state.cartvalue;
temp= temp+"/"+val2+","+val3+","+val4 ;



 var Gtotal=this.state.globaltotal
Gtotal+=v3;



this.setState(

  {
     cart:newcart,
    cartcheck:true,
    cartvalue:temp,
    globaltotal:Gtotal

  }


)
}
 

}

// findindex=(data,index)=>{
//     console.log("inside find index");
//     console.log(data);
//     var mainindex=-1
//     let num=-1;
//     num= data.find(function(item, i){
//          console.log("inside find")
//          console.log("item id", item.ItemId,"  item index",index)
       
//          console.log("i",i)
//         if(item.ItemId === index){
//            mainindex=i;
//              return i;}
            

//       });

//       console.log("num  ",num)
//       return mainindex;
// }


checkouthandler=()=>{
console.log(":inside checkout handler")

  axios.defaults.withCredentials = true;

       
  const data={
      order:this.state.cartvalue
  }

  axios.post('http://localhost:3001/postorder/', data)
  .then(response=>{
    
     console.log("response  ",response);
     console.log(response.data)
      if(response.status === 200 ){ 

          console.log("Updating order state");
         
          this.setState({
                   
                 ordersuccess:true
      })   }
      else
         {console.log("something not right")}

})
  .catch(err=>{
      console.log('postorder  catch error: 1')
  console.log('err:', err)
  this.setState({
       errormessege:true
  })
  });

}

addquantitycheck=(val1)=>
{  

  console.log("checking handler");
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

deletequantitycheck=(val1)=>
{  

  console.log("checking handler");
  var twan=this.state.quan;
  if(twan[val1]>0)
  twan[val1]=twan[val1]-1;
  console.log(val1);
  this.setState({
    quan:twan
  });
 
  console.log("checking handler");
  console.log(val1);
  //console.log(val2);
 console.log(this.state.quan[val1]);

}





    render()
    {    

   
   let Restitems= Object.keys(this.state.Items).map((key)=>{

      return (    
    <Table.Body>  
      <h2>{key}</h2>
    {
         this.state.Items[key].map( (breakfast) =>(
  
       <Table.Row  key={breakfast.ItemId}>
       
       <Table.Cell>{breakfast.name} </Table.Cell>
       <Table.Cell>{breakfast.price}</Table.Cell>
       <Table.Cell>    <button  onClick={()=>this.deletequantitycheck(breakfast.ItemId)}>Delete</button> </Table.Cell>
        <Table.Cell>   <button onClick={()=>this.addquantitycheck(breakfast.ItemId)}>Add</button>  </Table.Cell>
       <Table.Cell>    {this.state.quan[breakfast.ItemId]}</Table.Cell>
       <Table.Cell>    </Table.Cell> 
       <Table.Cell>    <button  onClick={()=>this.cartcheck(breakfast.ItemId,breakfast.name,breakfast.price,this.state.quan[breakfast.ItemId])}>Add To cart</button> </Table.Cell>

     </Table.Row>),
)} 

</Table.Body>)

})
          

        return(
            <div>
                <br/>
                {this.state.ordersuccess && <Redirect to="/buyerhome" />}
                {this.state.logout && <Redirect to='/signinbuyer'/>}
               
                   <div className="container">
            
                 <nav class="navbar navbar-expand-lg navbar-dark primary-color">
    
                             <a class="navbar-brand" href="#" style ={{color:'red'}}>GRUBHUB</a>
                             <NavLink to="/userprofile"  exact  class="navbar-brand" activeStyle={ {color:'red'}}>{this.state.name}</NavLink>
                             <a class="navbar-brand"   style={{color:'blue'}} >{this.state.name}</a>
    
                        </nav>

                       { Restitems}
{/* //make objects from query */}

                       
   <div>
               <h2>Cart</h2>
        {!this.state.cartcheck && <p>Your cart is empty</p>}
           {/* //  { this.state.cartcheck && this.Cartdisplay} */}
   {this.state.cartcheck &&
   this.state.cart.map( (cart) =>
             
              (<Table.Row  key={cart.ItemId}>
                
              <Table.Cell>{cart.name} </Table.Cell>
               <Table.Cell>{cart.price}</Table.Cell>
             
               <Table.Cell>    {cart.quantity}</Table.Cell>
               <Table.Cell>{cart.total}</Table.Cell>
             </Table.Row>),

            
     )

      
}

<p> Total :  {this.state.globaltotal}</p>

{this.state.cartcheck && <button onClick={this.checkouthandler }>Check Out</button>}
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

    
