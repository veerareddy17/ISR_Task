import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Header from '../header';
import Images from '../../assets/index';
import {
  Container,
  Button,
  Input,
  Label,
  Item,
  Content,
  Footer,
  FooterTab,
  Card,
  DatePicker,
  Toast,
} from 'native-base';
import moment from 'moment';
import {createAccounts} from '../../action/accounts';
import {connect} from 'react-redux';

class CreateAccount extends Component {
  static navigationOptions = {header: null};
  state = {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    ragistrationDate: '',
  };

  setDate = date => {
    this.setState({ragistrationDate: moment(date).format('YYYY/MM/DD')});
  };

  createNewAaccount = () => {
    this.props.createAccounts(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      ragistrationDate: '',
    });
  };
  render() {
    const {navigation} = this.props;

    console.log(navigation.state.routeName);
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
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>First Name</Label>
            <Input
              placeholder={'Big Iron'}
              style={styles.input}
              value={this.state.firstName}
              onChangeText={text => this.setState({firstName: text})}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Last Name</Label>
            <Input
              placeholder={'Opportunity 1'}
              style={styles.input}
              value={this.state.lastName}
              onChangeText={text => this.setState({lastName: text})}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Company Name</Label>

            <Input
              placeholder={'Desciption'}
              style={styles.input}
              value={this.state.companyName}
              onChangeText={text => this.setState({companyName: text})}
            />
          </Item>

          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Email</Label>

            <Input
              placeholder={'None'}
              style={styles.input}
              value={this.state.email}
              onChangeText={text => this.setState({email: text})}
            />
          </Item>

          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Phone</Label>

            <Input
              placeholder={'Desciption'}
              style={styles.input}
              value={this.state.phoneNumber}
              onChangeText={text => this.setState({phoneNumber: text})}
            />
          </Item>

          <Item DatePicker style={styles.item}>
            <View>
              <Label style={styles.label}>Ragistration Date</Label>
              <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={'en'}
                formatChosenDate={date => {
                  return moment(date).format('YYYY/MM/DD');
                }}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText={this.state.ragistrationDate}
                textStyle={{color: 'green'}}
                placeHolderTextStyle={{color: 'black'}}
                onDateChange={this.setDate}
                disabled={false}
              />
            </View>
          </Item>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button
              success
              full={true}
              style={{
                marginRight: 5,
                borderRadius: 5,
                marginLeft: 5,
              }}
              onPress={this.createNewAaccount}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Save</Text>
            </Button>
            <Button
              full={true}
              danger
              style={{
                // backgroundColor: 'yellow',
                marginRight: 5,
                borderRadius: 5,
                marginLeft: 5,
              }}
              onPress={() => {
                Toast.show({
                  text: 'canceld!',
                  buttonText: 'Okay',
                  type: 'warning',
                });
                this.props.navigation.navigate('Tab');
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Cancel</Text>
            </Button>
          </FooterTab>
        </Footer>
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
  };
};

export default connect(
  mapStateToProps,
  {createAccounts},
)(CreateAccount);
