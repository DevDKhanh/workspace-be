import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/position";

const positionsService = {
  create: (
    data: {
      name: string;
      description: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}`, data, {
      cancelToken: tokenAxios,
    });
  },
  update: (
    data: {
      id: number;
      name: string;
      description: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.patch(`${routeName}/${data?.id}`, data, {
      cancelToken: tokenAxios,
    });
  },
  findOne: (
    data: {
      id: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/${data.id}`, {
      cancelToken: tokenAxios,
    });
  },
  findAll: (
    data: {
      keyword?: string;
      page: number;
      pageSize: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}`, {
      params: data,
      cancelToken: tokenAxios,
    });
  },
  delete: (
    data: {
      id: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.delete(`${routeName}/${data.id}`, {
      cancelToken: tokenAxios,
    });
  },
};

export default positionsService;
