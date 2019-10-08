import {Text, View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Container, Fab, Card} from 'native-base';
import {connect} from 'react-redux';

function AccountActivityList(props) {
  createNewActivity = () => {
    props.navigation.navigate('AccountActivity', {title: 'Create Activity'});
  };
  console.log(
    'created activity is...',
    props.selectedAccountCard.selectedAccount,
  );

  return (
    <Container>
      <FlatList
        keyExtractor={(item, index) => item.Id}
        extraData={props.selectedAccountCard.selectedAccount.SalesActivities}
        data={props.selectedAccountCard.selectedAccount.SalesActivities}
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
                <View>
                  <Text style={{}}>{item.Title}</Text>
                  <Text style={{}}>{item.Date}</Text>
                </View>
              </View>
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
          onPress={this.createNewActivity}>
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
  {},
)(AccountActivityList);
