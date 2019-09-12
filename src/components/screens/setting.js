import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Container, Content, ListItem, Body, Right} from 'native-base';
import Images from '../../assets/index';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Settings extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <Container>
        <Content>
          <ListItem>
            <View style={styles.profileDpstyle}>
              <Image source={Images.useravatar} style={{marginRight: 5}} />
              <View style={styles.buttonTochangeDp}>
                <Icon name="camera" style={{color: 'white'}} size={25} />
              </View>
            </View>
            <Body>
              <Text style={{marginLeft: 10}}>shant kumar</Text>
              <Text style={{marginLeft: 10, marginTop: 10}}>
                mrther.sk@gmail.com
              </Text>
            </Body>
            <Right>
              <Icon name="edit" style={{color: 'grey'}} size={30} />
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
  profileDpstyle: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  buttonTochangeDp: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
