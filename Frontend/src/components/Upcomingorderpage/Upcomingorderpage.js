import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, NavLink } from 'react-router-dom'

import { Table, Menu, Icon, Tab } from 'semantic-ui-react';
import { isNull } from 'util';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import Draggable from 'react-draggable'; // The default
//import ReactMotion from 'react-motion';

//import Card from '@material-ui/core/Card';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');

var ReactMotion=require('react-motion');

//var range = require('lodash.range');
//var React = require('react');
//You need this npm package to do createReactClass
//var createReactClass = require('create-react-class');

// npm install --save react-motion


// const dataStructure = [ // structure that models our initial rendered view of items
//     [0, 1, 2],
//     [3, 4, 5, 6, 7],
//     [8, 9, 10, 11]
// ]

// const reinsert = (array, colFrom, rowFrom, colTo, rowTo) => {
//     const _array = array.slice(0);
//     const val = _array[colFrom][rowFrom];
//     _array[colFrom].splice(rowFrom, 1);
//     _array[colTo].splice(rowTo, 0, val);
//     calculateVisiblePositions(_array);
//     return _array;
// }

// const gutterPadding = 21;
// const clamp = (n, min, max) => Math.max(Math.min(n, max), min);
// const getColumnWidth = () => (window.innerWidth / dataStructure.length) - (gutterPadding / dataStructure.length); // spread columns over available window width
// const height = 110; // crappy fixed item height :(

// let width = getColumnWidth(),
//     layout = null;

// // items are ordered by their index in this visual positions array
// const calculateVisiblePositions = (newOrder) => {
//     width = getColumnWidth();
//     layout = newOrder.map((column, col) => {
//        return range(column.length + 1).map((item, row) => {
//            return [width * col, height * row];
//        });
//    });
// }

// // define spring motion opts
// const springSetting1 = {stiffness: 180, damping: 10};
// const springSetting2 = {stiffness: 150, damping: 16};

// const Okok = createReactClass({
//     getInitialState() {
//         return {
//             mouse: [0, 0],
//             delta: [0, 0], // difference between mouse and item position, for dragging
//             lastPress: null, // key of the last pressed component
//             currentColumn: null,
//             isPressed: false,
//             order: dataStructure, // index: visual position. value: component key/id
//             isResizing: false
//         };
//     },

//     componentWillMount() {
//         this.resizeTimeout = null;
//         calculateVisiblePositions(dataStructure);
//     },

//     componentDidMount() {
//         window.addEventListener('touchmove', this.handleTouchMove);
//         window.addEventListener('mousemove', this.handleMouseMove);
//         window.addEventListener('touchend', this.handleMouseUp);
//         window.addEventListener('mouseup', this.handleMouseUp);
//         window.addEventListener('resize', this.handleResize);
//     },

//     componentWillUnmount() {
//         window.removeEventListener('resize', this.handleResize);
//     },

//     handleTouchStart(key, currentColumn, pressLocation, e) {
//         this.handleMouseDown(key, currentColumn, pressLocation, e.touches[0]);
//     },

//     handleTouchMove(e) {
//         e.preventDefault();
//         this.handleMouseMove(e.touches[0]);
//     },

//     handleMouseMove({pageX, pageY}) {
//         const {order, lastPress, currentColumn: colFrom, isPressed, delta: [dx, dy]} = this.state;
//         if (isPressed) {
//             const mouse = [pageX - dx, pageY - dy];
//             const colTo = clamp(Math.floor((mouse[0] + (width / 2)) / width), 0, 2);
//             const rowTo = clamp(Math.floor((mouse[1] + (height / 2)) / height), 0, 100);
//             const rowFrom = order[colFrom].indexOf(lastPress);
//             const newOrder = reinsert(order, colFrom, rowFrom, colTo, rowTo);
//             this.setState({
//                 mouse,
//                 order: newOrder,
//                 currentColumn: colTo
//             });
//         }
//     },

