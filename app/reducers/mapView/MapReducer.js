const MapReducer = (state = { navTo: "", open: false },action) => {
  switch (action.type) {
    case "OpenModel":
      state = {
        open: true
      };
      break;
  }
  return state;
};

export default MapReducer;
