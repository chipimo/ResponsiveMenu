import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

export class Notification extends Component {
 

  render() {
    return (
      <View>
        <Text> Notification </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
