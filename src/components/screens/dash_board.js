import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Container, Content, Card, Left, Right} from 'native-base';
import Header from '../header';
import Images from '../../assets/index';
import {connect} from 'react-redux';
class DashBoard extends Component {
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
        <Content>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              <Card style={styles.cardStyle}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={Images.lead} />
                  <Text style={styles.cardTitleNum}>10</Text>
                </View>
                <Text style={styles.cardTitle}>Lead Genegrated</Text>
                <Text>2% is from</Text>
              </Card>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Opportunities')}>
                <Card style={styles.cardStyle}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={Images.opportunity} />
                    <Text style={styles.cardTitleNum}>
                      {this.props.opportunitiList.opportunityList.length}
                    </Text>
                  </View>
                  <Text style={{color: 'grey', fontSize: 15}}>Opprtunitis</Text>
                  <Text>2% is from</Text>
                </Card>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Accounts')}>
                <Card style={styles.cardStyle}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={Images.users} />
                    <Text style={styles.cardTitleNum}>
                      {this.props.accountRegistrationdList.accountList.length}
                    </Text>
                  </View>
                  <Text style={styles.cardTitle}>New Registration</Text>
                  <Text>2% is from</Text>
                </Card>
              </TouchableWithoutFeedback>
              <Card style={styles.cardStyle}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={Images.lead} />
                  <Text style={styles.cardTitleNum}>10</Text>
                </View>
                <Text style={styles.cardTitle}>Lead Genegrated</Text>
                <Text>2% is from</Text>
              </Card>
            </View>
          </ScrollView>
          <Card>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
              }}>
              <Text>Potential opportunity near you</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('DashBoard', {
                    user: this.props.accountRegistrationdList.accountList,
                  });
                  this.props.navigation.toggleDashBoardDrawer();
                  // this.props.navigation.navigate('toggleDashBoardDrawer', {
                  //   userName: 'shatkumare',
                  // });
                  // this.props.navigation.openDrawer();
                }}>
                <Image source={Images.filter} />
              </TouchableOpacity>
            </View>
          </Card>
        </Content>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  titleView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardStyle: {
    width: 150,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {color: 'grey', fontSize: 15},
  rightView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
  cardTitleNum: {fontSize: 25, fontWeight: 'bold', marginLeft: 3},
});

const mapStateToProps = state => {
  console.log('state value', state);
  return {
    opportunitiList: state.opportunityReducer,
    accountRegistrationdList: state.accountReducer,
  };
};

export default connect(
  mapStateToProps,
  {},
)(DashBoard);
