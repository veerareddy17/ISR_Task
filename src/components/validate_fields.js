import validation from './validation';

export const validateLoginFields = (fieldName, value, valueLength) => {
  var formValues = {};
  formValues[fieldName] = value;

  var result;
  if (fieldName == 'email') {
    if (valueLength <= 5) {
      result = 'Email';
    }
  }
  if (fieldName == 'password') {
    if (valueLength <= 5) {
      result = 'Password';
    }
  }

  if (result != null) {
    return result;
  }

  return null;
};

export const validateFields = objectData => {
  const response = {success: false, token: null};
  var entry = objectData;
  var name;
  for (name in entry) {
    if (objectData[name] == '') {
      response.token = name;
      break;
    }
  }
  if (response.token == null) response.success = true;
  return response;
};
