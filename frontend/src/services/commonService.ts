import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/Common";

const commonService = {
  nationals: (
    data: {
      Keyword?: string | null;
      Limit?: number;
      Page: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/nationals`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  categories: (data: { Limit?: number; Page: number }, tokenAxios?: any) => {
    return axiosClient.get(`${routeName}/categories`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  configWallets: (
    data: {
      WalletId?: string;
      Keyword: string | null;
      Limit: number;
      Page: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/config-wallets`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  currencies: (
    data: {
      Keyword: string | null;
      Limit: number;
      Page: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/currencies`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  level: (
    data: {
      Limit: number;
      Page: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/level`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
};

export default commonService;
