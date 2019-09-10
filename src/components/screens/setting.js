import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Container, Content, ListItem, Body, Right} from 'native-base';
import Header from '../header';
import Images from '../../assets/index';

export default class Settings extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <Container>
        <Content>
          <ListItem>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100 / 2,

                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'grey',
              }}>
              <Image source={Images.useravatar} style={{marginRight: 5}} />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  backgroundColor: 'green',
                }}></View>
            </View>
            <Body>
              <Text style={{marginLeft: 10}}>shant kumar</Text>
              <Text style={{marginLeft: 10, marginTop: 10}}>
                mrther.sk@gmail.com
              </Text>
            </Body>
            <Right>
              <Text>Edit</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 15}}>Change Password</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 15}}>Change Email</Text>
          </ListItem>
          <ListItem>
            <Text style={{fontSize: 15, color: 'blue'}}>Log Out</Text>
          </ListItem>
        </Content>
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
