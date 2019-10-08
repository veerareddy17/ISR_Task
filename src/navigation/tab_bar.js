import {
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import CreateOpportunity from '../components/screens/opportunities/create_opportunity';
import OpportunityActivityList from '../components/screens/activity/opportunity_activity_list';
import OpportunityNotesList from '../components/screens/notes/opportunity_notes_list';
import Contact from '../components/screens/editOpportunityScreen/contact';

const TabBar = createMaterialTopTabNavigator(
  {
    General: {screen: CreateOpportunity},
    Activity: {screen: OpportunityActivityList},
    Notes: {screen: OpportunityNotesList},
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
