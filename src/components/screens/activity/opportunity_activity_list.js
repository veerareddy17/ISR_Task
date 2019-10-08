import {Text, View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Container, Fab, Card} from 'native-base';
import {connect} from 'react-redux';
import {} from '../../../action/opportunity';

function OpportunityActivityList(props) {
  createNewActivity = () => {
    props.navigation.navigate('CreateActivity', {
      title: 'CreateActivity',
      ptitle: props.navigation.state.params.title,
    });
  };
  console.log(
    'created activity is...',
    props.selectedOpportunityCard.selectedOpportunity,
  );

  return (
    <Container>
      <FlatList
        keyExtractor={(item, index) => item.Id}
        extraData={props.selectedOpportunityCard.selectedOpportunity}
        data={props.selectedOpportunityCard.selectedOpportunity.SalesActivities}
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
    selectedOpportunityCard: state.opportunityReducer,
  };
};

export default connect(
  mapStateToProps,
  {},
)(OpportunityActivityList);
