import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {
  Container,
  Button,
  Body,
  Fab,
  Footer,
  FooterTab,
  CardItem,
  Card,
  Left,
  Toast,
} from 'native-base';
import {connect} from 'react-redux';
import {createOpportunityNoteAction} from '../../../action/opportunity';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from '../../bottom_sheet';

class Notes extends Component {
  state = {
    notes: [],
  };

  onClose = () => {
    this.RBSheet.close();
  };
  onCloseNewSheet = () => {
    this.RBSheetNew.close();
  };
  onSubmit = notesData => {
    console.log('call back data is....=>', notesData);
    // this.props.OpportunityNoteEditAction(notesData);
  };
  createNewNotes = () => {
    this.RBSheetNew.open();
  };
  onSubmitNewNotes = newNotes => {
    this.setState({notes: this.state.notes.concat(newNotes)});

    console.log('new notes he is create....=>,newNotes', newNotes);
  };
  handleOnSubmit = async () => {
    await this.props.createOpportunityNoteAction(this.state.notes);

    Toast.show({
      text: 'create contact',
      buttonText: 'Okay',
      type: 'success',
      position: 'center',
    });
    this.props.navigation.navigate('Tab');
  };
  componentDidMount() {
    var entry = this.props.selectedOpportunityCard.selectedOpportunity;
    var name;
    var countIndices = 0;
    for (name in entry) {
      if (name === 'notes') {
        ++countIndices;
      }
    }
    if (countIndices >= 1) {
      this.setState({
        notes: this.props.selectedOpportunityCard.selectedOpportunity.notes,
      });
      return;
    }
  }
  render() {
    return (
      <Container>
        <FlatList
          data={this.state.notes}
          renderItem={({item}) => {
            return (
              <Card>
                <CardItem>
                  <Left>
                    <Text>{item.parentOpportunity}</Text>
                  </Left>
                  <Text>{item.parentAccount}</Text>
                </CardItem>
                <CardItem>
                  <Text>{item.title}</Text>
                  <Body>
                    <Text>{item.comments}</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text>{item.date}</Text>
                  </Left>

                  <TouchableOpacity onPress={() => this.RBSheet.open()}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </CardItem>

                <RBSheet
                  ref={ref => {
                    this.RBSheet = ref;
                  }}
                  // closeOnPressMask={false}
                  height={400}
                  duration={150}
                  // closeOnDragDown={true}
                  customStyles={{
                    container: {
                      flex: 1,
                      height: 400,
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                    },
                  }}>
                  <BottomSheet submit={this.onSubmit} close={this.onClose} />
                </RBSheet>
              </Card>
            );
          }}
        />

        <View style={{flex: 1}}>
          <Fab
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: 'rgb(255,217,25)'}}
            position="bottomRight"
            onPress={this.createNewNotes}>
            <Text style={{fontSize: 25, color: 'black'}}>+</Text>
          </Fab>
          <RBSheet
            ref={ref => {
              this.RBSheetNew = ref;
            }}
            // closeOnPressMask={false}
            height={400}
            duration={150}
            // closeOnDragDown={true}
            customStyles={{
              container: {
                flex: 1,
                height: 400,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              },
            }}>
            <BottomSheet
              submit={this.onSubmitNewNotes}
              close={this.onCloseNewSheet}
            />
          </RBSheet>
        </View>
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
  {createOpportunityNoteAction},
)(Notes);
