const initialState = {
    listchecks: "NO AUTHENTICATION"
  };
  function rootReducer(state = initialState, action) {
    if (action.type === "CHECK_LOGIN") {
      return Object.assign({}, state, {
        listchecks: action.payload
        // listchecks: state.listchecks.concat(action.payload)
      });
    }
    return state;
  }
  export default rootReducer;