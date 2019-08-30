import {
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import General from '../components/screens/editOpportunityScreen/general';
import Active from '../components/screens/editOpportunityScreen/active';
import Notes from '../components/screens/editOpportunityScreen/notes';
import Contact from '../components/screens/editOpportunityScreen/contact';

const TabBar = createMaterialTopTabNavigator(
  {
    General: {screen: General},
    Activity: {screen: Active},
    Notes: {screen: Notes},
    Contact: {screen: Contact},
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
      tabStyle: {
        // marginTop: (Platform.OS === 'ios') ? 0 : 0,
        // marginRight: 0,
        // height: 60,
        // flexDirection: 'row',
        // backgroundColor: 'grey',
      },
      style: {
        backgroundColor: 'rgb(220,220,220)',
      },
    },
  },
);

const EditOpportunityTabBar = createAppContainer(TabBar);

export default EditOpportunityTabBar;
