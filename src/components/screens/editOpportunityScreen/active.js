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
import {OpportunityActvityEditAction} from '../../../action/opportunity';

class Active extends Component {
  state = {
    parentAccount: '',
    parentOpportunity: '',
    ActivityType: '',
    desciption: '',
    currentStatus: '',
    created: '',
    due: '',
  };

  handleOnSubmit = () => {
    console.log('in onsubmit action');
    console.log('state data...=>', this.state);
  };
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
                onChangeText={text => this.setState({parentAccount: text})}
              />
            </Item>
            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Parent Opportunity</Label>
              <Input
                placeholder={'Opportunity 1'}
                style={styles.input}
                onChangeText={text => this.setState({parentOpportunity: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Activity type</Label>

              <Input
                placeholder={'None'}
                style={styles.input}
                onChangeText={text => this.setState({ActivityType: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Desciption</Label>

              <Input
                placeholder={'Desciption'}
                style={styles.input}
                onChangeText={text => this.setState({desciption: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Current Status</Label>

              <Input
                placeholder={'Current Status'}
                style={styles.input}
                onChangeText={text => this.setState({currentStatus: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Created</Label>
              <Input
                placeholder={'6/7/2016'}
                style={{color: 'black'}}
                onChangeText={text => this.setState({created: text})}
              />
            </Item>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Due</Label>

              <Input
                placeholder={'6/7/2016'}
                style={styles.input}
                onChangeText={text => this.setState({due: text})}
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
export default Active;
