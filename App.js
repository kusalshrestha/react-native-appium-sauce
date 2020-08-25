import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

class App extends React.Component {
  state = {
    text: "I'm a Normal button"
  }

  buttonOnPress = () => {
    this.setState({
      text: "I'm a Super button"
    })
  }

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        accessible={true}
        testID={'app-root'}
        accessibilityLabel={'app-root'}>
        <Text testID="text" accessibilityLabel="text">{this.state.text}</Text>
        <View style={{ backgroundColor: 'red' }}>
          <TouchableOpacity onPress={this.buttonOnPress} testID="button" accessibilityLabel="button">
            <Text>Press Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

export default App
