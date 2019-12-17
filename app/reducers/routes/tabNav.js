const TabNavReducer = (state = { ActiveNav: "" }, action) => {
  switch (action.type) {
    case "SetActiveNav":
    
      state = {
        ActiveNav: action.ActiveNav
      };
      break;
  }
  return state;
};

export default TabNavReducer;
