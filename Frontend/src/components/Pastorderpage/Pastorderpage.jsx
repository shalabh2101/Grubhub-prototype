import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link, NavLink } from 'react-router-dom'

import { Table, Menu, Icon, Button, Tab } from 'semantic-ui-react';
import { isNull } from 'util';



class Pastorderpage extends Component {
  //constructor

  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    var lunchquantity = [];

    this.state = {

      pastorder: []
    }

this.getitems=this.getitems.bind(this);

  }

  componentWillMount = () => {
    
    console.log("Inside the  Restaurent component did mount")
    const data = {
      
      type: 'd'
    }

   // console.log("this is id", data1.id)

    axios.defaults.withCredentials = true;

    axios.post('http://localhost:3001/getpastorders/', data)
      .then(response => {

        console.log("response  ", response);
        console.log(response.data)
        if (response.status === 200) {
           console.log("order fetched");
          if (isNull(response.data)) { console.log("breakfast is null") }
          this.setState({
            pastorder: response.data,
          })
        }
        else { console.log("something not right") }
      })
      .catch(err => {
        console.log('ordeer catch errrosr: 1')
        console.log('err:', err)
        this.setState({
          errormessege: true
        })
      });
  }




getitems=(item)=>
{
  console.log("checking get items items ",item);

return  item.map(element => {
 
  var tempitem=element.split(",")
  console.log("tempitem "+tempitem);

 return <Table.Row>
 <Table.Cell>
      Item name :{ tempitem[0]}
</Table.Cell>
<Table.Cell>
      Price :{ tempitem[1]  }
</Table.Cell>
<Table.Cell>
     Quantity :{ tempitem[2]  }
</Table.Cell>
</Table.Row>
});


}
 


  render() {

    let orderlist;
    console.log(" Inside Render -this.state.pastorder ",this.state.pastorder)
if(this.state.pastorder !== "No data found")
{
  orderlist= <Table.Body>
            {/* add image too */}
            {/* <Table.Body>   */}
            {this.state.pastorder.map((pastorder) =>
           
 (  
 
 
    <Table.Row >
             
                
     </Table.Row>,
       <Table.Row>
       
              <Table.Cell>{pastorder.resname}</Table.Cell>
               
              <Table.Cell>{this.getitems(pastorder.orderitems)} </Table.Cell>
                
         </Table.Row>),
            )}

          </Table.Body>
  
}

    return (
      <div>
        <br />
        
        {this.state.logout && <Redirect to='/signinbuyer' />}

        <div className="container">
           <nav class="navbar navbar-expand-lg navbar-dark primary-color">
             <a class="navbar-brand" href="#" style={{ color: 'red' }}>GRUBHUB</a>
               <NavLink to="/userprofile" exact class="navbar-brand" activeStyle={{ color: 'red' }}>{this.state.name}</NavLink>
            <a class="navbar-brand" style={{ color: 'blue' }} >{this.state.name}</a>

          </nav>
     {/* //make objects from query */}
          <h2>Breakfast</h2>
         
{orderlist}
   <div style={{ width: '30%' }}>
            <button className="btn btn-success"  >Log out</button>
          </div>

          <br />

          <br />
        </div>
      </div>
    )
  }

}
export default Pastorderpage;



