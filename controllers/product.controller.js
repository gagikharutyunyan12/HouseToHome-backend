const productService = require('../services/product.service')
const {SUCCESS_CODE} = require('../exceptions/status-code')

class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const {lang} = req.params;
            const products = await productService.getAllProducts(req.query, lang)

            return res.status(SUCCESS_CODE).json(products)

        } catch (e) {
            next(e)
        }
    }

    async getProducts(req, res, next) {
        try {
            const {lang, status} = req.params
            const products = await productService.getProducts(status, lang);

            return res.status(SUCCESS_CODE).json(products)
        } catch (e) {
            next(e)
        }
    }

    async getProductDetails(req, res, next) {
        try {
            const product = await productService.getProductDetails(req.params.id)

            return res.status(SUCCESS_CODE).json(product);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController();