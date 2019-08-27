import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Container} from 'native-base';
import Header from '../header';
import EditOpportunityTabBar from '../../navigation/tab_bar';

export default class EditOpportunity extends Component {
  static navigationOptions = {header: null};
  render() {
    const {navigation} = this.props;

    return (
      <Container>
        <View style={{height: 50, backgroundColor: 'white', elevation: 4}}>
          <Header>
            <View style={styles.titleView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Tabs')}>
                <Text>back</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.titleView}>
              <Text>{navigation.state.routeName}</Text>
            </View>
          </Header>
        </View>
        <EditOpportunityTabBar />
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  titleView: {
    // flex: 3,
    justifyContent: 'center',
    marginLeft: 20,
    // alignItems: 'center',
  },
  rightView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
});
