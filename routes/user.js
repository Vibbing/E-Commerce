const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const cartController = require('../controllers/cartController')
const orderController = require('../controllers/orderControllers')
const auth = require('../middleware/auth');
const { checkProductQty, checkProductQtyCart } = require('../middleware/productQtyCheck');

/* GET Home Page. */
router.get('/', auth.userAuth, userController.getHomePage)

/* GET Privacy Policy Page. */
router.get('/privacy-policy', userController.getPrivacyPolicy)

/* GET Terms And Conditions Page. */
router.get('/terms-&-conditions', userController.getTermsAndConditions)

/* GET About us */
router.get('/about-us', userController.getAboutUs)

/* GET & POST Contact us */
router.route('/contact-us').get(userController.getContactUs).post(userController.postContactUs)

/* GET SignUp Page. */
router.get('/signup', auth.userRedirecting, userController.getSignup)

/* Post SignUp Page. */
router.post('/signup', userController.postSignup)

/* GET Login Page. */
router.get('/login', auth.userRedirecting, userController.getLogin)

/* Post Login Page. */
router.post('/login', userController.postLogin)

/* GET LogOut Page. */
router.get('/logout', userController.getLogout)

/* Post Otp Login Page. */
router.post('/otp-login', userController.otpLogin)

/* Post Otp vefify Page. */
router.post('/otp-verify', userController.otpVerify)

/* Post Resend Otp Page. */
router.post('/resend-otp', userController.resendOtp)

/* GET Shop Page. */
router.get('/shop', auth.userAuth, userController.getShop)

/* GET Product Detail Page. */
router.get('/product-detail/:id', auth.userAuth, userController.getProductDetail)

/* GET Cart Page */
router.get('/cart-list', auth.userAuth, cartController.getCart)

/* POST ADD To Cart Page */
router.post('/add-to-cart/:id', checkProductQty, cartController.addToCart)

/* POST Update cart quantity Page */
router.patch('/change-product-quantity', auth.userAuth, checkProductQtyCart, cartController.updateQuantity)

/* Delete product from cart*/
router.delete('/delete-product-cart', auth.userAuth, cartController.deleteProduct)

/* GET User Profile Page */
router.get('/get-profile', auth.userAuth, orderController.getAddress)

/* POST Address Page */
router.route('/add-address').post(auth.userAuth, orderController.postAddress)

/* GET Edit Address Page */
router.route('/edit-address/:id').get(orderController.getEditAddress).patch(orderController.patchEditAddress)

/* DELETE  Address Page */
router.route('/delete-address/:id').delete(orderController.deleteAddress)

/* GET Check Out Page */
router.get('/check-out', auth.userAuth, orderController.getCheckOut)

/* POST Check Out Page */
router.post('/check-out', orderController.postCheckOut)

// router.route('/order-product/:id').get(auth.userAuth,orderController.getProduct)

router.route('/order-details/:id').get(auth.userAuth, orderController.orderDetails)

router.route('/verify_payment').post(auth.userAuth, orderController.verifyPayment)

router.route('/cancel-order/').post(orderController.cancelOrder)

router.route('/return-order/').post(orderController.returnOrder)

router.route('/wish-list').get(auth.userAuth, userController.getWishList)

router.route('/add-to-wishlist').post(userController.addWishList)

router.route('/remove-product-wishlist').delete(userController.removeProductWishlist)

router.route('/change-user-data/:id').post(userController.changeUserData)

router.route('/coupon-verify/:id').get(auth.userAuth, userController.verifyCoupon)

router.route('/apply-coupon/:id').get(auth.userAuth, userController.applyCoupon)


module.exports = router;
