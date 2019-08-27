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
  Right,
} from 'native-base';
import {connect} from 'react-redux';
import {OpportunityNoteEditAction} from '../../../action/opportunity';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from '../../bottom_sheet';

const Notes = props => {
  onClose = () => {
    this.RBSheet.close();
  };
  onCloseNewSheet = () => {
    this.RBSheetNew.close();
  };
  onSubmit = notesData => {
    console.log('call back data is....=>', notesData);
    props.OpportunityNoteEditAction(notesData);
  };
  createNewNotes = () => {
    this.RBSheetNew.open();
  };
  onSubmitNewNotes = newNotes => {
    console.log('new notes he is create....=>,newNotes', newNotes);
  };

  return (
    <Container>
      <FlatList
        data={props.selectedOpportunityCard.selectedOpportunity.notes}
        renderItem={({item}) => {
          console.log('in render item,,,,,=>', item);
          console.log('in render item,,,,,=>');
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
          style={{backgroundColor: 'yellow'}}
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
        <FooterTab>
          <Button full={true} style={{backgroundColor: 'yellow'}}>
            <Text value={'Save'} style={{color: 'black', fontWeight: 'bold'}}>
              Save
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

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
  {OpportunityNoteEditAction},
)(Notes);
