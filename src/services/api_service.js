import listingApi from './listing.api';
import StoreService from './StoreService';
import {APIConstants} from './api_constant';
serviceHeaders = async () => {
  var access_token;
  try {
    access_token = await StoreService.get('access_token');
  } catch (err) {}
  const storage_token = access_token.replace(/['"]+/g, '');
  const token = 'bearer' + ' ' + storage_token;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };
  return headers;
};
export default class ApiService {
  static fetchOpportunities = async () => {
    const headers = await serviceHeaders();

    // var response = await listingApi({
    //   url: APIConstants.OPPORTUNITY_URL,
    //   method: req.type,

    //   headers: headers,
    // })
    var response = await listingApi
      .get(APIConstants.OPPORTUNITY_URL, {
        headers: headers,
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response', response);

    return response;
  };

  static fetchOpportunityDetails = async id => {
    const headers = await serviceHeaders();
    var Url = APIConstants.OPPORTUNITY_URL + '/' + id;
    var response = await listingApi
      .get(Url, {
        headers: headers,
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response', response);

    return response;
  };

  static createOpportunityContact = async contctData => {
    var response = await {success: false, data: null};
    response.success = await true;
    response.data = await contctData;
    return response;
  };

  static createOpportunityNotes = async notesData => {
    var bodyData = [notesData];

    const headers = await serviceHeaders();
    var URL =
      APIConstants.OPPORTUNITY_URL + '/' + notesData.ParentId + '/Notes';
    var response = await listingApi
      .post(URL, bodyData, {
        headers: headers,
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response', response);
    return response;
  };

  static createOpportunityGeneral = async generalData => {
    var bodyData = [generalData];

    const headers = await serviceHeaders();

    var response = await listingApi
      .post(APIConstants.OPPORTUNITY_URL, bodyData, {
        headers: headers,
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response', response);

    return response;
  };

  static createOpportunityActvity = async activityData => {
    console.log('what api service befor going hit,,,...', activityData);
    var bodyData = [activityData];

    const headers = await serviceHeaders();

    let response = await listingApi
      .post(APIConstants.SALESACTIVITY_URL, bodyData, {
        headers: headers,
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response', response);

    return response;
  };

  //accounts related
  static createAccount = async accountData => {
    var accountDataBody = [accountData];

    const headers = await serviceHeaders();

    let response = await listingApi
      .post(APIConstants.ACCOUNT_URL, accountDataBody, {
        headers: headers,
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response', response);

    return response;
  };
  static fetchAccounts = async () => {
    const headers = await serviceHeaders();

    var response = await listingApi
      .get(APIConstants.ACCOUNT_URL, {
        headers: headers,
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });

    return response.data;
  };
}
