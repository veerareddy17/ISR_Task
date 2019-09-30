import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
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

  handleSelections = async (item, index) => {
    console.log('what i ma getting ...=>', item);
    await this.props.selectedOpportunity(item.Id);
    this.props.navigation.navigate('EditOpportunity', {
      title: 'Opportunity' + index,
    });
  };

  createOpportunity = () => {
    this.props.navigation.navigate('AccountList', {title: 'Select Account'});
    // this.props.createNewOpportunity(this.props.id);
    // this.props.navigation.navigate('EditOpportunity', {
    //   title: 'CreateOpportunity' + '',
    // });
  };
  componentWillUnmount() {
    console.log('unmounted opportunity');
  }
  render() {
    const {navigation} = this.props;
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
              <TouchableOpacity
                onPress={() => {
                  // this.props.navigation.navigate('DrawerOpen');
                  this.props.navigation.toggleAccountDetailsDrawer();
                }}>
                <Image source={Images.useravatar} style={{marginRight: 5}} />
              </TouchableOpacity>
            </View>
          </Header>
        </View>

        <Text style={styles.oprortunityStyle}>Your Opportunities</Text>
        <View style={{flex: 1}}>
          {this.props.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Card>
              <FlatList
                extraData={this.props.data}
                data={this.props.data.opportunityList}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item, index}) => (
                  <TouchableWithoutFeedback
                    onPress={() => this.handleSelections(item, index)}>
                    <CardItem bordered>
                      <Left
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}>
                        <Text style={{fontWeight: 'bold'}}>
                          Opportunities {index}
                        </Text>
                        <Text style={styles.textStyle}>
                          {item.ItemCategory}
                        </Text>
                      </Left>

                      <Right>
                        <Text style={styles.textStyle}>estmatedToatl</Text>
                        <Text style={{fontWeight: 'bold', color: 'green'}}>
                          ${item.ProjectedTotal}
                        </Text>
                      </Right>
                    </CardItem>
                  </TouchableWithoutFeedback>
                )}
              />
            </Card>
          )}
        </View>

        <Fab
          direction="up"
          // containerStyle={{}}
          style={{backgroundColor: 'rgb(255,217,25)'}}
          position="bottomRight"
          onPress={this.createOpportunity}>
          <Text style={{fontSize: 25, color: 'black'}}>+</Text>
        </Fab>
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
  oprortunityStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 5,
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
