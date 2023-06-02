import express, { Request, Response } from 'express'
const cloudinary = require('cloudinary').v2;
import DB from '../Database/db'
const User = DB.User
const userDetails = DB.userDetails
import { userRegistrationValidation, userProfileUpdateValidation } from '../middaleware/userValidation'
import { hasPassword, CreateJwtToken } from '../middaleware/helper'

const ImageUpload = async (req: any, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: "File is required" })
    }
    console.log("Image--", req.file.path)
    const imagePath = req.file.path
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        cloud_name: process.env.cloud_name,
        api_secret: process.env.api_secret,
        api_key: process.env.api_key,
        // resource_type: 'video',
        secure: true,
        folder: "test",
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        // console.log(result);
        return res.json({ Data: result });
    } catch (error) {
        console.error("error", error);
        return res.status(400).json({ Error: error })
    }
}

const userRegistration = async (req: Request, res: Response) => {
    const Data = req.body
    const bodyValidate = await userRegistrationValidation(Data)
    if (bodyValidate.status == "Error") {
        return res.status(400).json({ status: 400, message: bodyValidate.message })
    }
    const FindUserByMobileNumber = await User.findOne({ where: { email: Data.email } })
    if (FindUserByMobileNumber) {
        return res.status(400).json({ status: 400, message: "User already exits with this email" })
    }
    const Passwords = await hasPassword(Data.password)
    Data.password = Passwords
    await User.create(Data).then(async (UserData: any) => {
        const Token = await CreateJwtToken({ email: UserData.email, id: UserData.id })
        return res.status(200).json({ status: 200, message: "User created successfully", userData: UserData, Token: Token })

    }).catch(async (error: any) => {
        console.log("Error while creating user--", error)
        return res.status(400).json({ status: 400, message: "Somthing went wrong" })
    })
}
const updateProfile = async (req: Request, res: Response) => {
    console.log("body--", req.query)
    const Data1 = req.query
    const Data = req.body
    const bodyValidate = await userProfileUpdateValidation(Data)
    if (bodyValidate.status == "Error") {
        return res.status(400).json({ status: 400, message: bodyValidate.message })
    }
    const UserFind = await User.findOne({ where: { id: Data1.id } })
    if (!UserFind) {
        return res.status(400).json({ status: 400, message: "Invalid Token" })
    }
    UserFind.name = Data.name
    UserFind.save()
    const userDetailsFind = await userDetails.findOne({ where: { user_id: Data1.id } })
    if (userDetailsFind) {
        const update = await userDetails.update(Data1, { where: { user_id: Data1.id } })
        return res.status(200).json({ status: 200, message: "Profile updated successfully!!" })
    } else {
        Data.user_id = Data1.id
        const CreateUser = await userDetails.create(Data)
        return res.status(200).json({ status: 200, message: "Profile updated successfully!!" })
    }
}
const getUsersData = async (req: Request, res: Response) => {
    await User.findAll({
        where:{
            id: 1
        },
        include: [
            {
                model: userDetails,
                as: 'UserDetails',
                attributes: ["id", 'mobileNumber', 'state',"city", 'address'],
            },
        ],
    }).then((resss: any) => {
        // console.log("SSSSSSSS")
        return res.status(200).json({status: 200, Data: resss})

    }).catch((err: any) => {
        console.log("EEEEEEEEE", err)
    })
    // return res.json({status: 200, Data: Users})
}
export default { ImageUpload, userRegistration, updateProfile, getUsersData }