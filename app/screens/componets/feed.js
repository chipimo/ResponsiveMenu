import React from "react";
import { connect } from "react-redux";
import { FlatList, View, Text, Image } from "react-native";
import { RkCard,  RkStyleSheet } from "react-native-ui-kitten";
import { Avatar } from "../../components/avatar";
import { SocialBar } from "../../components/socialBar";
import { data } from "../../data";

const moment = require("moment");

class Feed extends React.Component {
  render = () => (
    <View>
      <Text>Card</Text>
    </View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  card: {
    marginVertical: 8
  },
  avatar: {
    marginRight: 16
  }
}));

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(mapDispatchToProps)(Feed);
