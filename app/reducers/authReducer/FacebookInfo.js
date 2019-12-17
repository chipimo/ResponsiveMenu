const FacebookInfoReducer = (state = { Info: null, isSet: false }, action) => {
  switch (action.type) {
    case "UserInfo":
      state = { ...state, Info: action.payload, isSet: action.isSet };
      break;
  }
  return state;
};

export default FacebookInfoReducer;