//     handleMouseDown(key, currentColumn, [pressX, pressY], {pageX, pageY}) {
//         this.setState({
//             lastPress: key,
//             currentColumn,
//             isPressed: true,
//             delta: [pageX - pressX, pageY - pressY],
//             mouse: [pressX, pressY],
//         });
//     },

//     handleMouseUp() {
//         this.setState({
//             isPressed: false,
//             delta: [0, 0]
//         });
//     },

//     handleResize() {
//         clearTimeout(this.resizeTimeout);
//         this.applyResizingState(true);
//         // resize one last time after resizing stops, as sometimes this can be a little janky sometimes...
//         this.resizeTimeout = setTimeout(() => this.applyResizingState(false), 100);
//     },

//     applyResizingState(isResizing) {
//         this.setState({ isResizing });
//         calculateVisiblePositions(dataStructure);
//     },

//     render() {
//         const { order, lastPress, currentColumn, isPressed, mouse, isResizing } = this.state;
//         return (
//             <div className="items">
//                 {order.map( (column, colIndex) => {
//                     return (
//                         column.map( (row) => {
//                             let style,
//                                 x,
//                                 y,
//                                 visualPosition = order[colIndex].indexOf(row),
//                                 isActive = (row === lastPress && colIndex === currentColumn && isPressed);

//                             if(isActive) {
//                                 [x, y] = mouse;
//                                 style = {
//                                     translateX: x,
//                                     translateY: y,
//                                     scale: ReactMotion.spring(1.1, springSetting1)
//                                 };
//                             } else if(isResizing) {
//                                 [x, y] = layout[colIndex][visualPosition];
//                                 style = {
//                                     translateX: x,
//                                     translateY: y,
//                                     scale: 1
//                                 };
//                             } else {
//                                 [x, y] = layout[colIndex][visualPosition];
//                                 style = {
//                                     translateX: ReactMotion.spring(x, springSetting2),
//                                     translateY: ReactMotion.spring(y, springSetting2),
//                                     scale: ReactMotion.spring(1, springSetting1)
//                                 };
//                             }

//                             return (
//                                 <ReactMotion.Motion key={row} style={style}>
//                                     {({translateX, translateY, scale}) =>
//                                     <div
//                                         onMouseDown={this.handleMouseDown.bind(null, row, colIndex, [x, y])}
//                                         onTouchStart={this.handleTouchStart.bind(null, row, colIndex, [x, y])}
//                                         className={isActive ? 'item is-active' : 'item'}
//                                         style={{
//                                             WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
//                                             transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
//                                             zIndex: (row === lastPress && colIndex === currentColumn) ? 99 : visualPosition,
//                                         }}>Item {row + 1}</div>
//                                     }
//                                 </ReactMotion.Motion>
//                             )
//                         })
//                     )
//                 })}
//             </div>
//         )
//     }
// });

//ReactDOM.render(<List />, document.getElementById('react-root'));


// class Upcomingorderpage extends Component {
//     //constructor

//     constructor(props) {
//         //Call the constrictor of Super class i.e The Component
//         super(props);
//         //maintain the state required for this component

//         this.state = {
//             pastorder: []
//         }
//         this.getitems = this.getitems.bind(this);
//     }


//     componentWillMount = () => {
//         ///
//         console.log("Inside the  upcoming order component will mount")
//         const data = {
//             type: 'u'
//         }

//         //  console.log("this is id", data1.id)

//         axios.defaults.withCredentials = true;

//         axios.post('http://localhost:3001/getpastorders/', data)
//             .then(response => {

//                 console.log("response  ", response);
//                 console.log(response.data)
//                 if (response.status === 200) {
//                     console.log("order fetched");
//                     if (isNull(response.data)) { console.log("breakfast is null") }
//                     this.setState({
//                         pastorder: response.data,
//                     })
//                 }
//                 else { console.log("something not right") }
//             })
//             .catch(err => {
//                 console.log('ordeer catch errrosr: 1')
//                 console.log('err:', err)
//                 this.setState({
//                     errormessege: true
//                 })
//             });
//     }

