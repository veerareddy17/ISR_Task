import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Container} from 'native-base';
import Header from '../header';
import Images from '../../assets/index';

export default class Lead extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <Container>
        <View
          style={{
            height: 60,
            backgroundColor: 'rgb(255,217,25)',
            elevation: 4,
          }}>
          <Header>
            <View style={styles.titleView}>
              <Text style={styles.headerText}>
                {navigation.state.routeName}
              </Text>
            </View>
            <View style={styles.rightView}>
              <TouchableOpacity
                onPress={() => {
                  // this.props.navigation.navigate('DrawerOpen');
                  this.props.navigation.toggleAccountDetailsDrawer();
                }}>
                <Image source={Images.useravatar} style={{marginRight: 5}} />
              </TouchableOpacity>
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
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rightView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
});
