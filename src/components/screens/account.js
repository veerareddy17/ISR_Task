import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../header';
import Images from '../../assets/index';
import {Container, Card, CardItem, Fab} from 'native-base';
import moment from 'moment';
import {createAccounts, fetchAccounts} from '../../action/accounts';
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

  async componentDidMount() {
    await this.props.fetchAccounts();
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
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.toggleAccountDetailsDrawer();
                }}>
                <Image source={Images.useravatar} style={{marginRight: 5}} />
              </TouchableOpacity>
            </View>
          </Header>
        </View>
        <FlatList
          extraData={this.props.account.accountList}
          data={this.props.account.accountList}
          renderItem={({item}) => {
            return (
              <Card
                style={{
                  borderColor: 'rgb(249, 249, 69)',
                  borderLeftWidth: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 30,
                      backgroundColor: 'grey',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 10,
                    }}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      {item.firstName[0]}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={{}}>
                        {item.firstName}
                        {item.lastName}
                      </Text>
                      <Text style={{}}>{item.email}</Text>
                      <Text style={{}}>{item.phoneNumber}</Text>
                    </View>
                    {/* <Text style={{}}>{item.companyName}</Text> */}
                  </View>
                </View>
                {/* <CardItem>
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
                </CardItem> */}
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
  {fetchAccounts},
)(Accounts);
