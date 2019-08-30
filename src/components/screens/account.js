import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import Header from '../header';
import Images from '../../assets/index';
import {Container, Card, CardItem, Fab} from 'native-base';
import moment from 'moment';
import {createAccounts} from '../../action/accounts';
import {connect} from 'react-redux';

class Accounts extends Component {
  state = {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    ragistrationDate: '',
    accountData: [],
  };

  setDate = date => {
    this.setState({ragistrationDate: moment(date).format('YYYY/MM/DD')});
  };

  createNewAaccount = () => {
    this.props.createAccounts(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      ragistrationDate: '',
    });
  };
  componentDidMount() {
    this.setState({accountData: this.props.account.accountList});
  }

  createNewAccounts = () => {
    this.props.navigation.navigate('CreateAccount');
  };
  render() {
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
                {this.props.navigation.state.routeName}
              </Text>
            </View>
            <View style={styles.rightView}>
              <Image source={Images.useravatar} style={{marginRight: 5}} />
            </View>
          </Header>
        </View>
        <FlatList
          extraData={this.props.account.accountList}
          data={this.props.account.accountList}
          renderItem={({item}) => {
            return (
              <Card>
                <CardItem>
                  <Text style={styles.namingText}>Name:</Text>
                  <Text style={{fontWeight: 'bold'}}>
                    {item.firstName}
                    {item.lastName}
                  </Text>
                </CardItem>

                <CardItem>
                  <Text style={styles.namingText}>company Name:</Text>
                  <Text style={{fontWeight: 'bold'}}>{item.companyName}</Text>
                </CardItem>
                <CardItem>
                  <Text style={styles.namingText}>PNumber:</Text>
                  <Text style={{fontWeight: 'bold'}}> {item.phoneNumber}</Text>
                </CardItem>
                <CardItem>
                  <Text style={styles.namingText}>Email:</Text>

                  <Text style={{fontWeight: 'bold'}}> {item.email}</Text>
                </CardItem>
                <CardItem>
                  <Text style={styles.namingText}>Ragistration Date:</Text>

                  <Text style={{fontWeight: 'bold'}}>
                    {' '}
                    {item.ragistrationDate}
                  </Text>
                </CardItem>
              </Card>
            );
          }}
        />

        <View style={{flex: 1}}>
          <Fab
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: 'rgb(255,217,25)'}}
            position="bottomRight"
            onPress={this.createNewAccounts}>
            <Text style={{fontSize: 25, color: 'black'}}>+</Text>
          </Fab>
        </View>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  namingText: {fontWeight: 'bold', color: 'grey'},

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
  label: {color: 'grey'},
  input: {color: 'black'},
  item: {marginLeft: 10, marginTop: 20},
});

const mapStateToProps = state => {
  return {
    account: state.accountReducer,
  };
};

export default connect(
  mapStateToProps,
  {createAccounts},
)(Accounts);
