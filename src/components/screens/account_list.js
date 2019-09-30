import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../header';
import Images from '../../assets/index';
import {Container, Card, CardItem, Fab} from 'native-base';
import moment from 'moment';
import {createAccounts, fetchAccounts} from '../../action/accounts';
import {connect} from 'react-redux';

class AccountList extends Component {
  // state = {
  //   firstName: '',
  //   lastName: '',
  //   companyName: '',
  //   email: '',
  //   phoneNumber: '',
  //   ragistrationDate: '',
  //   accountData: [],
  // };

  async componentDidMount() {
    this._isMounted = true;
    console.log('is comming or not .....1 ');
    await this.props.fetchAccounts();
  }

  createNewAccounts = () => {
    // this.props.navigation.navigate('AccountList', {title: 'AccountList'});
    this.props.navigation.navigate('EditOpportunity', {
      title: 'CreateOpportunity' + '',
    });
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    console.log('what isloading here....=>', this.props.isLoading);
    return (
      <Container>
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            keyExtractor={(item, index) => item.Id}
            extraData={this.props.account.accountList}
            data={this.props.account.accountList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EditOpportunity', {
                      title: 'Create Opportunity',
                      Id: item.Id,
                    })
                  }>
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
                          {item.FirstName[0]}
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
                            {item.FirstName}
                            {item.LastName}
                          </Text>
                          <Text style={{}}>{item.Email}</Text>
                          <Text style={{}}>{item.Phone}</Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        )}
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
    isLoading: state.common.isLoading,
  };
};

export default connect(
  mapStateToProps,
  {fetchAccounts},
)(AccountList);
