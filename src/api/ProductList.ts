import axios from 'axios';

import { ProductListType } from './ProductList.type';

class ApiHandler {}

export class ProductList extends ApiHandler {
  static async getProductList() {
    try {
      const response = await axios<Array<ProductListType>>({
        method: "get",
        url: "https://api.json-generator.com/templates/ePNAVU1sgGtQ/data",
        headers: {
          Authorization: "Bearer 22swko029o3wewjovgvs9wcqmk8p3ttrepueemyj",
        },
      });
      return response;
    } catch {}
  }
}
