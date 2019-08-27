import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';

import {Container, Left, Right, Card, CardItem, Fab} from 'native-base';
import Header from '../header';
import {
  fetchOpportunities,
  selectedOpportunity,
} from '../../action/opportunity';
import {connect} from 'react-redux';
import Images from '../../assets/index';

class Opportunities extends Component {
  static navigationOptions = {header: null};
  componentDidMount() {
    console.log('fetching opp');
    this.props.fetchOpportunities();
  }

  handleSelections = opportunities => {
    this.props.selectedOpportunity(opportunities.id);
    this.props.navigation.navigate('EditOpportunity', {
      title: opportunities.opportunities,
    });
  };

  render() {
    const {navigation} = this.props;

    console.log('data in my component...=>', this.props.isLoading);

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

        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 10,
            marginLeft: 5,
          }}>
          Your Opportunities
        </Text>
        <View style={{flex: 1}}>
          {this.props.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Card>
              <FlatList
                data={this.props.opportunityList}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => this.handleSelections(item)}>
                    <CardItem bordered>
                      <Left
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}>
                        <Text style={{fontWeight: 'bold'}}>
                          Opportunities {item.Opportunities}
                        </Text>
                        <Text style={styles.textStyle}>{item.user}</Text>
                      </Left>

                      <Right>
                        <Text style={styles.textStyle}>estmatedToatl</Text>
                        <Text style={{fontWeight: 'bold', color: 'green'}}>
                          ${item.estmatedToatl}
                        </Text>
                      </Right>
                    </CardItem>
                  </TouchableWithoutFeedback>
                )}
              />
            </Card>
          )}
        </View>
        <View style={{flex: 1}}>
          <Fab
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: 'yellow'}}
            position="bottomRight"
            onPress={() => {}}>
            <Text style={{fontSize: 25, color: 'black'}}>+</Text>
          </Fab>
        </View>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    color: 'grey',
  },
  titleView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
});

const mapStateToProps = state => {
  console.log('state value', state);
  return {
    opportunityList: state.opportunityReducer.opportunityList,
    isLoading: state.common.isLoading,
  };
};

export default connect(
  mapStateToProps,
  {fetchOpportunities, selectedOpportunity},
)(Opportunities);
