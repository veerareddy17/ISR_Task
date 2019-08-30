import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import React, {Component} from 'react';
import Accounts from '../components/screens/account';
import DashBoard from '../components/screens/dash_board';
import Lead from '../components/screens/lead';
import Login from '../components/login';
import Opportunities from '../components/screens/opportunities';
import EditOpportunity from '../components/screens/edit_opportunite';
import Images from '../assets/index';
import {Text, View, Image} from 'react-native';
import images from '../assets/index';
import EditOpportunityTabBar from './tab_bar';
import CreateAccount from '../components/screens/create_accounts';

const AuthStack = createStackNavigator({
  Login: {screen: Login},
});

const OpportunitiesTabNavigato = createAppContainer(
  createStackNavigator(
    {
      Opportunities: Opportunities,

      EditOpportunity: EditOpportunity,
    },
    {
      initialRouteName: 'Opportunities',
    },
  ),
);
const tabNavigator = createBottomTabNavigator(
  {
    DashBoard: {
      screen: DashBoard,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          tintColor != 'black' ? (
            <Image source={Images.dashbaord} />
          ) : (
            <Image source={Images.dashboardfilled} />
          ),
      },
    },
    Opportunities: {
      screen: Opportunities,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          tintColor != 'black' ? (
            <Image source={Images.opportunity} />
          ) : (
            <Image source={Images.opportunityfilled} />
          ),
      },
    },
    Lead: {
      screen: Lead,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          tintColor != 'black' ? (
            <Image source={Images.lead} />
          ) : (
            <Image source={Images.leadsfilled} />
          ),
      },
    },
    Accounts: {
      screen: Accounts,
      navigationOptions: {
        tabBarIcon: ({tintColor}) =>
          tintColor != 'black' ? (
            <Image source={Images.users} />
          ) : (
            <Image source={Images.nounusers} />
          ),
      },
    },
  },
  {
    initialRouteName: 'DashBoard',
    tabBarOptions: {
      upperCaseLabel: false,
      showIcon: true,
      activeTintColor: 'black',
      labelStyle: {
        fontSize: 12,
        margin: 0,
        padding: 0,
        fontWeight: 'bold',
      },
      tabStyle: {
        // marginTop: (Platform.OS === 'ios') ? 0 : 0,
        // marginRight: 0,
        // height: 60,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
      },
    },
  },
);

const Tabs = createAppContainer(tabNavigator);
const AppStack = createStackNavigator(
  {
    Tab: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
    EditOpportunity: {
      screen: EditOpportunityTabBar,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
      }),
    },
    CreateAccount: {
      screen: CreateAccount,
    },
  },
  {
    initialRouteName: 'Tab',
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthStack: AuthStack,
      AppStack: AppStack,
    },
    {
      initialRouteName: 'AppStack',
    },
  ),
);
export default AppContainer;
