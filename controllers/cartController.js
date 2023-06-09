const express = require('express')
const cartModel = require('../schema/models')
const cartHelpers = require('../helpers/cartHelpers')
const orderHelpers = require('../helpers/orderHelpers')
const wishListHelpers = require('../helpers/wishlistHelpers')


module.exports = {

    /* GET Cart Page */
    getCart: async (req, res) => {
        let userId = req.session.user._id
        let user = req.session.user
        let count = await cartHelpers.getCartCount(user._id)
        const wishlistCount = await wishListHelpers.getWishListCount(user._id)
        let total = await orderHelpers.totalCheckOutAmount(userId)
        let subTotal = await orderHelpers.getSubTotal(userId)
        cartHelpers.getCartItems(userId).then((cartItems) => {
            res.render('user/cart', { layout :'Layout', user, cartItems, subTotal, total, count, wishlistCount })
        })
    },

    /* POST ADD To Cart Page */
    addToCart: (req, res) => {
        cartHelpers.addToCart(req.params.id, req.session.user._id)
            .then((response) => {
                console.log(response,'res');
                res.send(response)
            })
    },

    /* POST Update cart quantity Page */
    updateQuantity: (req, res) => {
        let userId = req.session.user._id
        cartHelpers.updateQuantity(req.body).then(async (response) => {
        response.total = await orderHelpers.totalCheckOutAmount(userId)
        response.subTotal = await orderHelpers.getSubTotal(userId)
            res.json(response)
        })
    },

    /* Delete product from cart*/
    deleteProduct: (req, res) => {
        cartHelpers.deleteProduct(req.body).then((response) => {
            res.send(response)
        })
    }
}