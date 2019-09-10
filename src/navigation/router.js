import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerActions,
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
import MyDrawer from './drawer_navigator';
import AccountDetails from '../components/account_details';
import Settings from '../components/screens/setting';
import Filter from '../components/filter';

const AuthStack = createStackNavigator({
  Login: {screen: Login},
});

const DashBoardDrawer = createDrawerNavigator(
  {
    DashBoard: {
      screen: DashBoard,
    },
  },

  {
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleDashBoardDrawer: () =>
          DrawerActions.toggleDrawer({key: stateKey}),
      };
    },
    drawerPosition: 'left',
    contentComponent: props => <Filter {...props} />,
    //  Filter,
    initialRouteName: 'DashBoard',
    drawerPosition: 'right',
    drawerOpenRoute: 'DashBoardDrawerDrawerOpen',
    drawerCloseRoute: 'DashBoardDrawerDrawerClose',
    drawerToggleRoute: 'DashBoardDrawerDrawerToggle',
    drawerWidth: 300,
  },
);
// const MyDrawer = createAppContainer(Drawer);
// export default MyDrawer;

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
      screen: DashBoardDrawer,
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
const Drawer = createDrawerNavigator(
  {
    Tabs: {
      screen: Tabs,
    },
  },

  {
    contentComponent: AccountDetails,
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleAccountDetailsDrawer: () =>
          DrawerActions.toggleDrawer({key: stateKey}),
      };
    },
    initialRouteName: 'Tabs',
    drawerPosition: 'right',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: 300,
  },
);
// const MyDrawer = createAppContainer(Drawer);

const AppStack = createStackNavigator(
  {
    Tab: {
      screen: Drawer,
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
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        title: 'Settings',
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
      // MyDrawer: MyDrawer,
    },
    {
      initialRouteName: 'AuthStack',
    },
  ),
);
export default AppContainer;
