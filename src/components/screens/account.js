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
import {NavigationEvents} from 'react-navigation';

{
  /* <NavigationEvents
onWillBlur={() => this.componentDidMount()}
onDidBlur={() => this.render()}> */
}

function Accounts(props) {
  fetchData = async () => {
    console.log('is comming or not .....1 ');
    await props.fetchAccounts();
  };

  createNewAccounts = () => {
    props.navigation.navigate('CreateAccount', {title: 'Create Account'});
  };

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
              {props.navigation.state.routeName}
            </Text>
          </View>
          <View style={styles.rightView}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.toggleAccountDetailsDrawer();
              }}>
              <Image source={Images.useravatar} style={{marginRight: 5}} />
            </TouchableOpacity>
          </View>
        </Header>
      </View>
      <NavigationEvents
        onWillFocus={() => fetchData()}
        onDidBlur={() => {}}></NavigationEvents>
      {props.isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          keyExtractor={(item, index) => item.Id}
          extraData={props.account.accountList}
          data={props.account.accountList}
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
)(Accounts);
