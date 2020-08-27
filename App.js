import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFieldContainer: {
    paddingVertical: 16,
  },
  inputField: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  loginButton: {
    width: 200,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#a4e320',
  },
  statusText: {
    marginVertical: 50,
    marginBottom: -50,
    justifyContent: 'flex-end',
  },
  indicator: {
    position: 'absolute',
    elevation: 1,
    right: 12,
    top: 0,
    bottom: 0,
  },
});

const FieldType = {
  USERNAME: 'username',
  PASSWORD: 'password',
};

const validCredentials = {
  username: 'fleetpanda',
  password: 'password',
};

class App extends React.Component {
  state = {
    status: '',
    username: '',
    password: '',
    apiRequest: false,
  };

  componentDidMount() {
    console.log('====', process)
  }

  mockRequest = async (username, password) => {
    return new Promise((fulfill) => {
      const isValid =
        username === validCredentials.username &&
        password === validCredentials.password;

      setTimeout(() => {
        return fulfill({success: isValid});
      }, 2000);
    });
  };

  login = async () => {
    const {username, password} = this.state;
    this.setState({apiRequest: true, status: ''});
    const {success} = await this.mockRequest(username, password);
    this.setState({status: success ? 'success' : 'failure', apiRequest: false});
  };

  onchangeText = (text, fieldType) => {
    if (fieldType === FieldType.USERNAME) {
      this.setState({username: text});
      return;
    }
    this.setState({password: text});
  };

  render() {
    return (
      <View
        style={styles.mainContainer}
        accessible={true}
        testID={'app-root'}
        accessibilityLabel={'app-root'}>
        <Text testID="text" accessibilityLabel="text">
          Facecover
        </Text>
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.inputField}
            name="username"
            placeholder="username"
            accessibilityLabel="username"
            onChangeText={(text) => this.onchangeText(text, FieldType.USERNAME)}
          />
        </View>
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.inputField}
            name="password"
            secureTextEntry={true}
            placeholder="password"
            accessibilityLabel="password"
            onChangeText={(text) => this.onchangeText(text, FieldType.PASSWORD)}
          />
        </View>
        <TouchableOpacity
          onPress={this.login}
          style={styles.loginButton}
          accessibilityLabel="login">
          <Text>Login</Text>
          {this.state.apiRequest && (
            <ActivityIndicator
              style={styles.indicator}
              color="white"
              size="small"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.statusText} accessibilityLabel="loginStatus">
          {this.state.status}
        </Text>
      </View>
    );
  }
}

export default App;
