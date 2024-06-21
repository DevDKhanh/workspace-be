import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/Shop";

const shopService = {
  products: (
    data: {
      limit: number;
      page: number;
      keyword: string;
      categoryUuid: string;
      sortNew: boolean;
      sortSellLot: boolean;
      sortPriceASC: boolean;
      sortPriceDESC: boolean;
      isDealHot: boolean;
      isTodaySuggestion: boolean;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/products`, data, {
      cancelToken: tokenAxios,
    });
  },
  products_top_10: (data: {}, tokenAxios?: any) => {
    return axiosClient.post(`${routeName}/top-10`, data, {
      cancelToken: tokenAxios,
    });
  },
  products_detail: (data: { uuid: string }, tokenAxios?: any) => {
    return axiosClient.post(`${routeName}/detail-product`, data, {
      cancelToken: tokenAxios,
    });
  },
  stop_product: (data: { uuid: string }, tokenAxios?: any) => {
    return axiosClient.post(`${routeName}/stop-product`, data, {
      cancelToken: tokenAxios,
    });
  },
  level_info: (tokenAxios?: any) => {
    return axiosClient.post(
      `${routeName}/level-info`,
      {},
      {
        cancelToken: tokenAxios,
      }
    );
  },
  update_price_produc: (
    data: {
      uuid: string;
      profit: number;
      discount: number;
      discountFrom: string;
      discountTo: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/update-price-produc`, data, {
      cancelToken: tokenAxios,
    });
  },
  update_all_profit_product: (
    data: {
      profit: any;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/update-all-profit-product`, data, {
      cancelToken: tokenAxios,
    });
  },
  shop_info: (
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/shop-info`, {}, {
      cancelToken: tokenAxios,
    });
  },

};

export default shopService;