//     getitems = (item) => {
//         console.log("checking get items items ", item);

//         return item.map(element => {

//             var tempitem = element.split(",")



//             // return  <Card.Body>

//             //  <Card.Text>  Item name :{tempitem[0]}</Card.Text>
//             //  <Card.Text> Price :{tempitem[1]}</Card.Text>
//             //  <Card.Text>    Quantity :{tempitem[2]}</Card.Text>

//             //  </Card.Body>


//             return <Table.Row>
//                 <Table.Cell>
//                     Item name :{tempitem[0]}
//                 </Table.Cell>
//                 <Table.Cell>
//                     Price :{tempitem[1]}
//                 </Table.Cell>
//                 <Table.Cell>
//                     Quantity :{tempitem[2]}
//                 </Table.Cell>
//             </Table.Row>
//         });


//     }
//     render() {




//         let orderlist;
//         console.log(" Inside Render -this.state.pastorder ", this.state.pastorder)
//         if (this.state.pastorder !== "No data found") {
//             orderlist = <Table.Body>
//                 {this.state.pastorder.map((pastorder) =>
//                     (
//                         <Table.Row>
//                             <Table.Cell>{pastorder.resname}</Table.Cell>

//                             <Table.Cell>{this.getitems(pastorder.orderitems)} </Table.Cell>
//                         </Table.Row>
//                     ),
//                 )},
//               </Table.Body>
//         }
//         {/* <Card style={{ width: '18rem' }}>
//             {this.state.pastorder.map((pastorder) =>(
//             <Card.Title>{pastorder.resname}</Card.Title>,
// //             <Card.Body>    {this.getitems(pastorder.orderitems)}  </Card.Body>

// //            ),
// //             )},
// //        </Card> */}


// //         return (
// //             <div>
// //                 <br />

// //                 {this.state.logout && <Redirect to='/signinbuyer' />}

// //                 <div className="container">
// //                     <nav class="navbar navbar-expand-lg navbar-dark primary-color">
// //                         <a class="navbar-brand" href="#" style={{ color: 'red' }}>GRUBHUB</a>
// //                         <NavLink to="/userprofile" exact class="navbar-brand" activeStyle={{ color: 'red' }}>{this.state.name}</NavLink>
// //                         <a class="navbar-brand" style={{ color: 'blue' }} >{this.state.name}</a>

// //                     </nav>

// //                     <h2>Upcoming Orders</h2>

// //                     <Card>

// //                         <CardText>   Card body </CardText>
// //                     </Card>

// //                     <Col sm="6" >
// //                         <Card body style={{ background: 'red' }}>
// //                             <CardTitle >Special Title Treatment</CardTitle>
// //                             <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
// //                             <Button>Go somewhere</Button>
// //                         </Card>
// //                     </Col>

// //                     {orderlist}

// //                     <div style={{ width: '30%' }}>
// //                         <button className="btn btn-success"  >Log out</button>
// //                     </div>
// //                 </div>
// //             </div>
// //         )
// //     }

// // }
// // export default Upcomingorderpage;



// var range = require('lodash.range');
// //var React = require('react');

// var createReactClass = require('create-react-class');




// var dataStructure = [ // structure that models our initial rendered view of items
//     [0, 1, 2],
//     [3, 4, 5, 6, 7],
//     [8, 9, 10, 11]
// ]

// const reinsert = (array, colFrom, rowFrom, colTo, rowTo) => {
//     const _array = array.slice(0);
//     const val = _array[colFrom][rowFrom];
//     _array[colFrom].splice(rowFrom, 1);
//     _array[colTo].splice(rowTo, 0, val);
//     calculateVisiblePositions(_array);
//     return _array;
// }

