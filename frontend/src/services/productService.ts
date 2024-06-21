import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/Product";

const productService = {
  getAll: (
    data: {
      limit: number;
      page: number;
      keyword: string;
      categoryUuid: string;
      sortNew?: boolean;
      sortSellLot?: boolean;
      sortPriceASC?: boolean;
      sortPriceDESC?: boolean;
      isDealHot?: boolean;
      isTodaySuggestion?: boolean;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/`, data, {
      cancelToken: tokenAxios,
    });
  },
  get_warehouse_product: (
    data: {
      limit: number;
      page: number;
      keyword: string;
      categoryUuid: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/get-warehouse-product`, data, {
      cancelToken: tokenAxios,
    });
  },
  update_price_product: (
    data: {
      uuids: string[];
      profit: number;
      discount: number;
      discountFrom: string | null;
      discountTo: string | null;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/update-price-produc`, data, {
      cancelToken: tokenAxios,
    });
  },
};

export default productService;
