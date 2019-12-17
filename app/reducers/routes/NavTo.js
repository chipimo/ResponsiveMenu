const NavToReducer = (state = { navTo: 'Store', id: "router", isSet:false}, action) => {
  switch (action.type) {
    case "NevToProfile":
      state = {
        navTo: action.nav,
        id: "router",
        isSet:action.isSet,
        isAcitve:action.isAcitve
      };
      break;
  }
  return state;
};

export default NavToReducer;
