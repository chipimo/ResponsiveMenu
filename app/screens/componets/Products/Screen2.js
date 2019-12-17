import React, { Component } from "react";
import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import { connect } from "react-redux";

import demoProduct from "../../media/tomatoes.jpg";
import demoProduct2 from "../../media/fresh-eggs-in-pater-tray.jpg";
import demoProduct3 from "../../media/demo_product3.png";
import demoProduct4 from "../../media/demo_product4.png";

import ProductItem from "./ProductItemNote";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height
};

class Screen2 extends Component {
  constructor(props) {
    super(props);
  }
  _keyExtractor = (item, index) => item.product_id;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.body}>
            <FlatList
              style={{
                paddingBottom: 20,
                paddingTop: this.props.ProductActivity.isSet ? 60 : 0,
                backgroundColor: "#E5E5E5"
              }}
              data={this.props.Products.List}
              renderItem={({ item }) => (
                <ProductItem
                  navigation={this.props.navigation}
                  productId={{
                    id: item.id,
                    product_name: item.name,
                    product_price_default: item.product_price_default,
                    product_price_discount: item.product_price_discount,
                    image: item.secure_url
                  }}
                  subscribable={item.is_subscribable}
                  product_price_default={item.product_price_default}
                  product_price_discount={item.product_price_discount}
                  product_name={item.name}
                  image={item.secure_url}
                  description={item.description}
                />
              )}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={this._keyExtractor}
            />
            {this.renderItemProduct}
          </View>
        </View>
      </View>
    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#D8D8D8"
        }}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  content: {
    // height: Screen.height,
    width: Screen.width,
    // height: 300,
    flex: 1
  },
  body: {
    flex: 1
  },
  toolbar: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    backgroundColor: "#2B3740"
  },
  toolbarLeft: {
    marginLeft: 10,
    width: 16,
    height: 16
  },
  toolbarTitle: {
    color: "white",
    fontSize: 16
  },
  toolbarRight: {
    marginRight: 10,
    width: 14,
    height: 14
  }
});

function mapStateToProps(state) {
  return {
    Cart: state.Cart,
    ProductActivity: state.ProductActivity,
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
)(Screen2);
