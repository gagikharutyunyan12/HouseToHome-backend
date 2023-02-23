const SearchFeatures = require('../utils/helpers/SearchFeatures');
const ProductRepositories = require('../repositories/product.repositories');
const {NotFound} = require("../exceptions");
const {NOT_EXISTS} = require("../utils/constants");
const ProductDto = require('../dto/productDto');
const Product = require('../models/productModel')

class ProductService extends ProductRepositories {
    constructor() {
        super();
    }
    async getAllProducts(query, lang) {
        const resultPerPage = 12;
        const productsCount = await this.getProductCount();

        const searchFeatures = new SearchFeatures(Product.find(), query, lang)
            .search()
            .filter()
            .sort();


        let products = await searchFeatures.query;
        let filteredProductCount = products.length;

        searchFeatures.pagination(resultPerPage)

        products = await searchFeatures.query.clone();

        return {
            products: products.map(product => new ProductDto(product)),
            productsCount,
            resultPerPage,
            filteredProductCount
        }
    }
    async getProducts(status, lang) {
        const products = await this.getAllPrd(status, lang);
        return products
    }
    async getProductDetails(id) {
        const product = await this.getProductById(id);

        if(!product) {
            throw new NotFound(NOT_EXISTS('id'));
        }

        return product;
    }
}

module.exports = new ProductService();