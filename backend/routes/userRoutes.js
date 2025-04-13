const express=require('express');
const {login, getUserData, logout}=require('../controllers/userController');
const {isVerifiedUser}=require('../middlewares/tokenVerification');
const router=express.Router();

//auth routes
router.route('/login').post(login);
router.route('/logout').post(isVerifiedUser,logout)
router.route('/').get(isVerifiedUser,getUserData);

module.exports=router;