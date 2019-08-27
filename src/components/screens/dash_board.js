import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Container, Content, Card} from 'native-base';
import Header from '../header';
import Images from '../../assets/index';

export default class DashBoard extends Component {
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
        <Content>
          <View style={{flexDirection: 'row'}}>
            <Card style={styles.cardStyle}>
              <View style={{flexDirection: 'row'}}>
                <Image source={Images.lead} />
                <Text style={{fontSize: 25, fontWeight: 'bold', marginLeft: 3}}>
                  10
                </Text>
              </View>
              <Text style={{color: 'grey', fontSize: 15}}>Lead Genegrated</Text>
              <Text>2% is from</Text>
            </Card>
          </View>
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
  cardStyle: {
    width: 150,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
});
