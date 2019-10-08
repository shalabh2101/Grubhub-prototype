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
               breakfast:[],
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
               cartvalue:""

               
             }

            
             
            this.findindex=this.findindex.bind(this);
        this.addquantitycheck=this.addquantitycheck.bind(this);
        this.deletequantitycheck=this.deletequantitycheck.bind(this);
           }
    
          
    

    componentWillMount=()=>{

      this.setState({
        ordersuccess:false}
      )


      
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

var newcart=this.state.cart;
newcart.push(data)
var temp= this.state.cartvalue;
temp= temp="/"+val2+","+val3+","+val4 ;



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
 
 //console.log(val);
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

checkouthandler=()=>{


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
          if( isNull(response.data))
             {console.log("order is null")}
          this.setState({
                 cart:"",    
                 ordersuccess:true
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
  
        return(
            <div>
                <br/>
                {this.state.ordersuccess && <Redirect to="/ownerhome" />}
                {this.state.logout && <Redirect to='/signinbuyer'/>}
               
                   <div className="container">
            
                 <nav class="navbar navbar-expand-lg navbar-dark primary-color">
    
                             <a class="navbar-brand" href="#" style ={{color:'red'}}>GRUBHUB</a>
                             <NavLink to="/userprofile"  exact  class="navbar-brand" activeStyle={ {color:'red'}}>{this.state.name}</NavLink>
                             <a class="navbar-brand"   style={{color:'blue'}} >{this.state.name}</a>
    
                        </nav>

                      
{/* //make objects from query */}
<h2>Breakfast</h2>
<Table.Body>  
         {/* add image too */}
          {/* <Table.Body>   */}
            {this.state.breakfast.map( (breakfast) =>


            
              (<Table.Row  key={breakfast.ItemId}>
 
               <Table.Cell>{breakfast.name} </Table.Cell>
               <Table.Cell>{breakfast.price}</Table.Cell>
               <Table.Cell>    <button  onClick={()=>this.deletequantitycheck(breakfast.ItemId)}>Delete</button> </Table.Cell>
                <Table.Cell>   <button onClick={()=>this.addquantitycheck(breakfast.ItemId)}>Add</button>  </Table.Cell>
               <Table.Cell>    {this.state.quan[breakfast.ItemId]}</Table.Cell>
               <Table.Cell>    </Table.Cell> 
               <Table.Cell>    <button  onClick={()=>this.cartcheck(breakfast.ItemId,breakfast.name,breakfast.price,this.state.quan[breakfast.ItemId])}>Add To cart</button> </Table.Cell>

             </Table.Row>),
     )} 

     </Table.Body>
       


    <h2>Lunch</h2>      
    <Table.Body>  
         {/* add image too */}
          {/* <Table.Body>   */}
            {this.state.lunch.map( (breakfast) =>
              (<Table.Row  key={breakfast.ItemId}>
 
               <Table.Cell>{breakfast.name} </Table.Cell>
               <Table.Cell>{breakfast.price}</Table.Cell>
               <Table.Cell>    <button  onClick={()=>this.deletequantitycheck(breakfast.ItemId)}>Delete</button> </Table.Cell>
                <Table.Cell>   <button onClick={()=>this.addquantitycheck(breakfast.ItemId)}>Add</button>  </Table.Cell>
               <Table.Cell>    {this.state.quan[breakfast.ItemId]}</Table.Cell>
               
             </Table.Row>),
     )} 

     </Table.Body>


    <h2>Dinner</h2>

 <Table.Body>  
         {/* add image too */}
          {/* <Table.Body>   */}
            {this.state.dinner.map( (breakfast) =>
              (<Table.Row  key={breakfast.ItemId}>
 
               <Table.Cell>{breakfast.name} </Table.Cell>
               <Table.Cell>{breakfast.price}</Table.Cell>
               <Table.Cell>    <button  onClick={()=>this.deletequantitycheck(breakfast.ItemId)}>Delete</button> </Table.Cell>
                <Table.Cell>   <button onClick={()=>this.addquantitycheck(breakfast.ItemId)}>Add</button>  </Table.Cell>
               <Table.Cell>    {this.state.quan[breakfast.ItemId]}</Table.Cell>
               
             </Table.Row>),
     )} 
     </Table.Body>
                       
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

<p>{this.state.globaltotal}</p>

{this.state.cartcheck && <button onClick={()=>this.checkouthandler }>Check Out</button>}

)


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

    

    //multer
    //session managementy
    //report
    //aws deployemmt
    //jmeter
    