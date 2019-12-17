const SubscriptionReducer = (state = { item: {}, open: false }, action) => {
  switch (action.type) {
    case "OpenSubscriptionModel":
      state = {
        open: action.state,
        item: action.item
      };
      break;
  }
  return state;
};

export default SubscriptionReducer;
