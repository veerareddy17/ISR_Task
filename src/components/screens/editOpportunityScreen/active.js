import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {
  Container,
  Button,
  Input,
  Label,
  Item,
  Content,
  Footer,
  FooterTab,
  DatePicker,
  Toast,
} from 'native-base';
import {connect} from 'react-redux';
import moment from 'moment';
import {createOpportunityActvityAction} from '../../../action/opportunity';

class Active extends Component {
  state = {
    parentAccount: '',
    parentOpportunity: '',
    activityType: '',
    desciption: '',
    currentStatus: '',
    created: moment()
      .locale('fr')
      .format('YYYY/MM/DD'),
    due: moment()
      .locale('fr')
      .format('YYYY/MM/DD'),
  };

  componentDidMount() {
    console.log(
      'lets check what is comming ..=>',
      this.props.selectedOpportunityCard.selectedOpportunity,
    );
    var entry = this.props.selectedOpportunityCard.selectedOpportunity;
    var name;
    var countIndices = 0;
    for (name in entry) {
      if (name === 'activity') {
        ++countIndices;
      }
    }
    if (countIndices >= 1) {
      const activity = this.props.selectedOpportunityCard.selectedOpportunity
        .activity;
      this.setState({
        parentAccount: activity.parentAccount,
        parentOpportunity: activity.parentOpportunity,
        activityType: activity.activityType,
        desciption: activity.desciption,
        currentStatus: activity.currentStatus,
        created: activity.created,
        due: activity.due,
      });
    }
  }

  handleOnSubmit = async () => {
    // if (this.props.selectedOpportunityCard.opportunitState != null) {
    //   //edit activity here
    //   return;
    // }
    //created new opportunity action call here
    await this.props.createOpportunityActvityAction(this.state);
    Toast.show({
      text: 'create contact',
      buttonText: 'Okay',
      type: 'success',
      position: 'center',
    });
    this.props.navigation.navigate('Tab');
    console.log('in onsubmit action');
    console.log('state data...=>', this.state);
  };
  setCreatedDate(newDate) {
    var date = moment(newDate).format('YYYY/MM/DD');
    this.setState({created: date});
  }
  setDueDate(newDate) {
    var date = moment(newDate).format('YYYY/MM/DD');
    this.setState({due: date});
  }
  render() {
    return (
      <Container>
        <Content>
          <View style={{flex: 1}}>
            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Parent Account</Label>
              <Input
                placeholder={'Big Iron'}
                style={styles.input}
                value={this.state.parentAccount}
                onChangeText={text => this.setState({parentAccount: text})}
              />
            </Item>
            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Parent Opportunity</Label>
              <Input
                placeholder={'Opportunity 1'}
                style={styles.input}
                value={this.state.parentOpportunity}
                onChangeText={text => this.setState({parentOpportunity: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Activity type</Label>

              <Input
                placeholder={'None'}
                style={styles.input}
                value={this.state.ActivityType}
                onChangeText={text => this.setState({ActivityType: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Desciption</Label>

              <Input
                placeholder={'Desciption'}
                style={styles.input}
                value={this.state.desciption}
                onChangeText={text => this.setState({desciption: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Current Status</Label>

              <Input
                placeholder={'Current Status'}
                style={styles.input}
                value={this.state.currentStatus}
                onChangeText={text => this.setState({currentStatus: text})}
              />
            </Item>

            <Item DatePicker style={styles.item}>
              <View>
                <Label style={styles.label}>Created</Label>

                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText={this.state.closeDate}
                  textStyle={{color: 'green'}}
                  placeHolderTextStyle={{color: 'black'}}
                  onDateChange={this.setCreatedDate}
                  disabled={false}
                />
              </View>
            </Item>

            <Item DatePicker style={styles.item}>
              <View>
                <Label style={styles.label}>Due</Label>

                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText={this.state.closeDate}
                  textStyle={{color: 'green'}}
                  placeHolderTextStyle={{color: 'black'}}
                  onDateChange={this.setDueDate}
                  disabled={false}
                />
              </View>
            </Item>
          </View>
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
              onPress={this.handleOnSubmit}>
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
              onPress={() => this.props.navigation.navigate('Tab')}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Cancel</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
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
  {createOpportunityActvityAction},
)(Active);
