const {Router} = require('express');
const ProductController = require('../controllers/product.controller')

const router = Router();

router.get('/get-prd/:lang', ProductController.getAllProducts)
router.get('/get-all-prd/:lang/:status', ProductController.getProducts)
router.get('/get-single-prd/:id', ProductController.getProductDetails)
module.exports = router;