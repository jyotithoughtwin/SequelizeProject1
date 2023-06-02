import express from 'express'
const router = express.Router()
import Users from '../controller/user'
import multer from 'multer'
import {DecodejwtToken} from '../middaleware/helper'
const upload = multer({ dest: 'uploads/' })

router.post("/image-upload",upload.single('image'), Users.ImageUpload)
router.post("/registration", Users.userRegistration)
router.put('/update-profile',DecodejwtToken, Users.updateProfile)
router.get("/get-user", Users.getUsersData)
export = router