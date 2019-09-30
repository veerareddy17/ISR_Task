import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {
  Container,
  Button,
  Input,
  Label,
  Item,
  Content,
  Footer,
  FooterTab,
  Picker,
  DatePicker,
} from 'native-base';
import {
  selectedOpportunity,
  createOpportunityGeneralAction,
} from '../../../action/opportunity';
import {connect} from 'react-redux';
import moment from 'moment';
import useForm from 'react-hook-form';

function General(props) {
  const general = props.selectedOpportunityCard.selectedOpportunity;
  const {register, handleSubmit, setValue, getValues, errors} = useForm({
    defaultValues: {
      Title: general.Title,
      Details: general.Details,
      opportunitiesType: general.ItemCategory,
      ExpectedCloseDate: moment(general.ExpectedCloseDate).format('YYYY/MM/DD'),
      ProjectedTotal: general.ProjectedTotal,
      stage: general.stage,
    },
  });
  var valuesData = getValues();
  setDate = newDate => {
    const date = moment(newDate).format('YYYY/MM/DD');
    this.setValue('ExpectedCloseDate', date);
  };
  const onSubmit = async data => {
    var Id = props.navigation.state.params.Id;
    var generalData = {
      data: data,
      Id: Id,
    };
    await props.createOpportunityGeneralAction(generalData);
    props.navigation.navigate('Tab');
  };

  return (
    <Container>
      <Content>
        <View style={{flex: 1}}>
          <Item floatingLabel style={styles.itemStyle}>
            <Label style={styles.label}>Title</Label>
            <Input
              // value={this.state.title}
              style={styles.input}
              // onChangeText={text => this.setState({title: text})}
              value={valuesData.Title}
              name="Title"
              ref={register({name: 'Title'}, {required: true})}
              placeholder="firstName"
              onChangeText={e => {
                setValue('Title', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.Title && 'Title is required'}
          </Text>
          <Item floatingLabel style={styles.itemStyle}>
            <Label style={styles.label}>Details</Label>
            <Input
              style={styles.input}
              value={valuesData.Details}
              name="Details"
              ref={register({name: 'Details'}, {required: true})}
              placeholder="Details"
              onChangeText={e => {
                setValue('Details', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.Details && 'Details is required'}
          </Text>
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
                selectedValue={valuesData.opportunitiesType}
                name="opportunitiesType"
                ref={register({name: 'opportunitiesType'}, {required: false})}
                onValueChange={value => {
                  console.log('selected picker values is....=>', value);
                  // this.setState({opportunitiesType: value});
                  setValue('opportunitiesType', value);
                }}>
                <Picker.Item label="customer" value="customer" />
                <Picker.Item label="prospect" value="prospect" />
              </Picker>
            </View>
          </Item>
          <Text style={styles.errorText}>
            {errors.opportunitiesType && 'Opportunity Type is required'}
          </Text>
          <Item DatePicker>
            <View>
              <Label style={styles.label}>Close Date</Label>
              <DatePicker
                defaultDate={new Date(2018, 1, 1)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                name="ExpectedCloseDate"
                ref={register({name: 'ExpectedCloseDate'}, {required: false})}
                // placeHolderText={this.state.closeDate}
                textStyle={{color: 'green'}}
                placeHolderTextStyle={{color: 'black'}}
                onDateChange={setDate}
                disabled={false}
              />
            </View>
          </Item>
        </View>

        <Item floatingLabel style={styles.itemStyle}>
          <Label style={styles.label}>Estimated Total</Label>
          <Input
            keyboardType={'numeric'}
            placeholder={'29 2019'}
            style={styles.input}
            value={
              valuesData.ProjectedTotal ? `${valuesData.ProjectedTotal}` : ''
            }
            name="ProjectedTotal"
            ref={register({name: 'ProjectedTotal'}, {required: true})}
            placeholder="ProjectedTotal"
            onChangeText={e => {
              setValue('ProjectedTotal', e);
            }}
          />
        </Item>
        <Text style={styles.errorText}>
          {errors.ProjectedTotal && 'Estimated Total is required'}
        </Text>
      </Content>

      <Footer
        style={{marginBottom: 10, backgroundColor: 'white', elevation: 0}}>
        <FooterTab style={{backgroundColor: 'white', elevation: 0}}>
          <Button
            success
            full={true}
            style={{
              marginRight: 5,
              borderRadius: 5,
              marginLeft: 10,
            }}
            onPress={handleSubmit(onSubmit)}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Save</Text>
          </Button>
          <Button
            full={true}
            danger
            style={{
              // backgroundColor: 'yellow',
              marginRight: 10,
              borderRadius: 5,
              marginLeft: 5,
            }}
            onPress={() => props.navigation.navigate('Tab')}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Cancel</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

var styles = StyleSheet.create({
  errorText: {color: 'red', marginLeft: 10},
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
