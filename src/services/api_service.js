import listingApi from './listing.api';
import StoreService from './StoreService';
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
httpResponse = async requestObject => {
  let response = await listingApi(requestObject)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
  return response;
};
export default class ApiService {
  //keep it
  static createOpportunityContact = async contctData => {
    var response = await {success: false, data: null};
    response.success = await true;
    response.data = await contctData;
    return response;
  };

  static delete = async requestData => {
    const headers = await serviceHeaders();

    var response = await listingApi({
      method: requestData.method,
      headers: headers,
      url: requestData.url,
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    return response;
  };

  static create = async requestObj => {
    const headers = await serviceHeaders();
    var data = [requestObj.params];
    var response;
    response = await listingApi({
      method: requestObj.method,
      headers: headers,
      data: JSON.stringify(data),
      url: requestObj.url,
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

  //

  static get = async requestObj => {
    const headers = await serviceHeaders();

    var response = await listingApi({
      method: requestObj.method,
      headers: headers,
      url: requestObj.url,
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
}
