import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class Share extends Component {
  render() {
    return (
      <View>
        <Text> Share </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Share);
