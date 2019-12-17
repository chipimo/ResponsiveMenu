import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class MainMenu extends React.Component {
  
  render() {
    return (
      <View>
        <Text> prop </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)
