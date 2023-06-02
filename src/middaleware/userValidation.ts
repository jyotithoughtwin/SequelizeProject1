import joi from '@hapi/joi'

export const userRegistrationValidation = async (reqData: Object) => {
    const authSchema = joi.object({
        name: joi.string().strict().trim().min(3).max(5).required().messages({"string.empty": "Name can be be empty","any.required": "Name is required","string.min": "Name length min 3 character long", "string.max": "Name length max 5 character long",'string.trim': 'Name should not contain any white space'}),
        email: joi.string().email().required().messages({"string.empty": "email is required","any.required": "email is required"}),
        password: joi.string().strict().trim().min(3).max(12).required().messages({"string.empty": "Password can not be empty","any.required": "Password is required","string.min": "Password length min 10 character", "string.max": "Password length max 12 character", }),

    })
    const result = authSchema.validate(reqData)
    if (result.error){
        return {status: "Error", message: result.error.details[0].message}
    }else{
        return {status:"Success"}
    }
}


export const userProfileUpdateValidation =async (reqData:Object) => {
    const authSchema = joi.object({
        name: joi.string().strict().trim().min(3).max(5).required().messages({"string.empty": "Name can be be empty","any.required": "Name is required","string.min": "Name length min 3 character long", "string.max": "Name length max 5 character long",'string.trim': 'Name should not contain any white space'}),
        mobileNumber: joi.string().min(10).required().messages({"string.empty": "Mobile number is required","any.required": "Mobile number is required", 'string.min': "Mobile number must have 10 digit"}),
        state: joi.string().required().messages({"string.empty": "State name is required","any.required": "State name is required"}),
        city: joi.string().required().messages({"string.empty": "City name is required","any.required": "City name is required"}),
        address: joi.string().required().messages({"string.empty": "Address is required","any.required": "Address is required"}),

    })
    const result = authSchema.validate(reqData)
    if (result.error){
        console.log("error--", result.error)
        return {status: "Error", message: result.error.details[0].message}
    }else{
        console.log("success--")
        return {status:"Success"}
    }
}