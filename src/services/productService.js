import axios from 'axios'

export default class ProductService {

    async getUserProducts() {
        // const products = await axios.get('https://appsensostatapi.azurewebsites.net/Products')

        var productss = [
        {
            Id : 1,
            Code : '434'
        },
        {
            Id : 2,
            Code : '932'
        }
        ]

        return productss
    }

}
