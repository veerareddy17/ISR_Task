import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
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
  Toast,
} from 'native-base';
import {connect} from 'react-redux';
import {createOpportunityContactAction} from '../../../action/opportunity';

class Contact extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  componentDidMount() {
    var entry = this.props.selectedOpportunityCard.selectedOpportunity;
    var name;
    var countIndices = 0;
    for (name in entry) {
      if (name === 'contact') {
        ++countIndices;
      }
    }
    if (countIndices >= 1) {
      const contact = this.props.selectedOpportunityCard.selectedOpportunity
        .contact;
      this.setState({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
      });
    }
  }

  handleOnSubmit = async () => {
    if (this.props.selectedOpportunityCard.opportunitState) {
      const contactData = this.props.selectedOpportunityCard.selectedOpportunity
        .contact;
      const {id, ...statedata} = contactData;
      // this.props.OpportunityContactEditAction(this.state);
      return;
    }
    await this.props.createOpportunityContactAction(this.state);
    Toast.show({
      text: 'create contact',
      buttonText: 'Okay',
      type: 'success',
      position: 'center',
    });
    this.props.navigation.navigate('Tab');

    //create new opportunity action here
  };
  render() {
    console.log('common reducer is.....=>', this.props.commonReducer.isLoading);
    return (
      <Container>
        {this.props.commonReducer.isLoading ? (
          <Content>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator />
            </View>
          </Content>
        ) : (
          <Content>
            <View style={{flex: 1}}>
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
                <Label style={styles.label}>Email</Label>

                <Input
                  placeholder={'None'}
                  style={styles.input}
                  value={this.state.email}
                  onChangeText={text => this.setState({email: text})}
                />
              </Item>

              <Item floatingLabel style={styles.item}>
                <Label style={styles.label}>Pnumber</Label>

                <Input
                  placeholder={'Desciption'}
                  style={styles.input}
                  value={this.state.phoneNumber}
                  onChangeText={text => this.setState({phoneNumber: text})}
                />
              </Item>
            </View>
          </Content>
        )}
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
    commonReducer: state.common,
  };
};

export default connect(
  mapStateToProps,
  {createOpportunityContactAction},
)(Contact);
