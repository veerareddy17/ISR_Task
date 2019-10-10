import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import AppContainer from './src/navigation/router';
import store from './src/stores/index';
import {Provider} from 'react-redux';
import {Root} from 'native-base';

class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}

export default App;
