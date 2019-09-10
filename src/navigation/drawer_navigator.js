import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import AccountDetails from '../components/account_details';
import Contact from '../components/screens/editOpportunityScreen/contact';
const MyDrawer = createDrawerNavigator(
  {
    AccountDetails: {
      screen: AccountDetails,
    },
  },

  {
    // drawerPosition: 'right',
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',
    // contentComponent: AccountDetails,
    drawerWidth: 200,
  },
);
// const MyDrawer = createAppContainer(Drawer);
export default MyDrawer;
