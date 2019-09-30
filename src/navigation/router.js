import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation';
import React from 'react';
import Accounts from '../components/screens/account';
import DashBoard from '../components/screens/dash_board';
import Lead from '../components/screens/lead';
import Login from '../components/login';
import Opportunities from '../components/screens/opportunities';
import Images from '../assets/index';
import {Image} from 'react-native';
import images from '../assets/index';
import EditOpportunityTabBar from './tab_bar';
import CreateAccount from '../components/screens/create_accounts';
import AccountDetails from '../components/account_details';
import Settings from '../components/screens/setting';
import Filter from '../components/filter';
import AccountList from '../components/screens/account_list';
import CreateActivity from '../components/screens/editOpportunityScreen/create_activity';

const AuthStack = createStackNavigator({
  Login: {screen: Login},
});

const DashBoardWithFilterDrawer = createDrawerNavigator(
  {
    Dashboard: {
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
    initialRouteName: 'Dashboard',
    drawerPosition: 'right',
    drawerOpenRoute: 'DashBoardDrawerDrawerOpen',
    drawerCloseRoute: 'DashBoardDrawerDrawerClose',
    drawerToggleRoute: 'DashBoardDrawerDrawerToggle',
    drawerWidth: 300,
  },
);
const tabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashBoardWithFilterDrawer,
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
    initialRouteName: 'Dashboard',
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
const TabsWithDrawer = createDrawerNavigator(
  {
    Tabs: {
      screen: Tabs,
    },
  },

  {
    contentComponent: props => <AccountDetails {...props} />,
    getCustomActionCreators: (route, stateKey, navigation) => {
      return {
        toggleAccountDetailsDrawer: () =>
          DrawerActions.toggleDrawer({key: stateKey, params: navigation}),
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
      screen: TabsWithDrawer,
      navigationOptions: {
        header: null,
      },
    },

    EditOpportunity: {
      screen: EditOpportunityTabBar,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
        headerStyle: {
          backgroundColor: 'rgb(255,217,25)',
        },
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        title: 'Settings',
      }),
    },
    AccountList: {
      screen: AccountList,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,

        headerStyle: {
          backgroundColor: 'rgb(255,217,25)',
        },
      }),
    },
    CreateActivity: {
      screen: CreateActivity,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
        headerStyle: {
          backgroundColor: 'rgb(255,217,25)',
        },
      }),
    },
    CreateAccount: {
      screen: CreateAccount,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
        headerStyle: {
          backgroundColor: 'rgb(255,217,25)',
        },
      }),
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
