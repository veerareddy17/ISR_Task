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

import useForm from 'react-hook-form';
function Contact(props) {
  const contact = props.selectedOpportunityCard.selectedOpportunity;
  const {register, handleSubmit, setValue, getValues, errors} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  var valuesData = getValues(); // watching every fields in the form

  const onSubmit = async data => {
    props.createOpportunityContactAction(data);
    props.navigation.navigate('Tab');
  };
  return (
    <Container>
      {props.commonReducer.isLoading ? (
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
                value={valuesData.firstName}
                name="firstName"
                ref={register({name: 'firstName'}, {required: true})}
                placeholder="firstName"
                onChangeText={e => {
                  setValue('firstName', e);
                }}
              />
            </Item>
            <Text style={styles.errorText}>
              {errors.firstName && 'First Name is required'}
            </Text>
            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Last Name</Label>
              <Input
                placeholder={'lastName'}
                style={styles.input}
                name="lastName"
                value={valuesData.lastName}
                ref={register({name: 'lastName'}, {required: true})}
                placeholder="lastName"
                onChangeText={e => setValue('lastName', e)}
              />
            </Item>
            <Text style={styles.errorText}>
              {errors.lastName && 'Last Name is required'}
            </Text>

            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Email</Label>

              <Input
                placeholder={'Email'}
                keyboardType={'email-address'}
                style={styles.input}
                value={valuesData.email}
                name="email"
                ref={register({name: 'email'}, {required: true})}
                placeholder="email"
                onChangeText={e => setValue('email', e)}
              />
            </Item>
            <Text style={styles.errorText}>
              {errors.email && 'Email is required'}
            </Text>
            <Item floatingLabel style={styles.item}>
              <Label style={styles.label}>Phone</Label>

              <Input
                placeholder={'Phone'}
                keyboardType={'phone-pad'}
                style={styles.input}
                name="phoneNumber"
                value={valuesData.phoneNumber}
                ref={register({name: 'phoneNumber'}, {required: true})}
                placeholder="phoneNumber"
                onChangeText={e => setValue('phoneNumber', e)}
              />
            </Item>
            <Text style={styles.errorText}>
              {errors.phoneNumber && 'Phone is required'}
            </Text>
          </View>
        </Content>
      )}
      <Footer style={styles.footer}>
        <FooterTab style={{backgroundColor: 'white', elevation: 0}}>
          <Button
            success
            full={true}
            style={styles.footerLeftButton}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.footerText}>Save</Text>
          </Button>
          <Button
            full={true}
            danger
            style={styles.footerRightButton}
            onPress={() => props.navigation.navigate('Tab')}>
            <Text style={styles.footerText}>Cancel</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

var styles = StyleSheet.create({
  label: {color: 'grey'},
  input: {color: 'black'},
  errorText: {color: 'red', marginLeft: 10},
  item: {marginLeft: 10, marginTop: 20},
  footer: {marginBottom: 10, backgroundColor: 'white', elevation: 0},
  footerLeftButton: {
    marginRight: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  footerRightButton: {
    // backgroundColor: 'yellow',
    marginRight: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  footerText: {color: 'black', fontWeight: 'bold'},
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
