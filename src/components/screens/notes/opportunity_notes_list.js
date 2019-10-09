import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {
  Container,
  Fab,
  CardItem,
  Card,
  Left,
  Right,
  Body,
  Spinner,
  Icon,
} from 'native-base';
import {connect} from 'react-redux';
import {deleteOpportunityNotes} from '../../../action/opportunity';
import RBSheet from 'react-native-raw-bottom-sheet';
import CreateOpportunityNotes from './create_opportunity_notes';
// import Icon from 'react-native-vector-icons/FontAwesome';

class OpportunityNotesList extends Component {
  state = {
    notes: [],
    selectedItem: {},
  };

  onClose = () => {
    this.RBSheet.close();
  };
  onCloseNewSheet = () => {
    this.RBSheetNew.close();
  };
  onSubmit = data => {
    // this.setState({
    //   notes: this.state.notes.concat(data),
    // });
    console.log('call back data is....=>', notesData);
    // this.props.OpportunityNoteEditAction(notesData);
  };
  createNewNotes = () => {
    this.RBSheetNew.open();
  };
  onSubmitNewNotes = () => {
    // this.setState({notes: this.state.notes.concat(newNotes)});
    // console.log('new notes he is create....=>,newNotes', newNotes);
  };

  componentDidMount() {
    console.log(
      'whan i hit submit its once more its comming aa..=>',
      this.props.selectedOpportunityCard.selectedOpportunity.Notes,
    );
    var entry = this.props.selectedOpportunityCard.selectedOpportunity;
    var name;
    var countIndices = 0;
    for (name in entry) {
      if (name === 'Notes') {
        ++countIndices;
      }
    }
    if (countIndices >= 1) {
      this.setState({
        notes: this.props.selectedOpportunityCard.selectedOpportunity.Notes,
      });
      return;
    }
  }
  deleteNotes = async item => {
    await this.props.deleteOpportunityNotes(item.Id);
  };

  render() {
    return (
      <Container>
        {this.props.common.isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            extraData={
              this.props.selectedOpportunityCard.selectedOpportunity.Notes
            }
            data={this.props.selectedOpportunityCard.selectedOpportunity.Notes}
            keyExtractor={(data, index) => `n ${index}`}
            renderItem={({item}) => {
              return (
                <Card>
                  <CardItem>
                    <Left>
                      <Text>{item.Title}</Text>
                    </Left>
                    <Body>
                      <Text>{item.Comments}</Text>
                    </Body>
                    <Right>
                      <TouchableOpacity
                        onPress={() => {
                          // this.setState({selectedItem: item});

                          // this.RBSheet.open();
                          this.deleteNotes(item);
                        }}>
                        {/* <Icon name="edit" style={{color: 'grey'}} size={30} /> */}
                        {/* <Text>Delete</Text> */}
                        <Icon name="trash" style={{color: 'red'}} />
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                </Card>
              );
            }}
          />
        )}

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
          <CreateOpportunityNotes
            submit={this.onSubmit}
            close={this.onClose}
            notesData={this.state.selectedItem}
          />
        </RBSheet>
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
            <CreateOpportunityNotes
              submit={this.onSubmitNewNotes}
              close={this.onCloseNewSheet}
            />
          </RBSheet>
        </View>
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
    common: state.common,
  };
};

export default connect(
  mapStateToProps,
  {deleteOpportunityNotes},
)(OpportunityNotesList);
