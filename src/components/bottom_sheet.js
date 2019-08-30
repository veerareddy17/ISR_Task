import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Button,
  Input,
  Label,
  Item,
  Content,
  DatePicker,
  Card,
  Footer,
  FooterTab,
} from 'native-base';
import moment from 'moment';
export default class BottomSheet extends React.Component {
  state = {
    parentAccount: '',
    parentOpportunity: '',
    title: '',
    date: moment()
      .locale('fr')
      .format('YYYY/MM/DD'),
    comments: '',
    isLoading: true,
  };
  onBlur() {
    console.log('#####: onBlur');
  }

  _onPressClose = () => {
    this.props.close();
  };

  handleSubmit = () => {
    this.props.submit(this.state);
    this.props.close();
  };

  setDate(newDate) {
    const date = moment(newDate).format('YYYY/MM/DD');
    this.setState({date: date});
  }
  renderItem() {
    return (
      <View style={{flex: 1}}>
        <Content style={{flex: 1}}>
          <Card>
            <View style={{flex: 1}}>
              <Item floatingLabel style={styles.itemStyle}>
                <Label style={styles.label}>Parent Account</Label>
                <Input
                  placeholder={'Big Iron'}
                  style={styles.input}
                  value={this.state.parentAccount}
                  onChangeText={text => this.setState({parentAccount: text})}
                />
              </Item>
              <Item floatingLabel style={styles.itemStyle}>
                <Label style={styles.label}>Parent Opportunity</Label>
                <Input
                  placeholder={'Opportunity 1'}
                  style={styles.input}
                  value={this.state.parentOpportunity}
                  onChangeText={text =>
                    this.setState({parentOpportunity: text})
                  }
                />
              </Item>

              <Item floatingLabel style={styles.itemStyle}>
                <Label style={styles.label}>Title</Label>

                <Input
                  placeholder={'tile'}
                  style={styles.input}
                  value={this.state.title}
                  onChangeText={text => this.setState({title: text})}
                />
              </Item>
              <Item DatePicker style={styles.itemStyle}>
                <View>
                  <Label style={styles.label}>Date</Label>
                  <DatePicker
                    defaultDate={new Date(2018, 4, 4)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2020, 12, 31)}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText={this.state.date}
                    textStyle={{color: 'green'}}
                    placeHolderTextStyle={{color: 'black'}}
                    onDateChange={this.setDate}
                    disabled={false}
                  />
                </View>
              </Item>

              <Item floatingLabel style={styles.itemStyle}>
                <Label style={styles.label}>Comments</Label>

                <Input
                  style={styles.input}
                  multiline={true}
                  placeholder={'comment'}
                  value={this.state.comments}
                  onChangeText={text => this.setState({comments: text})}
                />
              </Item>
            </View>
          </Card>
        </Content>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={this._onPressClose}>
            <View style={styles.closeStyle}>
              <Text style={{marginRight: 10}}>close</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerView}>
            <Text style={styles.headerStyle}>Notes</Text>
          </View>
        </View>

        {this.renderItem()}

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
              onPress={this.handleSubmit}>
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
              onPress={() => {}}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Cancel</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  labelInput: {
    color: '#555555',
    fontSize: 14,
  },
  formInput: {
    borderWidth: 1.5,
    borderColor: '#333',

    paddingBottom: 5,
  },
  headerStyle: {
    fontSize: 22,
    alignSelf: 'center',
    marginRight: 60,
    fontWeight: 'bold',
    color: '#555555',
  },
  headerView: {flex: 1, justifyContent: 'center', height: 60},
  input: {
    borderWidth: 0,
    marginTop: 10,
    paddingBottom: 2,
  },

  label: {color: 'grey'},
  input: {color: 'black'},
  itemStyle: {marginLeft: 10, marginTop: 20},
  footer: {
    height: 50,
    backgroundColor: 'yellow',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {color: 'black', fontSize: 16, fontWeight: 'bold'},
  closeStyle: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 60,
    height: 60,
    borderBottomRightRadius: 60,
    backgroundColor: 'yellow',
  },
});
