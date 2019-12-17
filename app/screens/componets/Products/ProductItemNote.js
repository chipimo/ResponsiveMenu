import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

import iconStar from "../../media/icon_star.png";
import iconStarDisable from "../../media/icon_star_disable.png";

import btnMinus from "../../media/button_minus.png";
import btnPlus from "../../media/button_plus.png";
import btnPlusLarge from "../../media/button_plus_large.png";

import iconNoteEnable from "../../media/icon_note_enable.png";
import iconNoteDisable from "../../media/icon_note_disable.png";
// import { Text } from "react-native-ui-kitten";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      note: "",
      number: 0,
      isFavorite: true,
      isNote: false
    };
  }
  render() {
    return (
      <View style={styles.product}>
        <View style={styles.body}>
          <View
            style={{
              minHeight: 130,
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row"
            }}
          >
            <View>
              <Image
                style={styles.product_image}
                source={{ uri: this.props.image }}
              />
            </View>
            <View>
              <Text
                // rkType="bold"
                style={styles.product_name}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {this.props.product_name}
              </Text>
              <View style={styles.note_collap}>
                <Text style={{ color: "#AAAAAA" }}>
                  {this.props.description}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              borderColor: "transparent",
              borderWidth: 1,
              borderStyle: "solid",
              borderTopColor: "#D9D9D9"
            }}
          />

          <View
            style={{
              height: 50,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <View style={styles.product_price}>
              <NumberFormat
                value={this.props.product_price_default}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"K "}
                renderText={value => (
                  <Text  style={styles.product_price_discount}>
                    {value}.00
                  </Text>
                )}
              />
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              {this.state.number > 0 ? (
                <View style={styles.button_layout}>
                  <TouchableOpacity
                    onPress={this.onMinusPress}
                    style={{ marginRight: 15 }}
                  >
                    <Image style={styles.button_minus} source={btnMinus} />
                  </TouchableOpacity>
                  <Text style={{ marginRight: 15, fontSize: 14 }}>
                    {this.state.number}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.onPlusPress(this.props.productId)}
                  >
                    <Image style={styles.button_plus} source={btnPlus} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => this.onPlusPress(this.props.productId)}
                  >
                    <Image
                      style={styles.button_plus_large}
                      source={btnPlusLarge}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <View style={{ width: 5 }} />
              {this.props.subscribable ? (
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 110,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 20,
                      borderColor: "#FC5734",
                      borderStyle: "solid",
                      borderWidth: 1
                    }}
                    onPress={() =>
                      this.props.navigation.navigate("SubscriptionModal")
                    }
                  >
                    <Text>Subscribe</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }

  onSubscribPress = () => {};

  onMinusPress = productId => {
    if (this.state.number > 0) {
      var num = this.state.number - 1;
      this.props.dispatchEvent({
        type: "AddItem",
        playload: { cartNum: num, productId: productId }
      });
      this.setState({
        number: this.state.number - 1
      });
    }
  };
  onPlusPress = productId => {
    var num = this.state.number + 1;
    this.props.dispatchEvent({
      type: "AddItem",
      playload: { cartNum: num.toString(), productId: productId }
    });
    this.setState({
      number: this.state.number + 1
    });
  };
  onFavoritePress = () => {
    this.setState({
      isFavorite: !this.state.isFavorite
    });
  };
  toggleNote = () => {
    this.setState({
      isNote: !this.state.isNote,
      collapsed: !this.state.collapsed
    });
  };
}

const styles = StyleSheet.create({
  product: {
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    width: "95%",
    backgroundColor: "#fff",
    elevation: 4,
    minHeight: 180,
    borderRadius: 10,
    padding: 5
  },
  product_image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    borderColor: "#E5E5E5",
    borderWidth: 1
  },
  product_detail: {
    justifyContent: "space-around",
    marginLeft: 10,
    flexDirection: "column",
    flex: 1
  },
  product_detail_header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  product_name: {
    color: "#7A7A7A",
    width: 200,
    paddingLeft: 10
  },
  product_favorite: {
    width: 20,
    height: 19
  },
  product_note: {
    width: 17,
    height: 22
  },
  product_detail_footer: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  product_price: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column"
  },
  product_price_default: {
    color: "#BABCBE",
    fontSize: 12,
    textDecorationLine: "line-through"
  },
  product_price_discount: {
    marginLeft: 5,
    color: "#FC5734"
  },
  button_layout: {
    alignItems: "center",
    flexDirection: "row"
  },
  button_minus: {
    width: 34,
    height: 34
  },
  button_plus: {
    width: 34,
    height: 34
  },
  button_plus_large: {
    width: 109,
    height: 32
  },

  collapsible: {},
  note_collap: {
    width: 220,
    alignItems: "center",
    padding: 10
  }
});

function mapStateToProps(state) {
  return {
    Cart: state.Cart,
    Products: state.Products
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem);