// const gutterPadding = 21;
// const clamp = (n, min, max) => Math.max(Math.min(n, max), min);
// const getColumnWidth = () => (window.innerWidth / dataStructure.length) - (gutterPadding / dataStructure.length); // spread columns over available window width
// const height = 110; // crappy fixed item height :(

// let width = getColumnWidth(),
//     layout = null;

// // items are ordered by their index in this visual positions array
// const calculateVisiblePositions = (newOrder) => {
//     width = getColumnWidth();
//     layout = newOrder.map((column, col) => {
//        return range(column.length + 1).map((item, row) => {
//            return [width * col, height * row];
//        });
//    });
// }

// // define spring motion opts
// const springSetting1 = {stiffness: 180, damping: 10};
// const springSetting2 = {stiffness: 150, damping: 16};

// const Upcomingorderpage = createReactClass({
   

//     getInitialState() {
//         return {
//             mouse: [0, 0],
//             delta: [0, 0], // difference between mouse and item position, for dragging
//             lastPress: null, // key of the last pressed component
//             currentColumn: null,
//             isPressed: false,
//             order: dataStructure, // index: visual position. value: component key/id
//             isResizing: false,
//             pastorder: []
//         };
//     },
  
//     componentWillMount() {
//         this.resizeTimeout = null;


//         console.log("Inside the  upcoming order component will mount")
//         const data = {
//             type: 'u'
//         }
    
    
//         axios.defaults.withCredentials = true;
    
//         axios.post('http://localhost:3001/getpastorders/', data)
//             .then(response => {
    
//                 console.log("response  ", response);
//                 console.log(response.data)
//                 if (response.status === 200) {
//                     console.log("order fetched");
//                     if (isNull(response.data)) { console.log("breakfast is null") }
//                     this.setState({
//                         pastorder: response.data,
//                     })
//                     dataStructure=response.data;
//                     console.log("response data     jjjjjjj")
//                     console.log(response.data)
//                     calculateVisiblePositions(dataStructure);
//                 }
//                 else { console.log("something not right") }
//             })
//             .catch(err => {
//                 console.log('ordeer catch errrosr: 1')
//                 console.log('err:', err)
//                 this.setState({
//                     errormessege: true
//                 })
//             });
// console.log("99999999")
//   console.log((this.state.pastorder));
//   //  dataStructure=JSON.parse(this.state.pastorder);
//             //calculateVisiblePositions(this.state.pastorder);
//        // calculateVisiblePositions(dataStructure);
//     },

//     componentDidMount() {
//         window.addEventListener('touchmove', this.handleTouchMove);
//         window.addEventListener('mousemove', this.handleMouseMove);
//         window.addEventListener('touchend', this.handleMouseUp);
//         window.addEventListener('mouseup', this.handleMouseUp);
//         window.addEventListener('resize', this.handleResize);
//     },

//     componentWillUnmount() {
//         window.removeEventListener('resize', this.handleResize);
//     },

//     handleTouchStart(key, currentColumn, pressLocation, e) {
//         this.handleMouseDown(key, currentColumn, pressLocation, e.touches[0]);
//     },

//     handleTouchMove(e) {
//         e.preventDefault();
//         this.handleMouseMove(e.touches[0]);
//     },

//     handleMouseMove({pageX, pageY}) {
//         const {order, lastPress, currentColumn: colFrom, isPressed, delta: [dx, dy]} = this.state;
//         if (isPressed) {
//             const mouse = [pageX - dx, pageY - dy];
//             const colTo = clamp(Math.floor((mouse[0] + (width / 2)) / width), 0, 2);
//             const rowTo = clamp(Math.floor((mouse[1] + (height / 2)) / height), 0, 100);
//             const rowFrom = order[colFrom].indexOf(lastPress);
//             const newOrder = reinsert(order, colFrom, rowFrom, colTo, rowTo);
//             this.setState({
//                 mouse,
//                 order: newOrder,
//                 currentColumn: colTo
//             });
//         }
//     },

