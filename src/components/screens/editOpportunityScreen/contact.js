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
} from 'native-base';
import {connect} from 'react-redux';
import {OpportunityContactEditAction} from '../../../action/opportunity';

class Contact extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  componentDidMount() {
    const contact = this.props.selectedOpportunityCard.contact;
    this.setState({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    });
  }

  handleOnSubmit = () => {
    const contactData = this.props.selectedOpportunityCard.contact;
    const {id, ...statedata} = contactData;
    this.props.OpportunityContactEditAction(this.state);
  };
  render() {
    return (
      <Container>
        <Content>
          <View style={{flex: 1}}>
            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>firstName</Label>
              <Input
                placeholder={'Big Iron'}
                style={styles.input}
                value={this.state.firstName}
                onChangeText={text => this.setState({firstName: text})}
              />
            </Item>
            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>lastName</Label>
              <Input
                placeholder={'Opportunity 1'}
                style={styles.input}
                value={this.state.lastName}
                onChangeText={text => this.setState({lastName: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>email</Label>

              <Input
                placeholder={'None'}
                style={styles.input}
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>phoneNumber</Label>

              <Input
                placeholder={'Desciption'}
                style={styles.input}
                value={this.state.phoneNumber}
                onChangeText={text => this.setState({phoneNumber: text})}
              />
            </Item>
          </View>
        </Content>
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
  item: {marginLeft: 10, marginTop: 20},
});

const mapStateToProps = state => {
  console.log('state value', state);
  return {
    selectedOpportunityCard: state.opportunityReducer.selectedOpportunity,
  };
};

export default connect(
  mapStateToProps,
  {OpportunityContactEditAction},
)(Contact);
