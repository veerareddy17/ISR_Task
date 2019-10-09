import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../header';
import Images from '../../../assets/index';
import {
  Container,
  Card,
  Fab,
  Left,
  CardItem,
  Body,
  Right,
  Icon,
} from 'native-base';
import {
  createAccounts,
  fetchAccounts,
  selectedAccount,
  deleteAccount,
} from '../../../action/accounts';
import {connect} from 'react-redux';

class AccountList extends Component {
  createNewAccounts = () => {
    this.props.navigation.navigate('CreateAccount', {title: 'Create Account'});
  };

  handleSelections = async item => {
    await this.props.selectedAccount(item.Id);
    this.props.navigation.navigate('EditAccount', {
      title: 'Account Details',
      Id: item.Id,
    });

    // await props.createAccounts(reqObject);
  };
  async componentDidMount() {
    await this.props.fetchAccounts();
  }

  deleteNotes = async item => {
    await this.props.deleteAccount(item.Id);
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
        {/* <NavigationEvents
          onWillFocus={() => fetchData()}
          onDidBlur={() => {}}></NavigationEvents> */}
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            keyExtractor={(item, index) => item.Id}
            extraData={this.props.account.accountList}
            data={this.props.account.accountList}
            renderItem={({item}) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => this.handleSelections(item)}>
                  <Card
                    style={{
                      borderColor: 'rgb(249, 249, 69)',
                      borderLeftWidth: 10,
                    }}>
                    <CardItem>
                      <Left>
                        {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
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
                            {item.FirstName ? item.FirstName[0] : ''}
                          </Text>
                        </View>
                      </Left>
                      <Body>
                        <Text style={{}}>
                          {item.FirstName}
                          {item.LastName}
                        </Text>
                        <Text style={{}}>{item.Email}</Text>
                        <Text style={{}}>{item.Phone}</Text>
                      </Body>
                      <Right>
                        <TouchableOpacity
                          onPress={() => {
                            this.deleteNotes(item);
                          }}>
                          {/* <Text>Delete</Text> */}
                          <Icon name="trash" style={{color: 'red'}} />
                        </TouchableOpacity>
                      </Right>
                    </CardItem>
                    {/* <View
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
                    <Left>
                      <TouchableOpacity
                        onPress={() => {
                          this.deleteNotes(item);
                        }}>
                        <Text>Delete</Text>
                      </TouchableOpacity>
                    </Left> */}
                  </Card>
                </TouchableWithoutFeedback>
              );
            }}
          />
        )}

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
    isLoading: state.common.isLoading,
  };
};

export default connect(
  mapStateToProps,
  {fetchAccounts, selectedAccount, createAccounts, deleteAccount},
)(AccountList);