//     handleMouseDown(key, currentColumn, [pressX, pressY], {pageX, pageY}) {
//         this.setState({
//             lastPress: key,
//             currentColumn,
//             isPressed: true,
//             delta: [pageX - pressX, pageY - pressY],
//             mouse: [pressX, pressY],
//         });
//     },

//     handleMouseUp() {
//         this.setState({
//             isPressed: false,
//             delta: [0, 0]
//         });
//     },

//     handleResize() {
//         clearTimeout(this.resizeTimeout);
//         this.applyResizingState(true);
//         // resize one last time after resizing stops, as sometimes this can be a little janky sometimes...
//         this.resizeTimeout = setTimeout(() => this.applyResizingState(false), 100);
//     },

//     applyResizingState(isResizing) {
//         this.setState({ isResizing });
//         calculateVisiblePositions(dataStructure);
//     },


//     getitems (item)  {
//         console.log("checking get items items ", item);

//         return item.map(element => {

//             var tempitem = element.split(",")
//             return <Table.Row>
//                 <Table.Cell>
//                     Item name :{tempitem[0]}
//                 </Table.Cell>
//                 <Table.Cell>
//                     Price :{tempitem[1]}
//                 </Table.Cell>
//                 <Table.Cell>
//                     Quantity :{tempitem[2]}
//                 </Table.Cell>
//             </Table.Row>
//         });

//  },

//     render() {
//         const { order, lastPress, currentColumn, isPressed, mouse, isResizing } = this.state;
//         console.log("order");
//         console.log(order);


//         let orderlist;
//         console.log(" Inside Render -this.state.pastorder ", this.state.pastorder)
//         if (this.state.pastorder !== "No data found") {
//             orderlist = <Table.Body>
//                 {this.state.pastorder.map((pastorder) =>
//                     (
//                         <Table.Row>
//                             <Table.Cell>{pastorder.resname}</Table.Cell>

//                             <Table.Cell>{this.getitems(pastorder.orderitems)} </Table.Cell>
//                         </Table.Row>
//                     ),
//                 )},
//               </Table.Body>
//         }

//         return (

// <div>
// <div>
//                 <br />

//                 {this.state.logout && <Redirect to='/signinbuyer' />}

//                 <div className="container">
//                     <nav class="navbar navbar-expand-lg navbar-dark primary-color">
//                         <a class="navbar-brand" href="#" style={{ color: 'red' }}>GRUBHUB</a>
//                         <NavLink to="/userprofile" exact class="navbar-brand" activeStyle={{ color: 'red' }}>{this.state.name}</NavLink>
//                         <a class="navbar-brand" style={{ color: 'blue' }} >{this.state.name}</a>

//                     </nav>

//                     <h2>Upcoming Orders</h2>

//                     <Card>

//                         <CardText>   Card body </CardText>
//                     </Card>

//                     <Col sm="6" >
//                         <Card body style={{ background: 'red' }}>
//                             <CardTitle >Special Title Treatment</CardTitle>
//                             <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
//                             <Button>Go somewhere</Button>
//                         </Card>
//                     </Col>

//                     {orderlist}

//                     <div style={{ width: '30%' }}>
//                         <button className="btn btn-success"  >Log out</button>
//                     </div>
//                 </div>
//             </div>


//             <div className="items">
//                 {order.map( (column, colIndex) => {
//                     console.log("columns");
//                     console.log(column);
//                     return (
//                         column.map( (row) => {
//                             let style,
//                                 x,
//                                 y,
//                                 visualPosition = order[colIndex].indexOf(row),
//                                 isActive = (row === lastPress && colIndex === currentColumn && isPressed);

