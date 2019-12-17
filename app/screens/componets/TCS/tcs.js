import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

 class Tcs extends Component {
  

    render() {
        return (
            <View>
                <Text> tcs </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Tcs)
