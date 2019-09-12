import data from '../data.json';

export default class ApiService {
  static authenticate = (userName, password) => {
    console.log('i http url is.=>', userName, password);
    var response = {success: false, data: null};
    if (userName.length > 0 && password.length > 0) {
      response.success = true;
    } else {
      response.success = false;
    }
    return response;
  };

  static fetchOpportunities = async () => {
    var response = await {success: false, data: null};
    response.data = [
      {
        id: 'a1',
        Opportunities: 1,
        estmatedToatl: 500,
        user: 'customer',
      },
      {
        id: 'b2',
        Opportunities: 2,
        estmatedToatl: 400,
        user: 'customer',
      },
      {
        id: 'a3',
        Opportunities: 1,
        estmatedToatl: 500,
        user: 'customer',
      },
      {
        id: 'b4',
        Opportunities: 2,
        estmatedToatl: 400,
      },
    ];

    return await response;
  };

  static fetchOpportunityDetails = async id => {
    var response = await {success: false, data: null};
    response.data = data[0];
    return await response;
  };

  static createOpportunityContact = async contctData => {
    var response = await {success: false, data: null};
    response.success = await true;
    response.data = await contctData;
    return response;
  };

  static createOpportunityNotes = async notesData => {
    var response = await {success: false, data: null};
    response.success = await true;
    response.data = await notesData;
    return response;
  };

  static createOpportunityGeneral = async generalData => {
    var response = await {success: false, data: null};
    response.success = await true;
    response.data = await generalData;
    return response;
  };

  static createOpportunityActvity = async activityData => {
    var response = await {success: false, data: null};
    response.success = await true;
    response.data = await activityData;
    return response;
  };

  //accounts related
  static createAccount = async accountData => {
    var response = {success: false, data: null};
    if (accountData) {
      response.success = true;
      response.data = accountData;
    }
    return response;
  };
  static fetchAccounts = async () => {
    var response = {success: false, data: null};
    response.success = true;
    return response;
  };
}
