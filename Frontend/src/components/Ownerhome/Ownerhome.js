import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link, NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import { Table, Menu, Icon, Button, Tab } from 'semantic-ui-react';


class Ownerhome extends Component {
    //constructor

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component


        this.state = {

            name: "",
            search: "",
            searchsuccess: 0,
            logout: false,
            email: "",
            type: 'owner' ,
            orderlist: [],
            deliveredlist:[],
            currentorderslist:[],
            Rid:""
        }


        this.updateorder=this.updateorder.bind(this);
        this.getcurrentorders=this.getcurrentorders.bind(this);

    }



    componentDidMount = () => {

        const Emailid = this.props.match.params.email;
        console.log("Email id form match prop ", Emailid)
        this.setState(
            {
                email: Emailid
            }
        );

        console.log("state email patamenrte", this.state.email)
        console.log("Inside the component did mount")
        const data = {
            email: Emailid,
            type: 'owner'
        }
        console.log("this is email", data.email)

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/getdata', data)
            .then(response => {
                console.log("response.data.name ", response.data.Name);
                console.log("response  ", response);
                console.log("response.body", response.body)
                if (response.status === 200) {
                    this.setState({
                        name: response.data.OwnerName,

                    })

                   

                    localStorage.setItem('rest_id',response.data._id);
                    localStorage.setItem('restimage',response.data.RestaurentImage);
                    localStorage.setItem('restname',response.data.Name);
                    localStorage.setItem('cuisine',response.data.Cuisine);
                    localStorage.setItem('restOwnerName',response.data.OwnerName);
                }
                else {
                    this.setState({
                        // errormessege:true,
                    })

                }
            })
            .catch(err => {

                console.log('Search  exist in getting name:')
                console.log('err:', err)
                this.setState({
                    name: "no data",
                    searchcheck: 2,
                    errormessege: true
                })
            })

        //Getting orders from Restaurents
        this.getcurrentorders();

     



    }

getcurrentorders=()=>{
    const data = {
        id: localStorage.getItem('rest_id'),
        type: 'owner'
    }

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/getResOrders', data)
    .then(response => {

        console.log("response  ", response);
        console.log("response.body", response.body)
        if (response.status === 200) {
            console.log("response.data.length  ",response.data.length)
           if(response.data.length>=1)
            this.setState({
                deliveredlist:[],
             currentorderslist:[]
            })
            var l1=[];
            var l2=[];
            
//async await can be call
          response.data.forEach(element => {
                if(element.status==='d')
                l1.push(element);
                else if(element.status !== 'c')
                l2.push(element);      
            });

            this.setState({
                deliveredlist:l1,
             currentorderslist:l2
            })

           
        }
        else {
            console.log("Response is  not expexcted as in Getresorders ");
        }
    })
    .catch(err => {

        //console.log('Error  exist in getting name:')
        console.log('err:', err)
        this.setState({
            orderlist: "No data found",

        })
    })

}



updateorder=(currentstatus,id)=>
{

    const data={
        status:currentstatus,
        orderid:id
    }

    axios.defaults.withCredentials = true;
console.log(data);

    axios.post('http://localhost:3001/orders/updateorders', data)
    .then(response => {

        console.log("response  ", response);
        console.log("response.body", response.body)
        if (response.status === 200) {
             console.log("Order Successfully updated");
  }
        else {
            console.log("Response is  not expexcted as in Get res orders ");
        }
    })
    .catch(err => {

        console.log('Order update failed')
        console.log('err:', err)
       
    })


//call async await

this.getcurrentorders();

}

    render() {

        var url = "/ownerprofile/" + this.state.email;

              
        var menuurl="/restaurentmenu";

       // var runningorders

        if (this.state.currentorderslist !== "") {
       var  runningorder  = <Table.Body>

                {this.state.currentorderslist.map((orderlist) =>

                    (
                        <Table.Row > Orders </Table.Row> ,
                         <Table.Row>

                            { orderlist.Description.split("/").slice(1).map((element => {
                                    return <Table.Row>
                                        <Table.Cell>Item name :{element.split(",")[0]}  </Table.Cell>
                                        <Table.Cell> Price :{element.split(",")[1]}  </Table.Cell>
                                        <Table.Cell> Quantity :{element.split(",")[2]}   </Table.Cell>
                                    </Table.Row>
                                }))}
                               <td>

                                <input type="radio" name={orderlist._id} value="New" checked={ orderlist.status === 'n' } onChange={()=>this.updateorder('n',orderlist._id)}/> New 
                                <input type="radio" name={orderlist._id} value="Preparing" checked={ orderlist.status === 'p'} onChange={()=>this.updateorder('p',orderlist._id)}/>Preparing 
                                <input type="radio" name={orderlist._id} value="Ready" checked={ orderlist.status === 'r'} onChange={()=>this.updateorder('r',orderlist._id)}/>Ready
                                <input type="radio" name={orderlist._id} value="Delivered" checked={ orderlist.status=== 'd'} onChange={()=>this.updateorder('d',orderlist._id)}/> Delivered
                                 
                              </td>
                            <td>
                            
                                <button onClick={()=>this.updateorder('c',orderlist._id)}>Cancel Order</button>
                               
                            </td>
                     </Table.Row>),
                )}

            </Table.Body>

        }


        if (this.state.deliveredlist !== "") {
            var DeliveredOrder  = <Table.Body>
     
                     {this.state.deliveredlist.map((orderlist) =>
     
                         (
                             <Table.Row > Orders </Table.Row> ,
                              <Table.Row>
     
                                 { orderlist.Description.split("/").slice(1).map((element => {
                                         return <Table.Row>
                                             <Table.Cell>Item name :{element.split(",")[0]}  </Table.Cell>
                                             <Table.Cell> Price :{element.split(",")[1]}  </Table.Cell>
                                             <Table.Cell> Quantity :{element.split(",")[2]}   </Table.Cell>
                                         </Table.Row>
                                     }))}
                                  
                          </Table.Row>),
                     )}
     
                 </Table.Body>
     
             }

        return (
            <div>
                <br />
                {this.state.logout && <Redirect to='/signinowner' />}

                <div className="container">

                    <nav class="navbar navbar-expand-lg navbar-dark primary-color">
                        <a class="navbar-brand" href="#" style={{ color: 'red' }}>GRUBHUB</a>
                        <NavLink to={url} exact class="navbar-brand" activeStyle={{ color: 'red' }}> Profile: {this.state.name}</NavLink>
                    </nav>

                    <nav class="navbar navbar-expand-lg navbar-dark primary-color">
                        <a class="navbar-brand" href="#" style={{ color: 'red' }}>GRUBHUB</a>
                        <NavLink to={menuurl} exact class="navbar-brand" activeStyle={{ color: 'red' }}> Menu </NavLink>
                    </nav>
                    

                    <br></br>
                    <br></br>
                    <br></br>
                        <p>Current Orders</p>

                             {runningorder}

                        <p>Past Orders</p>
                             {DeliveredOrder}

                <div style={{ width: '30%' }}>




                    </div>

                    <br />

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

export default Ownerhome;