//                             if(isActive) {
//                                 [x, y] = mouse;
//                                 style = {
//                                     translateX: x,
//                                     translateY: y,
//                                     scale: ReactMotion.spring(1.1, springSetting1)
//                                 };
//                             } else if(isResizing) {
//                                 [x, y] = layout[colIndex][visualPosition];
//                                 style = {
//                                     translateX: x,
//                                     translateY: y,
//                                     scale: 1
//                                 };
//                             } else {
//                                 [x, y] = layout[colIndex][visualPosition];
//                                 console.log("x ");
//                                 console.log(x);
//                                 console.log("y ");
//                                 console.log(y);
//                                 style = {
//                                     translateX: ReactMotion.spring(x, {stiffness: 180, damping: 10}),
//                                     translateY: ReactMotion.spring(y, springSetting2),
//                                     scale: ReactMotion.spring(1, springSetting1)
//                                 };
//                             }

//                             return (
//                                 <ReactMotion.Motion key={row} style={style}>
//                                     {({translateX, translateY, scale}) =>
//                                     <div
//                                         onMouseDown={this.handleMouseDown.bind(null, row, colIndex, [x, y])}
//                                         onTouchStart={this.handleTouchStart.bind(null, row, colIndex, [x, y])}
//                                         className={isActive ? 'item is-active' : 'item'}
//                                         style={{
//                                             WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
//                                             transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
//                                             zIndex: (row === lastPress && colIndex === currentColumn) ? 99 : visualPosition,
//                                         }}>Item {row + 1}</div>
//                                     }
//                                 </ReactMotion.Motion>
//                             )
//                         })
//                     )
//                 })}
//             </div>
//             </div>
//         )
//     }
// });



class Upcomingorderpage extends Component {
    //constructor

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component

        this.state = {
            pastorder: []
        }
        this.getitems = this.getitems.bind(this);
    }


componentWillMount = () => {
    ///
    console.log("Inside the  upcoming order component will mount")
    const data = {
        id:localStorage.getItem('buyer_id'),
        type: 'u'
    }
    

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

    getitems = (item) => {
        console.log("checking get items items ", item);

        return item.map(element => {

            var tempitem = element.split(",")
            return <Card>
                 <CardText><b>   name </b>{tempitem[0]} </CardText>
                 {/* <CardText>    Price {tempitem[1]} </CardText> */}
                 <CardText>   <b>  Quantity </b>{tempitem[2]} </CardText>
            </Card>
        });


    }

    getstatus = (item) => {
       if(item==='n')
         return 'New';
       
         else if(item==='p')
         return 'Preparing';
         

         else if(item==='r')
         return 'Ready';
        
  }
    
  
  render() {

  let orderlist;
        console.log(" Inside Render -this.state.pastorder ", this.state.pastorder)
        if (this.state.pastorder !== "No data found") {
            orderlist = <Table.Body>
                {this.state.pastorder.map((pastorder) =>
                    (
                        <Col sm="12" >
                        <Card body className="card_work" style={{color: 'azure',margin:'10px'}}>
                            <CardTitle ><h3>{pastorder.resname}</h3></CardTitle>
                            <CardText>{this.getitems(pastorder.orderitems)}</CardText>
                            <CardText><h4> status : {this.getstatus(pastorder.status)}</h4></CardText>
                        </Card>

                        {/* <Table.Row>
                            <Table.Cell>{pastorder.resname}</Table.Cell>



                            <Table.Cell>{this.getitems(pastorder.orderitems)} </Table.Cell>
                        </Table.Row>  */}
                    </Col>
                       
                       
                    ),
                )},
              </Table.Body>
        }
        return (
            <div>
                <br />

                {this.state.logout && <Redirect to='/signinbuyer' />}

                <div className="container">
                    <nav class="navbar navbar-expand-lg navbar-dark primary-color v">
                        <a class="navbar-brand" href="#" style={{ color: 'red' }}>GRUBHUB</a>
                        <NavLink to="/userprofile" exact class="navbar-brand" activeStyle={{ color: 'red' }}>{this.state.name}</NavLink>
                        <a class="navbar-brand" style={{ color: 'blue' }} >{this.state.name}</a>

                    </nav>

                    <h2>Upcoming Orders</h2>

                    {orderlist}

                    
                </div>
            </div>
        )
    }

}
export default Upcomingorderpage;
