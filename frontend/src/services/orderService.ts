import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/Oders";

const orderService = {
  getOrder: (
    data: {
      limit: number;
      page: number;
      keyword: string;
      state: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}`, data, {
      cancelToken: tokenAxios,
    });
  },
  Detail: (
    data: {
      uuid?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/detail`, data, {
      cancelToken: tokenAxios,
    });
  },
  Success: (
    data: {
      uuid?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/success`, data, {
      cancelToken: tokenAxios,
    });
  },
  transport: (
    data: {
      uuid?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/transport`, data, {
      cancelToken: tokenAxios,
    });
  },
  confirm: (
    data: {
      uuid?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/confirm`, data, {
      cancelToken: tokenAxios,
    });
  },
  Refunds: (
    data: {
      limit?: number;
      page?: number;
      state?: any;
      keyword?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(
      `${routeName}/order-refunds`,
      {
        params: data,
        cancelToken: tokenAxios,
      }
    );
  },
  RefundsPuts: (
    data: {
      uuid?: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/order-refund/${data.uuid}`, null, {
      cancelToken: tokenAxios,
    });
  },
  Refuse: (
    data: {
      uuid: string;
      note: string;
      paths: string[];
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/order-refund/${data.uuid}/refusal`, data, {
      cancelToken: tokenAxios,
    });
  },
  Accept: (
    data: {
      uuid: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/order-refund/${data.uuid}/accept`, null, {
      cancelToken: tokenAxios,
    });
  },
  RefundDetail: (
    data: {
      uuid: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/order-refund/${data.uuid}`, {
      // params: data,
      cancelToken: tokenAxios,
    });
  },
};

export default orderService;
