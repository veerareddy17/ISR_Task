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
  createNewOpportunity,
} from '../../action/opportunity';
import {connect} from 'react-redux';
import Images from '../../assets/index';

class Opportunities extends Component {
  static navigationOptions = {header: null};
  async componentDidMount() {
    console.log('fetching opp');
    await this.props.fetchOpportunities();
  }

  handleSelections = async item => {
    console.log('what i ma getting ...=>', item);
    await this.props.selectedOpportunity(item.id);
    this.props.navigation.navigate('EditOpportunity', {
      title: 'Opportunity' + item.id,
    });
  };

  createOpportunity = () => {
    this.props.createNewOpportunity(this.props.id);
    this.props.navigation.navigate('EditOpportunity', {
      title: 'CreateOpportunity' + '',
    });
  };
  render() {
    const {navigation} = this.props;

    console.log('data in my component...=>', this.props.isLoading);

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
                {navigation.state.routeName}
              </Text>
            </View>
            <View style={styles.rightView}>
              <Image source={Images.useravatar} style={{marginRight: 5}} />
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
                extraData={this.props.data}
                data={this.props.data.opportunityList}
                keyExtractor={(item, index) => 'key' + index}
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
            // containerStyle={{}}
            style={{backgroundColor: 'rgb(255,217,25)'}}
            position="bottomRight"
            onPress={this.createOpportunity}>
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
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
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
    data: state.opportunityReducer,
    id: state.opportunityReducer.opportunityId,
    isLoading: state.common.isLoading,
  };
};

export default connect(
  mapStateToProps,
  {fetchOpportunities, selectedOpportunity, createNewOpportunity},
)(Opportunities);
