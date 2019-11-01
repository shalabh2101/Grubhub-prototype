import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link, NavLink } from 'react-router-dom'

import { Table, Menu, Icon, Button } from 'semantic-ui-react';
import { isNull } from 'util';
import { Dialog ,TextField} from '@material-ui/core';
//import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import {FlatButton} from 'react-native-flat-button';




class Restaurent extends Component {
    //constructor

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        var lunchquantity = [];

        this.state = {


            breakfast: {},
            Items: {},
            dialogstatus:false,
            dialogitemname:"",
            dialogitemprice:"",
            currentsection:""

        }





      
        this.handleClose=this.handleClose.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handledialogitem=this.handledialogitem.bind(this);

    }




    componentWillMount = () => {

        const Restaurentid = this.props.match.params.id;
        console.log(Restaurentid);

        console.log("Inside the  Restaurent Menu did mount")
        const data = {
            id: Restaurentid,
            type:'owner'
     }

        console.log("this is id", data.id)

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/getrestaurentmenu/', data)
            .then(response => {

                console.log("response  ", response);
                console.log(response.data)
                if (response.status === 200) {

                    console.log("Updating fooditems state");
                    if (isNull(response.data)) { console.log("breakfast is null") }
                    this.setState({
                        Items: response.data,
                    })
                    console.log(response.data)

                }
                else { console.log("something not right") }
            })
            .catch(err => {
                console.log('Restaurent  catch error: 1')
                console.log('err:', err)
                this.setState({
                    errormessege: true
                })
            });



    }


    

    handleClose=()=>
    {
        
        this.setState(
            {
                dialogstatus:false,
                dialogitemname:"",
                dialogitemprice:""
            }
        )
        console.log("came till handle submit");
    }


    handleSubmit=()=>
    {
          

           const data={
               itemName:this.state.dialogitemname,
               itemPrice:this.state.dialogitemprice,
               section:this.state.currentsection
           }



          axios.post('http://localhost:3001/postitem/', data)
          .then(response => {

              console.log("response  ", response);
              console.log(response.data)
              if (response.status === 200) {

                  console.log("Updating item db");

                 
              }
              else { console.log("Updating item db") }

          })
          .catch(err => {
              console.log('postitem  catch error: 1')
              console.log('err:', err)
              
          });


        this.setState(
            {
                dialogstatus:false,
                dialogitemname:"",
                dialogitemprice:""
            }
        )
        console.log("came till handle submit");
    }


    handledialogitem=(e)=>{
        this.setState({
            dialogitemname:e.target.value
        })
    
    }


    

    render() {



let  newitemDialog=<Dialog open={this.state.dialogstatus} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.state.currentsection}
          </DialogContentText>
          
          <TextField
          
            autoFocus
            margin="dense"
            id="itemname"
            label="Item Name"
           onChange={this.handledialogitem}
            fullWidth
          />

        <TextField
            autoFocus
            margin="dense"
            id="Price"
            label="Price"
            onChange={(e) => this.setState({
               dialogitemprice:e.target.value
           })}
            fullWidth 
          />

        
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

        


        let Restitems = Object.keys(this.state.Items).map((key) => {

            return (
                <Table.Body>
                    <h2>{key}</h2>
                    {newitemDialog }
                    <button onClick={()=>this.setState({dialogstatus:true,currentsection:key})}> New Item </button>
                    {
                        this.state.Items[key].map((breakfast) => (
                        <Table.Row key={breakfast.ItemId}>
                                <Table.Cell>{breakfast.name} </Table.Cell>
                                <Table.Cell>{breakfast.price}</Table.Cell>
                        </Table.Row>),
                        )}

                </Table.Body>)

        })


        return (
            <div>
                <br />
                {this.state.ordersuccess && <Redirect to="/buyerhome" />}
                {this.state.logout && <Redirect to='/signinbuyer' />}
              

                <div className="container">

                    <nav class="navbar navbar-expand-lg navbar-dark primary-color">

                        <a class="navbar-brand" href="#" style={{ color: 'red' }}>GRUBHUB</a>
                        <NavLink to="/userprofile" exact class="navbar-brand" activeStyle={{ color: 'red' }}>{this.state.name}</NavLink>
                        <a class="navbar-brand" style={{ color: 'blue' }} >{this.state.name}</a>

                    </nav>

                    {Restitems}

                </div>
            </div>
        )
    }

}
export default Restaurent;


