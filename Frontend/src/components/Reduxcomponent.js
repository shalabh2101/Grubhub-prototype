import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { listchecks: state.listchecks };
};

const Reduxcomp = ({ listchecks }) => (
   <p>authentication status{listchecks}</p>
);
const Reduxcomponent = connect(mapStateToProps)(Reduxcomp);
export default Reduxcomponent;