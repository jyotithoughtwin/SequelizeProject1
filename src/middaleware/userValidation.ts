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