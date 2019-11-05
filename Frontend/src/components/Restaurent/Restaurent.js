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
               Items:{},
               quantity:{},
               messegebutton:true,
               messegebody:false,
               messegetextt:""

               
             }


        this.addquantitycheck=this.addquantitycheck.bind(this);
        this.deletequantitycheck=this.deletequantitycheck.bind(this);
        this.checkouthandler=this.checkouthandler.bind(this);
        this.messegetexthandler=this.messegetexthandler.bind(this);
        this.messegehandler=this.messegehandler.bind(this);
      this.messegebuttoncheck=this.messegebuttoncheck.bind(this);
        
 }
    
          
    

    componentWillMount=()=>{
      console.log("calling");
var i;
        for(i=0;i<1000;i++)
        this.state.quan[i]=0;
        console.log(this.state.quan);

        const Restaurentid = this.props.match.params.id;
        localStorage.setItem('rest_id',Restaurentid)
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
           var tempobjects=response.data;
            Object.keys(tempobjects).map((key)=>{
                    tempobjects[key].map( (breakfast) =>{
                     
              var tempquantity=this.state.quantity;
              tempquantity[breakfast._id]=0;
              this.setState(
                {
                  quantity:tempquantity
                }
              )
         
          
       
        
        })
        
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
      order:this.state.cartvalue,
      name: localStorage.getItem('name_buyer'),
      id:localStorage.getItem('buyer_id'),
      rid:localStorage.getItem('rest_id'),
      restname:localStorage.getItem('restimage'),
      restimage:localStorage.getItem('restname'),
  }

  axios.post('http://localhost:3001/orders/postorder/', data)
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
  var tempquantity=this.state.quantity;
  tempquantity[val1]=tempquantity[val1]+1;
  console.log(val1);
  this.setState({
    quantity:tempquantity
  });
 
  console.log("checking handler");
  console.log(val1);
  //console.log(val2);
 console.log(this.state.quantity[val1]);



//  console.log("checking handler");
//  var twan=this.state.quan;
//  twan[val1]=twan[val1]+1;
//  console.log(val1);
//  this.setState({
//    quan:twan
//  });

//  console.log("checking handler");
//  console.log(val1);
//  //console.log(val2);
// console.log(this.state.quan[val1]);
}

deletequantitycheck=(val1)=>
{  

  console.log("checking handler");
  var tempquantity=this.state.quantity;
  if(tempquantity[val1]>0)
  tempquantity[val1]=tempquantity[val1]-1;
  console.log(val1);
  this.setState({
    quantity:tempquantity
  });
 
  console.log("checking handler");
  console.log(val1);
  //console.log(val2);
 console.log(this.state.quantity[val1]);

}


messegetexthandler=(e)=>{

  this.setState(
    {
      messegetext : e.target.value
    }
  )
}

messegehandler=()=>
{

  const data={
  
    to: localStorage.getItem('rest_id'),
    from: localStorage.getItem('buyer_id'),
    restname:"",
    restimage:"",
    buyername: localStorage.getItem('name_buyer'),
    buyerimage:"",
    messege:this.state.messegetext

  }

  axios.post('http://localhost:3001/postmessege/', data)
  .then(response=>{
    
     console.log("response  ",response);
     console.log(response.data)
      if(response.status === 200 ){ 

          console.log("Messege is updated ");
         
          this.setState({
             messegebody:false,
            messegebutton:true,
            messegetext:""
      })   }
      else
         {console.log("something not right")}

})
  .catch(err=>{
      console.log('postorder  catch error: 1')
  console.log('err:', err)
  this.setState({
    messegebody:false,
    messegebutton:true,
    messegetext:""
  })
  });

}


messegebuttoncheck=(e)=>{
   

  console.log("messegebutton",this.state.messegebutton);
  console.log("messegebody",this.state.messegebody);
  
  this.setState(
    {
      messegebutton:false,
      messegebody:true
    }
  );

  console.log("messegebutton",this.state.messegebutton);
  console.log("messegebody",this.state.messegebody);

}




    render()
    {    

   
   let Restitems= Object.keys(this.state.Items).map((key)=>{

      return (    
    <Table.Body>  
      <h2>{key}</h2>
    {
         this.state.Items[key].map( (breakfast) =>(
  
       <Table.Row  key={breakfast._id}>
       
       <Table.Cell>{breakfast.Name} </Table.Cell>
       <Table.Cell>{breakfast.Price}</Table.Cell>
       <Table.Cell>    <button  onClick={()=>this.deletequantitycheck(breakfast._id)}>Delete</button> </Table.Cell>
        <Table.Cell>   <button onClick={()=>this.addquantitycheck(breakfast._id)}>Add</button>  </Table.Cell>
       <Table.Cell>    {this.state.quantity[breakfast._id]}</Table.Cell>
       <Table.Cell>    </Table.Cell> 
       <Table.Cell>    <button  onClick={()=>this.cartcheck(breakfast._id,breakfast.Name,breakfast.Price,this.state.quantity[breakfast._id])}>Add To cart</button> </Table.Cell>

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

              {  this.state.messegebutton &&  <div style={{width: '30%'}}>
                            <button  className="btn btn-success" onClick={this.messegebuttoncheck } >Messege to Restaurent owner</button>
                        </div>  }

               
              {  this.state.messegebody &&  <div style={{width: '30%'}}>
                      <div style={{width: '30%'}} className="form-group">
                        <input required onChange = {this.messegetexthandler}  type="text" className="form-control" name="email" placeholder="Enter the messege" ></input>
                      </div>
                            <button  className="btn btn-success" onClick={this.messegehandler } >Send Messege</button>
                        </div>  }


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
             
               <Table.Cell>  {cart.quantity}</Table.Cell>
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

    
