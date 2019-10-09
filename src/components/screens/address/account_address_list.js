import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Container,
  Fab,
  Card,
  Left,
  CardItem,
  Right,
  Body,
  Icon,
} from 'native-base';
import {connect} from 'react-redux';
import {deleteAccountAddresses} from '../../../action/accounts';

function AccountAddressList(props) {
  createNewAddress = () => {
    props.navigation.navigate('CreateAddress', {title: 'Create Address'});
  };
  deleteNotes = async item => {
    await props.deleteAccountAddresses(item.Id);
  };
  return (
    <Container>
      <FlatList
        keyExtractor={(item, index) => item.Id}
        extraData={props.selectedAccountCard.selectedAccount.Addresses}
        data={props.selectedAccountCard.selectedAccount.Addresses}
        renderItem={({item}) => {
          return (
            <Card
              style={{
                borderColor: 'rgb(249, 249, 69)',
                borderLeftWidth: 10,
              }}>
              <CardItem>
                <Left>
                  <Body>
                    <Text style={{}}>Title:{item.Title}</Text>
                  </Body>
                </Left>
                <Right>
                  <TouchableOpacity
                    onPress={() => {
                      // this.setState({selectedItem: item});

                      // this.RBSheet.open();
                      this.deleteNotes(item);
                    }}>
                    {/* <Icon name="edit" style={{color: 'grey'}} size={30} /> */}
                    {/* <Text>Delete</Text> */}
                    <Icon name="trash" style={{color: 'black'}} />
                  </TouchableOpacity>
                </Right>
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
          onPress={this.createNewAddress}>
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
  console.log('state value', state);
  return {
    selectedAccountCard: state.accountReducer,
  };
};

export default connect(
  mapStateToProps,
  {deleteAccountAddresses},
)(AccountAddressList);
