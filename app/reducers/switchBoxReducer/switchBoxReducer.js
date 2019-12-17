const SwitchBoxReducer = (
  InitalState = {
    route: "Auth"
  },
  action
) => {
  switch (action.type) {
    case "IsRemmbered":
      InitalState = {
        route: "MainViewHandler"
      };
      return InitalState;
    case "NotRemmbered":
      InitalState = {
        route: "Auth"
      };
      return InitalState;
    case "IsRemmberedNoNet":
      InitalState = {
        route: "HisoryViewHandler"
      };
      return InitalState;
    case "Error":
      InitalState = {
        route: "Error",
        state: action.state,
        msg: action.msg
      };
      return InitalState;

    default:
      return InitalState;
  }
};

export default SwitchBoxReducer;
