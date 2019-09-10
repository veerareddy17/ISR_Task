import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import {
  Container,
  Left,
  Right,
  Button,
  Input,
  Label,
  Item,
  Content,
  CardItem,
  Footer,
  FooterTab,
  Picker,
  DatePicker,
  Toast,
} from 'native-base';
import {
  selectedOpportunity,
  createOpportunityGeneralAction,
} from '../../../action/opportunity';
import {connect} from 'react-redux';
import moment from 'moment';

class General extends Component {
  state = {
    title: '',
    details: '',
    opportunitiesType: 'customer',
    closeDate: moment()
      .locale('fr')
      .format('YYYY/MM/DD'),
    chooseDate: '',
    stage: '',
    estimated: '',
  };

  componentDidMount() {
    var entry = this.props.selectedOpportunityCard.selectedOpportunity;
    var name;
    var countIndices = 0;
    for (name in entry) {
      if (name === 'general') {
        ++countIndices;
      }
    }
    if (countIndices >= 1) {
      const general = this.props.selectedOpportunityCard.selectedOpportunity
        .general;
      this.setState({
        title: general.title,
        details: general.details,
        opportunitiesType: general.opportunitiesType,
        closeDate: general.closeDate,
        estimated: general.estimated,
        stage: general.stage,
      });
    }
  }

  setDate(newDate) {
    const date = moment(newDate).format('YYYY/MM/DD');
    this.setState({closeDate: date});
  }

  handleOnSubmit = async () => {
    // if (this.props.selectedOpportunityCard.opportunitState) {
    //   // this.props.OpportunityGeneralEditAction(this.state);
    //   return;
    // }
    //crated opportunity action call here
    await this.props.createOpportunityGeneralAction(this.state);
    Toast.show({
      text: 'created General',
      buttonText: 'Okay',
      type: 'success',
      position: 'center',
    });
    this.props.navigation.navigate('Tab');
  };
  render() {
    return (
      <Container>
        <Content>
          <View style={{flex: 1}}>
            <Item floatingLabel style={styles.itemStyle}>
              <Label style={styles.label}>Title</Label>
              <Input
                value={this.state.title}
                style={styles.input}
                onChangeText={text => this.setState({title: text})}
              />
            </Item>
            <Item floatingLabel style={styles.itemStyle}>
              <Label style={styles.label}>Details</Label>
              <Input
                value={this.state.details}
                style={styles.input}
                multiline={true}
                onChangeText={text => this.setState({details: text})}
              />
            </Item>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Item picker style={styles.itemStyle}>
              <View>
                <Label style={styles.label}>Opportunity Type</Label>
                <Picker
                  mode="dropdown"
                  // iosIcon={<Icon name="ios-arrow-down-outline" />}
                  placeholderStyle={{color: '#bfc6ea'}}
                  selectedValue={this.state.opportunitiesType}
                  onValueChange={value => {
                    console.log('selected picker values is....=>', value);
                    this.setState({opportunitiesType: value});
                  }}>
                  <Picker.Item label="customer" value="customer" />
                  <Picker.Item label="prospect" value="prospect" />
                </Picker>
              </View>
            </Item>
            <Item DatePicker>
              <View>
                <Label style={styles.label}>Close Date</Label>
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
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </View>
            </Item>
          </View>

          <CardItem>
            <Left>
              <Item picker>
                <View style={{flex: 1}}>
                  <Label style={styles.label}>Stage </Label>
                  <Picker
                    mode="dropdown"
                    // iosIcon={<Icon name="ios-arrow-down-outline" />}

                    placeholderStyle={{color: '#bfc6ea'}}
                    selectedValue={this.state.stage}
                    onValueChange={value => {
                      console.log('selected picker values is....=>', value);
                      this.setState({stage: value});
                    }}>
                    <Picker.Item
                      label="Discovery convocation"
                      value="Discovery convocation"
                    />
                    <Picker.Item label="convocation" value="convocation" />
                  </Picker>
                </View>
              </Item>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Item floatingLabel>
                <Label style={styles.label}>Estimated Total</Label>
                <Input
                  placeholder={'29 2019'}
                  style={styles.input}
                  value={this.state.estimated}
                  onChangeText={text => this.setState({estimated: text})}
                />
              </Item>
            </Left>
          </CardItem>
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
  itemStyle: {marginLeft: 10, marginTop: 20},
});
const mapStateToProps = state => {
  console.log('state value', state);
  return {
    selectedOpportunityCard: state.opportunityReducer,
  };
};

export default connect(
  mapStateToProps,
  {
    selectedOpportunity,
    createOpportunityGeneralAction,
  },
)(General);
