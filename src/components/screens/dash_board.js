import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Container, Content, Card} from 'native-base';
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
              <Image source={Images.useravatar} style={{marginRight: 5}} />
            </View>
          </Header>
        </View>
        <Content>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              <Card style={styles.cardStyle}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={Images.lead} />
                  <Text
                    style={{fontSize: 25, fontWeight: 'bold', marginLeft: 3}}>
                    10
                  </Text>
                </View>
                <Text style={{color: 'grey', fontSize: 15}}>
                  Lead Genegrated
                </Text>
                <Text>2% is from</Text>
              </Card>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Opportunities')}>
                <Card style={styles.cardStyle}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={Images.opportunity} />
                    <Text
                      style={{fontSize: 25, fontWeight: 'bold', marginLeft: 3}}>
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
                    <Text
                      style={{fontSize: 25, fontWeight: 'bold', marginLeft: 3}}>
                      {this.props.accountRegistrationdList.accountList.length}
                    </Text>
                  </View>
                  <Text style={{color: 'grey', fontSize: 15}}>
                    New Registration
                  </Text>
                  <Text>2% is from</Text>
                </Card>
              </TouchableWithoutFeedback>
              <Card style={styles.cardStyle}>
                <View style={{flexDirection: 'row'}}>
                  <Image source={Images.lead} />
                  <Text
                    style={{fontSize: 25, fontWeight: 'bold', marginLeft: 3}}>
                    10
                  </Text>
                </View>
                <Text style={{color: 'grey', fontSize: 15}}>
                  Lead Genegrated
                </Text>
                <Text>2% is from</Text>
              </Card>
            </View>
          </ScrollView>
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
    opportunitiList: state.opportunityReducer,
    accountRegistrationdList: state.accountReducer,
  };
};

export default connect(
  mapStateToProps,
  {},
)(DashBoard);
