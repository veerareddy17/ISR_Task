
export default class AuthenticationService {

    static authenticate = (userName, password) => {
        console.log("i http url is.=>", userName, password)
        var response = { success: false, data: null };
        if (userName.length > 0 && password.length > 0) {
            response.success = true;


        } else {
            response.success = false;
        }
        return response;

    };
}
