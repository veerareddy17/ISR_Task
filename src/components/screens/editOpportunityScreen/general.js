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
} from 'native-base';
import {
  selectedOpportunity,
  OpportunityGeneralEditAction,
} from '../../../action/opportunity';
import {connect} from 'react-redux';

class General extends Component {
  state = {
    isLoading: true,
    title: '',
    details: '',
    opportunitiesType: '',
    closeDate: '',
    chooseDate: '',
    stage: '',
  };

  componentDidMount() {
    const general = this.props.selectedOpportunityCard.selectedOpportunity
      .general;

    this.setState({
      title: general.title,
      details: general.details,
      opportunitiesType: general.opportunitiesType,
      closeDate: general.closeDate,
      estimated: general.estimated,
      stage: general.stage,
      isLoading: false,
    });
  }

  setDate(newDate) {
    this.setState({closeDate: newDate});
  }

  handleOnSubmit = () => {
    this.props.OpportunityGeneralEditAction(this.state);
  };
  render() {
    console.log('slected id is....=>', this.props.selectedOpportunityCard);

    return (
      <Container>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <Content>
            <View style={{flex: 1}}>
              <Item floatingLabel style={styles.itemStyle}>
                <Label style={styles.label}>title</Label>
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
                  <Label style={styles.label}> opportunities Type</Label>
                  <Picker
                    mode="dropdown"
                    // iosIcon={<Icon name="ios-arrow-down-outline" />}
                    placeholderStyle={{color: '#bfc6ea'}}
                    selectedValue={this.state.opportunitiesType}
                    onValueChange={value => {
                      console.log('selected picker values is....=>', value);
                      this.setState({opportunitiesType: value});
                    }}>
                    <Picker.Item label="customer" value="1" />
                    <Picker.Item label="prospect" value="2" />
                  </Picker>
                </View>
              </Item>
              <Item DatePicker>
                <View>
                  <Label style={styles.label}>close Date</Label>
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
                      <Picker.Item label="Discovery convocation" value="1" />
                      <Picker.Item label="convocation" value="2" />
                    </Picker>
                  </View>
                </Item>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Item floatingLabel>
                  <Label style={styles.label}>Estimagated</Label>
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
        )}

        <Footer>
          <FooterTab>
            <Button
              full={true}
              style={{backgroundColor: 'yellow'}}
              onPress={this.handleOnSubmit}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Save</Text>
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
  {selectedOpportunity, OpportunityGeneralEditAction},
)(General);
