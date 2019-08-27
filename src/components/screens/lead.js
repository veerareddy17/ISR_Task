import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Container} from 'native-base';
import Header from '../header';
import Images from '../../assets/index';

export default class Lead extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <Container>
        <View style={{height: 60, backgroundColor: 'yellow', elevation: 4}}>
          <Header>
            <View style={styles.titleView}>
              <Text>{navigation.state.routeName}</Text>
            </View>
            <View style={styles.rightView}>
              <Image source={Images.useravatar} style={{marginRight: 5}} />
              <Text>My Account</Text>
            </View>
          </Header>
        </View>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  titleView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
});
