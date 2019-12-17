import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import MapView, { Marker, MAP_TYPES, Callout } from "react-native-maps";
import { Constants, Location, Permissions } from "expo";
import locMaker from "../../assets/images/maker.png";
import { MaterialIcons } from "@expo/vector-icons";
import { data } from "../../data";
import { IconToggle } from "react-native-material-ui";
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0082;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class MapViewComp extends React.Component {
  constructor() {
    super();
    this.mapRef = null;
  }
  state = {
    region: {
      latitude: -15.40669,
      longitude: 27.8493049,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    city: "",
    suburb: "",
    state: "",
    road: "",
    type: "",
    search: ""
  };

  getInitialState() {
    return {
      region: {
        latitude: -15.40669,
        longitude: 27.8493049,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }

  onRegionChange(region) {
    this.setState({
      region: {
        ...this.state.region,
        latitude: region.lat,
        longitude: region.lon
      },
      LanLon: {
        latitude: region.lat,
        longitude: region.lon,
        description: ",ndlkjegrggh",
        title: "city"
      }
    });
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({ accuracy: 6 });

    data.getUser("region", region => {
      if (region) {
        var obj = JSON.parse(region);

        this.onRegionChange({
          lat: parseFloat(obj.lat),
          lon: parseFloat(obj.lon)
        });
        this.Geocode({
          latitude: parseFloat(obj.lat),
          longitude: parseFloat(obj.lon)
        });
      } else {
        this.setState({ location });
        this.onRegionChange({
          lat: location.coords.latitude,
          lon: location.coords.longitude
        });
        this.Geocode({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
      }
    });
  };

  Geocode = region => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${
        region.latitude
      }&lon=${region.longitude}`
    )
      .then(response => response.json())
      .then(responseJson => {
        var regionData = {
          lat: region.latitude,
          lon: region.longitude,
          city: responseJson.address.city,
          suburb: responseJson.address.suburb,
          state: responseJson.address.state,
          road: responseJson.address.road,
          type: responseJson.type
        };
        data.setTempData("region", JSON.stringify(regionData), responce => {});
        this.setState({
          city: responseJson.address.city,
          suburb: responseJson.address.suburb,
          state: responseJson.address.state,
          road: responseJson.address.road,
          type: responseJson.type
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSearch = event => {
    var locationStr = "Lusaka+" + this.state.search;
    fetch(
      `https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=${locationStr}&format=json&limit=1`
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson[0].lat);
        
        this.onRegionChange({
          lat: responseJson[0].lat,
          lon: responseJson[0].lon
        });
        this.Geocode({
          latitude: responseJson[0].lat,
          longitude: responseJson[0].lon
        });
      });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center"
        }}
      >
        <MapView
          ref={map => {
            this.map = map;
          }}
          onPress={e => {
            this.Geocode({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            });
            this.setState({
              region: {
                ...this.state.region,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              },
              LanLon: {
                ...this.state.LanLon,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                description: "Test",
                title: "city"
              }
            });
          }}
          mapType={MAP_TYPES.HYBRID}
          style={styles.map}
          region={this.state.region}
        >
          {this.state.LanLon ? (
            <Marker
              identifier="marker2"
              // image={locMaker}
              coordinate={this.state.LanLon}
              title={this.state.LanLon.title}
              description={this.state.LanLon.description}
            />
          ) : null}
        </MapView>
        <View
          style={{
            height: 50,
            borderRadius: 5,
            alignItems: "center",
            paddingLeft: 2,
            width: "95%",
            backgroundColor: "rgba(225,225,225,0.8)",
            position: "absolute",
            top: 10,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              borderColor: "transparent",
              borderRightColor: "#788278",
              borderWidth: 1,
              borderStyle: "solid",
              height: 50
            }}
          >
            <IconToggle
              name="keyboard-arrow-left"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          </View>

          <View style={{ marginLeft: 10, width: "66%" }}>
            <TextInput
              placeholder="Search here: Phi, Woodlands"
              placeholderTextColor="#000"
              style={{ backgroundColor: "transparent" }}
              onChangeText={text =>
                this.setState({
                  search: text
                })
              }
              underlineColorAndroid="transparent"
            />
          </View>
          <View
            style={{
              borderColor: "transparent",
              borderLeftColor: "#788278",
              borderWidth: 1,
              borderStyle: "solid",
              height: 50
            }}
          >
            <IconToggle name="search" onPress={this.onSearch} />
          </View>
        </View>
        <View
          style={{
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            height: 130,
            width: "100%",
            backgroundColor: "rgba(225,225,225,1)",
            position: "absolute",
            bottom: 0,
            padding: 10
          }}
        >
          <Text>City: {this.state.city}</Text>
          <Text>Suburb: {this.state.suburb}</Text>
          <Text>State: {this.state.state}</Text>
          <Text>Road: {this.state.road}</Text>
          <Text>Type: {this.state.type}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  plainView: {
    width: 60
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapViewComp);
