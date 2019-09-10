import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Left,
  Right,
  Card,
  CardItem,
  Fab,
  ListItem,
  CheckBox,
  Body,
  InputGroup,
  Input,
  Icon,
} from 'native-base';
import Images from '../assets/index';
import Header from './header';
import {DrawerActions} from 'react-navigation';

class AccountDetails extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 200,
            elevation: 5,
            backgroundColor: 'rgb(255,217,25)',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'grey',
                margin: 10,
              }}>
              <Image source={Images.useravatar} style={{marginRight: 5}} />
            </View>
            <Text style={{marginLeft: 10}}>shant kumar</Text>
            <Text style={{marginLeft: 10, marginTop: 10}}>
              mrther.sk@gmail.com
            </Text>
          </View>
          <View
            style={{
              // alignItems: 'center',
              // justifyContent: 'center',

              margin: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                // this.props.navigation.navigate('DrawerOpen');
                this.props.navigation.closeDrawer();
              }}>
              <Image source={Images.close} style={{marginRight: 10}} />
            </TouchableOpacity>
          </View>
        </View>

        <ListItem
          onPress={() => {
            this.props.navigation.navigate('Settings');
            this.props.navigation.closeDrawer();
          }}>
          <Text style={{fontSize: 15}}>Setting</Text>
        </ListItem>

        <ListItem>
          <Text style={{fontSize: 15}}>Home</Text>
        </ListItem>
      </View>
    );
  }
}

export default AccountDetails;
