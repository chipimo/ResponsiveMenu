var list = [];
const ProductsReducer = (
  state = {
    msg: "Product list empty",
    List: []
  },
  action
) => {
  switch (action.type) {
    case "LoadList":
      list = action.List;
      state = {
        ...state,
        msg: "Product list loaded",
        List: action.List
      };

      break;
    case "UpdateList":
      list.push(action.update);
      state = {
        ...state,
        List: list,
        msg: action.payload
      };
      break;
  }
  return state;
};

export default ProductsReducer;
