import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ListItem} from 'native-base';
import Images from '../assets/index';
import {connect} from 'react-redux';
import StoreService from '../services/StoreService';

const AccountDetails = props => {
  // navigateToScreen = route => () => {
  //   const navigateAction = NavigationActions.navigate({
  //     routeName: route,
  //   this.props.navigation.dispatch(navigateAction);
  //   this.props.navigation.dispatch(DrawerActions.closeDrawer());
  // };
  console.log('props account detals..', props);
  logOut = async () => {
    try {
      await StoreService.remove('access_token');
      await StoreService.remove('userName');
      props.navigation.navigate('AuthStack');
    } catch (err) {}
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.profileContainer}>
        <View>
          <View style={styles.profileDp}>
            <Image source={Images.useravatar} style={{marginRight: 5}} />
          </View>
          <Text style={{marginLeft: 10}}>admin</Text>
          {/* <Text style={{marginLeft: 10, marginTop: 10}}>
            mrther.sk@gmail.com
          </Text> */}
        </View>
        <View
          style={{
            margin: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
            }}>
            <Image source={Images.close} style={{marginRight: 10}} />
          </TouchableOpacity>
        </View>
      </View>

      <ListItem onPress={() => logOut()}>
        <Text style={{fontSize: 15, color: 'blue'}}>Log Out</Text>
      </ListItem>
    </View>
  );
};

var styles = StyleSheet.create({
  profileContainer: {
    height: 200,
    elevation: 5,
    backgroundColor: 'rgb(255,217,25)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileDp: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    margin: 10,
  },
  iconStyle: {color: 'grey'},
  iconTitleStyle: {fontSize: 15, marginLeft: 10},
});

// export default AccountDetails;

const mapStateToProps = state => {
  return {
    userState: state.auth,
    isLoading: state.common.isLoading,
  };
};

export default connect(
  mapStateToProps,
  {},
)(AccountDetails);
