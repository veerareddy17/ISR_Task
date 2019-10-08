import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerActions,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import React from 'react';
import AccountList from '../components/screens/accounts/account_list';
import DashBoard from '../components/screens/dash_board';
import Lead from '../components/screens/lead';
import Login from '../components/login';
import OpportunityList from '../components/screens/opportunities/opportunity_list';
import Images from '../assets/index';
import {Image} from 'react-native';
import images from '../assets/index';
import EditOpportunityTabBar from './tab_bar';
import CreateAccount from '../components/screens/accounts/create_accounts';
import AccountDetails from '../components/account_details';
import Filter from '../components/filter';
import RelationAccountList from '../components/screens/opportunities/relation_list';
import CreateOpportunityActivity from '../components/screens/activity/create_opportunity_activity';

import AccountNotesList from '../components/screens/notes/account_notes_list';
import AccountActivityList from '../components/screens/activity/account_activity_list';
import AccountAddressList from '../components/screens/address/account_address_list';
import CreateAccountAddress from '../components/screens/address/create_account_address';
import CreateAccountActivity from '../components/screens/activity/create_account_activity';

const AccountDetailsTabs = createMaterialTopTabNavigator(
  {
    Address: {screen: AccountAddressList},
    Activity: {screen: AccountActivityList},
    Notes: {screen: AccountNotesList},
  },

  {
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
      tabStyle: {},
      style: {
        backgroundColor: 'rgb(220,220,220)',
      },
    },
  },
);

const EditAccountTabBar = createAppContainer(AccountDetailsTabs);

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
      screen: OpportunityList,
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
      screen: AccountList,
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
    EditAccount: {
      screen: EditAccountTabBar,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
        headerStyle: {
          backgroundColor: 'rgb(255,217,25)',
        },
      }),
    },

    SelectAccount: {
      screen: RelationAccountList,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,

        headerStyle: {
          backgroundColor: 'rgb(255,217,25)',
        },
      }),
    },
    CreateActivity: {
      screen: CreateOpportunityActivity,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
        headerStyle: {
          backgroundColor: 'rgb(255,217,25)',
        },
      }),
    },
    AccountActivity: {
      screen: CreateAccountActivity,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
        headerStyle: {
          backgroundColor: 'rgb(255,217,25)',
        },
      }),
    },
    CreateAddress: {
      screen: CreateAccountAddress,
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
    },
    {
      initialRouteName: 'AuthStack',
    },
  ),
);
export default AppContainer;
