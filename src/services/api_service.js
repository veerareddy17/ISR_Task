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

  static fetchOpportunities = () => {
    var response = {success: false, data: null};
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
        user: 'customer',
      },
    ];

    return response;
  };

  static fetchOpportunityDetails = id => {
    var response = {success: false, data: null};
    response.data = data[0];

    console.log('service data... is=>', response);
    return response;
  };
}
