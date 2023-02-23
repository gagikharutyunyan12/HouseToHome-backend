class SearchFeatures {
    constructor(query, queryString, lang = "en") {
        this.query = query
        this.queryString = queryString
        this.lang = lang
    }

    search() {
        const searchTerm = this.queryString.keyword;
        const searchRegex = new RegExp(searchTerm, 'i');
        const searchBy = {
            $or: [
                {[`title.${this.lang}`]: searchRegex},
                {[`buildingType.${this.lang}`]: searchRegex}
            ]
        }
        if(searchTerm) {
            this.query = this.query.find(searchBy);
        }
        return this;
    }

    filter() {

        const queryCopy = {...this.queryString}

        const removeFields = ["keyword", "page", "sortAsc", "sortDesc"];

        removeFields.forEach(key => delete queryCopy[key]);

        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryString));

        return this
    }


    sort() {
        if (this.queryString.sortAsc) {
            const sortBy = {};
            sortBy[this.queryString.sortAsc.split(',').join(' ')] = 1;
            this.query = this.query.sort(sortBy)
        } else if (this.queryString.sortDesc) {
            const sortBy = {};
            sortBy[this.queryString.sortDesc.split(',').join(' ')] = -1;
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort("-createdAt");
        }
        return this
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;

        const skipProducts = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skipProducts);
        return this
    }
}

module.exports = SearchFeatures;