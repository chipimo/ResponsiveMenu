const ProductActivityReducer = (
  state = { item: {}, isSet: true, msg: "" },
  action
) => {
  switch (action.type) {
    case "ActivityDone":
      state = {
        item: action.item,
        isSet: action.isSet,
        msg: action.payload
      };
      break;
    case "ActivityOut":
      state = {
        item: {name:''},
        isSet: false,
        msg: ""
      };
      break;
  }
  return state;
};

export default ProductActivityReducer;
