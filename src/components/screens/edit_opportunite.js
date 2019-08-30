import React, {Component} from 'react';
import {Container} from 'native-base';
import EditOpportunityTabBar from '../../navigation/tab_bar';

export default class EditOpportunity extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
  });
  render() {
    console.log(
      'data wjhat iam passing is..',
      this.props.navigation.state.params.title,
    );
    return (
      <Container>
        <EditOpportunityTabBar />
      </Container>
    );
  }
}
