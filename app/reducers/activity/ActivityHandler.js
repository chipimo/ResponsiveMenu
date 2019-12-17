const ActivityReducer = (
    state = {
      msg: "No activity detected",
      isLoading: false,
      err: false
    },
    action
  ) => {
    switch (action.type) {
      case "OnActivity":
        state = {
          ...state,
          msg: action.payload,
          err: action.err,
          isLoading: true
        };
        break;
      case "ActivityDone":
        state = {
          ...state,
          err: action.err,
          msg: action.payload,
          isLoading: false
        };
        break;
    }
    return state;
  };
  
  export default ActivityReducer;
  