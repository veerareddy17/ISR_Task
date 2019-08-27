import validation from "./validation"

export default function validate(fieldName, value, valueLength) {

    var formValues = {}
    formValues[fieldName] = value

    var formFields = {}
    formFields[fieldName] = validation[fieldName]

    var result;
    if (fieldName == "email") {
        if (valueLength <= 5) {
            result = "eneter email"
        }


    }
    if (fieldName == "password") {
        if (valueLength <= 5) {
            result = "enetr password"
        }


    }


    if (result != null) {

        return result
    }

    return null
}
validate.prototype = {
    value: String,

}